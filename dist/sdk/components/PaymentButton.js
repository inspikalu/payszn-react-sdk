"use strict";

var _jsxRuntime = require("react/jsx-runtime");
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentButton = void 0;
var react_1 = __importDefault(require("react"));
var PaySZNContext_1 = require("./PaySZNContext");
var PaymentButton = function PaymentButton() {
  var _ref = (0, PaySZNContext_1.usePaySZN)(),
    paySZN = _ref.paySZN;
  if (!paySZN) return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: "Loading..."
  });
  return paySZN.renderPaymentButton();
};
exports.PaymentButton = PaymentButton;