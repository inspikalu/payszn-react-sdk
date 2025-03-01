var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { Connection, PublicKey } from "@solana/web3.js";
export function getFungibleTokensForWallet(walletAddress_1) {
    return __awaiter(this, arguments, void 0, function* (walletAddress, rpcEndpoint = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948") {
        try {
            const umi = createUmi(rpcEndpoint);
            const ownerPublicKey = publicKey(walletAddress);
            console.log("Fetching Fungible Tokens....");
            const allTokens = yield fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
            return allTokens;
        }
        catch (error) {
            console.error("Error swapping tokens to NFT:", error);
            throw new Error("Failed to swap tokens to NFT");
        }
    });
}
export function getFungibleTokensForWalletV2(walletAddress_1) {
    return __awaiter(this, arguments, void 0, function* (walletAddress, rpcEndpoint = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948") {
        try {
            const umi = createUmi(rpcEndpoint);
            const ownerPublicKey = publicKey(walletAddress);
            const solanaConnection = new Connection(rpcEndpoint);
            console.log("Fetching Fungible Tokens....");
            // Fetch all tokens except SOL
            const allTokens = yield fetchAllDigitalAssetWithTokenByOwner(umi, ownerPublicKey);
            const tokenList = allTokens.map((token) => {
                var _a;
                return ({
                    mint: token.metadata.mint.toString(),
                    amount: token.token.amount,
                    decimals: token.mint.decimals,
                    symbol: (_a = token.metadata.symbol) !== null && _a !== void 0 ? _a : "UNKNOWN",
                });
            });
            // Fetch SOL balance
            const solBalanceLamports = yield solanaConnection.getBalance(new PublicKey(walletAddress));
            const solBalance = {
                mint: "So11111111111111111111111111111111111111112", // Mint address of wrapped SOL (wSOL)
                amount: BigInt(solBalanceLamports), // Convert lamports to SOL
                decimals: 9,
                symbol: "SOL",
            };
            // Return SOL + other tokens
            return [solBalance, ...tokenList];
        }
        catch (error) {
            console.error("Error fetching tokens:", error);
            throw new Error("Failed to fetch tokens");
        }
    });
}
