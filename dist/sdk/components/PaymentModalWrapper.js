"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentModalWrapper = void 0;
var _PaySZNContext = require("./PaySZNContext");
var PaymentModalWrapper = exports.PaymentModalWrapper = function PaymentModalWrapper() {
  var _usePaySZN = (0, _PaySZNContext.usePaySZN)(),
    paySZN = _usePaySZN.paySZN,
    showModal = _usePaySZN.showModal;
  if (!paySZN || !showModal) return null;
  return paySZN.renderPaymentModal();
};