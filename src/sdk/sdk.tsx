import React from "react";
import PaymentButton from "@/components/PaymentButton";
import PaymentModal from "@/components/PaymentModal";

class PaymentGateWay {
  private apiKey: string;
  private paymentIntent: any;
  private setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  private setPaymentIntent: React.Dispatch<React.SetStateAction<any>>;
  private data: {
    fromToken: string;
    toToken: string;
    amount: number;
  } = {
    fromToken: "",
    toToken: "",
    amount: 0,
  };
  private paymentAmount = 0;

  constructor(
    apiKey: string,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setPaymentIntent: React.Dispatch<React.SetStateAction<any>>
  ) {
    this.apiKey = apiKey;
    this.setShowModal = setShowModal;
    this.setPaymentIntent = setPaymentIntent;

    // Bind methods to the instance
    this.handleSubmitPaymentModal = this.handleSubmitPaymentModal.bind(this);
    this.handlePaymentButtonClick = this.handlePaymentButtonClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  // Method to create a payment intent
  async createPaymentIntent(amount: number) {
    // Simulate creating a payment intent via API (for now, mock the intent)
    if (amount <= 0) {
      throw new Error("Please Provide an amount Greater than zero");
    }
    this.paymentAmount = amount;
    const intent = { id: "mock-intent-id", amount };
    this.setPaymentIntent(intent);
    return intent;
  }

  // Method to handle rendering the payment button
  renderPaymentButton() {
    return <PaymentButton onClick={this.handlePaymentButtonClick} />;
  }

  // Method to handle clicking on the payment button
  handlePaymentButtonClick() {
    this.setShowModal(true); // Show modal when payment button is clicked
  }

  // Method to render the payment modal
  renderPaymentModal() {
    return (
      <PaymentModal
        onSubmit={this.handleSubmitPaymentModal}
        amount={this.paymentAmount}
        // paymentIntent= { this.paymentIntent }
        // onClose = { this.handleCloseModal }
      />
    );
  }

  // Method to close the payment modal
  handleCloseModal() {
    this.setShowModal(false); // Close modal
  }

  handleSubmitPaymentModal(data: {
    fromToken: string;
    toToken: string;
    amount: number;
  }) {
    if (this.paymentAmount <= 0) {
      throw new Error("Please Provide an amount Greater than zero");
    }
    // Handle the payment submission
    console.log("Processing payment:", data);
    // Here you'd typically call an API or perform actions with the payment data
    return;
  }
}

export default PaymentGateWay;
