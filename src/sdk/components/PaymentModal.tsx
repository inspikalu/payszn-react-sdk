"use client";
import React from "react";
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
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { getFungibleTokensForWalletV2 } from "@/sdk/utils/getFungibleTokens";
import {
  useWallet,
  type WalletContextState,
} from "@solana/wallet-adapter-react";
import type { FungibleToken } from "@/sdk/types";
import { Loader2, InfoIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import JupiterService from "@/sdk/services/JupiterService";
import TokenService from "@/sdk/services/TokenService";

interface PaymentModalProps {
  onSubmit: (data: {
    fromToken: FungibleToken;
    wallet: WalletContextState;
    walletAddress: string;
    amount: number;
  }) => void;
  amount: number;
  onClose: () => void;
}

const PaymentModal = ({ onSubmit, amount, onClose }: PaymentModalProps) => {
  const [selectedTokenId, setSelectedTokenId] = useState<string>();
  const [toToken] = useState("USDC");
  const [walletTokens, setWalletTokens] = useState<FungibleToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState<
    number | null
  >(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const wallet = useWallet();

  // Fetch wallet tokens when connected
  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      const fetchWalletTokens = async () => {
        setIsLoading(true);
        try {
          const tokens = await getFungibleTokensForWalletV2(
            wallet.publicKey!.toString()
          );

          console.log("These are the tokens, ", tokens);
          setWalletTokens(tokens);

          // If there are tokens, set the first one as default
          if (tokens.length > 0) {
            setSelectedTokenId(tokens[0].mint);
            toast.success("Wallet tokens loaded successfully");
          } else {
            toast.warning("No tokens found in your wallet");
          }
        } catch (error) {
          console.error("Error fetching wallet tokens:", error);
          toast.error("Failed to load wallet tokens");
        } finally {
          setIsLoading(false);
        }
      };
      fetchWalletTokens();
    }
  }, [wallet.connected, wallet.publicKey]);

  // Calculate estimated token amount when token selection changes
  useEffect(() => {
    const calculateRequiredAmount = async () => {
      if (!selectedTokenId || !amount) {
        setEstimatedTokenAmount(null);
        return;
      }

      setIsCalculating(true);
      try {
        // Use the actual JupiterService implementation
        const tokenPrice = await JupiterService.getTokenPriceInUSDC(selectedTokenId);
        
        // Use TokenService for calculation
        const requiredAmount = TokenService.calculateRequiredTokenAmount(amount, tokenPrice);

        // Format to 6 decimal places for display
        setEstimatedTokenAmount(parseFloat(requiredAmount.toFixed(6)));
      } catch (error) {
        console.error("Error calculating token amount:", error);
        setEstimatedTokenAmount(null);
        toast.error("Failed to calculate token amount");
      } finally {
        setIsCalculating(false);
      }
    };

    calculateRequiredAmount();
  }, [selectedTokenId, amount]);

  // Find the actual token object based on selected ID (using mint)
  const getSelectedToken = (): FungibleToken | undefined => {
    if (!selectedTokenId) return undefined;
    return walletTokens.find((token) => token.mint === selectedTokenId);
  };

  const handleSubmit = async (
    wallet: WalletContextState,
    walletAddress: string
  ) => {
    const fromToken = getSelectedToken();
    if (!fromToken || !amount || !toToken) {
      toast.error("Please select a token and enter an amount");
      return;
    }

    setIsSubmitting(true);

    // Show a loading toast that we'll update with the result
    const toastId = toast.loading("Processing your payment...");

    try {
      await onSubmit({ fromToken, walletAddress, wallet, amount });
      toast.success("Payment completed successfully!", { id: toastId });
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(
        `Payment failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#050510]/90 backdrop-blur-md min-h-screen flex items-center justify-center fixed w-full top-0 left-0">
      <Card className="w-full max-w-md p-6 rounded-xl shadow-2xl border border-purple-500/20 bg-[#0a0a1a] text-white relative overflow-hidden">
        {/* Gradient background effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-xl opacity-20 -z-10"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>

        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Pay ${amount}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-[5fr_1fr] gap-3 items-top justify-start">
            <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
              <SelectTrigger className="w-full border border-gray-800 text-white bg-[#111125] h-12 rounded-lg focus:ring-purple-500 focus:border-purple-500 ">
                <SelectValue placeholder="Select token">
                  {selectedTokenId && getSelectedToken() ? (
                    <div className="flex items-center">
                      <span>{getSelectedToken()?.symbol}</span>
                    </div>
                  ) : (
                    "Select token"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-[#111125] border border-gray-800 rounded-lg text-white">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Loading tokens...</p>
                  </div>
                ) : walletTokens.length === 0 ? (
                  <p className="p-4 text-center text-gray-400">
                    No tokens found
                  </p>
                ) : (
                  walletTokens.map((token) => (
                    <SelectItem
                      key={token.mint}
                      value={token.mint}
                      className="m-1 rounded hover:bg-[#1a1a30] focus:bg-[#1a1a30] focus:text-white"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <div className="text-sm bg-[#111125] px-3 py-1 rounded-lg border border-gray-800 flex items-center justify-center h-12">
              {isCalculating ? (
                <div className="flex items-center space-x-1">
                  <Loader2 className="h-3 w-3 animate-spin text-purple-400" />
                  <span className="text-gray-400">Calculating...</span>
                </div>
              ) : estimatedTokenAmount ? (
                <div className="flex items-center space-x-1">
                  <span className="text-blue-400">{estimatedTokenAmount}</span>
                  <span className="text-gray-400">
                    {getSelectedToken()?.symbol || "tokens"}
                  </span>
                </div>
              ) : (
                <span className="text-gray-400">Select token</span>
              )}
            </div>
          </div>

          {/* Additional Info Text */}
          <div className="mt-3 flex items-start space-x-2 bg-[#111125]/50 p-2 rounded-lg border border-gray-800/50">
            <InfoIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              The amount of tokens displayed are estimated and may vary slightly
              due to price fluctuations and slippage.
            </p>
          </div>
        </CardContent>
        <footer className="mt-6">
          {!wallet.connected ? (
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          ) : (
            <Button
              className="w-full rounded-lg h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium transition-all duration-200 border-0"
              disabled={
                !wallet.connected ||
                !selectedTokenId ||
                !amount ||
                !toToken ||
                isSubmitting
              }
              onClick={() =>
                handleSubmit(wallet, wallet.publicKey?.toString() || "")
              }
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                "Pay"
              )}
            </Button>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <p className="text-xs text-gray-400">
              Transaction fee: 0.5% • Network fee: ~0.00005 SOL
            </p>
          </div>
        </footer>
      </Card>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "bg-[#111125] text-white border border-purple-500/20",
          style: {
            borderRadius: "8px",
            background: "#111125",
            color: "white",
            border: "1px solid rgba(139, 92, 246, 0.2)",
          },
        }}
      />
    </section>
  );
};

export default PaymentModal;