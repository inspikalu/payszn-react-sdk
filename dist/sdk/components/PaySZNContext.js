"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = void 0 && (void 0).__importStar || function () {
  var _ownKeys = function ownKeys(o) {
    _ownKeys = Object.getOwnPropertyNames || function (o) {
      var ar = [];
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
      return ar;
    };
    return _ownKeys(o);
  };
  return function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k = _ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    __setModuleDefault(result, mod);
    return result;
  };
}();
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaySZNProvider = exports.usePaySZN = void 0;
// PaySZNContext.tsx
var react_1 = __importStar(require("react"));
var PaySZN_1 = __importDefault(require("../PaySZN"));
var WalletProviderWrapper_1 = require("./WalletProviderWrapper");
var PaySZNContext = (0, react_1.createContext)({
  paySZN: null,
  showModal: false,
  setShowModal: function setShowModal() {},
  paymentIntent: null
});
var usePaySZN = function usePaySZN() {
  return (0, react_1.useContext)(PaySZNContext);
};
exports.usePaySZN = usePaySZN;
var PaySZNProvider = function PaySZNProvider(_ref) {
  var apiKey = _ref.apiKey,
    children = _ref.children,
    _ref$initialAmount = _ref.initialAmount,
    initialAmount = _ref$initialAmount === void 0 ? 0.01 : _ref$initialAmount;
  var _ref2 = (0, react_1.useState)(false),
    _ref3 = _slicedToArray(_ref2, 2),
    showModal = _ref3[0],
    setShowModal = _ref3[1];
  var _ref4 = (0, react_1.useState)(null),
    _ref5 = _slicedToArray(_ref4, 2),
    paymentIntent = _ref5[0],
    setPaymentIntent = _ref5[1];
  var _ref6 = (0, react_1.useState)(null),
    _ref7 = _slicedToArray(_ref6, 2),
    paySZN = _ref7[0],
    setPaySZN = _ref7[1];
  (0, react_1.useEffect)(function () {
    // Create the SDK instance once
    var sdk = new PaySZN_1["default"]({
      apiKey: apiKey,
      setShowModal: setShowModal,
      setPaymentIntent: setPaymentIntent
    });
    sdk.createPaymentIntent(initialAmount)["catch"](function (err) {
      return console.error("Error creating payment intent:", err);
    });
    setPaySZN(sdk);
  }, [apiKey, initialAmount]);
  return react_1["default"].createElement(PaySZNContext.Provider, {
    value: {
      paySZN: paySZN,
      showModal: showModal,
      setShowModal: setShowModal,
      paymentIntent: paymentIntent
    }
  }, react_1["default"].createElement(WalletProviderWrapper_1.WalletProviderWrapper, null, children));
};
exports.PaySZNProvider = PaySZNProvider;