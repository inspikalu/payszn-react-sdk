var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Connection, VersionedTransaction } from "@solana/web3.js";
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
    signSerializedTransaction(serializedTransaction, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionBuffer = Buffer.from(serializedTransaction, 'base64');
                const transaction = VersionedTransaction.deserialize(transactionBuffer);
                const signedTransaction = yield signer.signTransaction(transaction);
                return signedTransaction.serialize();
            }
            catch (error) {
                throw new Error(`Failed to sign transaction: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
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
    sendTransaction(signedTransaction, connection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = yield connection.sendRawTransaction(signedTransaction, options);
                return signature;
            }
            catch (error) {
                throw new Error(`Failed to send transaction: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
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
    signAndSendTransaction(serializedTransaction, signer, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = new Connection(RPC_URL);
            const signedTransaction = yield this.signSerializedTransaction(serializedTransaction, signer);
            return this.sendTransaction(signedTransaction, connection, options);
        });
    }
}
const Transaction_Service = new TransactionService();
export default Transaction_Service;
