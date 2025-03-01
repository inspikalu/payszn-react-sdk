// PaySZNContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import PaySZN from "../PaySZN";
import { WalletProviderWrapper } from "./WalletProviderWrapper";
const PaySZNContext = createContext({
    paySZN: null,
    showModal: false,
    setShowModal: () => { },
    paymentIntent: null,
});
export const usePaySZN = () => useContext(PaySZNContext);
export const PaySZNProvider = ({ apiKey, children, initialAmount = 0.01, }) => {
    const [showModal, setShowModal] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [paySZN, setPaySZN] = useState(null);
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
    return (<PaySZNContext.Provider value={{ paySZN, showModal, setShowModal, paymentIntent }}>
      <WalletProviderWrapper>{children}</WalletProviderWrapper>
    </PaySZNContext.Provider>);
};
