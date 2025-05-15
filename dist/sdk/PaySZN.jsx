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
const sonner_1 = require("sonner");
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
// Custom error class for categorized error handling
class PaySZNError extends Error {
    constructor(type, message) {
        super(message);
        this.type = type;
        this.name = "PaySZNError";
    }
}
const logger = {
    log: (...args) => {
        if (process.env.NODE_ENV === "development") {
            console.log(...args);
        }
    },
    warn: (...args) => {
        if (process.env.NODE_ENV === "development") {
            console.warn(...args);
        }
    },
    error: (...args) => {
        if (process.env.NODE_ENV === "development") {
            console.error(...args);
        }
    },
};
/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
class PaySZN {
    constructor({ apiKey, setShowModal, setPaymentIntent }) {
        this.paymentAmount = 0;
        this.slippage = constants_1.DEFAULT_SLIPPAGE_BPS;
        this.merchantEmbeddedATA = "";
        this.merchantWallet = "";
        // Validate apiKey format (basic check, adjust as needed)
        if (!apiKey || typeof apiKey !== "string" || apiKey.length < 10) {
            throw new PaySZNError("UserError", "Invalid API key provided");
        }
        this.apiKey = apiKey;
        this.setShowModal = setShowModal;
        this.setPaymentIntent = setPaymentIntent;
        this.initializeMerchantWallet(apiKey);
    }
    initializeMerchantWallet(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Retry configuration for API calls
            const maxRetries = 3;
            const retryDelay = 1000;
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const response = yield axios_1.default.get(`${constants_1.API_BASE_URL}/payment-gateway/wallet?api_key=${apiKey}`, { timeout: 5000 } // 5-second timeout
                    );
                    const MERCHANT_WALLET_ADDRESS = (_a = response.data) === null || _a === void 0 ? void 0 : _a.wallet;
                    if (!MERCHANT_WALLET_ADDRESS) {
                        throw new PaySZNError("APIError", "Merchant wallet address not provided by API");
                    }
                    // Validate wallet address
                    try {
                        new web3_js_1.PublicKey(MERCHANT_WALLET_ADDRESS);
                        logger.log("Merchant wallet initialized successfully");
                    }
                    catch (error) {
                        console.warn(error);
                        throw new PaySZNError("APIError", "Invalid merchant wallet address returned by API");
                    }
                    this.merchantWallet = MERCHANT_WALLET_ADDRESS;
                    // Get merchant's USDC ATA
                    const merchantATA = yield TokenService_1.default.getUSDCATA(MERCHANT_WALLET_ADDRESS);
                    this.merchantEmbeddedATA = merchantATA;
                    logger.log("Merchant USDC ATA computed");
                    // Confirm the ATA exists on-chain
                    const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
                    try {
                        yield (0, spl_token_1.getAccount)(connection, new web3_js_1.PublicKey(merchantATA));
                        logger.log("Merchant USDC ATA verified on-chain");
                    }
                    catch (error) {
                        if (error instanceof spl_token_1.TokenAccountNotFoundError || error instanceof spl_token_1.TokenInvalidAccountOwnerError) {
                            logger.warn("Merchant USDC ATA does not exist on-chain");
                            sonner_1.toast.error("Merchant USDC account not found. Please create a USDC token account in your wallet.");
                            throw new PaySZNError("UserError", "Merchant USDC account not initialized. Please create it in your wallet.");
                        }
                        throw new PaySZNError("SystemError", "Failed to verify merchant USDC account");
                    }
                    return; // Success, exit retry loop
                }
                catch (error) {
                    if (attempt === maxRetries) {
                        const message = error instanceof PaySZNError
                            ? error.message
                            : "Failed to initialize merchant wallet. Please try again later.";
                        logger.error("Merchant wallet initialization failed after retries");
                        sonner_1.toast.error(message);
                        throw new PaySZNError(error instanceof PaySZNError ? error.type : "NetworkError", message);
                    }
                    yield new Promise((resolve) => setTimeout(resolve, retryDelay));
                }
            }
        });
    }
    /**
     * Sets the slippage tolerance for token swaps
     * @param value - Slippage percentage in basis points
     */
    setSlippage(value) {
        if (value < 0 || !Number.isFinite(value)) {
            sonner_1.toast.error("Slippage must be a non-negative number");
            throw new PaySZNError("UserError", "Slippage must be a non-negative number");
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
            if (amount <= 0 || !Number.isFinite(amount)) {
                sonner_1.toast.error("Please provide an amount greater than zero");
                throw new PaySZNError("UserError", "Payment amount must be greater than zero");
            }
            this.paymentAmount = amount;
            const intent = { id: "mock-intent-id", amount };
            this.setPaymentIntent(intent);
            sonner_1.toast.success(`Payment intent created for ${amount} USDC`);
            return intent;
        });
    }
    /**
     * Renders the payment button component
     * @returns React component for the payment button
     */
    renderPaymentButton() {
        return <SDKPaymentButton_1.default onClick={this.handlePaymentButtonClick.bind(this)}/>;
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
                const response = yield axios_1.default.post(`${constants_1.API_BASE_URL}/payment-gateway/process`, { signature, expectedReceiver }, {
                    headers: { Authorization: `Bearer ${this.apiKey}` },
                    timeout: 10000, // 10-second timeout
                });
                sonner_1.toast.success("Payment confirmed on the blockchain!", { id: toastId });
                return response.data;
            }
            catch (error) {
                logger.error("Payment processing failed");
                const message = "Failed to process payment. Please try again.";
                sonner_1.toast.error(message);
                throw new PaySZNError(axios_1.default.isAxiosError(error) ? "NetworkError" : "APIError", message);
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
                throw new PaySZNError("UserError", "Payment amount must be greater than zero");
            }
            const mainToastId = sonner_1.toast.loading("Preparing payment...");
            try {
                // Validate wallet address and token mint
                try {
                    new web3_js_1.PublicKey(data.walletAddress);
                    new web3_js_1.PublicKey(data.fromToken.mint);
                }
                catch (error) {
                    console.warn(error);
                    sonner_1.toast.error("Invalid wallet address or token mint");
                    throw new PaySZNError("UserError", "Invalid wallet address or token mint");
                }
                // Verify token is on Jupiter
                sonner_1.toast.loading("Verifying token availability...", { id: mainToastId });
                const tokenCheckResult = yield JupiterService_1.default.checkTokenAvailability(data.fromToken.mint);
                if (!tokenCheckResult.success) {
                    const errorMsg = `Token not supported for swap`;
                    sonner_1.toast.error(errorMsg, { id: mainToastId });
                    throw new PaySZNError("UserError", errorMsg);
                }
                // Get the price of the user's token in USDC
                sonner_1.toast.loading("Fetching token price...", { id: mainToastId });
                const userTokenPriceUSDC = yield JupiterService_1.default.getTokenPriceInUSDC(data.fromToken.mint);
                if (!userTokenPriceUSDC) {
                    sonner_1.toast.error("Unable to fetch token price", { id: mainToastId });
                    throw new PaySZNError("APIError", "Unable to fetch token price");
                }
                // Calculate required amount of user tokens
                const requiredUserTokenAmount = TokenService_1.default.calculateRequiredTokenAmount(this.paymentAmount, userTokenPriceUSDC);
                // Validate merchant's ATA
                if (!this.merchantEmbeddedATA) {
                    sonner_1.toast.error("Merchant payment account not initialized");
                    throw new PaySZNError("SystemError", "Merchant USDC account not initialized");
                }
                // Get swap quote
                sonner_1.toast.loading("Getting swap quote...", { id: mainToastId });
                const quoteResult = yield JupiterService_1.default.getSwapQuote(data.fromToken.mint, (0, conversion_1.toLamports)(requiredUserTokenAmount, ((_a = tokenCheckResult.data) === null || _a === void 0 ? void 0 : _a.decimals) || 9), this.slippage);
                if (!quoteResult.success) {
                    const errorMsg = `Failed to get swap quote`;
                    sonner_1.toast.error(errorMsg, { id: mainToastId });
                    throw new PaySZNError("APIError", errorMsg);
                }
                // Execute the swap
                sonner_1.toast.loading("Preparing transaction...", { id: mainToastId });
                const swapInstruction = yield JupiterService_1.default.getSwapInstruction(quoteResult.data, data.walletAddress, this.merchantEmbeddedATA);
                logger.log("Swap instruction prepared");
                // Sign the transaction
                sonner_1.toast.loading("Waiting for wallet confirmation...", { id: mainToastId });
                let transactionSignature;
                try {
                    transactionSignature = yield TransactionService_1.default.signAndSendTransaction(swapInstruction.swapTransaction, data.wallet);
                }
                catch (error) {
                    console.warn(error);
                    sonner_1.toast.error("Transaction rejected or failed to sign", { id: mainToastId });
                    throw new PaySZNError("UserError", "Transaction rejected or failed to sign");
                }
                logger.log("Transaction submitted");
                // Confirm transaction
                sonner_1.toast.loading("Confirming transaction...", { id: mainToastId });
                // Send to backend for processing
                const processPaymentResponse = yield this.processPayment(transactionSignature, this.merchantWallet);
                // Success toast
                sonner_1.toast.success("Payment successfully completed!", { id: mainToastId });
                // Check if callbackUrl exists and redirect the user
                if (processPaymentResponse === null || processPaymentResponse === void 0 ? void 0 : processPaymentResponse.callbackUrl) {
                    sonner_1.toast.success("Redirecting to merchant site...");
                    this.handleCloseModal();
                    setTimeout(() => {
                        window.location.href = processPaymentResponse.callbackUrl;
                    }, 1000);
                }
                return transactionSignature;
            }
            catch (error) {
                const errorMessage = error instanceof PaySZNError
                    ? error.message
                    : "Payment failed. Please try again.";
                logger.error("Payment submission failed");
                sonner_1.toast.error(errorMessage, { id: mainToastId });
                throw error instanceof PaySZNError
                    ? error
                    : new PaySZNError("SystemError", errorMessage);
            }
        });
    }
}
exports.default = PaySZN;
