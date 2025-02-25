import { Connection, PublicKey, GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

type TokenAccount = {
    mint: string;
    amount: string;
    decimals: number;
};

export async function getFungibleTokens(
    connection: Connection,
    walletAddress: string
): Promise<TokenAccount[]> {
    try {
        const ownerPublicKey = new PublicKey(walletAddress);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            ownerPublicKey,
            { programId: TOKEN_PROGRAM_ID } // SPL Token Program ID
        );

        return tokenAccounts.value
            .map((accountInfo) => {
                const parsedInfo = accountInfo.account.data.parsed.info;
                return {
                    mint: parsedInfo.mint,
                    amount: parsedInfo.tokenAmount.amount,
                    decimals: parsedInfo.tokenAmount.decimals,
                };
            })
            .filter((token) => token.decimals > 0); // Filter out non-fungible tokens (NFTs have decimals = 0)
    } catch (error) {
        console.error("Error fetching fungible tokens:", error);
        return [];
    }
}

export async function getTokenAccounts(wallet: string, solanaConnection: Connection) {
    const filters: GetProgramAccountsFilter[] = [
        {
            dataSize: 165,    //size of account (bytes)
        },
        {
            memcmp: {
                offset: 32,     //location of our query in the account (bytes)
                bytes: wallet,  //our search criteria, a base58 encoded string
            },
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID, //new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        { filters: filters }
    );
    console.log("All Accounts: ", accounts);
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo: any = account.account.data;
        const mintAddress: string = parsedAccountInfo["parsed"]["info"]["mint"];
        const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        //Log results
        console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);
    });
}