import { FungibleToken } from "../types";
export declare function getFungibleTokensForWallet(walletAddress: string, rpcEndpoint?: string): Promise<import("@metaplex-foundation/mpl-token-metadata").DigitalAssetWithToken[]>;
export declare function getFungibleTokensForWalletV2(walletAddress: string, rpcEndpoint?: string): Promise<FungibleToken[]>;
