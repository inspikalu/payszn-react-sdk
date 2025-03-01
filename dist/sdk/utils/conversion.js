"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLamports = toLamports;
exports.fromLamports = fromLamports;
/**
 * Converts a token amount to lamports (the smallest unit)
 * @param amount - Amount in token units
 * @param decimals - Number of decimal places for the token
 * @returns Amount in lamports
 */
function toLamports(amount, decimals) {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Invalid amount: must be a non-negative finite number.");
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Invalid decimals: must be a non-negative integer.");
  }
  return Math.round(amount * Math.pow(10, decimals));
}
/**
 * Converts lamports to token amount
 * @param lamports - Amount in lamports
 * @param decimals - Number of decimal places for the token
 * @returns Amount in token units
 */
function fromLamports(lamports, decimals) {
  if (!Number.isInteger(lamports) || lamports < 0) {
    throw new Error("Invalid lamports: must be a non-negative integer.");
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Invalid decimals: must be a non-negative integer.");
  }
  return lamports / Math.pow(10, decimals);
}