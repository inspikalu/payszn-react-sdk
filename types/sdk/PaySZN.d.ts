import React from "react";
import { PaySZNProps, PaymentIntent, PaymentSubmissionData } from "./types";
/**
 * PaySZN handles cryptocurrency payment processing with Jupiter swap integration
 */
declare class PaySZN {
    private readonly apiKey;
    private readonly setShowModal;
    private readonly setPaymentIntent;
    private paymentAmount;
    private slippage;
    private merchantEmbeddedATA;
    private merchantWallet;
    constructor({ apiKey, setShowModal, setPaymentIntent }: PaySZNProps);
    private initializeMerchantWallet;
    /**
     * Sets the slippage tolerance for token swaps
     * @param value - Slippage percentage in basis points
     */
    setSlippage(value: number): void;
    /**
     * Creates a payment intent with the specified amount
     * @param amount - Payment amount in USDC
     * @returns The created payment intent
     */
    createPaymentIntent(amount: number): Promise<PaymentIntent>;
    /**
     * Renders the payment button component
     * @returns React component for the payment button
     */
    renderPaymentButton(): React.ReactElement;
    /**
     * Renders the payment modal component
     * @returns React component for the payment modal
     */
    renderPaymentModal(): React.ReactElement;
    /**
     * Handles the payment button click event
     */
    private handlePaymentButtonClick;
    /**
     * Handles closing the payment modal
     */
    private handleCloseModal;
    private processPayment;
    /**
     * Handles payment submission from the modal
     * @param data - Payment submission data
     * @returns Result of the payment operation
     */
    handleSubmitPaymentModal(data: PaymentSubmissionData): Promise<string>;
}
export default PaySZN;
