"use client";

import { useLanguage } from "@/lib/LanguageContext";
import NetworkGrid from "@/components/NetworkGrid";

export default function CommunityCTA() {
  const { t } = useLanguage();

  const linkClass =
    "arrow-hover inline-flex items-center gap-3 px-6 py-4 bg-white/[0.03] hover:bg-[#298DFF]/[0.08] text-white rounded-xl transition-all duration-300 border border-white/[0.08] hover:border-[#298DFF]/30";

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <NetworkGrid className="inset-0" />
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#298DFF]/[0.03] rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 text-center relative">
        <span className="mono-label text-[#298DFF] mb-4 block">Connect</span>
        <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
          {t.communityCta.heading}
        </h2>
        <p className="animate-on-scroll text-white/40 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.communityCta.subheading}
        </p>
        <div className="animate-on-scroll flex justify-center gap-4 flex-wrap">
          <a
            href="https://t.me/suiportugal"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <svg className="w-5 h-5 text-[#298DFF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span>Telegram</span>
            <svg className="arrow-icon w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a
            href="https://x.com/suiportugal"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <svg className="w-5 h-5 text-[#298DFF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>X / Twitter</span>
            <svg className="arrow-icon w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a
            href="https://luma.com/wha9jsu2"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <svg className="w-5 h-5 text-[#298DFF]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span>Luma</span>
            <svg className="arrow-icon w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
