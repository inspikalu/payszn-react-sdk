"use strict";
"use client";

var _jsxRuntime = require("react/jsx-runtime");
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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletProviderWrapper = void 0;
var react_1 = __importStar(require("react"));
var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
var wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
var wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
var wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
var web3_js_1 = require("@solana/web3.js");
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");
var WalletProviderWrapper = function WalletProviderWrapper(_ref) {
  var children = _ref.children;
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  // const network = WalletAdapterNetwork.Devnet;
  var network = wallet_adapter_base_1.WalletAdapterNetwork.Mainnet;
  // You can also provide a custom RPC endpoint.
  var endpoint = (0, react_1.useMemo)(function () {
    return (0, web3_js_1.clusterApiUrl)(network);
  }, [network]);
  var wallets = (0, react_1.useMemo)(function () {
    return [new wallet_adapter_wallets_1.UnsafeBurnerWalletAdapter()];
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [network]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(wallet_adapter_react_1.ConnectionProvider, {
    endpoint: endpoint,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(wallet_adapter_react_1.WalletProvider, {
      wallets: wallets,
      autoConnect: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(wallet_adapter_react_ui_1.WalletModalProvider, {
        children: children
      })
    })
  });
};
exports.WalletProviderWrapper = WalletProviderWrapper;