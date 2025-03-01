// import { clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { Connection, PublicKey } from "@solana/web3.js";
import { FungibleToken } from "@/sdk/types";



export async function getFungibleTokensForWallet(
    walletAddress: string,
    rpcEndpoint = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948"
) {
    try {
        const umi = createUmi(rpcEndpoint);
        const ownerPublicKey = publicKey(walletAddress);
        console.log("Fetching Fungible Tokens....");
        const allTokens = await fetchAllDigitalAssetWithTokenByOwner(
            umi,
            ownerPublicKey
        );
        return allTokens;
    } catch (error) {
        console.error("Error swapping tokens to NFT:", error);
        throw new Error("Failed to swap tokens to NFT");
    }
}




export async function getFungibleTokensForWalletV2(
    walletAddress: string,
    rpcEndpoint = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948"
): Promise<FungibleToken[]> {
    try {
        const umi = createUmi(rpcEndpoint);
        const ownerPublicKey = publicKey(walletAddress);
        const solanaConnection = new Connection(rpcEndpoint);

        console.log("Fetching Fungible Tokens....");

        // Fetch all tokens except SOL
        const allTokens = await fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
        const tokenList: FungibleToken[] = allTokens.map((token) => ({
            mint: token.metadata.mint.toString(),
            amount: token.token.amount,
            decimals: token.mint.decimals,
            symbol: token.metadata.symbol ?? "UNKNOWN",
        }));

        // Fetch SOL balance
        const solBalanceLamports = await solanaConnection.getBalance(new PublicKey(walletAddress));
        const solBalance: FungibleToken = {
            mint: "So11111111111111111111111111111111111111112", // Mint address of wrapped SOL (wSOL)
            amount: BigInt(solBalanceLamports), // Convert lamports to SOL
            decimals: 9,
            symbol: "SOL",
        };

        // Return SOL + other tokens
        return [solBalance, ...tokenList];
    } catch (error) {
        console.error("Error fetching tokens:", error);
        throw new Error("Failed to fetch tokens");
    }
}
