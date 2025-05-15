"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SDKPaymentButton_1 = __importDefault(require("./components/SDKPaymentButton"));
const PaymentModal_1 = __importDefault(require("./components/PaymentModal"));
const TokenService_1 = __importDefault(require("./services/TokenService"));
const JupiterService_1 = __importDefault(require("./services/JupiterService"));
const TransactionService_1 = __importDefault(require("./services/TransactionService"));
const constants_1 = require("./services/constants");
const conversion_1 = require("./utils/conversion");
const axios_1 = __importDefault(require("axios"));
const sonner_1 = require("sonner"); // Import toast from sonner
/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
class PaySZN {
    constructor({ apiKey, setShowModal, setPaymentIntent }) {
        this.paymentAmount = 0;
        this.slippage = constants_1.DEFAULT_SLIPPAGE_BPS;
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
                const response = yield axios_1.default.get(`${constants_1.API_BASE_URL}/payment-gateway/wallet?api_key=${apiKey}`);
                const MERCHANT_WALLET_ADDRESS = response.data.wallet;
                if (!MERCHANT_WALLET_ADDRESS) {
                    throw new Error("Failed to fetch merchant wallet address check api key");
                }
                this.merchantWallet = MERCHANT_WALLET_ADDRESS;
                this.merchantEmbeddedATA = yield TokenService_1.default.getUSDCATA(MERCHANT_WALLET_ADDRESS);
            }
            catch (error) {
                console.error("Failed to initialize merchant wallet:", error);
                sonner_1.toast.error("Failed to initialize payment system. Please try again later.");
            }
        });
    }
    /**
     * Sets the slippage tolerance for token swaps
     * @param value - Slippage percentage in basis points
     */
    setSlippage(value) {
        if (value < 0) {
            sonner_1.toast.error("Slippage must be a non-negative value");
            throw new Error("Slippage must be a non-negative value");
        }
        this.slippage = value;
        sonner_1.toast.success(`Slippage set to ${value} basis points`);
    }
    /**
     * Creates a payment intent with the specified amount
     * @param amount - Payment amount in USDC
     * @returns The created payment intent
     */
    createPaymentIntent(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount <= 0) {
                sonner_1.toast.error("Please provide an amount greater than zero");
                throw new Error("Please provide an amount greater than zero");
            }
            this.paymentAmount = amount;
            const intent = { id: "mock-intent-id", amount };
            this.setPaymentIntent(intent);
            sonner_1.toast.success(`Payment intent created for ${amount}`);
            return intent;
        });
    }
    /**
     * Renders the payment button component
     * @returns React component for the payment button
     */
    renderPaymentButton() {
        return (<SDKPaymentButton_1.default onClick={this.handlePaymentButtonClick.bind(this)}/>);
    }
    /**
     * Renders the payment modal component
     * @returns React component for the payment modal
     */
    renderPaymentModal() {
        return (<PaymentModal_1.default onSubmit={this.handleSubmitPaymentModal.bind(this)} amount={this.paymentAmount} onClose={this.handleCloseModal.bind(this)}/>);
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
                const toastId = sonner_1.toast.loading("Processing payment on the blockchain...");
                const response = yield axios_1.default.post(`${constants_1.API_BASE_URL}/payment-gateway/process`, {
                    signature,
                    expectedReceiver,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                });
                sonner_1.toast.success("Payment confirmed on the blockchain!", { id: toastId });
                sonner_1.toast.dismiss(toastId);
                return response.data;
            }
            catch (error) {
                console.log("Error Processing payment: ", error);
                sonner_1.toast.error("Failed to process payment. Please try again.");
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
                sonner_1.toast.error("Please provide an amount greater than zero");
                throw new Error("Please provide an amount greater than zero");
            }
            // Main processing toast ID
            const mainToastId = sonner_1.toast.loading("Preparing payment...");
            try {
                // Verify token is on Jupiter
                sonner_1.toast.loading("Verifying token availability...", { id: mainToastId });
                const tokenCheckResult = yield JupiterService_1.default.checkTokenAvailability(data.fromToken.mint);
                if (!tokenCheckResult.success) {
                    const errorMsg = `Token not available on Jupiter: ${tokenCheckResult.error}`;
                    sonner_1.toast.error(errorMsg, { id: mainToastId });
                    throw new Error(errorMsg);
                }
                // Get the price of the user's token in USDC
                sonner_1.toast.loading("Fetching token price...", { id: mainToastId });
                const userTokenPriceUSDC = yield JupiterService_1.default.getTokenPriceInUSDC(data.fromToken.mint);
                if (!userTokenPriceUSDC) {
                    sonner_1.toast.error("Unable to fetch token price", { id: mainToastId });
                    throw new Error("Unable to fetch user token price");
                }
                // Calculate required amount of user tokens
                const requiredUserTokenAmount = TokenService_1.default.calculateRequiredTokenAmount(this.paymentAmount, userTokenPriceUSDC);
                // Get swap quote
                sonner_1.toast.loading("Getting swap quote...", { id: mainToastId });
                const quoteResult = yield JupiterService_1.default.getSwapQuote(data.fromToken.mint, (0, conversion_1.toLamports)(requiredUserTokenAmount, ((_a = tokenCheckResult.data) === null || _a === void 0 ? void 0 : _a.decimals) || 9), this.slippage);
                if (!quoteResult.success) {
                    const errorMsg = `Failed to get swap quote: ${quoteResult.error}`;
                    sonner_1.toast.error(errorMsg, { id: mainToastId });
                    throw new Error(errorMsg);
                }
                // Execute the swap
                sonner_1.toast.loading("Preparing transaction...", { id: mainToastId });
                const swapInstruction = yield JupiterService_1.default.getSwapInstruction(quoteResult.data, data.walletAddress, this.merchantEmbeddedATA);
                console.log("Swap instruction: ", swapInstruction);
                // Sign the transaction
                sonner_1.toast.loading("Waiting for wallet confirmation...", { id: mainToastId });
                const transactionSignature = yield TransactionService_1.default.signAndSendTransaction(swapInstruction.swapTransaction, data.wallet);
                console.log("Transaction Signature: ", transactionSignature);
                // Confirm transaction
                sonner_1.toast.loading("Confirming transaction...", { id: mainToastId });
                // Send to backend for processing
                const processPaymentResponse = yield this.processPayment(transactionSignature, this.merchantWallet);
                // Success toast
                sonner_1.toast.success("Payment successfully completed!", { id: mainToastId });
                // Check if callbackUrl exists and redirect the user
                if (processPaymentResponse && processPaymentResponse.callbackUrl) {
                    sonner_1.toast.success("Redirecting to merchant site...");
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
                console.log("The main error is: ", error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error("Payment submission failed:", errorMessage);
                // Show error toast
                sonner_1.toast.error(`Payment failed: ${errorMessage}`, { id: mainToastId });
                throw error;
            }
        });
    }
}
exports.default = PaySZN;
