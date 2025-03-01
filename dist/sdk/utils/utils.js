"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cn = cn;
function cn() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }
  return classes.filter(Boolean).join(' ');
}