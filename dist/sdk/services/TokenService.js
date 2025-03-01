var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RPC_URL, USDC_MINT_ADDRESS } from "./constants";
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount, createAssociatedTokenAccountInstruction, TokenAccountNotFoundError, TokenInvalidAccountOwnerError } from '@solana/spl-token';
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
    getAssociatedTokenAddress(mintAddress, ownerAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ata = yield getAssociatedTokenAddress(new PublicKey(mintAddress), new PublicKey(ownerAddress));
                return ata.toBase58();
            }
            catch (error) {
                console.error("Error getting associated token address:", error);
                throw new Error(`Failed to get associated token address: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Gets the USDC associated token account for a given owner
     * @param ownerAddress - Wallet owner address
     * @returns The USDC ATA address as a string
     */
    getUSDCATA(ownerAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAssociatedTokenAddress(USDC_MINT_ADDRESS, ownerAddress);
        });
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
    getOrCreateUSDCAssociatedTokenAccount(_a) {
        return __awaiter(this, arguments, void 0, function* ({ ownerAddress, payer, sendTransaction, }) {
            // Setup connection based on network parameter
            const connection = new Connection(RPC_URL);
            const associatedToken = yield getAssociatedTokenAddress(new PublicKey(USDC_MINT_ADDRESS), ownerAddress);
            let account;
            try {
                account = yield getAccount(connection, associatedToken);
            }
            catch (error) {
                if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                    try {
                        const transaction = new Transaction().add(createAssociatedTokenAccountInstruction(payer, associatedToken, ownerAddress, new PublicKey(USDC_MINT_ADDRESS)));
                        yield sendTransaction(transaction);
                        account = yield getAccount(connection, associatedToken);
                    }
                    catch (error) {
                        throw new Error(`Failed to create associated token account: ${error}`);
                    }
                }
                else {
                    throw error;
                }
            }
            return account;
        });
    }
    /**
     * Calculates the required amount of user tokens based on USDC payment amount and token price
     * @param usdcAmount - Amount to pay in USDC
     * @param tokenPriceInUSDC - Price of the token in USDC
     * @param feePercentage - Optional fee percentage to add (defaults to 0)
     * @returns Required amount of user tokens
     */
    calculateRequiredTokenAmount(usdcAmount, tokenPriceInUSDC, feePercentage = 0) {
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
