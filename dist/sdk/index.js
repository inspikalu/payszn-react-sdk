"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PaySZNProvider: true,
  usePaySZN: true,
  PaymentButton: true,
  PaymentModalWrapper: true
};
Object.defineProperty(exports, "PaySZNProvider", {
  enumerable: true,
  get: function get() {
    return _PaySZNContext.PaySZNProvider;
  }
});
Object.defineProperty(exports, "PaymentButton", {
  enumerable: true,
  get: function get() {
    return _PaymentButton.PaymentButton;
  }
});
Object.defineProperty(exports, "PaymentModalWrapper", {
  enumerable: true,
  get: function get() {
    return _PaymentModalWrapper.PaymentModalWrapper;
  }
});
exports["default"] = void 0;
Object.defineProperty(exports, "usePaySZN", {
  enumerable: true,
  get: function get() {
    return _PaySZNContext.usePaySZN;
  }
});
var _PaySZN = _interopRequireDefault(require("./PaySZN"));
var _PaySZNContext = require("./components/PaySZNContext");
var _PaymentButton = require("./components/PaymentButton");
Object.keys(_PaymentButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PaymentButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PaymentButton[key];
    }
  });
});
var _PaymentModalWrapper = require("./components/PaymentModalWrapper");
var _JupiterService = require("./services/JupiterService");
Object.keys(_JupiterService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _JupiterService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _JupiterService[key];
    }
  });
});
var _TokenService = require("./services/TokenService");
Object.keys(_TokenService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TokenService[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TokenService[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = _PaySZN["default"];