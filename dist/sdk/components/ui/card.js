"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitle = exports.CardHeader = exports.CardFooter = exports.CardDescription = exports.CardContent = exports.Card = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("@/sdk/utils/utils");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var Card = exports.Card = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("rounded-xl border bg-card text-card-foreground shadow", className)
  }, props));
});
Card.displayName = "Card";
var CardHeader = exports.CardHeader = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("flex flex-col space-y-1.5 p-6", className)
  }, props));
});
CardHeader.displayName = "CardHeader";
var CardTitle = exports.CardTitle = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("font-semibold leading-none tracking-tight", className)
  }, props));
});
CardTitle.displayName = "CardTitle";
var CardDescription = exports.CardDescription = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("text-sm text-muted-foreground", className)
  }, props));
});
CardDescription.displayName = "CardDescription";
var CardContent = exports.CardContent = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("p-6 pt-0", className)
  }, props));
});
CardContent.displayName = "CardContent";
var CardFooter = exports.CardFooter = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("flex items-center p-6 pt-0", className)
  }, props));
});
CardFooter.displayName = "CardFooter";