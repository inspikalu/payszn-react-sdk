import React from "react";
import { type WalletContextState } from "@solana/wallet-adapter-react";
import type { FungibleToken } from "../types";
import "./payment-modal.css";
interface PaymentModalProps {
    onSubmit: (data: {
        fromToken: FungibleToken;
        wallet: WalletContextState;
        walletAddress: string;
        amount: number;
    }) => void;
    amount: number;
    onClose: () => void;
}
declare const PaymentModal: ({ onSubmit, amount, onClose }: PaymentModalProps) => React.JSX.Element;
export default PaymentModal;
