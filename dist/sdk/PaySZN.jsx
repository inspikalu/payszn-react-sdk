var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import SDKPaymentButton from "@/sdk/components/SDKPaymentButton";
import PaymentModal from "@/sdk/components/PaymentModal";
import TokenService from "./services/TokenService";
import JupiterService from "./services/JupiterService";
import TransactionService from "./services/TransactionService";
import { API_BASE_URL, DEFAULT_SLIPPAGE_BPS } from "./services/constants";
import { toLamports } from "./utils/conversion";
import axios from "axios";
import { toast } from "sonner"; // Import toast from sonner
/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
class PaySZN {
    constructor({ apiKey, setShowModal, setPaymentIntent }) {
        this.paymentAmount = 0;
        this.slippage = DEFAULT_SLIPPAGE_BPS;
        this.merchantEmbeddedATA = "";
        this.merchantWallet = "";
        this.apiKey = apiKey;
        this.setShowModal = setShowModal;
        this.setPaymentIntent = setPaymentIntent;
        this.initializeMerchantWallet(apiKey);
    }
    initializeMerchantWallet(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${API_BASE_URL}/payment-gateway/wallet?api_key=${apiKey}`);
                const MERCHANT_WALLET_ADDRESS = response.data.wallet;
                if (!MERCHANT_WALLET_ADDRESS) {
                    throw new Error("Failed to fetch merchant wallet address check api key");
                }
                this.merchantWallet = MERCHANT_WALLET_ADDRESS;
                this.merchantEmbeddedATA = yield TokenService.getUSDCATA(MERCHANT_WALLET_ADDRESS);
            }
            catch (error) {
                console.error("Failed to initialize merchant wallet:", error);
                toast.error("Failed to initialize payment system. Please try again later.");
            }
        });
    }
    /**
     * Sets the slippage tolerance for token swaps
     * @param value - Slippage percentage in basis points
     */
    setSlippage(value) {
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
    createPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount <= 0) {
                toast.error("Please provide an amount greater than zero");
                throw new Error("Please provide an amount greater than zero");
            }
            this.paymentAmount = amount;
            const intent = { id: "mock-intent-id", amount };
            this.setPaymentIntent(intent);
            toast.success(`Payment intent created for ${amount}`);
            return intent;
        });
    }
    /**
     * Renders the payment button component
     * @returns React component for the payment button
     */
    renderPaymentButton() {
        return <SDKPaymentButton onClick={this.handlePaymentButtonClick.bind(this)}/>;
    }
    /**
     * Renders the payment modal component
     * @returns React component for the payment modal
     */
    renderPaymentModal() {
        return (<PaymentModal onSubmit={this.handleSubmitPaymentModal.bind(this)} amount={this.paymentAmount} onClose={this.handleCloseModal.bind(this)}/>);
    }
    /**
     * Handles the payment button click event
     */
    handlePaymentButtonClick() {
        this.setShowModal(true);
    }
    /**
     * Handles closing the payment modal
     */
    handleCloseModal() {
        this.setShowModal(false);
    }
    processPayment(signature, expectedReceiver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const toastId = toast.loading("Processing payment on the blockchain...");
                const response = yield axios.post(`${API_BASE_URL}/payment-gateway/process`, {
                    signature,
                    expectedReceiver,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                });
                toast.success("Payment confirmed on the blockchain!", { id: toastId });
                toast.dismiss(toastId);
                return response.data;
            }
            catch (error) {
                console.log("Error Processing payment: ", error);
                toast.error("Failed to process payment. Please try again.");
                throw error;
            }
        });
    }
    /**
     * Handles payment submission from the modal
     * @param data - Payment submission data
     * @returns Result of the payment operation
     */
    handleSubmitPaymentModal(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.paymentAmount <= 0) {
                toast.error("Please provide an amount greater than zero");
                throw new Error("Please provide an amount greater than zero");
            }
            // Main processing toast ID
            const mainToastId = toast.loading("Preparing payment...");
            try {
                // Verify token is on Jupiter
                toast.loading("Verifying token availability...", { id: mainToastId });
                const tokenCheckResult = yield JupiterService.checkTokenAvailability(data.fromToken.mint);
                if (!tokenCheckResult.success) {
                    const errorMsg = `Token not available on Jupiter: ${tokenCheckResult.error}`;
                    toast.error(errorMsg, { id: mainToastId });
                    throw new Error(errorMsg);
                }
                // Get the price of the user's token in USDC
                toast.loading("Fetching token price...", { id: mainToastId });
                const userTokenPriceUSDC = yield JupiterService.getTokenPriceInUSDC(data.fromToken.mint);
                if (!userTokenPriceUSDC) {
                    toast.error("Unable to fetch token price", { id: mainToastId });
                    throw new Error("Unable to fetch user token price");
                }
                // Calculate required amount of user tokens
                const requiredUserTokenAmount = TokenService.calculateRequiredTokenAmount(this.paymentAmount, userTokenPriceUSDC);
                // Get swap quote
                toast.loading("Getting swap quote...", { id: mainToastId });
                const quoteResult = yield JupiterService.getSwapQuote(data.fromToken.mint, toLamports(requiredUserTokenAmount, ((_a = tokenCheckResult.data) === null || _a === void 0 ? void 0 : _a.decimals) || 9), this.slippage);
                if (!quoteResult.success) {
                    const errorMsg = `Failed to get swap quote: ${quoteResult.error}`;
                    toast.error(errorMsg, { id: mainToastId });
                    throw new Error(errorMsg);
                }
                // Execute the swap
                toast.loading("Preparing transaction...", { id: mainToastId });
                const swapInstruction = yield JupiterService.getSwapInstruction(quoteResult.data, data.walletAddress, this.merchantEmbeddedATA);
                // Sign the transaction
                toast.loading("Waiting for wallet confirmation...", { id: mainToastId });
                const transactionSignature = yield TransactionService.signAndSendTransaction(swapInstruction.swapTransaction, data.wallet);
                // Confirm transaction
                toast.loading("Confirming transaction...", { id: mainToastId });
                // Send to backend for processing
                const processPaymentResponse = yield this.processPayment(transactionSignature, this.merchantWallet);
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
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error("Payment submission failed:", errorMessage);
                // Show error toast
                toast.error(`Payment failed: ${errorMessage}`, { id: mainToastId });
                throw error;
            }
        });
    }
}
export default PaySZN;
