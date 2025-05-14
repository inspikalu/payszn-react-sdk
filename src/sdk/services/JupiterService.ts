import axios from "axios";
import {
  TokenCheckResult,
  SwapQuoteResult,
  JupiterQuoteResponse,
  SwapExecutionResponse,
  SwapOptions,
} from "../types";
import {
  JUPITER_API_BASE_URL,
  USDC_MINT_ADDRESS,
  DEFAULT_SWAP_OPTIONS,
} from "./constants";

/**
 * Service for Jupiter swap-related operations
 */
class JupiterService {
  /**
   * Checks if a token is available on Jupiter
   * @param mintAddress - Token mint address
   * @returns Result indicating success or failure with relevant data
   */
  public async checkTokenAvailability(
    mintAddress: string,
  ): Promise<TokenCheckResult> {
    try {
      const response = await axios.get(
        `${JUPITER_API_BASE_URL}/tokens/v1/token/${mintAddress}`,
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }

      return {
        success: false,
        error: `Unexpected response: ${response.status}`,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: `Failed to fetch token data: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Gets a token's price in USDC
   * @param mintAddress - Token mint address
   * @returns Token price in USDC or 0 if unavailable
   */
  public async getTokenPriceInUSDC(mintAddress: string): Promise<number> {
    const url = `${JUPITER_API_BASE_URL}/price/v2?ids=${mintAddress}`;

    try {
      const response = await axios.get(url);
      const priceData = response.data?.data?.[mintAddress]?.price;

      if (!priceData) {
        console.warn("Invalid response format or missing price data.");
        return 0;
      }

      return parseFloat(priceData);
    } catch (error: unknown) {
      console.error(
        "Error fetching token price:",
        error instanceof Error ? error.message : String(error),
      );
      return 0;
    }
  }

  /**
   * Gets a swap quote from Jupiter
   * @param inputMint - Input token mint address
   * @param amount - Amount to swap in lamports
   * @param slippageBps - Slippage tolerance in basis points
   * @returns Swap quote result
   */
  public async getSwapQuote(
    inputMint: string,
    amount: number,
    slippageBps: number,
  ): Promise<SwapQuoteResult> {
    try {
      const queryParams = new URLSearchParams({
        inputMint,
        outputMint: USDC_MINT_ADDRESS,
        amount: amount.toString(),
        slippageBps: slippageBps.toString(),
      });

      const response = await axios.get(
        `${JUPITER_API_BASE_URL}/swap/v1/quote?${queryParams.toString()}`,
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
      console.log("Swap Quote Respose: ", response);

      return {
        success: false,
        error: `Unexpected response: ${response.status}`,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: `Failed to fetch swap quote: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * Executes a token swap through Jupiter
   * @param quoteResponse - Swap quote response
   * @param walletPublicKey - User's wallet public key
   * @param destinationTokenAccount - Destination token account for the swap
   * @param options - Optional swap parameters
   * @returns Swap execution result
   */
  public async getSwapInstruction(
    quoteResponse: JupiterQuoteResponse,
    walletPublicKey: string,
    destinationTokenAccount: string,
    options?: Partial<SwapOptions>,
  ): Promise<SwapExecutionResponse> {
    // Validate inputs
    if (!quoteResponse) {
      throw new Error("Quote response is required");
    }

    if (!walletPublicKey) {
      throw new Error("Wallet public key is required");
    }

    console.log(destinationTokenAccount);

    // Merge user options with defaults
    const mergedOptions = { ...DEFAULT_SWAP_OPTIONS, ...options };

    // Prepare request body
    const requestBody: Record<string, unknown> = {
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
      const response = await axios.post(
        `${JUPITER_API_BASE_URL}/swap/v1/swap`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Swap Execution Response: ", response);
      return response.data as SwapExecutionResponse;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Swap failed with status ${error.response.status}: ${
            error.response.data
              ? JSON.stringify(error.response.data)
              : "Unknown error"
          }`,
        );
      }

      throw error;
    }
  }
}
const Jupiter_Service = new JupiterService();
export default Jupiter_Service;
