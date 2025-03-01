var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { JUPITER_API_BASE_URL, USDC_MINT_ADDRESS, DEFAULT_SWAP_OPTIONS } from "./constants";
/**
 * Service for Jupiter swap-related operations
 */
class JupiterService {
    /**
     * Checks if a token is available on Jupiter
     * @param mintAddress - Token mint address
     * @returns Result indicating success or failure with relevant data
     */
    checkTokenAvailability(mintAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(`${JUPITER_API_BASE_URL}/tokens/v1/token/${mintAddress}`);
                if (response.status >= 200 && response.status < 300) {
                    return { success: true, data: response.data };
                }
                return {
                    success: false,
                    error: `Unexpected response: ${response.status}`,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: `Failed to fetch token data: ${error instanceof Error ? error.message : String(error)}`,
                };
            }
        });
    }
    /**
     * Gets a token's price in USDC
     * @param mintAddress - Token mint address
     * @returns Token price in USDC or 0 if unavailable
     */
    getTokenPriceInUSDC(mintAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const url = `${JUPITER_API_BASE_URL}/price/v2?ids=${mintAddress}`;
            try {
                const response = yield axios.get(url);
                const priceData = (_c = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b[mintAddress]) === null || _c === void 0 ? void 0 : _c.price;
                if (!priceData) {
                    console.warn("Invalid response format or missing price data.");
                    return 0;
                }
                return parseFloat(priceData);
            }
            catch (error) {
                console.error("Error fetching token price:", error instanceof Error ? error.message : String(error));
                return 0;
            }
        });
    }
    /**
     * Gets a swap quote from Jupiter
     * @param inputMint - Input token mint address
     * @param amount - Amount to swap in lamports
     * @param slippageBps - Slippage tolerance in basis points
     * @returns Swap quote result
     */
    getSwapQuote(inputMint, amount, slippageBps) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = new URLSearchParams({
                    inputMint,
                    outputMint: USDC_MINT_ADDRESS,
                    amount: amount.toString(),
                    slippageBps: slippageBps.toString(),
                });
                const response = yield axios.get(`${JUPITER_API_BASE_URL}/swap/v1/quote?${queryParams.toString()}`);
                if (response.status >= 200 && response.status < 300) {
                    return { success: true, data: response.data };
                }
                return {
                    success: false,
                    error: `Unexpected response: ${response.status}`,
                };
            }
            catch (error) {
                return {
                    success: false,
                    error: `Failed to fetch swap quote: ${error instanceof Error ? error.message : String(error)}`,
                };
            }
        });
    }
    /**
     * Executes a token swap through Jupiter
     * @param quoteResponse - Swap quote response
     * @param walletPublicKey - User's wallet public key
     * @param destinationTokenAccount - Destination token account for the swap
     * @param options - Optional swap parameters
     * @returns Swap execution result
     */
    getSwapInstruction(quoteResponse, walletPublicKey, destinationTokenAccount, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate inputs
            if (!quoteResponse) {
                throw new Error("Quote response is required");
            }
            if (!walletPublicKey) {
                throw new Error("Wallet public key is required");
            }
            console.log(destinationTokenAccount);
            // Merge user options with defaults
            const mergedOptions = Object.assign(Object.assign({}, DEFAULT_SWAP_OPTIONS), options);
            // Prepare request body
            const requestBody = {
                quoteResponse,
                userPublicKey: walletPublicKey,
                dynamicComputeUnitLimit: mergedOptions.dynamicComputeUnitLimit,
                dynamicSlippage: mergedOptions.dynamicSlippage,
                prioritizationFeeLamports: mergedOptions.prioritizationFee,
                destinationTokenAccount,
            };
            // Add prioritization fee if provided
            if (mergedOptions.prioritizationFee) {
                requestBody.prioritizationFeeLamports = mergedOptions.prioritizationFee;
            }
            try {
                const response = yield axios.post(`${JUPITER_API_BASE_URL}/swap/v1/swap`, requestBody, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return response.data;
            }
            catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    throw new Error(`Swap failed with status ${error.response.status}: ${error.response.data
                        ? JSON.stringify(error.response.data)
                        : "Unknown error"}`);
                }
                throw error;
            }
        });
    }
}
const Jupiter_Service = new JupiterService();
export default Jupiter_Service;
