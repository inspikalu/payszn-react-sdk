import React from "react";

interface PaymentButtonProps {
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Pay Now</button>;
};

export default PaymentButton;
