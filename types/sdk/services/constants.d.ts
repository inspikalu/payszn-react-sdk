/**
 * API endpoints and configuration constants
 */
export declare const JUPITER_API_BASE_URL = "https://api.jup.ag";
export declare const RPC_URL = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948";
/**
 * Token constants
 */
export declare const USDC_MINT_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
/**
 * Merchant constants
 */
/**
 * Default swap settings
 */
export declare const DEFAULT_SLIPPAGE_BPS = 50;
/**
 * Default swap options
 */
export declare const DEFAULT_SWAP_OPTIONS: {
    dynamicComputeUnitLimit: boolean;
    dynamicSlippage: boolean;
    prioritizationFee: {
        priorityLevelWithMaxLamports: {
            maxLamports: number;
            priorityLevel: string;
        };
    };
};
/**
 * Backend API endpoints
 */
export declare const API_BASE_URL = "https://payszn-backend.onrender.com";
