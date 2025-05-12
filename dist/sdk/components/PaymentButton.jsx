"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentButton = void 0;
const react_1 = __importDefault(require("react"));
const PaySZNContext_1 = require("./PaySZNContext");
const PaymentButton = () => {
    const { paySZN } = (0, PaySZNContext_1.usePaySZN)();
    if (!paySZN)
        return <div>Loading...</div>;
    return paySZN.renderPaymentButton();
};
exports.PaymentButton = PaymentButton;
