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
var SDKStyleProvider = function SDKStyleProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "payszn-sdk-root",
    children: children
  });
};
exports["default"] = SDKStyleProvider;