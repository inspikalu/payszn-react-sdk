import { type WalletContextState } from "@solana/wallet-adapter-react";
import type { FungibleToken } from "@/sdk/types";
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
declare const PaymentModal: ({ onSubmit, amount, onClose }: PaymentModalProps) => import("react").JSX.Element;
export default PaymentModal;
