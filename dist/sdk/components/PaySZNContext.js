"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaySZN = exports.PaySZNProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PaySZN = _interopRequireDefault(require("../PaySZN"));
var _WalletProviderWrapper = require("./WalletProviderWrapper");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // PaySZNContext.tsx
var PaySZNContext = /*#__PURE__*/(0, _react.createContext)({
  paySZN: null,
  showModal: false,
  setShowModal: function setShowModal() {},
  paymentIntent: null
});
var usePaySZN = exports.usePaySZN = function usePaySZN() {
  return (0, _react.useContext)(PaySZNContext);
};
var PaySZNProvider = exports.PaySZNProvider = function PaySZNProvider(_ref) {
  var apiKey = _ref.apiKey,
    children = _ref.children,
    _ref$initialAmount = _ref.initialAmount,
    initialAmount = _ref$initialAmount === void 0 ? 0.01 : _ref$initialAmount;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    paymentIntent = _useState4[0],
    setPaymentIntent = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    paySZN = _useState6[0],
    setPaySZN = _useState6[1];
  (0, _react.useEffect)(function () {
    // Create the SDK instance once
    var sdk = new _PaySZN["default"]({
      apiKey: apiKey,
      setShowModal: setShowModal,
      setPaymentIntent: setPaymentIntent
    });
    sdk.createPaymentIntent(initialAmount)["catch"](function (err) {
      return console.error("Error creating payment intent:", err);
    });
    setPaySZN(sdk);
  }, [apiKey, initialAmount]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PaySZNContext.Provider, {
    value: {
      paySZN: paySZN,
      showModal: showModal,
      setShowModal: setShowModal,
      paymentIntent: paymentIntent
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WalletProviderWrapper.WalletProviderWrapper, {
      children: children
    })
  });
};