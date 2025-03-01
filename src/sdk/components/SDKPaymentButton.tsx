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
      className={`w-full rounded-lg h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
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
