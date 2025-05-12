"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./payment-button.css");
const SDKPaymentButton = ({ onClick, amount, isLoading = false, disabled = false, className = "", }) => {
    return (<button onClick={onClick} disabled={disabled || isLoading} className={`sdk-payment-button ${className}`}>
      {isLoading ? (<div className="sdk-loading-container">
          <svg className="sdk-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="sdk-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="sdk-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>) : (<>{amount ? `Pay $${amount}` : "Pay Now"}</>)}
    </button>);
};
exports.default = SDKPaymentButton;
