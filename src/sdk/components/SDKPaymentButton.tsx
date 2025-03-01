import React from "react";

interface SDKPaymentButtonProps {
  onClick: () => void;
  amount?: number;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const SDKPaymentButton: React.FC<SDKPaymentButtonProps> = ({
  onClick,
  amount,
  isLoading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`payszn-sdk-w-full payszn-sdk-rounded-lg payszn-sdk-h-12 payszn-sdk-bg-gradient-to-r payszn-sdk-from-purple-600 payszn-sdk-to-blue-500 payszn-sdk-hover:from-purple-700 payszn-sdk-hover:to-blue-600 payszn-sdk-text-white payszn-sdk-font-medium payszn-sdk-transition-all payszn-sdk-duration-200 payszn-sdk-border-0 payszn-sdk-disabled:opacity-50 payszn-sdk-disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="payszn-sdk-flex payszn-sdk-items-center payszn-sdk-justify-center">
          <svg
            className="payszn-sdk-animate-spin payszn-sdk--ml-1 payszn-sdk-mr-2 payszn-sdk-h-5 payszn-sdk-w-5 payszn-sdk-text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="payszn-sdk-opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="payszn-sdk-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      ) : (
        <>{amount ? `Pay $${amount}` : "Pay Now"}</>
      )}
    </button>
  );
};

export default SDKPaymentButton;