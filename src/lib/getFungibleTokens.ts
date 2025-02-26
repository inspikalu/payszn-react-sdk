import { clusterApiUrl } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAssetWithTokenByOwner } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";


export async function getFungibleTokensForWallet(
    walletAddress: string,
    rpcEndpoint = "https://mainnet.helius-rpc.com/?api-key=8dabc2e1-a043-4c0a-a675-52273c7ac948"
) {
    try {
        const umi = createUmi(rpcEndpoint);
        const ownerPublicKey = publicKey(walletAddress);
        console.log("Fetching Fungible Tokens....");
        const allNFTs = await fetchAllDigitalAssetWithTokenByOwner(
            umi,
            ownerPublicKey
        );
        // const nfts: UserFTokens[] = [];
        // allNFTs.forEach((nft) => {
        //   nfts.push({
        //     mintAddress: nft.publicKey,
        //     name: nft.metadata.name,
        //     symbol: nft.metadata.symbol,
        //     uri: nft.metadata.uri,
        //   });
        // });

        // const returnData = {
        //   specificData: nfts,
        //   fullData: allNFTs,
        // };
        // console.log("fts fetched successfully", returnData);
        return allNFTs;
    } catch (error) {
        console.error("Error swapping tokens to NFT:", error);
        throw new Error("Failed to swap tokens to NFT");
    }
}

