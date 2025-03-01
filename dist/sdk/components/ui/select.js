"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectValue = exports.SelectTrigger = exports.SelectSeparator = exports.SelectScrollUpButton = exports.SelectScrollDownButton = exports.SelectLabel = exports.SelectItem = exports.SelectGroup = exports.SelectContent = exports.Select = void 0;
var React = _interopRequireWildcard(require("react"));
var SelectPrimitive = _interopRequireWildcard(require("@radix-ui/react-select"));
var _lucideReact = require("lucide-react");
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
var Select = exports.Select = SelectPrimitive.Root;
var SelectGroup = exports.SelectGroup = SelectPrimitive.Group;
var SelectValue = exports.SelectValue = SelectPrimitive.Value;
var SelectTrigger = exports.SelectTrigger = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Trigger, _objectSpread(_objectSpread({
    ref: ref,
    className: (0, _utils.cn)("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)
  }, props), {}, {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Icon, {
      asChild: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronDown, {
        className: "h-4 w-4 opacity-50"
      })
    })]
  }));
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = exports.SelectScrollUpButton = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ScrollUpButton, _objectSpread(_objectSpread({
    ref: ref,
    className: (0, _utils.cn)("flex cursor-default items-center justify-center py-1", className)
  }, props), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronUp, {
      className: "h-4 w-4"
    })
  }));
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = exports.SelectScrollDownButton = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ScrollDownButton, _objectSpread(_objectSpread({
    ref: ref,
    className: (0, _utils.cn)("flex cursor-default items-center justify-center py-1", className)
  }, props), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.ChevronDown, {
      className: "h-4 w-4"
    })
  }));
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = exports.SelectContent = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    _a$position = _a.position,
    position = _a$position === void 0 ? "popper" : _a$position,
    props = __rest(_a, ["className", "children", "position"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Portal, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Content, _objectSpread(_objectSpread({
      ref: ref,
      className: (0, _utils.cn)("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
      position: position
    }, props), {}, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SelectScrollUpButton, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Viewport, {
        className: (0, _utils.cn)("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
        children: children
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectScrollDownButton, {})]
    }))
  });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = exports.SelectLabel = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Label, _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("px-2 py-1.5 text-sm font-semibold", className)
  }, props));
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = exports.SelectItem = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Item, _objectSpread(_objectSpread({
    ref: ref,
    className: (0, _utils.cn)("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
  }, props), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ItemIndicator, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_lucideReact.Check, {
          className: "h-4 w-4"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ItemText, {
      children: children
    })]
  }));
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = exports.SelectSeparator = /*#__PURE__*/React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Separator, _objectSpread({
    ref: ref,
    className: (0, _utils.cn)("-mx-1 my-1 h-px bg-muted", className)
  }, props));
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;