"use strict";

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
exports.Button = void 0;
var React = __importStar(require("react"));
var react_slot_1 = require("@radix-ui/react-slot");
require("./button.css");
// Helper function to combine classNames
var combineClassNames = function combineClassNames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(' ');
};
var Button = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    _a$variant = _a.variant,
    variant = _a$variant === void 0 ? 'default' : _a$variant,
    _a$size = _a.size,
    size = _a$size === void 0 ? 'default' : _a$size,
    _a$asChild = _a.asChild,
    asChild = _a$asChild === void 0 ? false : _a$asChild,
    props = __rest(_a, ["className", "variant", "size", "asChild"]);
  var Comp = asChild ? react_slot_1.Slot : "button";
  // Generate class names based on variants and size
  var variantClass = "btn-".concat(variant);
  var sizeClass = size === 'default' ? 'btn-default-size' : "btn-".concat(size);
  return React.createElement(Comp, Object.assign({
    className: combineClassNames('btn', variantClass, sizeClass, className),
    ref: ref
  }, props));
});
exports.Button = Button;
Button.displayName = "Button";