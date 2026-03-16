"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { CalendarIcon, LocationIcon, PeopleIcon, FreeIcon } from "@/components/Icons";
import WhatWeDoCards from "@/components/WhatWeDoCards";
import CommunityCTA from "@/components/CommunityCTA";
import HeroSlideshow from "@/components/HeroSlideshow";
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

export default function Home() {
  const { locale, t } = useLanguage();
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  useScrollAnimations();

  const schedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <>
      {/* ─── Hero ─── */}
      <section id="home" className="relative bg-[#0A1628] min-h-[90vh] flex items-center overflow-hidden">
        <HeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="animate-hero-text text-[#4DA2FF] font-medium text-sm tracking-wider uppercase mb-4">
            {t.hero.eyebrow}
          </p>
          <h1 className="animate-hero-text-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
            {t.hero.headline}
          </h1>
          <p className="animate-hero-text-delay-2 text-gray-300 text-lg md:text-xl max-w-2xl mb-10">
            {t.hero.subheadline}
          </p>
          <div className="animate-hero-text-delay-3 flex flex-wrap gap-4">
            <a
              href="#event"
              className="btn-shine inline-block px-8 py-4 bg-[#4DA2FF] hover:bg-[#3d8de6] text-white font-medium rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-[#4DA2FF]/25 hover:-translate-y-0.5"
            >
              {t.hero.cta}
            </a>
            <a
              href="#community"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300 text-lg border border-white/20 hover:border-white/30 hover:-translate-y-0.5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Featured Event ─── */}
      <section id="event" className="py-20 bg-[#0F1D32] relative overflow-hidden scroll-mt-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4DA2FF]/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="animate-on-scroll inline-block px-3 py-1 text-xs font-medium rounded-full border bg-[#00D4B4]/10 text-[#00D4B4] border-[#00D4B4]/20 mb-6">
            {t.featuredEvent.tag}
          </span>
          <div className="animate-on-scroll bg-gradient-to-br from-[#4DA2FF]/5 to-[#00D4B4]/5 border border-[#4DA2FF]/20 rounded-2xl p-8 md:p-12 hover:border-[#4DA2FF]/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="animate-fade-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {t.featuredEvent.name}
                </h2>
                <p className="text-[#4DA2FF] text-lg mb-4">
                  {t.featuredEvent.dates}
                </p>
                <p className="text-gray-300 text-lg max-w-2xl mb-8">
                  {t.featuredEvent.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
                  <span className="flex items-center gap-1.5"><CalendarIcon /> {t.featuredEvent.dateDetail}</span>
                  <span className="flex items-center gap-1.5"><LocationIcon /> {t.featuredEvent.locationDetail}</span>
                  <span className="flex items-center gap-1.5"><PeopleIcon /> {t.featuredEvent.spots}</span>
                  <span className="flex items-center gap-1.5"><FreeIcon /> {t.featuredEvent.price}</span>
                </div>
                <a
                  href="https://luma.com/wha9jsu2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-block px-8 py-4 bg-[#00D4B4] hover:bg-[#00b89d] text-[#0A1628] font-bold rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-[#00D4B4]/25 hover:-translate-y-0.5"
                >
                  {t.featuredEvent.cta}
                </a>
              </div>
              <div className="animate-fade-right flex justify-center">
                <Image
                  src="/images/events/making-the-ai-move.png"
                  alt="Sui Workshop — Making the AI Move"
                  width={480}
                  height={480}
                  className="rounded-2xl shadow-2xl w-full max-w-[480px] h-auto transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Promise ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="animate-on-scroll text-xl md:text-2xl text-[#1A1A2E] leading-relaxed font-medium">
            {t.eventDetail.promise}
          </p>
        </div>
      </section>

      {/* ─── What You'll Learn ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-on-scroll text-3xl font-bold text-[#1A1A2E] mb-12">
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
                className="animate-on-scroll card-hover bg-white rounded-xl p-6 border border-gray-200 hover:border-[#4DA2FF]/40"
              >
                <div className="text-[#4DA2FF] text-sm font-mono font-bold mb-2">
                  {mod.num}
                </div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">
                  {mod.title}
                </h3>
                <p className="text-[#6B7280]">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Agenda ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-on-scroll text-3xl font-bold text-[#1A1A2E] mb-8">
            {t.eventDetail.agendaHeading}
          </h2>
          <div className="animate-on-scroll flex gap-2 mb-8">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === 1
                  ? "bg-[#4DA2FF] text-white shadow-lg shadow-[#4DA2FF]/25"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              {t.eventDetail.day1}
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === 2
                  ? "bg-[#4DA2FF] text-white shadow-lg shadow-[#4DA2FF]/25"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              {t.eventDetail.day2}
            </button>
          </div>
          <div className="space-y-0">
            {schedule.map((item, i) => (
              <div
                key={`${activeDay}-${i}`}
                className={`flex gap-6 py-4 transition-all duration-300 hover:bg-[#EBF4FF]/50 rounded-lg px-3 -mx-3 ${
                  i < schedule.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-32 flex-shrink-0 text-sm font-mono text-[#4DA2FF]">
                  {item.time}
                </div>
                <div className="text-[#1A1A2E]">
                  {locale === "pt" ? item.pt : item.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Prerequisites ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-on-scroll text-3xl font-bold text-[#1A1A2E] mb-8">
            {t.eventDetail.prereqHeading}
          </h2>
          <ul className="space-y-3 mb-8 stagger-children">
            {prerequisites.map((item, i) => (
              <li key={i} className="animate-on-scroll flex items-start gap-3 group">
                <span className="text-[#00D4B4] mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span className="text-[#1A1A2E]">
                  {locale === "pt" ? item.pt : item.en}
                </span>
              </li>
            ))}
          </ul>
          <p className="animate-on-scroll text-[#6B7280] text-sm bg-[#EBF4FF] rounded-lg p-4">
            {t.eventDetail.prereqNote}
          </p>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="animate-on-scroll text-3xl font-bold text-[#1A1A2E] mb-6">
            {t.eventDetail.locationHeading}
          </h2>
          <div className="animate-on-scroll bg-[#EBF4FF] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">
              {t.eventDetail.locationName}
            </h3>
            <p className="text-[#6B7280] mb-4">{t.eventDetail.locationCity}</p>
            <p className="text-[#1A1A2E]">{t.eventDetail.locationDesc}</p>
            <div className="mt-6 bg-gray-200 rounded-xl h-48 flex items-center justify-center text-[#6B7280]">
              <span className="text-sm flex items-center gap-1.5"><LocationIcon /> Map embed placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Register CTA ─── */}
      <section className="py-20 bg-[#0A1628] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D4B4]/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-4">
            {t.eventDetail.registerHeading}
          </h2>
          <p className="animate-on-scroll text-gray-400 text-lg mb-8">
            {t.eventDetail.registerBody}
          </p>
          <a
            href="https://luma.com/wha9jsu2"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-on-scroll btn-shine inline-block px-8 py-4 bg-[#00D4B4] hover:bg-[#00b89d] text-[#0A1628] font-bold rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-[#00D4B4]/25 hover:-translate-y-0.5"
          >
            {t.eventDetail.registerCta}
          </a>
        </div>
      </section>

      {/* ─── What We Do ─── */}
      <WhatWeDoCards />

      {/* ─── About ─── */}
      <section id="about" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
                {t.aboutShort.heading}
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                {t.aboutShort.body}
              </p>
            </div>
            <div className="animate-fade-right flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-[#4DA2FF]/10 to-[#00D4B4]/10 rounded-2xl flex items-center justify-center border border-[#4DA2FF]/20 animate-float">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#4DA2FF] flex items-center justify-center font-bold text-white text-3xl mx-auto mb-4 shadow-lg shadow-[#4DA2FF]/30">
                    S
                  </div>
                  <p className="text-[#4DA2FF] font-bold text-xl">
                    Sui Portugal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Community ─── */}
      <div id="community" className="scroll-mt-16">
        <CommunityCTA />
      </div>
    </>
  );
}
