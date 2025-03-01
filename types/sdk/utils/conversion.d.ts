/**
 * Converts a token amount to lamports (the smallest unit)
 * @param amount - Amount in token units
 * @param decimals - Number of decimal places for the token
 * @returns Amount in lamports
 */
export declare function toLamports(amount: number, decimals: number): number;
/**
 * Converts lamports to token amount
 * @param lamports - Amount in lamports
 * @param decimals - Number of decimal places for the token
 * @returns Amount in token units
 */
export declare function fromLamports(lamports: number, decimals: number): number;
