import React from "react";
import "./payment-button.css";
interface SDKPaymentButtonProps {
    onClick: () => void;
    amount?: number;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}
declare const SDKPaymentButton: React.FC<SDKPaymentButtonProps>;
export default SDKPaymentButton;
