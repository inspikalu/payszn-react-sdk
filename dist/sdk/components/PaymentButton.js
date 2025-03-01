"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _PaySZNContext = require("./PaySZNContext");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PaymentButton = exports.PaymentButton = function PaymentButton() {
  var _usePaySZN = (0, _PaySZNContext.usePaySZN)(),
    paySZN = _usePaySZN.paySZN;
  if (!paySZN) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: "Loading..."
  });
  return paySZN.renderPaymentButton();
};