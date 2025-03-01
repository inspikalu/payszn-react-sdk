"use strict";
"use client";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletProviderWrapper = void 0;
var _react = _interopRequireWildcard(require("react"));
var _walletAdapterReact = require("@solana/wallet-adapter-react");
var _walletAdapterBase = require("@solana/wallet-adapter-base");
var _walletAdapterWallets = require("@solana/wallet-adapter-wallets");
var _walletAdapterReactUi = require("@solana/wallet-adapter-react-ui");
var _web = require("@solana/web3.js");
require("@solana/wallet-adapter-react-ui/styles.css");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Default styles that can be overridden by your app

var WalletProviderWrapper = exports.WalletProviderWrapper = function WalletProviderWrapper(_ref) {
  var children = _ref.children;
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  // const network = WalletAdapterNetwork.Devnet;
  var network = _walletAdapterBase.WalletAdapterNetwork.Mainnet;
  // You can also provide a custom RPC endpoint.
  var endpoint = (0, _react.useMemo)(function () {
    return (0, _web.clusterApiUrl)(network);
  }, [network]);
  var wallets = (0, _react.useMemo)(function () {
    return [new _walletAdapterWallets.UnsafeBurnerWalletAdapter()];
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [network]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_walletAdapterReact.ConnectionProvider, {
    endpoint: endpoint,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_walletAdapterReact.WalletProvider, {
      wallets: wallets,
      autoConnect: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_walletAdapterReactUi.WalletModalProvider, {
        children: children
      })
    })
  });
};