"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentModalWrapper = void 0;
var PaySZNContext_1 = require("./PaySZNContext");
var PaymentModalWrapper = function PaymentModalWrapper() {
  var _ref = (0, PaySZNContext_1.usePaySZN)(),
    paySZN = _ref.paySZN,
    showModal = _ref.showModal;
  if (!paySZN || !showModal) return null;
  return paySZN.renderPaymentModal();
};
exports.PaymentModalWrapper = PaymentModalWrapper;