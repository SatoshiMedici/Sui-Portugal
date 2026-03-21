"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollAnimations } from "@/hooks/useInView";
import { isEmailAllowed, isValidSubdomain, SUINS_CONFIG } from "@/lib/claim-config";
import NetworkGrid from "@/components/NetworkGrid";
import SuiProviders from "@/components/SuiProviders";
import ClaimForm from "./ClaimForm";

type Step = "email" | "name" | "wallet" | "done";

function ClaimPageInner() {
  const { t } = useLanguage();
  useScrollAnimations();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subname, setSubname] = useState("");
  const [nameError, setNameError] = useState("");

  const ct = (t as Record<string, unknown>).claim as Record<string, string>;

  const handleEmailSubmit = useCallback(() => {
    const trimmed = email.toLowerCase().trim();
    if (!trimmed || !trimmed.includes("@")) {
      setEmailError(ct.emailInvalid);
      return;
    }
    if (!isEmailAllowed(trimmed)) {
      setEmailError(ct.emailNotAllowed);
      return;
    }
    setEmailError("");
    setStep("name");
  }, [email, ct]);

  const handleNameSubmit = useCallback(() => {
    const result = isValidSubdomain(subname);
    if (!result.valid) {
      setNameError(result.error || "Invalid name");
      return;
    }
    setNameError("");
    setStep("wallet");
  }, [subname]);

  const fullName = `${subname.toLowerCase().trim()}@${SUINS_CONFIG.parentName}`;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-black min-h-[50vh] flex items-center overflow-hidden">
        <NetworkGrid className="inset-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#298DFF]/[0.04] rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20 w-full">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {ct.back}
          </a>

          <p className="mono-label text-[#298DFF] mb-4">{ct.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-[1.1] mb-6 tracking-tight">
            {ct.heading}
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            {ct.subheading}
          </p>
        </div>
      </section>

      {/* ─── Claim Flow ─── */}
      <section className="py-16 bg-black relative overflow-hidden">
        <NetworkGrid className="inset-0" />
        <div className="max-w-[600px] mx-auto px-6 sm:px-8 relative">

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {(["email", "name", "wallet"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === s
                      ? "bg-[#298DFF] text-white"
                      : step === "done" || (["email", "name", "wallet"].indexOf(step) > i)
                      ? "bg-[#298DFF]/20 text-[#298DFF]"
                      : "bg-white/[0.06] text-white/30"
                  }`}
                >
                  {step === "done" || (["email", "name", "wallet"].indexOf(step) > i) ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div className={`w-12 h-[1px] transition-colors duration-300 ${
                    ["email", "name", "wallet"].indexOf(step) > i || step === "done"
                      ? "bg-[#298DFF]/40"
                      : "bg-white/[0.08]"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === "email" && (
            <div className="animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{ct.emailTitle}</h2>
              <p className="text-white/40 text-sm mb-8">{ct.emailDesc}</p>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#298DFF]/50 focus:ring-1 focus:ring-[#298DFF]/30 transition-all"
                    autoFocus
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-2">{emailError}</p>
                  )}
                </div>
                <button
                  onClick={handleEmailSubmit}
                  className="w-full btn-shine px-6 py-3.5 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {ct.emailCta}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Choose name */}
          {step === "name" && (
            <div className="animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{ct.nameTitle}</h2>
              <p className="text-white/40 text-sm mb-8">{ct.nameDesc}</p>

              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={subname}
                      onChange={(e) => { setSubname(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")); setNameError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                      placeholder="yourname"
                      className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#298DFF]/50 focus:ring-1 focus:ring-[#298DFF]/30 transition-all pr-40"
                      autoFocus
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                      @{SUINS_CONFIG.parentName}
                    </span>
                  </div>
                  {subname && !nameError && (
                    <p className="text-[#298DFF] text-sm mt-2 font-mono">
                      {fullName}
                    </p>
                  )}
                  {nameError && (
                    <p className="text-red-400 text-sm mt-2">{nameError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("email")}
                    className="px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/60 font-medium rounded-xl transition-all duration-300 border border-white/[0.08]"
                  >
                    {ct.backBtn}
                  </button>
                  <button
                    onClick={handleNameSubmit}
                    className="flex-1 btn-shine px-6 py-3.5 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {ct.nameCta}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Connect wallet & claim */}
          {step === "wallet" && (
            <div className="animate-on-scroll">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{ct.walletTitle}</h2>
              <p className="text-white/40 text-sm mb-4">{ct.walletDesc}</p>

              {/* Preview card */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-8">
                <p className="text-white/30 text-xs uppercase tracking-wider mb-2 font-mono">{ct.preview}</p>
                <p className="text-2xl font-bold text-white tracking-tight">{fullName}</p>
                <p className="text-white/30 text-sm mt-1">{email}</p>
              </div>

              <ClaimForm
                subname={subname}
                onBack={() => setStep("name")}
                onSuccess={() => setStep("done")}
                backLabel={ct.backBtn}
                claimLabel={ct.claimCta}
                connectLabel={ct.connectWallet}
              />
            </div>
          )}

          {/* Step 4: Done */}
          {step === "done" && (
            <div className="animate-on-scroll text-center">
              <div className="w-16 h-16 rounded-full bg-[#298DFF]/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#298DFF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">{ct.doneTitle}</h2>
              <p className="text-[#298DFF] text-xl font-mono font-bold mb-4">{fullName}</p>
              <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto">{ct.doneDesc}</p>
              <a
                href="/"
                className="inline-block px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium rounded-xl transition-all duration-300 border border-white/[0.08] hover:border-white/[0.2]"
              >
                {ct.doneBack}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ClaimPage() {
  return (
    <SuiProviders>
      <ClaimPageInner />
    </SuiProviders>
  );
}
