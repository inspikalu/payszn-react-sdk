"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cn = cn;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }
  return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}