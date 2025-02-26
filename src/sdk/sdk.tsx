import React from "react";
import axios from "axios";
import PaymentButton from "@/components/PaymentButton";
import PaymentModal from "@/components/PaymentModal";
import {
  PaymentGatewayProps,
  PaymentIntent,
  TokenCheckResult,
  SwapQuoteResult,
  PaymentSubmissionData,
  SwapOptions,
  JupiterQuoteResponse,
  SwapExecutionResponse,
} from "@/sdk/types";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

// Define types for error and response objects

/**
 * PaymentGateway handles cryptocurrency payment processing with Jupiter swap integration
 */
class PaymentGateway {
  private readonly apiKey: string;
  private readonly setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  private readonly setPaymentIntent: React.Dispatch<
    React.SetStateAction<PaymentIntent | null>
  >;
  private paymentAmount = 0;
  private slippage = 15; // Default slippage percentage in basis points
  private merchantEmbeddedATA = "";

  // Constants
  private readonly USDC_MINT_ADDRESS =
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  private readonly JUPITER_API_BASE_URL = "https://api.jup.ag";
  private readonly RPC_URL =
    "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948";

  constructor({ apiKey, setShowModal, setPaymentIntent }: PaymentGatewayProps) {
    this.apiKey = apiKey;
    this.setShowModal = setShowModal;
    this.setPaymentIntent = setPaymentIntent;
    this.getMerchantEmbeddedWallet();
  }

  private async getUSDCATA(owner: string) {
    const ata = await getAssociatedTokenAddress(
      new PublicKey(this.USDC_MINT_ADDRESS),
      new PublicKey(owner)
    );
    return ata.toBase58();
  }
  private async getMerchantEmbeddedWallet() {
    try {
      const userAta = await this.getUSDCATA(
        "ERifvs7ja7W1um7jo588UAiswcN5BhdR3h28C951sxvx"
      );
      this.merchantEmbeddedATA = userAta;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Sets the slippage tolerance for token swaps
   * @param value - Slippage percentage in basis points
   */
  public setSlippage(value: number): void {
    if (value < 0) {
      throw new Error("Slippage must be a non-negative value");
    }
    this.slippage = value;
  }

  /**
   * Creates a payment intent with the specified amount
   * @param amount - Payment amount in USDC
   * @returns The created payment intent
   */
  public async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    if (amount <= 0) {
      throw new Error("Please provide an amount greater than zero");
    }

    this.paymentAmount = amount;
    const intent: PaymentIntent = { id: "mock-intent-id", amount };
    this.setPaymentIntent(intent);

    return intent;
  }

  /**
   * Renders the payment button component
   * @returns React component for the payment button
   */
  public renderPaymentButton(): React.ReactElement {
    return <PaymentButton onClick={this.handlePaymentButtonClick.bind(this)} />;
  }

  /**
   * Renders the payment modal component
   * @returns React component for the payment modal
   */
  public renderPaymentModal(): React.ReactElement {
    return (
      <PaymentModal
        onSubmit={this.handleSubmitPaymentModal.bind(this)}
        amount={this.paymentAmount}
        onClose={this.handleCloseModal.bind(this)}
      />
    );
  }

  /**
   * Handles the payment button click event
   */
  private handlePaymentButtonClick(): void {
    this.setShowModal(true);
  }

  /**
   * Handles closing the payment modal
   */
  private handleCloseModal(): void {
    this.setShowModal(false);
  }

  /**
   * Checks if a token is available on Jupiter
   * @param mintAddress - Token mint address
   * @returns Result indicating success or failure with relevant data
   */
  public async checkTokenOnJupiter(
    mintAddress: string
  ): Promise<TokenCheckResult> {
    try {
      const response = await axios.get(
        `${this.JUPITER_API_BASE_URL}/tokens/v1/token/${mintAddress}`
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Token found on Jupiter:", response.data);
        return { success: true, data: response.data };
      }

      console.error("Unexpected response from Jupiter:", response.status);
      return {
        success: false,
        error: `Unexpected response: ${response.status}`,
      };
    } catch (error: unknown) {
      console.error(
        "Error checking token on Jupiter:",
        error instanceof Error ? error.message : String(error)
      );
      return {
        success: false,
        error: "Failed to fetch token data from Jupiter API.",
      };
    }
  }

  /**
   * Gets a swap quote from Jupiter
   * @param inputMint - Input token mint address
   * @param amount - Amount to swap
   * @param slippageBps - Slippage tolerance in basis points
   * @returns Swap quote result
   */
  public async getSwapQuote(
    inputMint: string,
    amount: number,
    slippageBps: number
  ): Promise<SwapQuoteResult> {
    try {
      const queryParams = new URLSearchParams({
        inputMint,
        outputMint: this.USDC_MINT_ADDRESS,
        amount: amount.toString(),
        slippageBps: slippageBps.toString(),
      });

      const response = await axios.get(
        `${this.JUPITER_API_BASE_URL}/swap/v1/quote?${queryParams.toString()}`
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Swap price data:", response.data);
        return { success: true, data: response.data };
      }

      console.error("Unexpected response from Jupiter:", response.status);
      return {
        success: false,
        error: `Unexpected response: ${response.status}`,
      };
    } catch (error: unknown) {
      console.error(
        "Error checking swap price on Jupiter:",
        error instanceof Error ? error.message : String(error)
      );
      return {
        success: false,
        error: "Failed to fetch swap price data from Jupiter API.",
      };
    }
  }

  /**
   * Gets a token's price in USDC
   * @param mintAddress - Token mint address
   * @returns Token price in USDC or 0 if unavailable
   */
  public async getTokenPriceInUSDC(mintAddress: string): Promise<number> {
    const url = `${this.JUPITER_API_BASE_URL}/price/v2?ids=${mintAddress}`;

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
        error instanceof Error ? error.message : String(error)
      );
      return 0;
    }
  }

  /**
   * Executes a token swap through Jupiter
   * @param quoteResponse - Swap quote response
   * @param walletPublicKey - User's wallet public key
   * @param options - Optional swap parameters
   * @returns Swap execution result
   */
  public async executeSwap(
    quoteResponse: JupiterQuoteResponse,
    walletPublicKey: string,
    options: SwapOptions = {}
  ): Promise<SwapExecutionResponse> {
    // Validate inputs
    if (!quoteResponse) {
      throw new Error("Quote response is required");
    }

    if (!walletPublicKey) {
      throw new Error("Wallet with valid public key is required");
    }

    // Default options
    const defaultOptions: SwapOptions = {
      dynamicComputeUnitLimit: true,
      dynamicSlippage: true,
      prioritizationFee: {
        priorityLevelWithMaxLamports: {
          maxLamports: 1000000,
          priorityLevel: "veryHigh",
        },
      },
    };

    // Merge user options with defaults
    const mergedOptions = { ...defaultOptions, ...options };

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add API key if provided
    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey;
    }

    // Prepare request body
    const requestBody: Record<string, unknown> = {
      quoteResponse,
      userPublicKey: walletPublicKey.toString(),
      dynamicComputeUnitLimit: mergedOptions.dynamicComputeUnitLimit,
      dynamicSlippage: mergedOptions.dynamicSlippage,
      destinationTokenAccount: this.merchantEmbeddedATA,
    };

    // Add prioritization fee if provided
    if (mergedOptions.prioritizationFee) {
      requestBody.prioritizationFeeLamports = mergedOptions.prioritizationFee;
    }

    try {
      // Execute the swap request
      const response = await fetch(
        `${this.JUPITER_API_BASE_URL}/swap/v1/swap`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Swap failed with status ${response.status}: ${
            errorData ? JSON.stringify(errorData) : "Unknown error"
          }`
        );
      }

      // Parse and return the response
      return (await response.json()) as SwapExecutionResponse;
    } catch (error) {
      console.error(
        "Error executing Jupiter swap:",
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }

  /**
   * Handles payment submission from the modal
   * @param data - Payment submission data
   * @returns Result of the payment operation
   */
  public async handleSubmitPaymentModal(
    data: PaymentSubmissionData
  ): Promise<SwapExecutionResponse> {
    if (this.paymentAmount <= 0) {
      throw new Error("Please provide an amount greater than zero");
    }

    try {
      console.log("Processing payment:", data);

      // Verify token is on Jupiter
      const tokenCheckResult = await this.checkTokenOnJupiter(
        data.fromToken.mint.publicKey
      );

      if (!tokenCheckResult.success) {
        console.error("Cannot proceed with swap:", tokenCheckResult.error);
        throw new Error(
          `Token not available on Jupiter: ${tokenCheckResult.error}`
        );
      }

      // Get the price of the user's token in USDC
      const userTokenPriceUSDC = await this.getTokenPriceInUSDC(
        data.fromToken.mint.publicKey
      );

      if (!userTokenPriceUSDC) {
        throw new Error("Unable to fetch user token price");
      }

      // Calculate required amount of user tokens
      const requiredUserTokenAmount = this.paymentAmount / userTokenPriceUSDC; //TODO: Add fee

      // Get swap quote
      const quoteResult = await this.getSwapQuote(
        data.fromToken.mint.publicKey,
        requiredUserTokenAmount,
        this.slippage
      );

      if (!quoteResult.success) {
        throw new Error(`Failed to get swap quote: ${quoteResult.error}`);
      }

      // Execute the swap
      const swapResult = await this.executeSwap(
        quoteResult.data as JupiterQuoteResponse,
        data.walletAddress
      );

      return swapResult;
    } catch (error) {
      console.error(
        "Payment submission failed:",
        error instanceof Error ? error.message : String(error)
      );
      throw error;
    }
  }
}

export default PaymentGateway;
