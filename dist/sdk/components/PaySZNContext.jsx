"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaySZNProvider = exports.usePaySZN = void 0;
// PaySZNContext.tsx
const react_1 = __importStar(require("react"));
const PaySZN_1 = __importDefault(require("../PaySZN"));
const WalletProviderWrapper_1 = require("./WalletProviderWrapper");
const PaySZNContext = (0, react_1.createContext)({
    paySZN: null,
    showModal: false,
    setShowModal: () => { },
    paymentIntent: null,
});
const usePaySZN = () => (0, react_1.useContext)(PaySZNContext);
exports.usePaySZN = usePaySZN;
const PaySZNProvider = ({ apiKey, children, initialAmount = 0.01, }) => {
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [paymentIntent, setPaymentIntent] = (0, react_1.useState)(null);
    const [paySZN, setPaySZN] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Create the SDK instance once
        const sdk = new PaySZN_1.default({
            apiKey,
            setShowModal,
            setPaymentIntent,
        });
        sdk
            .createPaymentIntent(initialAmount)
            .catch((err) => console.error("Error creating payment intent:", err));
        setPaySZN(sdk);
    }, [apiKey, initialAmount]);
    return (<PaySZNContext.Provider value={{ paySZN, showModal, setShowModal, paymentIntent }}>
      <WalletProviderWrapper_1.WalletProviderWrapper>{children}</WalletProviderWrapper_1.WalletProviderWrapper>
    </PaySZNContext.Provider>);
};
exports.PaySZNProvider = PaySZNProvider;
