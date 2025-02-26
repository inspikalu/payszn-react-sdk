import { Connection, VersionedTransaction, SendOptions, TransactionSignature } from "@solana/web3.js";
import { TransactionSigner } from "../types";
import { RPC_URL } from "./constants";

class TransactionService {
    /**
     * Signs a serialized transaction using any compatible transaction signer
     * 
     * @param {string} serializedTransaction - The transaction in base64 format from API
     * @param {TransactionSigner} signer - Any object that implements the TransactionSigner interface
     * @returns {Promise<Uint8Array>} The signed transaction as binary data ready to be sent
     * @throws {Error} If signing fails for any reason
     */
    public async signSerializedTransaction(
        serializedTransaction: string,
        signer: TransactionSigner
    ): Promise<Uint8Array> {
        try {
            const transactionBuffer = Buffer.from(serializedTransaction, 'base64');

            const transaction = VersionedTransaction.deserialize(transactionBuffer);

            const signedTransaction = await signer.signTransaction(transaction);

            return signedTransaction.serialize();
        } catch (error) {
            throw new Error(`Failed to sign transaction: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Sends a signed transaction to the blockchain
     * 
     * @param {Uint8Array} signedTransaction - The signed transaction as binary data
     * @param {Connection} connection - Solana connection object
     * @param {SendOptions} [options] - Optional transaction send options
     * @returns {Promise<TransactionSignature>} The transaction signature
     * @throws {Error} If the transaction fails to send
     */
    public async sendTransaction(
        signedTransaction: Uint8Array,
        connection: Connection,
        options?: SendOptions
    ): Promise<TransactionSignature> {
        try {
            const signature = await connection.sendRawTransaction(
                signedTransaction,
                options
            );
            return signature;
        } catch (error) {
            throw new Error(`Failed to send transaction: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Combines sign and send operations in one convenient method
     * 
     * @param {string} serializedTransaction - The transaction in base64 format from API
     * @param {TransactionSigner} signer - Any object that implements the TransactionSigner interface
     * @param {SendOptions} [options] - Optional transaction send options
     * @returns {Promise<TransactionSignature>} The transaction signature
     * @throws {Error} If signing or sending fails
     */
    public async signAndSendTransaction(
        serializedTransaction: string,
        signer: TransactionSigner,
        options?: SendOptions
    ): Promise<TransactionSignature> {
        const connection = new Connection(RPC_URL)
        const signedTransaction = await this.signSerializedTransaction(
            serializedTransaction,
            signer
        );

        return this.sendTransaction(signedTransaction, connection, options);
    }
}

const Transaction_Service = new TransactionService();
export default Transaction_Service;