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
const lucide_react_1 = require("lucide-react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const sonner_1 = require("sonner");
const getFungibleTokens_1 = require("../utils/getFungibleTokens");
const JupiterService_1 = __importDefault(require("../services/JupiterService"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
require("./payment-modal.css");
const PaymentModal = ({ onSubmit, amount, onClose }) => {
    var _a, _b;
    const [selectedTokenId, setSelectedTokenId] = (0, react_2.useState)();
    const [walletTokens, setWalletTokens] = (0, react_2.useState)([]);
    const [isLoading, setIsLoading] = (0, react_2.useState)(false);
    const [isSubmitting, setIsSubmitting] = (0, react_2.useState)(false);
    const [estimatedTokenAmount, setEstimatedTokenAmount] = (0, react_2.useState)(null);
    const [isCalculating, setIsCalculating] = (0, react_2.useState)(false);
    const [isOpen, setIsOpen] = (0, react_2.useState)(false);
    const dropdownRef = (0, react_2.useRef)(null);
    const wallet = (0, wallet_adapter_react_1.useWallet)();
    // Fetch wallet tokens when connected
    (0, react_2.useEffect)(() => {
        if (wallet.connected && wallet.publicKey) {
            const fetchWalletTokens = () => __awaiter(void 0, void 0, void 0, function* () {
                setIsLoading(true);
                try {
                    const tokens = yield (0, getFungibleTokens_1.getFungibleTokensForWalletV2)(wallet.publicKey.toString());
                    setWalletTokens(tokens);
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
    // Calculate estimated token amount
    (0, react_2.useEffect)(() => {
        const calculateRequiredAmount = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!selectedTokenId || !amount) {
                setEstimatedTokenAmount(null);
                return;
            }
            setIsCalculating(true);
            try {
                const tokenPrice = yield JupiterService_1.default.getTokenPriceInUSDC(selectedTokenId);
                const requiredAmount = TokenService_1.default.calculateRequiredTokenAmount(amount, tokenPrice);
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
    // Close dropdown when clicking outside
    (0, react_2.useEffect)(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const getSelectedToken = () => {
        return walletTokens.find((token) => token.mint === selectedTokenId);
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        const fromToken = getSelectedToken();
        if (!fromToken || !wallet.publicKey) {
            sonner_1.toast.error("Please select a token and connect wallet");
            return;
        }
        setIsSubmitting(true);
        const toastId = sonner_1.toast.loading("Processing your payment...");
        try {
            onSubmit({
                fromToken,
                wallet,
                walletAddress: wallet.publicKey.toString(),
                amount,
            });
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
    const handleSelectToken = (mint) => {
        setSelectedTokenId(mint);
        setIsOpen(false);
    };
    return (<div className="payment-container">

      <div className="modal-card">
        <div className="gradient-bg"></div>
        <div className="purple-blob"></div>
        <div className="blue-blob"></div>

        <div className="card-header">
          <h2 className="card-title">Payszn</h2>
        </div>

        <div className="card-content">
          <h2 className="payment-heading">Pay ${amount}</h2>

          <div className="token-grid">
            <div className="select-container" ref={dropdownRef}>
              <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                {isLoading ? (<div className="loading-container">
                    <lucide_react_1.Loader2 className="loading-spinner" size={16}/>
                    <span>Loading...</span>
                  </div>) : (<>
                    <span>{((_a = getSelectedToken()) === null || _a === void 0 ? void 0 : _a.symbol) || "Select token"}</span>
                    <lucide_react_1.ChevronDown className={`chevron-icon ${isOpen ? "open" : ""}`} size={16}/>
                  </>)}
              </div>

              {isOpen && (<div className="select-dropdown">
                  {walletTokens.map((token) => (<div key={token.mint} className={`select-option ${token.mint === selectedTokenId ? "selected" : ""}`} onClick={() => handleSelectToken(token.mint)}>
                      {token.symbol}
                    </div>))}
                  {walletTokens.length === 0 && (<div className="select-option disabled">
                      No tokens found
                    </div>)}
                </div>)}
            </div>

            <div className="token-amount-display">
              {isCalculating ? (<div className="flex-space">
                  <lucide_react_1.Loader2 className="loading-spinner" size={16}/>
                  <span>Calculating...</span>
                </div>) : estimatedTokenAmount ? (<div className="flex-space">
                  <span className="token-amount-text">
                    {estimatedTokenAmount}
                  </span>
                  <span className="token-symbol-text">
                    {(_b = getSelectedToken()) === null || _b === void 0 ? void 0 : _b.symbol}
                  </span>
                </div>) : (<span className="token-symbol-text">-</span>)}
            </div>
          </div>

          <div className="info-container">
            <lucide_react_1.AlertCircle className="info-icon"/>
            <p className="info-text">
              The amount of tokens displayed are estimated and may vary slightly
              due to price fluctuations and slippage.
            </p>
          </div>

          <div className="modal-footer">
            {!wallet.connected ? (<div className="centered-wallet">
                <wallet_adapter_react_ui_1.WalletMultiButton style={{
                backgroundColor: "#9333ea",
                borderRadius: "0.5rem",
                height: "3rem",
                width: "100%",
            }}/>
              </div>) : (<button className="pay-button" onClick={handleSubmit} disabled={!selectedTokenId || isSubmitting}>
                {isSubmitting ? (<div className="flex-space">
                    <lucide_react_1.Loader2 className="loading-spinner" size={16}/>
                    Processing...
                  </div>) : ("Pay")}
              </button>)}

            <div className="footer-actions">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <p className="fee-text">
                Transaction fee: 0.5% • Network fee: ~0.00005 SOL
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <p className="footer-text">powered by jupiter and civic</p>
          <div className="logo-container">
            <div className="logo-circle">
              <img src="../assets/jupiter-logo.png" alt="Jupiter logo" className="logo-image"/>
            </div>
            <div className="logo-circle">
              <img src="../assets/civic-logo.svg" alt="Civic logo" className="logo-image"/>
            </div>
          </div>
        </div>
      </div>
      <sonner_1.Toaster position="top-right" toastOptions={{ className: "toaster-style" }}/>
    </div>);
};
exports.default = PaymentModal;
