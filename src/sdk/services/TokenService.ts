import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { USDC_MINT_ADDRESS } from "./constants";

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