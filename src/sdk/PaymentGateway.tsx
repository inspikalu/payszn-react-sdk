import React from "react";
import PaymentButton from "@/components/PaymentButton";
import PaymentModal from "@/components/PaymentModal";
import {
  PaymentGatewayProps,
  PaymentIntent,
  PaymentSubmissionData,
  JupiterQuoteResponse,
  TransactionSigner,
} from "@/sdk/types";
import TokenService from "./services/TokenService";
import JupiterService from "./services/JupiterService";
import TransactionService from "./services/TransactionService";
import {
  DEFAULT_SLIPPAGE_BPS,
  MERCHANT_WALLET_ADDRESS,
} from "./services/constants";
import { toLamports } from "./utils/conversion";

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
  private slippage = DEFAULT_SLIPPAGE_BPS;
  private merchantEmbeddedATA = "";

  constructor({ apiKey, setShowModal, setPaymentIntent }: PaymentGatewayProps) {
    this.apiKey = apiKey;
    this.setShowModal = setShowModal;
    this.setPaymentIntent = setPaymentIntent;
    this.initializeMerchantWallet();
  }

  private async initializeMerchantWallet() {
    try {
      this.merchantEmbeddedATA = await TokenService.getUSDCATA(
        MERCHANT_WALLET_ADDRESS
      );
    } catch (error) {
      console.error("Failed to initialize merchant wallet:", error);
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
   * Handles payment submission from the modal
   * @param data - Payment submission data
   * @returns Result of the payment operation
   */
  public async handleSubmitPaymentModal(
    data: PaymentSubmissionData
  ): Promise<string> {
    if (this.paymentAmount <= 0) {
      throw new Error("Please provide an amount greater than zero");
    }

    try {
      // Verify token is on Jupiter
      const tokenCheckResult = await JupiterService.checkTokenAvailability(
        data.fromToken.mint.publicKey
      );

      if (!tokenCheckResult.success) {
        throw new Error(
          `Token not available on Jupiter: ${tokenCheckResult.error}`
        );
      }
      console.log("Token Check Result: ", tokenCheckResult);

      // Get the price of the user's token in USDC
      const userTokenPriceUSDC = await JupiterService.getTokenPriceInUSDC(
        data.fromToken.mint.publicKey
      );

      if (!userTokenPriceUSDC) {
        throw new Error("Unable to fetch user token price");
      }

      // Calculate required amount of user tokens
      const requiredUserTokenAmount = TokenService.calculateRequiredTokenAmount(
        this.paymentAmount,
        userTokenPriceUSDC
      );

      // Get swap quote
      const quoteResult = await JupiterService.getSwapQuote(
        data.fromToken.mint.publicKey,
        toLamports(
          requiredUserTokenAmount,
          tokenCheckResult.data?.decimals || 9
        ),
        this.slippage
      );

      console.log("Quote Result", quoteResult);

      if (!quoteResult.success) {
        throw new Error(`Failed to get swap quote: ${quoteResult.error}`);
      }

      // Execute the swap
      const swapInstruction = await JupiterService.getSwapInstruction(
        quoteResult.data as JupiterQuoteResponse,
        data.walletAddress,
        this.merchantEmbeddedATA
      );

      console.log("Swap Instruction: ", swapInstruction);

      //Sign the transaction
      const transactionSignature =
        await TransactionService.signAndSendTransaction(
          swapInstruction.swapTransaction,
          data.wallet as unknown as TransactionSigner
        );
      return transactionSignature;
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
