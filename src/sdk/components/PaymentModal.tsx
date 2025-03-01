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
import { getFungibleTokensForWalletV2 } from "../utils/getFungibleTokens";
import {
  useWallet,
  type WalletContextState,
} from "@solana/wallet-adapter-react";
import type { FungibleToken } from "../types";
import { Loader2, InfoIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import JupiterService from "../services/JupiterService";
import TokenService from "../services/TokenService";
import "./payment-modal.css";

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
        const tokenPrice = await JupiterService.getTokenPriceInUSDC(
          selectedTokenId
        );

        // Use TokenService for calculation
        const requiredAmount = TokenService.calculateRequiredTokenAmount(
          amount,
          tokenPrice
        );

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
    <section className="modal-overlay">
      <Card className="modal-card">
        {/* Gradient background effects */}
        <div className="gradient-bg"></div>
        <div className="purple-blob"></div>
        <div className="blue-blob"></div>

        <CardHeader className="card-header">
          <CardTitle className="card-title">Pay ${amount}</CardTitle>
        </CardHeader>
        <CardContent className="card-content">
          <div className="token-grid">
            <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
              <SelectTrigger className="select-trigger">
                <SelectValue placeholder="Select token">
                  {selectedTokenId && getSelectedToken() ? (
                    <div className="token-display">
                      <span>{getSelectedToken()?.symbol}</span>
                    </div>
                  ) : (
                    "Select token"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="select-content">
                {isLoading ? (
                  <div className="loading-container">
                    <Loader2 className="loading-spinner" />
                    <p className="loading-text">Loading tokens...</p>
                  </div>
                ) : walletTokens.length === 0 ? (
                  <p className="empty-message">No tokens found</p>
                ) : (
                  walletTokens.map((token) => (
                    <SelectItem
                      key={token.mint}
                      value={token.mint}
                      className="select-item"
                    >
                      <div className="token-item">
                        <span className="token-symbol">{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <div className="token-amount-display">
              {isCalculating ? (
                <div className="flex-space">
                  <Loader2 className="mini-spinner" />
                  <span className="loading-text">Calculating...</span>
                </div>
              ) : estimatedTokenAmount ? (
                <div className="flex-space">
                  <span className="token-amount-text">
                    {estimatedTokenAmount}
                  </span>
                  <span className="token-symbol-text">
                    {getSelectedToken()?.symbol || "tokens"}
                  </span>
                </div>
              ) : (
                <span className="token-symbol-text">Select token</span>
              )}
            </div>
          </div>

          {/* Additional Info Text */}
          <div className="info-container">
            <InfoIcon className="info-icon" />
            <p className="info-text">
              The amount of tokens displayed are estimated and may vary slightly
              due to price fluctuations and slippage.
            </p>
          </div>
        </CardContent>
        <footer className="modal-footer">
          {!wallet.connected ? (
            <div className="centered-wallet">
              <WalletMultiButton />
            </div>
          ) : (
            <Button
              className="pay-button"
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
                <div className="button-content">
                  <Loader2 className="loading-spinner" />
                  Processing...
                </div>
              ) : (
                "Pay"
              )}
            </Button>
          )}
          <div className="footer-actions">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <p className="fee-text">
              Transaction fee: 0.5% • Network fee: ~0.00005 SOL
            </p>
          </div>
        </footer>
      </Card>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "toaster-style",
        }}
      />
    </section>
  );
};

export default PaymentModal;
