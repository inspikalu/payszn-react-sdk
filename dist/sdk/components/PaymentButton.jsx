import React from "react";
import { usePaySZN } from "./PaySZNContext";
export const PaymentButton = () => {
    const { paySZN } = usePaySZN();
    if (!paySZN)
        return <div>Loading...</div>;
    return paySZN.renderPaymentButton();
};
