import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  getFungibleTokens,
  getFungibleTokensForWallet,
  getTokenAccounts,
  getTokenAccountsFromHelus,
} from "@/lib/getFungibleTokens";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { connect } from "http2";
import { DigitalAssetWithToken } from "@metaplex-foundation/mpl-token-metadata";

interface PaymentModalProps {
  onSubmit: (data: {
    fromToken: DigitalAssetWithToken;
    toToken: string;
    amount: number;
  }) => void;
  amount: number;
}

const PaymentModal = ({ onSubmit, amount }: PaymentModalProps) => {
  // Use publicKey as the unique identifier
  const [selectedTokenId, setSelectedTokenId] = useState<string>();
  const [toToken, setToToken] = useState("USDC");
  const [walletTokens, setWalletTokens] = useState<DigitalAssetWithToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      const fetchWalletTokens = async () => {
        setIsLoading(true);
        try {
          console.log();
          const tokens = await getFungibleTokensForWallet(
            wallet.publicKey!.toString()
          );
          console.log("These are the tokens, ", tokens);
          setWalletTokens(tokens);

          // If there are tokens, set the first one as default
          if (tokens.length > 0) {
            setSelectedTokenId(tokens[0].publicKey.toString());
          }
        } catch (error) {
          console.error("Error fetching wallet tokens:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchWalletTokens();
    }
  }, [wallet.connected, wallet.publicKey, connection]);

  // Find the actual token object based on selected ID (using publicKey)
  const getSelectedToken = (): DigitalAssetWithToken | undefined => {
    if (!selectedTokenId) return undefined;
    return walletTokens.find(
      (token) => token.publicKey.toString() === selectedTokenId
    );
  };

  // Generate a display name for tokens that includes mint info for duplicates
  const getTokenDisplayName = (token: DigitalAssetWithToken): string => {
    const symbol = token.metadata.symbol || "Unknown";
    const name = token.metadata.name || "Unknown Token";
    const mintShort =
      token.publicKey.toString().slice(0, 4) +
      "..." +
      token.publicKey.toString().slice(-4);

    // Get token balance if available
    const balance = token.token ? Number(token.token.amount) : 0;

    return `${symbol} (${mintShort}) - ${balance}`;
  };

  const handleSubmit = () => {
    const fromToken = getSelectedToken();
    if (!fromToken || !amount || !toToken) return;
    onSubmit({ fromToken, toToken, amount });
  };

  return (
    <section className="bg-pink-50/10 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-pink-50 border-purple-100">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-purple-800">
            Continue to pay ${amount}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <p className="text-sm text-purple-500">Pay With</p>
          <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
            <SelectTrigger className="w-full border border-purple-200 text-purple-800 bg-purple-50">
              <SelectValue placeholder="Select token">
                {selectedTokenId && getSelectedToken() ? (
                  <div className="flex items-center">
                    <span>{getSelectedToken()?.metadata.symbol}</span>
                    <span className="ml-2 text-xs text-purple-400">
                      ({selectedTokenId.slice(0, 4)}...
                      {selectedTokenId.slice(-4)})
                    </span>
                  </div>
                ) : (
                  "Select token"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-pink-50">
              {isLoading ? (
                <p className="p-2 text-center text-purple-500">
                  Loading tokens...
                </p>
              ) : (
                walletTokens.map((token) => (
                  <SelectItem
                    key={token.publicKey.toString()}
                    value={token.publicKey.toString()}
                    className="m-1 rounded"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">
                        {token.metadata.symbol}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-purple-500">
                          {token.token ? Number(token.token.amount) : 0}
                        </span>
                        <span className="text-xs text-purple-400">
                          {token.publicKey.toString().slice(0, 4)}...
                          {token.publicKey.toString().slice(-4)}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </CardContent>
        <footer className="mt-4">
          {!wallet.connected ? (
            <div className="flex gap-2">
              <WalletMultiButton />
            </div>
          ) : (
            <Button
              className="w-full rounded-md h-12 opacity-70"
              disabled={
                !wallet.connected || !selectedTokenId || !amount || !toToken
              }
              onClick={handleSubmit}
            >
              Pay
            </Button>
          )}
          <p className="mt-4 text-xs text-center text-purple-500">
            Transaction fee: 0.5% • Network fee: ~0.00005 SOL
          </p>
        </footer>
      </Card>
    </section>
  );
};

export default PaymentModal;
