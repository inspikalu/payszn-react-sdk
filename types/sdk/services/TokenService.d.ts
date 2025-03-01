import { PublicKey, Transaction } from '@solana/web3.js';
import { Account } from '@solana/spl-token';
/**
 * Service for token-related operations
 */
declare class TokenService {
    /**
     * Gets the associated token account (ATA) for a given owner and mint
     * @param mintAddress - Token mint address
     * @param ownerAddress - Wallet owner address
     * @returns The associated token account address as a string
     */
    getAssociatedTokenAddress(mintAddress: string, ownerAddress: string): Promise<string>;
    /**
     * Gets the USDC associated token account for a given owner
     * @param ownerAddress - Wallet owner address
     * @returns The USDC ATA address as a string
     */
    getUSDCATA(ownerAddress: string): Promise<string>;
    /**
     * Gets or creates an associated token account with automatic connection setup
     *
     * @param {Object} params - The parameters for the function
     * @param {PublicKey} params.ownerAddress - The owner of the token account
     * @param {PublicKey} params.payer - The public key of the payer (usually wallet.publicKey)
     * @param {Function} params.sendTransaction - The function to send a transaction
     * @param {boolean} [params.allowOwnerOffCurve=false] - Whether to allow the owner to be off curve
     * @param {string} [params.commitment='confirmed'] - The commitment level
     * @returns {Promise<Account>} - The token account
     */
    getOrCreateUSDCAssociatedTokenAccount({ ownerAddress, payer, sendTransaction, }: {
        ownerAddress: PublicKey;
        payer: PublicKey;
        sendTransaction: (transaction: Transaction, options?: {}) => Promise<string>;
        allowOwnerOffCurve?: boolean;
    }): Promise<Account>;
    /**
     * Calculates the required amount of user tokens based on USDC payment amount and token price
     * @param usdcAmount - Amount to pay in USDC
     * @param tokenPriceInUSDC - Price of the token in USDC
     * @param feePercentage - Optional fee percentage to add (defaults to 0)
     * @returns Required amount of user tokens
     */
    calculateRequiredTokenAmount(usdcAmount: number, tokenPriceInUSDC: number, feePercentage?: number): number;
}
declare const Token_Service: TokenService;
export default Token_Service;
