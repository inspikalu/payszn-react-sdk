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
exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
var React = __importStar(require("react"));
var utils_1 = require("../../utils/utils");
var Card = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("rounded-xl border bg-card text-card-foreground shadow", className)
  }, props));
});
exports.Card = Card;
Card.displayName = "Card";
var CardHeader = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("flex flex-col space-y-1.5 p-6", className)
  }, props));
});
exports.CardHeader = CardHeader;
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("font-semibold leading-none tracking-tight", className)
  }, props));
});
exports.CardTitle = CardTitle;
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("text-sm text-muted-foreground", className)
  }, props));
});
exports.CardDescription = CardDescription;
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("p-6 pt-0", className)
  }, props));
});
exports.CardContent = CardContent;
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return React.createElement("div", Object.assign({
    ref: ref,
    className: (0, utils_1.cn)("flex items-center p-6 pt-0", className)
  }, props));
});
exports.CardFooter = CardFooter;
CardFooter.displayName = "CardFooter";