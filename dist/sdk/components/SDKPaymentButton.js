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
var react_1 = __importDefault(require("react"));
require("./payment-button.css");
var SDKPaymentButton = function SDKPaymentButton(_ref) {
  var onClick = _ref.onClick,
    amount = _ref.amount,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    onClick: onClick,
    disabled: disabled || isLoading,
    className: "sdk-payment-button ".concat(className),
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "sdk-loading-container",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        className: "sdk-spinner",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          className: "sdk-opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          className: "sdk-opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })]
      }), "Processing..."]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: amount ? "Pay $".concat(amount) : "Pay Now"
    })
  });
};
exports["default"] = SDKPaymentButton;