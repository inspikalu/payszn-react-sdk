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
import { getFungibleTokens, getTokenAccounts } from "@/lib/getFungibleTokens";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { connect } from "http2";

interface PaymentModalProps {
  onSubmit: (data: {
    fromToken: string;
    toToken: string;
    amount: number;
  }) => void;
  amount: number;
}

interface Token {
  symbol: string;
  name: string;
  balance: string;
  icon: string;
}

const PaymentModal = ({ onSubmit, amount }: PaymentModalProps) => {
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("USDC");
  const [walletTokens, setWalletTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      const fetchWalletTokens = async () => {
        setIsLoading(true);
        try {
          console.log(
            await getFungibleTokens(connection, wallet.publicKey!.toString())
          );
          await getTokenAccounts(wallet.publicKey!.toString(), connection);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setWalletTokens([
            { symbol: "SOL", name: "Solana", balance: "1.45", icon: "○" },
            { symbol: "USDC", name: "USD Coin", balance: "124.50", icon: "●" },
            { symbol: "BONK", name: "Bonk", balance: "42069.00", icon: "◆" },
            { symbol: "JTO", name: "Jito", balance: "15.75", icon: "◇" },
          ]);
          setFromToken("SOL");
        } catch (error) {
          console.error("Error fetching wallet tokens:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchWalletTokens();
    }
  }, [wallet.connected, wallet.publicKey, connection]); // Add dependencies

  const handleSubmit = () => {
    if (!fromToken || !amount || !toToken) return;
    onSubmit({ fromToken, toToken, amount });
  };

  return (
    <section className="bg-pink-50/10 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-pink-50 border-purple-100">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-purple-800">Convert From</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <p className="text-sm text-purple-500">You Pay</p>
          <Select value={fromToken} onValueChange={setFromToken}>
            <SelectTrigger className="w-full border border-purple-200 text-purple-800 bg-purple-50">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent className="bg-pink-50">
              {isLoading ? (
                <p className="p-2 text-center text-purple-500">
                  Loading tokens...
                </p>
              ) : (
                walletTokens.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.symbol}
                    className="m-1 rounded"
                  >
                    <span>{token.icon}</span>
                    <span>{token.symbol}</span>
                    <span className="text-xs text-purple-500">
                      {token.balance}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {fromToken && (
            <p className="mt-2 text-sm text-purple-500">
              Balance:{" "}
              {walletTokens.find((t) => t.symbol === fromToken)?.balance ||
                "0.00"}{" "}
              {fromToken}
            </p>
          )}
        </CardContent>
        <footer className="mt-4">
          {!wallet.connected ? (
            <div className="flex gap-2">
              <WalletMultiButton />
            </div>
          ) : (
            <Button
              className="w-full rounded-md h-12 opacity-70"
              disabled={!wallet.connected || !fromToken || !amount || !toToken}
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
