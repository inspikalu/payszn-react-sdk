// PaySZNContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import PaySZN from "../PaySZN";
import { PaymentIntent } from "../types";
import { WalletProviderWrapper } from "./WalletProviderWrapper";

type PaySZNContextType = {
  paySZN: PaySZN | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  paymentIntent: PaymentIntent | null;
};

const PaySZNContext = createContext<PaySZNContextType>({
  paySZN: null,
  showModal: false,
  setShowModal: () => {},
  paymentIntent: null,
});

export const usePaySZN = () => useContext(PaySZNContext);

interface PaySZNProviderProps {
  apiKey: string;
  children: React.ReactNode;
  initialAmount?: number;
}

export const PaySZNProvider: React.FC<PaySZNProviderProps> = ({
  apiKey,
  children,
  initialAmount = 0.01,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );
  const [paySZN, setPaySZN] = useState<PaySZN | null>(null);

  useEffect(() => {
    // Create the SDK instance once
    const sdk = new PaySZN({
      apiKey,
      setShowModal,
      setPaymentIntent,
    });

    sdk
      .createPaymentIntent(initialAmount)
      .catch((err) => console.error("Error creating payment intent:", err));

    setPaySZN(sdk);
  }, [apiKey, initialAmount]);

  return (
    <PaySZNContext.Provider
      value={{ paySZN, showModal, setShowModal, paymentIntent }}
    >
      <WalletProviderWrapper>{children}</WalletProviderWrapper>
    </PaySZNContext.Provider>
  );
};
