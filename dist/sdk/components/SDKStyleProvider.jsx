"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SDKStyleProvider = ({ children }) => {
    return <div className="payszn-sdk-root">{children}</div>;
};
exports.default = SDKStyleProvider;
