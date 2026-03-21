"use client";

import { useState } from "react";
import {
  ConnectButton,
  useCurrentAccount,
} from "@mysten/dapp-kit";

interface ClaimFormProps {
  email: string;
  subname: string;
  onBack: () => void;
  onSuccess: () => void;
  backLabel: string;
  claimLabel: string;
  connectLabel: string;
}

export default function ClaimForm({
  email,
  subname,
  onBack,
  onSuccess,
  backLabel,
  claimLabel,
  connectLabel,
}: ClaimFormProps) {
  const account = useCurrentAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClaim = async () => {
    if (!account) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: subname,
          targetAddress: account.address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Claim failed");
      }

      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Claim failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Wallet connection */}
      <div className="flex justify-center mb-2">
        <ConnectButton
          connectText={connectLabel}
          className="!bg-[#298DFF] !hover:bg-[#1a7ae6] !text-white !font-medium !rounded-xl !px-6 !py-3"
        />
      </div>

      {account && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider font-mono mb-1">Connected</p>
          <p className="text-white text-sm font-mono break-all">
            {account.address.slice(0, 8)}...{account.address.slice(-6)}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/60 font-medium rounded-xl transition-all duration-300 border border-white/[0.08]"
        >
          {backLabel}
        </button>
        <button
          onClick={handleClaim}
          disabled={!account || loading}
          className="flex-1 btn-shine px-6 py-3.5 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Claiming...
            </span>
          ) : (
            claimLabel
          )}
        </button>
      </div>
    </div>
  );
}
