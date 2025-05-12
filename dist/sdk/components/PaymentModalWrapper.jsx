"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModalWrapper = void 0;
const PaySZNContext_1 = require("./PaySZNContext");
const PaymentModalWrapper = () => {
    const { paySZN, showModal } = (0, PaySZNContext_1.usePaySZN)();
    if (!paySZN || !showModal)
        return null;
    return paySZN.renderPaymentModal();
};
exports.PaymentModalWrapper = PaymentModalWrapper;
