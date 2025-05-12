"use strict";
"use client";
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
const react_2 = require("react");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const getFungibleTokens_1 = require("../utils/getFungibleTokens");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const lucide_react_1 = require("lucide-react");
const sonner_1 = require("sonner");
const JupiterService_1 = __importDefault(require("../services/JupiterService"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
require("./payment-modal.css");
const PaymentModal = ({ onSubmit, amount, onClose }) => {
    var _a;
    const [selectedTokenId, setSelectedTokenId] = (0, react_2.useState)();
    const [toToken] = (0, react_2.useState)("USDC");
    const [walletTokens, setWalletTokens] = (0, react_2.useState)([]);
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const [isSubmitting, setIsSubmitting] = (0, react_2.useState)(false);
    const [estimatedTokenAmount, setEstimatedTokenAmount] = (0, react_2.useState)(null);
    const [isCalculating, setIsCalculating] = (0, react_2.useState)(false);
    const wallet = (0, wallet_adapter_react_1.useWallet)();
    // Fetch wallet tokens when connected
    (0, react_2.useEffect)(() => {
        if (wallet.connected && wallet.publicKey) {
            const fetchWalletTokens = () => __awaiter(void 0, void 0, void 0, function* () {
                setIsLoading(true);
                try {
                    const tokens = yield (0, getFungibleTokens_1.getFungibleTokensForWalletV2)(wallet.publicKey.toString());
                    console.log("These are the tokens, ", tokens);
                    setWalletTokens(tokens);
                    // If there are tokens, set the first one as default
                    if (tokens.length > 0) {
                        setSelectedTokenId(tokens[0].mint);
                        sonner_1.toast.success("Wallet tokens loaded successfully");
                    }
                    else {
                        sonner_1.toast.warning("No tokens found in your wallet");
                    }
                }
                catch (error) {
                    console.error("Error fetching wallet tokens:", error);
                    sonner_1.toast.error("Failed to load wallet tokens");
                }
                finally {
                    setIsLoading(false);
                }
            });
            fetchWalletTokens();
        }
    }, [wallet.connected, wallet.publicKey]);
    // Calculate estimated token amount when token selection changes
    (0, react_2.useEffect)(() => {
        const calculateRequiredAmount = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!selectedTokenId || !amount) {
                setEstimatedTokenAmount(null);
                return;
            }
            setIsCalculating(true);
            try {
                // Use the actual JupiterService implementation
                const tokenPrice = yield JupiterService_1.default.getTokenPriceInUSDC(selectedTokenId);
                // Use TokenService for calculation
                const requiredAmount = TokenService_1.default.calculateRequiredTokenAmount(amount, tokenPrice);
                // Format to 6 decimal places for display
                setEstimatedTokenAmount(parseFloat(requiredAmount.toFixed(6)));
            }
            catch (error) {
                console.error("Error calculating token amount:", error);
                setEstimatedTokenAmount(null);
                sonner_1.toast.error("Failed to calculate token amount");
            }
            finally {
                setIsCalculating(false);
            }
        });
        calculateRequiredAmount();
    }, [selectedTokenId, amount]);
    // Find the actual token object based on selected ID (using mint)
    const getSelectedToken = () => {
        if (!selectedTokenId)
            return undefined;
        return walletTokens.find((token) => token.mint === selectedTokenId);
    };
    const handleSubmit = (wallet, walletAddress) => __awaiter(void 0, void 0, void 0, function* () {
        const fromToken = getSelectedToken();
        if (!fromToken || !amount || !toToken) {
            sonner_1.toast.error("Please select a token and enter an amount");
            return;
        }
        setIsSubmitting(true);
        // Show a loading toast that we'll update with the result
        const toastId = sonner_1.toast.loading("Processing your payment...");
        try {
            onSubmit({ fromToken, walletAddress, wallet, amount });
            sonner_1.toast.success("Payment completed successfully!", { id: toastId });
        }
        catch (error) {
            console.error("Payment submission error:", error);
            sonner_1.toast.error(`Payment failed: ${error instanceof Error ? error.message : "Unknown error"}`, { id: toastId });
        }
        finally {
            setIsSubmitting(false);
        }
    });
    // Handle change for the native select element
    const handleSelectChange = (e) => {
        setSelectedTokenId(e.target.value);
    };
    return (<section className="modal-overlay">
      <card_1.Card className="modal-card">
        {/* Gradient background effects */}
        <div className="gradient-bg"></div>
        <div className="purple-blob"></div>
        <div className="blue-blob"></div>

        <card_1.CardHeader className="card-header">
          <card_1.CardTitle className="card-title">Pay ${amount}</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="card-content">
          <div className="token-grid">
            <div className="select-container">
              {isLoading ? (<div className="loading-container">
                  <lucide_react_1.Loader2 className="loading-spinner"/>
                  <p className="loading-text">Loading tokens...</p>
                </div>) : (<select className="html-select" value={selectedTokenId} onChange={handleSelectChange}>
                  <option value="" disabled>Select token</option>
                  {walletTokens.length === 0 ? (<option value="" disabled>No tokens found</option>) : (walletTokens.map((token) => (<option key={token.mint} value={token.mint}>
                        {token.symbol}
                      </option>)))}
                </select>)}
            </div>
            <div className="token-amount-display">
              {isCalculating ? (<div className="flex-space">
                  <lucide_react_1.Loader2 className="mini-spinner"/>
                  <span className="loading-text">Calculating...</span>
                </div>) : estimatedTokenAmount ? (<div className="flex-space">
                  <span className="token-amount-text">
                    {estimatedTokenAmount}
                  </span>
                  <span className="token-symbol-text">
                    {((_a = getSelectedToken()) === null || _a === void 0 ? void 0 : _a.symbol) || "tokens"}
                  </span>
                </div>) : (<span className="token-symbol-text">Select token</span>)}
            </div>
          </div>

          {/* Additional Info Text */}
          <div className="info-container">
            <lucide_react_1.InfoIcon className="info-icon"/>
            <p className="info-text">
              The amount of tokens displayed are estimated and may vary slightly
              due to price fluctuations and slippage.
            </p>
          </div>
        </card_1.CardContent>
        <footer className="modal-footer">
          {!wallet.connected ? (<div className="centered-wallet">
              <wallet_adapter_react_ui_1.WalletMultiButton />
            </div>) : (<button_1.Button className="pay-button" disabled={!wallet.connected ||
                !selectedTokenId ||
                !amount ||
                !toToken ||
                isSubmitting} onClick={() => { var _a; return handleSubmit(wallet, ((_a = wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toString()) || ""); }}>
              {isSubmitting ? (<div className="button-content">
                  <lucide_react_1.Loader2 className="loading-spinner"/>
                  Processing...
                </div>) : ("Pay")}
            </button_1.Button>)}
          <div className="footer-actions">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <p className="fee-text">
              Transaction fee: 0.5% • Network fee: ~0.00005 SOL
            </p>
          </div>
        </footer>
      </card_1.Card>
      <sonner_1.Toaster position="top-right" toastOptions={{
            duration: 4000,
            className: "toaster-style",
        }}/>
    </section>);
};
exports.default = PaymentModal;
