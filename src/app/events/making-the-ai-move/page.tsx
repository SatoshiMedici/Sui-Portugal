"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { CalendarIcon, LocationIcon, PeopleIcon, FreeIcon } from "@/components/Icons";
import { useScrollAnimations } from "@/hooks/useInView";

const day1Schedule = [
  { time: "11:00 – 11:15", en: "Arrival, coffee, toolchain check", pt: "Chegada, café, verificação de ferramentas" },
  { time: "11:15 – 11:30", en: "Opening — Why Sui, why Move, why now", pt: "Abertura — Porquê Sui, porquê Move, porquê agora" },
  { time: "11:30 – 12:15", en: "Modules 1 + 2 — Sui and Move foundations", pt: "Módulos 1 + 2 — Fundamentos de Sui e Move" },
  { time: "12:15 – 12:30", en: "Break", pt: "Pausa" },
  { time: "12:30 – 13:45", en: "Module 3 — Move Continued", pt: "Módulo 3 — Move Continuação" },
  { time: "13:45 – 14:45", en: "Lab — Write, test, and deploy to Sui testnet", pt: "Lab — Escrever, testar e fazer deploy na testnet Sui" },
  { time: "14:45 – 15:00", en: "Day 1 wrap-up + preview of Day 2", pt: "Encerramento do Dia 1 + preview do Dia 2" },
];

const day2Schedule = [
  { time: "11:00 – 11:15", en: "Arrival, coffee, Day 1 recap", pt: "Chegada, café, resumo do Dia 1" },
  { time: "11:15 – 12:00", en: "Module 4 — Building a dApp on Sui", pt: "Módulo 4 — Construir uma dApp na Sui" },
  { time: "12:00 – 12:15", en: "Break", pt: "Pausa" },
  { time: "12:15 – 12:55", en: "Module 5 — zkLogin + Sponsored Transactions", pt: "Módulo 5 — zkLogin + Transações Patrocinadas" },
  { time: "12:55 – 13:50", en: "Claude Code — Maximising your dev workflow with AI", pt: "Claude Code — Maximizar o teu workflow com IA" },
  { time: "13:50 – 15:00", en: "Free build + volunteer demos + close", pt: "Construção livre + demos voluntárias + encerramento" },
];

const prerequisites = [
  { en: "Install Rust", pt: "Instalar Rust" },
  { en: "Install the Sui CLI (sui --version should work)", pt: "Instalar o Sui CLI (sui --version deve funcionar)" },
  { en: "Create a Sui wallet + get testnet tokens", pt: "Criar uma wallet Sui + obter tokens da testnet" },
  { en: "Install VS Code + Move Analyzer extension", pt: "Instalar VS Code + extensão Move Analyzer" },
  { en: "Clone the starter repo (link shared on registration)", pt: "Clonar o repositório inicial (link partilhado no registo)" },
  { en: "Join the Sui Portugal Telegram (link shared on registration)", pt: "Entrar no Telegram Sui Portugal (link partilhado no registo)" },
];

export default function MakingTheAiMovePage() {
  const { locale, t } = useLanguage();
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  useScrollAnimations();

  const schedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <>
      {/* ─── Event Hero ─── */}
      <section className="relative bg-black pt-24 pb-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#298DFF]/[0.03] rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative">
          <Link
            href="/"
            className="arrow-hover inline-flex items-center gap-2 text-[#298DFF] hover:text-white text-sm font-medium mb-8 transition-colors duration-300"
          >
            <svg className="arrow-icon w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {locale === "pt" ? "Voltar" : "Back"}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-left">
              <span className="mono-label text-[#298DFF] mb-6 inline-block">
                {t.featuredEvent.tag}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                {t.featuredEvent.name}
              </h1>
              <p className="text-[#298DFF] text-lg mb-6 font-medium">
                {t.featuredEvent.dates}
              </p>
              <p className="text-white/50 text-lg max-w-2xl mb-8 leading-relaxed">
                {t.featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-white/40 mb-10">
                <span className="flex items-center gap-1.5"><CalendarIcon /> {t.featuredEvent.dateDetail}</span>
                <span className="flex items-center gap-1.5"><LocationIcon /> {t.featuredEvent.locationDetail}</span>
                <span className="flex items-center gap-1.5"><PeopleIcon /> {t.featuredEvent.spots}</span>
                <span className="flex items-center gap-1.5"><FreeIcon /> {t.featuredEvent.price}</span>
              </div>
              <a
                href="https://luma.com/wha9jsu2"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-hover btn-shine inline-flex items-center gap-2 px-8 py-4 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-lg transition-all duration-300 text-base hover:-translate-y-0.5"
              >
                {t.featuredEvent.cta}
                <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
            </div>
            <div className="animate-fade-right flex justify-center">
              <Image
                src="/images/events/making-the-ai-move.webp"
                alt="Sui Workshop — Making the AI Move"
                width={480}
                height={480}
                className="rounded-2xl w-full max-w-[480px] h-auto transition-transform duration-500 hover:scale-[1.02] border border-white/[0.08]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Promise ─── */}
      <section className="py-16 bg-black border-t border-white/[0.08]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
          <p className="animate-on-scroll text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
            {t.eventDetail.promise}
          </p>
        </div>
      </section>

      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── What You'll Learn ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <span className="mono-label text-[#298DFF] mb-4 block">Curriculum</span>
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
            {t.eventDetail.learnHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {[
              { title: t.eventDetail.mod1Title, desc: t.eventDetail.mod1Desc, num: "01" },
              { title: t.eventDetail.mod2Title, desc: t.eventDetail.mod2Desc, num: "02" },
              { title: t.eventDetail.mod3Title, desc: t.eventDetail.mod3Desc, num: "03" },
              { title: t.eventDetail.mod4Title, desc: t.eventDetail.mod4Desc, num: "04" },
              { title: t.eventDetail.mod5Title, desc: t.eventDetail.mod5Desc, num: "05" },
              { title: t.eventDetail.mod6Title, desc: t.eventDetail.mod6Desc, num: "+" },
            ].map((mod) => (
              <div
                key={mod.num}
                className="animate-on-scroll card-hover bg-white/[0.02] rounded-xl p-6 border border-white/[0.08] hover:border-[#298DFF]/30"
              >
                <div className="text-[#298DFF] text-sm font-mono font-bold mb-3">
                  {mod.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {mod.title}
                </h3>
                <p className="text-white/40 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Agenda ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <span className="mono-label text-[#298DFF] mb-4 block">Schedule</span>
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">
            {t.eventDetail.agendaHeading}
          </h2>
          <div className="animate-on-scroll flex gap-2 mb-10">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeDay === 1
                  ? "bg-[#298DFF] text-white"
                  : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60 border border-white/[0.08]"
              }`}
            >
              {t.eventDetail.day1}
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeDay === 2
                  ? "bg-[#298DFF] text-white"
                  : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60 border border-white/[0.08]"
              }`}
            >
              {t.eventDetail.day2}
            </button>
          </div>
          <div className="space-y-0">
            {schedule.map((item, i) => (
              <div
                key={`${activeDay}-${i}`}
                className={`flex gap-6 py-5 transition-all duration-300 hover:bg-white/[0.02] rounded-lg px-4 -mx-4 ${
                  i < schedule.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <div className="w-32 flex-shrink-0 text-sm font-mono text-[#298DFF]">
                  {item.time}
                </div>
                <div className="text-white/70">
                  {locale === "pt" ? item.pt : item.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Prerequisites ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
          <span className="mono-label text-[#298DFF] mb-4 block">Preparation</span>
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight">
            {t.eventDetail.prereqHeading}
          </h2>
          <ul className="space-y-4 mb-10 stagger-children">
            {prerequisites.map((item, i) => (
              <li key={i} className="animate-on-scroll flex items-start gap-3 group">
                <span className="text-[#298DFF] mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span className="text-white/60">
                  {locale === "pt" ? item.pt : item.en}
                </span>
              </li>
            ))}
          </ul>
          <p className="animate-on-scroll text-white/40 text-sm bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 leading-relaxed">
            {t.eventDetail.prereqNote}
          </p>
        </div>
      </section>

      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Location ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          <span className="mono-label text-[#298DFF] mb-4 block">Venue</span>
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            {t.eventDetail.locationHeading}
          </h2>
          <div className="animate-on-scroll bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
              {t.eventDetail.locationName}
            </h3>
            <p className="text-white/40 mb-4">{t.eventDetail.locationCity}</p>
            <p className="text-white/60">{t.eventDetail.locationDesc}</p>
            <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl h-48 flex items-center justify-center text-white/30">
              <span className="text-sm flex items-center gap-1.5"><LocationIcon /> Map embed placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Register CTA ─── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#298DFF]/[0.03] rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 text-center relative">
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            {t.eventDetail.registerHeading}
          </h2>
          <p className="animate-on-scroll text-white/40 text-lg mb-10">
            {t.eventDetail.registerBody}
          </p>
          <a
            href="https://luma.com/wha9jsu2"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-on-scroll arrow-hover btn-shine inline-flex items-center gap-2 px-8 py-4 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-lg transition-all duration-300 text-base hover:-translate-y-0.5"
          >
            {t.eventDetail.registerCta}
            <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </section>
    </>
  );
}
