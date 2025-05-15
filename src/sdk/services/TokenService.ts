import { RPC_URL, USDC_MINT_ADDRESS } from "./constants";
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    getAccount,
    createAssociatedTokenAccountInstruction,
    TokenAccountNotFoundError,
    TokenInvalidAccountOwnerError,
    Account,
} from '@solana/spl-token';

/**
 * Service for token-related operations
 */
class TokenService {
    /**
     * Gets the associated token account (ATA) for a given owner and mint
     * @param mintAddress - Token mint address
     * @param ownerAddress - Wallet owner address
     * @returns The associated token account address as a string
     */
    public async getAssociatedTokenAddress(
        mintAddress: string,
        ownerAddress: string
    ): Promise<string> {
        try {
            const ata = await getAssociatedTokenAddress(
                new PublicKey(mintAddress),
                new PublicKey(ownerAddress)
            );
            return ata.toBase58();
        } catch (error) {
            console.error("Error getting associated token address:", error);
            throw new Error(`Failed to get associated token address: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Gets the USDC associated token account for a given owner
     * @param ownerAddress - Wallet owner address
     * @returns The USDC ATA address as a string
     */
    public async getUSDCATA(ownerAddress: string): Promise<string> {
        return this.getAssociatedTokenAddress(USDC_MINT_ADDRESS, ownerAddress);
    }

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
    public async getOrCreateUSDCAssociatedTokenAccount({
        ownerAddress,
        payer,
        sendTransaction,
    }: {
        ownerAddress: PublicKey;
        payer: PublicKey;
        sendTransaction: (transaction: Transaction, options?: {}) => Promise<string>;
        allowOwnerOffCurve?: boolean;
    }): Promise<Account> {
        // Setup connection based on network parameter
        const connection = new Connection(RPC_URL);

        const associatedToken = await getAssociatedTokenAddress(
            new PublicKey(USDC_MINT_ADDRESS),
            ownerAddress,
        );

        let account: Account;
        try {
            account = await getAccount(connection, associatedToken);
        } catch (error: unknown) {
            if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                try {
                    const transaction = new Transaction().add(
                        createAssociatedTokenAccountInstruction(
                            payer,
                            associatedToken,
                            ownerAddress,
                            new PublicKey(USDC_MINT_ADDRESS),
                        )
                    );

                    await sendTransaction(transaction);
                    account = await getAccount(connection, associatedToken);
                } catch (error: unknown) {
                    throw new Error(`Failed to create associated token account: ${error}`);
                }
            } else {
                throw error;
            }
        }
        return account;
    }

    /**
     * Calculates the required amount of user tokens based on USDC payment amount and token price
     * @param usdcAmount - Amount to pay in USDC
     * @param tokenPriceInUSDC - Price of the token in USDC
     * @param feePercentage - Optional fee percentage to add (defaults to 0)
     * @returns Required amount of user tokens
     */
    public calculateRequiredTokenAmount(
        usdcAmount: number,
        tokenPriceInUSDC: number,
        feePercentage: number = 0
    ): number {
        if (usdcAmount <= 0) {
            throw new Error("USDC amount must be greater than zero");
        }

        if (tokenPriceInUSDC <= 0) {
            throw new Error("Token price must be greater than zero");
        }

        // Calculate total amount including fee
        const totalUsdcAmount = usdcAmount * (1 + feePercentage / 100);

        // Calculate required token amount
        return totalUsdcAmount / tokenPriceInUSDC;
    }
}

const Token_Service = new TokenService();
export default Token_Service;
