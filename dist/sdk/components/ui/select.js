"use strict";
"use client";

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
  return React.createElement(SelectPrimitive.Trigger, Object.assign({
    ref: ref,
    className: combineClasses("select-trigger", className)
  }, props), children, React.createElement(SelectPrimitive.Icon, {
    asChild: true
  }, React.createElement(lucide_react_1.ChevronDown, {
    className: "select-icon"
  })));
});
exports.SelectTrigger = SelectTrigger;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement(SelectPrimitive.ScrollUpButton, Object.assign({
    ref: ref,
    className: combineClasses("select-scroll-button", className)
  }, props), React.createElement(lucide_react_1.ChevronUp, {
    className: "select-scroll-button-icon"
  }));
});
exports.SelectScrollUpButton = SelectScrollUpButton;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement(SelectPrimitive.ScrollDownButton, Object.assign({
    ref: ref,
    className: combineClasses("select-scroll-button", className)
  }, props), React.createElement(lucide_react_1.ChevronDown, {
    className: "select-scroll-button-icon"
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
  return React.createElement(SelectPrimitive.Portal, null, React.createElement(SelectPrimitive.Content, Object.assign({
    ref: ref,
    className: combineClasses("select-content", className),
    position: position
  }, props), React.createElement(SelectScrollUpButton, null), React.createElement(SelectPrimitive.Viewport, {
    className: combineClasses("select-viewport", position === "popper" ? "select-viewport-popper" : "")
  }, children), React.createElement(SelectScrollDownButton, null)));
});
exports.SelectContent = SelectContent;
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement(SelectPrimitive.Label, Object.assign({
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
  return React.createElement(SelectPrimitive.Item, Object.assign({
    ref: ref,
    className: combineClasses("select-item", className)
  }, props), React.createElement("span", {
    className: "select-item-indicator-container"
  }, React.createElement(SelectPrimitive.ItemIndicator, null, React.createElement(lucide_react_1.Check, {
    className: "select-item-indicator-icon"
  }))), React.createElement(SelectPrimitive.ItemText, null, children));
});
exports.SelectItem = SelectItem;
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement(SelectPrimitive.Separator, Object.assign({
    ref: ref,
    className: combineClasses("select-separator", className)
  }, props));
});
exports.SelectSeparator = SelectSeparator;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;