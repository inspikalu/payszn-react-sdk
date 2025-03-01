import React from "react";
import { usePaySZN } from "./PaySZNContext";

export const PaymentButton: React.FC = () => {
  const { paySZN } = usePaySZN();

  if (!paySZN) return <div>Loading...</div>;

  return paySZN.renderPaymentButton();
};
