import React from "react";
import SDKPaymentButton from "./components/SDKPaymentButton";
import PaymentModal from "./components/PaymentModal";
import {
        PaySZNProps,
        PaymentIntent,
        PaymentSubmissionData,
        JupiterQuoteResponse,
        TransactionSigner,
} from "./types";
import TokenService from "./services/TokenService";
import JupiterService from "./services/JupiterService";
import TransactionService from "./services/TransactionService";
import { API_BASE_URL, DEFAULT_SLIPPAGE_BPS } from "./services/constants";
import { toLamports } from "./utils/conversion";
import axios from "axios";
import { toast } from "sonner";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError } from "@solana/spl-token";

// Custom error class for categorized error handling
class PaySZNError extends Error {
        constructor(
                public type: "UserError" | "NetworkError" | "APIError" | "SystemError",
                message: string
        ) {
                super(message);
                this.name = "PaySZNError";
        }
}

const logger = {
        log: (...args: any[]) => {
                if (process.env.NODE_ENV === "development") {
                        console.log(...args);
                }
        },
        warn: (...args: any[]) => {
                if (process.env.NODE_ENV === "development") {
                        console.warn(...args);
                }
        },
        error: (...args: any[]) => {
                if (process.env.NODE_ENV === "development") {
                        console.error(...args);
                }
        },
};

/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
class PaySZN {
        private readonly apiKey: string;
        private readonly setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
        private readonly setPaymentIntent: React.Dispatch<
                React.SetStateAction<PaymentIntent | null>
        >;
        private paymentAmount = 0;
        private slippage = DEFAULT_SLIPPAGE_BPS;
        private merchantEmbeddedATA = "";
        private merchantWallet = "";

        constructor({ apiKey, setShowModal, setPaymentIntent }: PaySZNProps) {
                // Validate apiKey format (basic check, adjust as needed)
                if (!apiKey || typeof apiKey !== "string" || apiKey.length < 10) {
                        throw new PaySZNError("UserError", "Invalid API key provided");
                }
                this.apiKey = apiKey;
                this.setShowModal = setShowModal;
                this.setPaymentIntent = setPaymentIntent;
                this.initializeMerchantWallet(apiKey);
        }

        private async initializeMerchantWallet(apiKey: string): Promise<void> {
                // Retry configuration for API calls
                const maxRetries = 3;
                const retryDelay = 1000;

                for (let attempt = 1; attempt <= maxRetries; attempt++) {
                        try {
                                const response = await axios.get(
                                        `${API_BASE_URL}/payment-gateway/wallet?api_key=${apiKey}`,
                                        { timeout: 5000 } // 5-second timeout
                                );

                                const MERCHANT_WALLET_ADDRESS = response.data?.wallet;
                                if (!MERCHANT_WALLET_ADDRESS) {
                                        throw new PaySZNError("APIError", "Merchant wallet address not provided by API");
                                }

                                // Validate wallet address
                                try {
                                        new PublicKey(MERCHANT_WALLET_ADDRESS);
                                        logger.log("Merchant wallet initialized successfully");
                                } catch (error) {
                                        console.warn(error)
                                        throw new PaySZNError("APIError", "Invalid merchant wallet address returned by API");
                                }

                                this.merchantWallet = MERCHANT_WALLET_ADDRESS;

                                // Get merchant's USDC ATA
                                const merchantATA = await TokenService.getUSDCATA(MERCHANT_WALLET_ADDRESS);
                                this.merchantEmbeddedATA = merchantATA;
                                logger.log("Merchant USDC ATA computed");

                                // Confirm the ATA exists on-chain
                                const connection = new Connection(clusterApiUrl("mainnet-beta"));
                                try {
                                        await getAccount(connection, new PublicKey(merchantATA));
                                        logger.log("Merchant USDC ATA verified on-chain");
                                } catch (error) {
                                        if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                                                logger.warn("Merchant USDC ATA does not exist on-chain");
                                                toast.error(
                                                        "Merchant USDC account not found. Please create a USDC token account in your wallet."
                                                );
                                                throw new PaySZNError(
                                                        "UserError",
                                                        "Merchant USDC account not initialized. Please create it in your wallet."
                                                );
                                        }
                                        throw new PaySZNError("SystemError", "Failed to verify merchant USDC account");
                                }

                                return; // Success, exit retry loop
                        } catch (error) {
                                if (attempt === maxRetries) {
                                        const message =
                                                error instanceof PaySZNError
                                                        ? error.message
                                                        : "Failed to initialize merchant wallet. Please try again later.";
                                        logger.error("Merchant wallet initialization failed after retries");
                                        toast.error(message);
                                        throw new PaySZNError(
                                                error instanceof PaySZNError ? error.type : "NetworkError",
                                                message
                                        );
                                }
                                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                        }
                }
        }

        /**
         * Sets the slippage tolerance for token swaps
         * @param value - Slippage percentage in basis points
         */
        public setSlippage(value: number): void {
                if (value < 0 || !Number.isFinite(value)) {
                        toast.error("Slippage must be a non-negative number");
                        throw new PaySZNError("UserError", "Slippage must be a non-negative number");
                }
                this.slippage = value;
                toast.success(`Slippage set to ${value} basis points`);
        }

        /**
         * Creates a payment intent with the specified amount
         * @param amount - Payment amount in USDC
         * @returns The created payment intent
         */
        public async createPaymentIntent(amount: number): Promise<PaymentIntent> {
                if (amount <= 0 || !Number.isFinite(amount)) {
                        toast.error("Please provide an amount greater than zero");
                        throw new PaySZNError("UserError", "Payment amount must be greater than zero");
                }

                this.paymentAmount = amount;
                const intent: PaymentIntent = { id: "mock-intent-id", amount };
                this.setPaymentIntent(intent);
                toast.success(`Payment intent created for ${amount} USDC`);

                return intent;
        }

        /**
         * Renders the payment button component
         * @returns React component for the payment button
         */
        public renderPaymentButton(): React.ReactElement {
                return <SDKPaymentButton onClick={this.handlePaymentButtonClick.bind(this)} />;
        }

        /**
         * Renders the payment modal component
         * @returns React component for the payment modal
         */
        public renderPaymentModal(): React.ReactElement {
                return (
                        <PaymentModal
                                onSubmit={this.handleSubmitPaymentModal.bind(this)}
                                amount={this.paymentAmount}
                                onClose={this.handleCloseModal.bind(this)}
                        />
                );
        }

        /**
         * Handles the payment button click event
         */
        private handlePaymentButtonClick(): void {
                this.setShowModal(true);
        }

        /**
         * Handles closing the payment modal
         */
        private handleCloseModal(): void {
                this.setShowModal(false);
        }

        private async processPayment(signature: string, expectedReceiver: string) {
                try {
                        const toastId = toast.loading("Processing payment on the blockchain...");

                        const response = await axios.post(
                                `${API_BASE_URL}/payment-gateway/process`,
                                { signature, expectedReceiver },
                                {
                                        headers: { Authorization: `Bearer ${this.apiKey}` },
                                        timeout: 10000, // 10-second timeout
                                }
                        );

                        toast.success("Payment confirmed on the blockchain!", { id: toastId });
                        return response.data;
                } catch (error) {
                        logger.error("Payment processing failed");
                        const message = "Failed to process payment. Please try again.";
                        toast.error(message);
                        throw new PaySZNError(
                                axios.isAxiosError(error) ? "NetworkError" : "APIError",
                                message
                        );
                }
        }

        /**
         * Handles payment submission from the modal
         * @param data - Payment submission data
         * @returns Result of the payment operation
         */
        public async handleSubmitPaymentModal(data: PaymentSubmissionData): Promise<string> {
                if (this.paymentAmount <= 0) {
                        toast.error("Please provide an amount greater than zero");
                        throw new PaySZNError("UserError", "Payment amount must be greater than zero");
                }

                const mainToastId = toast.loading("Preparing payment...");

                try {
                        // Validate wallet address and token mint
                        try {
                                new PublicKey(data.walletAddress);
                                new PublicKey(data.fromToken.mint);
                        } catch (error) {
                                console.warn(error)
                                toast.error("Invalid wallet address or token mint");
                                throw new PaySZNError("UserError", "Invalid wallet address or token mint");
                        }

                        // Verify token is on Jupiter
                        toast.loading("Verifying token availability...", { id: mainToastId });
                        const tokenCheckResult = await JupiterService.checkTokenAvailability(data.fromToken.mint);
                        if (!tokenCheckResult.success) {
                                const errorMsg = `Token not supported for swap`;
                                toast.error(errorMsg, { id: mainToastId });
                                throw new PaySZNError("UserError", errorMsg);
                        }

                        // Get the price of the user's token in USDC
                        toast.loading("Fetching token price...", { id: mainToastId });
                        const userTokenPriceUSDC = await JupiterService.getTokenPriceInUSDC(data.fromToken.mint);
                        if (!userTokenPriceUSDC) {
                                toast.error("Unable to fetch token price", { id: mainToastId });
                                throw new PaySZNError("APIError", "Unable to fetch token price");
                        }

                        // Calculate required amount of user tokens
                        const requiredUserTokenAmount = TokenService.calculateRequiredTokenAmount(
                                this.paymentAmount,
                                userTokenPriceUSDC
                        );

                        // Validate merchant's ATA
                        if (!this.merchantEmbeddedATA) {
                                toast.error("Merchant payment account not initialized");
                                throw new PaySZNError("SystemError", "Merchant USDC account not initialized");
                        }

                        // Get swap quote
                        toast.loading("Getting swap quote...", { id: mainToastId });
                        const quoteResult = await JupiterService.getSwapQuote(
                                data.fromToken.mint,
                                toLamports(requiredUserTokenAmount, tokenCheckResult.data?.decimals || 9),
                                this.slippage
                        );

                        if (!quoteResult.success) {
                                const errorMsg = `Failed to get swap quote`;
                                toast.error(errorMsg, { id: mainToastId });
                                throw new PaySZNError("APIError", errorMsg);
                        }

                        // Execute the swap
                        toast.loading("Preparing transaction...", { id: mainToastId });
                        const swapInstruction = await JupiterService.getSwapInstruction(
                                quoteResult.data as JupiterQuoteResponse,
                                data.walletAddress,
                                this.merchantEmbeddedATA
                        );
                        logger.log("Swap instruction prepared");

                        // Sign the transaction
                        toast.loading("Waiting for wallet confirmation...", { id: mainToastId });
                        let transactionSignature: string;
                        try {
                                transactionSignature = await TransactionService.signAndSendTransaction(
                                        swapInstruction.swapTransaction,
                                        data.wallet as unknown as TransactionSigner
                                );
                        } catch (error) {
								console.warn(error)
                                toast.error("Transaction rejected or failed to sign", { id: mainToastId });
                                throw new PaySZNError("UserError", "Transaction rejected or failed to sign");
                        }

                        logger.log("Transaction submitted");

                        // Confirm transaction
                        toast.loading("Confirming transaction...", { id: mainToastId });

                        // Send to backend for processing
                        const processPaymentResponse = await this.processPayment(
                                transactionSignature,
                                this.merchantWallet
                        );

                        // Success toast
                        toast.success("Payment successfully completed!", { id: mainToastId });

                        // Check if callbackUrl exists and redirect the user
                        if (processPaymentResponse?.callbackUrl) {
                                toast.success("Redirecting to merchant site...");
                                this.handleCloseModal();
                                setTimeout(() => {
                                        window.location.href = processPaymentResponse.callbackUrl;
                                }, 1000);
                        }

                        return transactionSignature;
                } catch (error) {
                        const errorMessage =
                                error instanceof PaySZNError
                                        ? error.message
                                        : "Payment failed. Please try again.";
                        logger.error("Payment submission failed");
                        toast.error(errorMessage, { id: mainToastId });
                        throw error instanceof PaySZNError
                                ? error
                                : new PaySZNError("SystemError", errorMessage);
                }
        }
}

export default PaySZN;
