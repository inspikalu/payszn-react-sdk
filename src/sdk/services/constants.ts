/**
 * API endpoints and configuration constants
 */
export const JUPITER_API_BASE_URL = "https://api.jup.ag";
export const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948";

/**
 * Token constants
 */
export const USDC_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

/**
 * Merchant constants
 */
// export const MERCHANT_WALLET_ADDRESS = "ERifvs7ja7W1um7jo588UAiswcN5BhdR3h28C951sxvx";
// CgUkyVLN5fED4RNh9xUjj6seXT7fQHpkaqxBXm4gweg9
// export const MERCHANT_WALLET_ADDRESS = "BGsTfjVb5HAu3sa8pXvAnpn2ieMr36b4dT1mCckF5ZTH";

/**
 * Default swap settings
 */
export const DEFAULT_SLIPPAGE_BPS = 50; // Default slippage percentage in basis points

/**
 * Default swap options
 */
export const DEFAULT_SWAP_OPTIONS = {
    dynamicComputeUnitLimit: true,
    dynamicSlippage: true,
    prioritizationFee: {
        priorityLevelWithMaxLamports: {
            maxLamports: 1000000,
            priorityLevel: "veryHigh",
        },
    },
};

/**
 * Backend API endpoints
 */
export const API_BASE_URL = "https://payszn-backend.onrender.com";
