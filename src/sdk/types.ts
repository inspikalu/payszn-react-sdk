import { DigitalAssetWithToken } from "@metaplex-foundation/mpl-token-metadata";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";

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
export interface TokenInfo {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI: string;
    tags: string[];
    daily_volume: number;
    created_at: string;
    freeze_authority: string | null;
    mint_authority: string | null;
    permanent_delegate: string | null;
    minted_at: string | null;
    extensions: {
        coingeckoId: string;
    };
}
export interface TokenCheckResult {
    success: boolean;
    data?: TokenInfo;
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
    wallet: WalletContextState;
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

/**
 * Options for swap operations
 */
export interface SwapOptions {
    dynamicComputeUnitLimit: boolean;
    dynamicSlippage: boolean;
    prioritizationFee?: {
        priorityLevelWithMaxLamports: {
            maxLamports: number;
            priorityLevel: string;
        };
    };
}

/**
 * Configuration for the PaymentGateway
 */
export interface PaymentGatewayConfig {
    apiKey: string;
    defaultSlippageBps?: number;
    feePercentage?: number;
}


export interface TransactionSigner {
    signTransaction: (transaction: VersionedTransaction) => Promise<VersionedTransaction>;
}