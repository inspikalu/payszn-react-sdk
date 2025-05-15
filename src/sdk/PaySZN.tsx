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
import { toast } from "sonner"; // Import toast from sonner
import { Connection, clusterApiUrl, PublicKey, } from "@solana/web3.js";
import { getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError } from "@solana/spl-token"

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
                this.apiKey = apiKey;
                this.setShowModal = setShowModal;
                this.setPaymentIntent = setPaymentIntent;
                this.initializeMerchantWallet(apiKey);
        }

        private async initializeMerchantWallet(apiKey: string): Promise<void> {
                try {
                        const response = await axios.get(
                                `${API_BASE_URL}/payment-gateway/wallet?api_key=${apiKey}`
                        );
                        const MERCHANT_WALLET_ADDRESS = response.data.wallet;
                        if (!MERCHANT_WALLET_ADDRESS) {
                                throw new Error("Failed to fetch merchant wallet address, check API key");
                        }
                        this.merchantWallet = MERCHANT_WALLET_ADDRESS;

                        // Get merchant's USDC ATA
                        const merchantATA = await TokenService.getUSDCATA(MERCHANT_WALLET_ADDRESS);
                        this.merchantEmbeddedATA = merchantATA;
                        console.log("Merchant USDC ATA:", merchantATA);

                        // Confirm the ATA exists on-chain
                        const connection = new Connection(clusterApiUrl("mainnet-beta"));
                        try {
                                const ataAccount = await getAccount(
                                        connection,
                                        new PublicKey(merchantATA)
                                );
                                console.log("Merchant USDC ATA confirmed on-chain:", {
                                        address: merchantATA,
                                        mint: ataAccount.mint.toBase58(),
                                        owner: ataAccount.owner.toBase58(),
                                        amount: ataAccount.amount.toString(),
                                });
                        } catch (error) {
                                if (
                                        error instanceof TokenAccountNotFoundError ||
                                        error instanceof TokenInvalidAccountOwnerError
                                ) {
                                        console.warn(
                                                "Merchant USDC ATA does not exist on-chain:",
                                                merchantATA,
                                                "The merchant must create this ATA before receiving payments."
                                        );
                                        toast.error(
                                                "Merchant USDC account not found. Please ensure the merchant has created their USDC token account."
                                        );
                                } else {
                                        console.error("Error verifying merchant USDC ATA:", error);
                                        throw new Error(`Failed to verify merchant USDC ATA: ${error instanceof Error ? error.message : String(error)}`);
                                }
                        }
                } catch (error) {
                        console.error("Failed to initialize merchant wallet:", error);
                        toast.error(
                                "Failed to initialize payment system. Please try again later."
                        );
                        throw error;
                }
        }

        /**
         * Sets the slippage tolerance for token swaps
         * @param value - Slippage percentage in basis points
         */
        public setSlippage(value: number): void {
                if (value < 0) {
                        toast.error("Slippage must be a non-negative value");
                        throw new Error("Slippage must be a non-negative value");
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
                if (amount <= 0) {
                        toast.error("Please provide an amount greater than zero");
                        throw new Error("Please provide an amount greater than zero");
                }

                this.paymentAmount = amount;
                const intent: PaymentIntent = { id: "mock-intent-id", amount };
                this.setPaymentIntent(intent);
                toast.success(`Payment intent created for ${amount}`);

                return intent;
        }

        /**
         * Renders the payment button component
         * @returns React component for the payment button
         */
        public renderPaymentButton(): React.ReactElement {
                return (
                        <SDKPaymentButton onClick={this.handlePaymentButtonClick.bind(this)} />
                );
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
                                {
                                        signature,
                                        expectedReceiver,
                                },
                                {
                                        headers: {
                                                Authorization: `Bearer ${this.apiKey}`,
                                        },
                                }
                        );

                        toast.success("Payment confirmed on the blockchain!", { id: toastId });
                        toast.dismiss(toastId);
                        return response.data;
                } catch (error) {
                        console.log("Error Processing payment: ", error);
                        toast.error("Failed to process payment. Please try again.");
                        throw error;
                }
        }

        /**
         * Handles payment submission from the modal
         * @param data - Payment submission data
         * @returns Result of the payment operation
         */
        public async handleSubmitPaymentModal(
                data: PaymentSubmissionData
        ): Promise<string> {
                if (this.paymentAmount <= 0) {
                        toast.error("Please provide an amount greater than zero");
                        throw new Error("Please provide an amount greater than zero");
                }

                // Main processing toast ID
                const mainToastId = toast.loading("Preparing payment...");

                try {
                        // Verify token is on Jupiter
                        toast.loading("Verifying token availability...", { id: mainToastId });
                        const tokenCheckResult = await JupiterService.checkTokenAvailability(
                                data.fromToken.mint
                        );

                        if (!tokenCheckResult.success) {
                                const errorMsg = `Token not available on Jupiter: ${tokenCheckResult.error}`;
                                toast.error(errorMsg, { id: mainToastId });
                                throw new Error(errorMsg);
                        }

                        // Get the price of the user's token in USDC
                        toast.loading("Fetching token price...", { id: mainToastId });
                        const userTokenPriceUSDC = await JupiterService.getTokenPriceInUSDC(
                                data.fromToken.mint
                        );

                        if (!userTokenPriceUSDC) {
                                toast.error("Unable to fetch token price", { id: mainToastId });
                                throw new Error("Unable to fetch user token price");
                        }

                        // Calculate required amount of user tokens
                        const requiredUserTokenAmount = TokenService.calculateRequiredTokenAmount(
                                this.paymentAmount,
                                userTokenPriceUSDC
                        );

                        const userUsdcATA = await TokenService.getUSDCATA(data.walletAddress);
                        console.log("User's USDC ATA:", userUsdcATA);

                        // Log merchant's USDC ATA
                        console.log("Merchant's USDC ATA:", this.merchantEmbeddedATA);

                        // Validate merchant's ATA
                        if (!this.merchantEmbeddedATA) {
                                const errorMsg = "Merchant USDC ATA not initialized";
                                toast.error(errorMsg, { id: mainToastId });
                                throw new Error(errorMsg);
                        }

                        // Get swap quote
                        toast.loading("Getting swap quote...", { id: mainToastId });
                        const quoteResult = await JupiterService.getSwapQuote(
                                data.fromToken.mint,
                                toLamports(
                                        requiredUserTokenAmount,
                                        tokenCheckResult.data?.decimals || 9
                                ),
                                this.slippage
                        );

                        if (!quoteResult.success) {
                                const errorMsg = `Failed to get swap quote: ${quoteResult.error}`;
                                toast.error(errorMsg, { id: mainToastId });
                                throw new Error(errorMsg);
                        }

                        // Execute the swap
                        toast.loading("Preparing transaction...", { id: mainToastId });
                        const swapInstruction = await JupiterService.getSwapInstruction(
                                quoteResult.data as JupiterQuoteResponse,
                                data.walletAddress,
                                this.merchantEmbeddedATA
                        );
                        console.log("Swap instruction: ", swapInstruction);

                        // Sign the transaction
                        toast.loading("Waiting for wallet confirmation...", { id: mainToastId });
                        const transactionSignature =
                                await TransactionService.signAndSendTransaction(
                                        swapInstruction.swapTransaction,
                                        data.wallet as unknown as TransactionSigner
                                );

                        console.log("Transaction Signature: ", transactionSignature);

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
                        if (processPaymentResponse && processPaymentResponse.callbackUrl) {
                                toast.success("Redirecting to merchant site...");

                                // Close the modal first
                                this.handleCloseModal();

                                // Small delay to allow toast to be seen
                                setTimeout(() => {
                                        // Redirect to the callback URL
                                        window.location.href = processPaymentResponse.callbackUrl;
                                }, 1000);
                        }

                        return transactionSignature;
                } catch (error) {
                        console.log("The main error is: ", error)
                        const errorMessage =
                                error instanceof Error ? error.message : String(error);
                        console.error("Payment submission failed:", errorMessage);

                        // Show error toast
                        toast.error(`Payment failed: ${errorMessage}`, { id: mainToastId });

                        throw error;
                }
        }
}

export default PaySZN;
