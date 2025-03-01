import React from "react";
import PaySZN from "../PaySZN";
import { PaymentIntent } from "../types";
type PaySZNContextType = {
    paySZN: PaySZN | null;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    paymentIntent: PaymentIntent | null;
};
export declare const usePaySZN: () => PaySZNContextType;
interface PaySZNProviderProps {
    apiKey: string;
    children: React.ReactNode;
    initialAmount?: number;
}
export declare const PaySZNProvider: React.FC<PaySZNProviderProps>;
export {};
