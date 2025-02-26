import { DigitalAssetWithToken } from "@metaplex-foundation/mpl-token-metadata";

// Define interfaces for better type safety
export interface PaymentGatewayProps {
    apiKey: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentIntent: React.Dispatch<React.SetStateAction<PaymentIntent | null>>;
}

export interface PaymentIntent {
    id: string;
    amount: number;
}

export interface TokenCheckResult {
    success: boolean;
    data?: unknown;
    error?: string;
}

export interface SwapQuoteResult {
    success: boolean;
    data?: unknown;
    error?: string;
}

export interface PaymentSubmissionData {
    fromToken: DigitalAssetWithToken;
    amount: number;
    walletAddress: string;
}

export interface SwapOptions {
    dynamicComputeUnitLimit?: boolean;
    dynamicSlippage?: boolean;
    prioritizationFee?: {
        priorityLevelWithMaxLamports: {
            maxLamports: number;
            priorityLevel: string;
        };
    };
    apiKey?: string;
}

export interface ErrorResponse {
    message: string;
    [key: string]: unknown;
}

export interface JupiterQuoteResponse {
    inputMint: string;
    outputMint: string;
    amount: string;
    swapMode: string;
    slippageBps: number;
    // Add other fields as needed
    [key: string]: unknown;
}

export interface SwapExecutionResponse {
    swapTransaction: string;
    transactionId?: string;
    // Add more fields as needed
    [key: string]: unknown;
}