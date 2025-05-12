"use strict";
"use client";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectScrollDownButton = exports.SelectScrollUpButton = exports.SelectSeparator = exports.SelectItem = exports.SelectLabel = exports.SelectContent = exports.SelectTrigger = exports.SelectValue = exports.SelectGroup = exports.Select = void 0;
var React = __importStar(require("react"));
var SelectPrimitive = __importStar(require("@radix-ui/react-select"));
var lucide_react_1 = require("lucide-react");
require("./select.css");
// Simple utility to combine class names
var combineClasses = function combineClasses() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(" ");
};
var Select = SelectPrimitive.Root;
exports.Select = Select;
var SelectGroup = SelectPrimitive.Group;
exports.SelectGroup = SelectGroup;
var SelectValue = SelectPrimitive.Value;
exports.SelectValue = SelectValue;
var SelectTrigger = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Trigger, _objectSpread(_objectSpread({
    ref: ref,
    className: combineClasses("select-trigger", className)
  }, props), {}, {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Icon, {
      asChild: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(lucide_react_1.ChevronDown, {
        className: "select-icon"
      })
    })]
  }));
});
exports.SelectTrigger = SelectTrigger;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ScrollUpButton, _objectSpread(_objectSpread({
    ref: ref,
    className: combineClasses("select-scroll-button", className)
  }, props), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(lucide_react_1.ChevronUp, {
      className: "select-scroll-button-icon"
    })
  }));
});
exports.SelectScrollUpButton = SelectScrollUpButton;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ScrollDownButton, _objectSpread(_objectSpread({
    ref: ref,
    className: combineClasses("select-scroll-button", className)
  }, props), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(lucide_react_1.ChevronDown, {
      className: "select-scroll-button-icon"
    })
  }));
});
exports.SelectScrollDownButton = SelectScrollDownButton;
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    _a$position = _a.position,
    position = _a$position === void 0 ? "popper" : _a$position,
    props = __rest(_a, ["className", "children", "position"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Portal, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Content, _objectSpread(_objectSpread({
      ref: ref,
      className: combineClasses("select-content", className),
      position: position
    }, props), {}, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SelectScrollUpButton, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Viewport, {
        className: combineClasses("select-viewport", position === "popper" ? "select-viewport-popper" : ""),
        children: children
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectScrollDownButton, {})]
    }))
  });
});
exports.SelectContent = SelectContent;
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Label, _objectSpread({
    ref: ref,
    className: combineClasses("select-label", className)
  }, props));
});
exports.SelectLabel = SelectLabel;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SelectPrimitive.Item, _objectSpread(_objectSpread({
    ref: ref,
    className: combineClasses("select-item", className)
  }, props), {}, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "select-item-indicator-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ItemIndicator, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(lucide_react_1.Check, {
          className: "select-item-indicator-icon"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.ItemText, {
      children: children
    })]
  }));
});
exports.SelectItem = SelectItem;
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SelectPrimitive.Separator, _objectSpread({
    ref: ref,
    className: combineClasses("select-separator", className)
  }, props));
});
exports.SelectSeparator = SelectSeparator;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;