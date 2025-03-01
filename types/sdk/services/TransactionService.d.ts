import { Connection, SendOptions, TransactionSignature } from "@solana/web3.js";
import { TransactionSigner } from "../types";
declare class TransactionService {
    /**
     * Signs a serialized transaction using any compatible transaction signer
     *
     * @param {string} serializedTransaction - The transaction in base64 format from API
     * @param {TransactionSigner} signer - Any object that implements the TransactionSigner interface
     * @returns {Promise<Uint8Array>} The signed transaction as binary data ready to be sent
     * @throws {Error} If signing fails for any reason
     */
    signSerializedTransaction(serializedTransaction: string, signer: TransactionSigner): Promise<Uint8Array>;
    /**
     * Sends a signed transaction to the blockchain
     *
     * @param {Uint8Array} signedTransaction - The signed transaction as binary data
     * @param {Connection} connection - Solana connection object
     * @param {SendOptions} [options] - Optional transaction send options
     * @returns {Promise<TransactionSignature>} The transaction signature
     * @throws {Error} If the transaction fails to send
     */
    sendTransaction(signedTransaction: Uint8Array, connection: Connection, options?: SendOptions): Promise<TransactionSignature>;
    /**
     * Combines sign and send operations in one convenient method
     *
     * @param {string} serializedTransaction - The transaction in base64 format from API
     * @param {TransactionSigner} signer - Any object that implements the TransactionSigner interface
     * @param {SendOptions} [options] - Optional transaction send options
     * @returns {Promise<TransactionSignature>} The transaction signature
     * @throws {Error} If signing or sending fails
     */
    signAndSendTransaction(serializedTransaction: string, signer: TransactionSigner, options?: SendOptions): Promise<TransactionSignature>;
}
declare const Transaction_Service: TransactionService;
export default Transaction_Service;
