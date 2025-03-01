import React from "react";
interface SDKPaymentButtonProps {
    onClick: () => void;
    amount?: number;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}
declare const SDKPaymentButton: React.FC<SDKPaymentButtonProps>;
export default SDKPaymentButton;
