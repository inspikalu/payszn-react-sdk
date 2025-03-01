import { TokenCheckResult, SwapQuoteResult, JupiterQuoteResponse, SwapExecutionResponse, SwapOptions } from "@/sdk/types";
/**
 * Service for Jupiter swap-related operations
 */
declare class JupiterService {
    /**
     * Checks if a token is available on Jupiter
     * @param mintAddress - Token mint address
     * @returns Result indicating success or failure with relevant data
     */
    checkTokenAvailability(mintAddress: string): Promise<TokenCheckResult>;
    /**
     * Gets a token's price in USDC
     * @param mintAddress - Token mint address
     * @returns Token price in USDC or 0 if unavailable
     */
    getTokenPriceInUSDC(mintAddress: string): Promise<number>;
    /**
     * Gets a swap quote from Jupiter
     * @param inputMint - Input token mint address
     * @param amount - Amount to swap in lamports
     * @param slippageBps - Slippage tolerance in basis points
     * @returns Swap quote result
     */
    getSwapQuote(inputMint: string, amount: number, slippageBps: number): Promise<SwapQuoteResult>;
    /**
     * Executes a token swap through Jupiter
     * @param quoteResponse - Swap quote response
     * @param walletPublicKey - User's wallet public key
     * @param destinationTokenAccount - Destination token account for the swap
     * @param options - Optional swap parameters
     * @returns Swap execution result
     */
    getSwapInstruction(quoteResponse: JupiterQuoteResponse, walletPublicKey: string, destinationTokenAccount: string, options?: Partial<SwapOptions>): Promise<SwapExecutionResponse>;
}
declare const Jupiter_Service: JupiterService;
export default Jupiter_Service;
