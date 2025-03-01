import React from "react";
import { usePaySZN } from "./PaySZNContext";

export const PaymentModalWrapper: React.FC = () => {
  const { paySZN, showModal } = usePaySZN();

  if (!paySZN || !showModal) return null;

  return paySZN.renderPaymentModal();
};
