"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import {
  useWallet,
  type WalletContextState,
} from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast, Toaster } from "sonner";
import type { FungibleToken } from "../types";
import { getFungibleTokensForWalletV2 } from "../utils/getFungibleTokens";
import JupiterService from "../services/JupiterService";
import TokenService from "../services/TokenService";
import "./payment-modal.css"

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
  const [walletTokens, setWalletTokens] = useState<FungibleToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedTokenAmount, setEstimatedTokenAmount] = useState<
    number | null
  >(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
          setWalletTokens(tokens);

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

  // Calculate estimated token amount
  useEffect(() => {
    const calculateRequiredAmount = async () => {
      if (!selectedTokenId || !amount) {
        setEstimatedTokenAmount(null);
        return;
      }

      setIsCalculating(true);
      try {
        const tokenPrice = await JupiterService.getTokenPriceInUSDC(
          selectedTokenId
        );
        const requiredAmount = TokenService.calculateRequiredTokenAmount(
          amount,
          tokenPrice
        );
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSelectedToken = (): FungibleToken | undefined => {
    return walletTokens.find((token) => token.mint === selectedTokenId);
  };

  const handleSubmit = async () => {
    const fromToken = getSelectedToken();
    if (!fromToken || !wallet.publicKey) {
      toast.error("Please select a token and connect wallet");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing your payment...");

    try {
      onSubmit({
        fromToken,
        wallet,
        walletAddress: wallet.publicKey.toString(),
        amount,
      });
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

  const handleSelectToken = (mint: string) => {
    setSelectedTokenId(mint);
    setIsOpen(false);
  };

  return (
    <div className="payment-container">

      <div className="modal-card">
        <div className="gradient-bg"></div>
        <div className="purple-blob"></div>
        <div className="blue-blob"></div>

        <div className="card-header">
          <h2 className="card-title">Payszn</h2>
        </div>

        <div className="card-content">
          <h2 className="payment-heading">Pay ${amount}</h2>

          <div className="token-grid">
            <div className="select-container" ref={dropdownRef}>
              <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                {isLoading ? (
                  <div className="loading-container">
                    <Loader2 className="loading-spinner" size={16} />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <span>{getSelectedToken()?.symbol || "Select token"}</span>
                    <ChevronDown
                      className={`chevron-icon ${isOpen ? "open" : ""}`}
                      size={16}
                    />
                  </>
                )}
              </div>

              {isOpen && (
                <div className="select-dropdown">
                  {walletTokens.map((token) => (
                    <div
                      key={token.mint}
                      className={`select-option ${
                        token.mint === selectedTokenId ? "selected" : ""
                      }`}
                      onClick={() => handleSelectToken(token.mint)}
                    >
                      {token.symbol}
                    </div>
                  ))}
                  {walletTokens.length === 0 && (
                    <div className="select-option disabled">
                      No tokens found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="token-amount-display">
              {isCalculating ? (
                <div className="flex-space">
                  <Loader2 className="loading-spinner" size={16} />
                  <span>Calculating...</span>
                </div>
              ) : estimatedTokenAmount ? (
                <div className="flex-space">
                  <span className="token-amount-text">
                    {estimatedTokenAmount}
                  </span>
                  <span className="token-symbol-text">
                    {getSelectedToken()?.symbol}
                  </span>
                </div>
              ) : (
                <span className="token-symbol-text">-</span>
              )}
            </div>
          </div>

          <div className="info-container">
            <AlertCircle className="info-icon" />
            <p className="info-text">
              The amount of tokens displayed are estimated and may vary slightly
              due to price fluctuations and slippage.
            </p>
          </div>

          <div className="modal-footer">
            {!wallet.connected ? (
              <div className="centered-wallet">
                <WalletMultiButton
                  style={{
                    backgroundColor: "#9333ea",
                    borderRadius: "0.5rem",
                    height: "3rem",
                    width: "100%",
                  }}
                />
              </div>
            ) : (
              <button
                className="pay-button"
                onClick={handleSubmit}
                disabled={!selectedTokenId || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex-space">
                    <Loader2 className="loading-spinner" size={16} />
                    Processing...
                  </div>
                ) : (
                  "Pay"
                )}
              </button>
            )}

            <div className="footer-actions">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <p className="fee-text">
                Transaction fee: 0.5% • Network fee: ~0.00005 SOL
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <p className="footer-text">powered by jupiter and civic</p>
          <div className="logo-container">
            <div className="logo-circle">
              <img
                src="/jupiter-logo.png"
                alt="Jupiter logo"
                className="logo-image"
              />
            </div>
            <div className="logo-circle">
              <img
                src="/civic-logo.png"
                alt="Civic logo"
                className="logo-image"
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{ className: "toaster-style" }}
      />
    </div>
  );
};

export default PaymentModal;
