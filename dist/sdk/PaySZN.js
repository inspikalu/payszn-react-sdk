"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _jsxRuntime = require("react/jsx-runtime");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var react_1 = __importDefault(require("react"));
var SDKPaymentButton_1 = __importDefault(require("./components/SDKPaymentButton"));
var PaymentModal_1 = __importDefault(require("./components/PaymentModal"));
var TokenService_1 = __importDefault(require("./services/TokenService"));
var JupiterService_1 = __importDefault(require("./services/JupiterService"));
var TransactionService_1 = __importDefault(require("./services/TransactionService"));
var constants_1 = require("./services/constants");
var conversion_1 = require("./utils/conversion");
var axios_1 = __importDefault(require("axios"));
var sonner_1 = require("sonner");
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
// Custom error class for categorized error handling
var PaySZNError = /*#__PURE__*/function (_Error) {
  function PaySZNError(type, message) {
    var _this;
    _classCallCheck(this, PaySZNError);
    _this = _callSuper(this, PaySZNError, [message]);
    _this.type = type;
    _this.name = "PaySZNError";
    return _this;
  }
  _inherits(PaySZNError, _Error);
  return _createClass(PaySZNError);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var logger = {
  log: function log() {
    if (process.env.NODE_ENV === "development") {
      var _console;
      (_console = console).log.apply(_console, arguments);
    }
  },
  warn: function warn() {
    if (process.env.NODE_ENV === "development") {
      var _console2;
      (_console2 = console).warn.apply(_console2, arguments);
    }
  },
  error: function error() {
    if (process.env.NODE_ENV === "development") {
      var _console3;
      (_console3 = console).error.apply(_console3, arguments);
    }
  }
};
/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
var PaySZN = /*#__PURE__*/function () {
  function PaySZN(_ref) {
    var apiKey = _ref.apiKey,
      setShowModal = _ref.setShowModal,
      setPaymentIntent = _ref.setPaymentIntent;
    _classCallCheck(this, PaySZN);
    this.paymentAmount = 0;
    this.slippage = constants_1.DEFAULT_SLIPPAGE_BPS;
    this.merchantEmbeddedATA = "";
    this.merchantWallet = "";
    // Validate apiKey format (basic check, adjust as needed)
    if (!apiKey || typeof apiKey !== "string" || apiKey.length < 10) {
      throw new PaySZNError("UserError", "Invalid API key provided");
    }
    this.apiKey = apiKey;
    this.setShowModal = setShowModal;
    this.setPaymentIntent = setPaymentIntent;
    this.initializeMerchantWallet(apiKey);
  }
  return _createClass(PaySZN, [{
    key: "initializeMerchantWallet",
    value: function initializeMerchantWallet(apiKey) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _a, maxRetries, retryDelay, attempt, response, MERCHANT_WALLET_ADDRESS, merchantATA, connection, message;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // Retry configuration for API calls
              maxRetries = 3;
              retryDelay = 1000;
              attempt = 1;
            case 3:
              if (!(attempt <= maxRetries)) {
                _context.next = 55;
                break;
              }
              _context.prev = 4;
              _context.next = 7;
              return axios_1["default"].get("".concat(constants_1.API_BASE_URL, "/payment-gateway/wallet?api_key=").concat(apiKey), {
                timeout: 5000
              } // 5-second timeout
              );
            case 7:
              response = _context.sent;
              MERCHANT_WALLET_ADDRESS = (_a = response.data) === null || _a === void 0 ? void 0 : _a.wallet;
              if (MERCHANT_WALLET_ADDRESS) {
                _context.next = 11;
                break;
              }
              throw new PaySZNError("APIError", "Merchant wallet address not provided by API");
            case 11:
              _context.prev = 11;
              new web3_js_1.PublicKey(MERCHANT_WALLET_ADDRESS);
              logger.log("Merchant wallet initialized successfully");
              _context.next = 20;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](11);
              console.warn(_context.t0);
              throw new PaySZNError("APIError", "Invalid merchant wallet address returned by API");
            case 20:
              this.merchantWallet = MERCHANT_WALLET_ADDRESS;
              // Get merchant's USDC ATA
              _context.next = 23;
              return TokenService_1["default"].getUSDCATA(MERCHANT_WALLET_ADDRESS);
            case 23:
              merchantATA = _context.sent;
              this.merchantEmbeddedATA = merchantATA;
              logger.log("Merchant USDC ATA computed");
              // Confirm the ATA exists on-chain
              connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
              _context.prev = 27;
              _context.next = 30;
              return (0, spl_token_1.getAccount)(connection, new web3_js_1.PublicKey(merchantATA));
            case 30:
              logger.log("Merchant USDC ATA verified on-chain");
              _context.next = 40;
              break;
            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](27);
              if (!(_context.t1 instanceof spl_token_1.TokenAccountNotFoundError || _context.t1 instanceof spl_token_1.TokenInvalidAccountOwnerError)) {
                _context.next = 39;
                break;
              }
              logger.warn("Merchant USDC ATA does not exist on-chain");
              sonner_1.toast.error("Merchant USDC account not found. Please create a USDC token account in your wallet.");
              throw new PaySZNError("UserError", "Merchant USDC account not initialized. Please create it in your wallet.");
            case 39:
              throw new PaySZNError("SystemError", "Failed to verify merchant USDC account");
            case 40:
              return _context.abrupt("return");
            case 43:
              _context.prev = 43;
              _context.t2 = _context["catch"](4);
              if (!(attempt === maxRetries)) {
                _context.next = 50;
                break;
              }
              message = _context.t2 instanceof PaySZNError ? _context.t2.message : "Failed to initialize merchant wallet. Please try again later.";
              logger.error("Merchant wallet initialization failed after retries");
              sonner_1.toast.error(message);
              throw new PaySZNError(_context.t2 instanceof PaySZNError ? _context.t2.type : "NetworkError", message);
            case 50:
              _context.next = 52;
              return new Promise(function (resolve) {
                return setTimeout(resolve, retryDelay);
              });
            case 52:
              attempt++;
              _context.next = 3;
              break;
            case 55:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[4, 43], [11, 16], [27, 33]]);
      }));
    }
    /**
     * Sets the slippage tolerance for token swaps
     * @param value - Slippage percentage in basis points
     */
  }, {
    key: "setSlippage",
    value: function setSlippage(value) {
      if (value < 0 || !Number.isFinite(value)) {
        sonner_1.toast.error("Slippage must be a non-negative number");
        throw new PaySZNError("UserError", "Slippage must be a non-negative number");
      }
      this.slippage = value;
      sonner_1.toast.success("Slippage set to ".concat(value, " basis points"));
    }
    /**
     * Creates a payment intent with the specified amount
     * @param amount - Payment amount in USDC
     * @returns The created payment intent
     */
  }, {
    key: "createPaymentIntent",
    value: function createPaymentIntent(amount) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var intent;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(amount <= 0 || !Number.isFinite(amount))) {
                _context2.next = 3;
                break;
              }
              sonner_1.toast.error("Please provide an amount greater than zero");
              throw new PaySZNError("UserError", "Payment amount must be greater than zero");
            case 3:
              this.paymentAmount = amount;
              intent = {
                id: "mock-intent-id",
                amount: amount
              };
              this.setPaymentIntent(intent);
              sonner_1.toast.success("Payment intent created for ".concat(amount, " USDC"));
              return _context2.abrupt("return", intent);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
    }
    /**
     * Renders the payment button component
     * @returns React component for the payment button
     */
  }, {
    key: "renderPaymentButton",
    value: function renderPaymentButton() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(SDKPaymentButton_1["default"], {
        onClick: this.handlePaymentButtonClick.bind(this)
      });
    }
    /**
     * Renders the payment modal component
     * @returns React component for the payment modal
     */
  }, {
    key: "renderPaymentModal",
    value: function renderPaymentModal() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(PaymentModal_1["default"], {
        onSubmit: this.handleSubmitPaymentModal.bind(this),
        amount: this.paymentAmount,
        onClose: this.handleCloseModal.bind(this)
      });
    }
    /**
     * Handles the payment button click event
     */
  }, {
    key: "handlePaymentButtonClick",
    value: function handlePaymentButtonClick() {
      this.setShowModal(true);
    }
    /**
     * Handles closing the payment modal
     */
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setShowModal(false);
    }
  }, {
    key: "processPayment",
    value: function processPayment(signature, expectedReceiver) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var toastId, response, message;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              toastId = sonner_1.toast.loading("Processing payment on the blockchain...");
              _context3.next = 4;
              return axios_1["default"].post("".concat(constants_1.API_BASE_URL, "/payment-gateway/process"), {
                signature: signature,
                expectedReceiver: expectedReceiver
              }, {
                headers: {
                  Authorization: "Bearer ".concat(this.apiKey)
                },
                timeout: 10000 // 10-second timeout
              });
            case 4:
              response = _context3.sent;
              sonner_1.toast.success("Payment confirmed on the blockchain!", {
                id: toastId
              });
              return _context3.abrupt("return", response.data);
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              logger.error("Payment processing failed");
              message = "Failed to process payment. Please try again.";
              sonner_1.toast.error(message);
              throw new PaySZNError(axios_1["default"].isAxiosError(_context3.t0) ? "NetworkError" : "APIError", message);
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 9]]);
      }));
    }
    /**
     * Handles payment submission from the modal
     * @param data - Payment submission data
     * @returns Result of the payment operation
     */
  }, {
    key: "handleSubmitPaymentModal",
    value: function handleSubmitPaymentModal(data) {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _a, mainToastId, tokenCheckResult, errorMsg, userTokenPriceUSDC, requiredUserTokenAmount, quoteResult, _errorMsg, swapInstruction, transactionSignature, processPaymentResponse, errorMessage;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(this.paymentAmount <= 0)) {
                _context4.next = 3;
                break;
              }
              sonner_1.toast.error("Please provide an amount greater than zero");
              throw new PaySZNError("UserError", "Payment amount must be greater than zero");
            case 3:
              mainToastId = sonner_1.toast.loading("Preparing payment...");
              _context4.prev = 4;
              _context4.prev = 5;
              new web3_js_1.PublicKey(data.walletAddress);
              new web3_js_1.PublicKey(data.fromToken.mint);
              _context4.next = 15;
              break;
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](5);
              console.warn(_context4.t0);
              sonner_1.toast.error("Invalid wallet address or token mint");
              throw new PaySZNError("UserError", "Invalid wallet address or token mint");
            case 15:
              // Verify token is on Jupiter
              sonner_1.toast.loading("Verifying token availability...", {
                id: mainToastId
              });
              _context4.next = 18;
              return JupiterService_1["default"].checkTokenAvailability(data.fromToken.mint);
            case 18:
              tokenCheckResult = _context4.sent;
              if (tokenCheckResult.success) {
                _context4.next = 23;
                break;
              }
              errorMsg = "Token not supported for swap";
              sonner_1.toast.error(errorMsg, {
                id: mainToastId
              });
              throw new PaySZNError("UserError", errorMsg);
            case 23:
              // Get the price of the user's token in USDC
              sonner_1.toast.loading("Fetching token price...", {
                id: mainToastId
              });
              _context4.next = 26;
              return JupiterService_1["default"].getTokenPriceInUSDC(data.fromToken.mint);
            case 26:
              userTokenPriceUSDC = _context4.sent;
              if (userTokenPriceUSDC) {
                _context4.next = 30;
                break;
              }
              sonner_1.toast.error("Unable to fetch token price", {
                id: mainToastId
              });
              throw new PaySZNError("APIError", "Unable to fetch token price");
            case 30:
              // Calculate required amount of user tokens
              requiredUserTokenAmount = TokenService_1["default"].calculateRequiredTokenAmount(this.paymentAmount, userTokenPriceUSDC); // Validate merchant's ATA
              if (this.merchantEmbeddedATA) {
                _context4.next = 34;
                break;
              }
              sonner_1.toast.error("Merchant payment account not initialized");
              throw new PaySZNError("SystemError", "Merchant USDC account not initialized");
            case 34:
              // Get swap quote
              sonner_1.toast.loading("Getting swap quote...", {
                id: mainToastId
              });
              _context4.next = 37;
              return JupiterService_1["default"].getSwapQuote(data.fromToken.mint, (0, conversion_1.toLamports)(requiredUserTokenAmount, ((_a = tokenCheckResult.data) === null || _a === void 0 ? void 0 : _a.decimals) || 9), this.slippage);
            case 37:
              quoteResult = _context4.sent;
              if (quoteResult.success) {
                _context4.next = 42;
                break;
              }
              _errorMsg = "Failed to get swap quote";
              sonner_1.toast.error(_errorMsg, {
                id: mainToastId
              });
              throw new PaySZNError("APIError", _errorMsg);
            case 42:
              // Execute the swap
              sonner_1.toast.loading("Preparing transaction...", {
                id: mainToastId
              });
              _context4.next = 45;
              return JupiterService_1["default"].getSwapInstruction(quoteResult.data, data.walletAddress, this.merchantEmbeddedATA);
            case 45:
              swapInstruction = _context4.sent;
              logger.log("Swap instruction prepared");
              // Sign the transaction
              sonner_1.toast.loading("Waiting for wallet confirmation...", {
                id: mainToastId
              });
              _context4.prev = 48;
              _context4.next = 51;
              return TransactionService_1["default"].signAndSendTransaction(swapInstruction.swapTransaction, data.wallet);
            case 51:
              transactionSignature = _context4.sent;
              _context4.next = 59;
              break;
            case 54:
              _context4.prev = 54;
              _context4.t1 = _context4["catch"](48);
              console.warn(_context4.t1);
              sonner_1.toast.error("Transaction rejected or failed to sign", {
                id: mainToastId
              });
              throw new PaySZNError("UserError", "Transaction rejected or failed to sign");
            case 59:
              logger.log("Transaction submitted");
              // Confirm transaction
              sonner_1.toast.loading("Confirming transaction...", {
                id: mainToastId
              });
              // Send to backend for processing
              _context4.next = 63;
              return this.processPayment(transactionSignature, this.merchantWallet);
            case 63:
              processPaymentResponse = _context4.sent;
              // Success toast
              sonner_1.toast.success("Payment successfully completed!", {
                id: mainToastId
              });
              // Check if callbackUrl exists and redirect the user
              if (processPaymentResponse === null || processPaymentResponse === void 0 ? void 0 : processPaymentResponse.callbackUrl) {
                sonner_1.toast.success("Redirecting to merchant site...");
                this.handleCloseModal();
                setTimeout(function () {
                  window.location.href = processPaymentResponse.callbackUrl;
                }, 1000);
              }
              return _context4.abrupt("return", transactionSignature);
            case 69:
              _context4.prev = 69;
              _context4.t2 = _context4["catch"](4);
              errorMessage = _context4.t2 instanceof PaySZNError ? _context4.t2.message : "Payment failed. Please try again.";
              logger.error("Payment submission failed");
              sonner_1.toast.error(errorMessage, {
                id: mainToastId
              });
              throw _context4.t2 instanceof PaySZNError ? _context4.t2 : new PaySZNError("SystemError", errorMessage);
            case 75:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[4, 69], [5, 10], [48, 54]]);
      }));
    }
  }]);
}();
exports["default"] = PaySZN;