"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    className: "w-full rounded-lg h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed ".concat(className),
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex items-center justify-center",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        className: "animate-spin -ml-1 mr-2 h-5 w-5 text-white",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })]
      }), "Processing..."]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: amount ? "Pay $".concat(amount) : "Pay Now"
    })
  });
};
var _default = exports["default"] = SDKPaymentButton;