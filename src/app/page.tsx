"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { CalendarIcon, LocationIcon, PeopleIcon, FreeIcon } from "@/components/Icons";
import WhatWeDoCards from "@/components/WhatWeDoCards";
import CommunityCTA from "@/components/CommunityCTA";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useScrollAnimations } from "@/hooks/useInView";

export default function Home() {
  const { t } = useLanguage();
  useScrollAnimations();

  return (
    <>
      {/* ─── Hero ─── */}
      <section id="home" className="relative bg-black min-h-[90vh] flex items-center overflow-hidden">
        <HeroSlideshow />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-20">
          <p className="animate-hero-text mono-label text-[#298DFF] mb-6" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            {t.hero.eyebrow}
          </p>
          <h1 className="animate-hero-text-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white max-w-4xl leading-[1.05] mb-8 tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.5)" }}>
            {t.hero.headline}
          </h1>
          {t.hero.subheadline && (
          <p className="animate-hero-text-delay-2 text-white/70 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            {t.hero.subheadline}
          </p>
          )}
          <div className="animate-hero-text-delay-3 flex flex-wrap gap-4">
            <a
              href="#event"
              className="arrow-hover btn-shine inline-flex items-center gap-2 px-8 py-4 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-lg transition-all duration-300 text-base hover:-translate-y-0.5"
            >
              {t.hero.cta}
              <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a
              href="#community"
              className="inline-block px-8 py-4 bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium rounded-lg transition-all duration-300 text-base border border-white/[0.1] hover:border-white/[0.2] hover:-translate-y-0.5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Dotted separator ─── */}
      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Featured Event ─── */}
      <section id="event" className="py-24 bg-black relative overflow-hidden scroll-mt-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#298DFF]/[0.03] rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 relative">
          <span className="animate-on-scroll mono-label text-[#298DFF] mb-6 inline-block">
            {t.featuredEvent.tag}
          </span>
          <Link href="/events/making-the-ai-move" className="block">
            <div className="animate-on-scroll bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 md:p-12 hover:border-[#298DFF]/30 hover:bg-[#298DFF]/[0.04] transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="animate-fade-left">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-[#298DFF] transition-colors duration-300 tracking-tight">
                    {t.featuredEvent.name}
                  </h2>
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
                  <span className="arrow-hover btn-shine inline-flex items-center gap-2 px-8 py-4 bg-[#298DFF] hover:bg-[#1a7ae6] text-white font-medium rounded-lg transition-all duration-300 text-base">
                    {t.featuredEvent.cta}
                    <svg className="arrow-icon w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </div>
                <div className="animate-fade-right flex justify-center">
                  <Image
                    src="/images/events/making-the-ai-move.png"
                    alt="Sui Workshop — Making the AI Move"
                    width={480}
                    height={480}
                    className="rounded-2xl w-full max-w-[480px] h-auto transition-transform duration-500 group-hover:scale-[1.02] border border-white/[0.08]"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Dotted separator ─── */}
      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── What We Do ─── */}
      <WhatWeDoCards />

      {/* ─── Dotted separator ─── */}
      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── About ─── */}
      <section id="about" className="py-24 bg-black scroll-mt-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-left">
              <span className="mono-label text-[#298DFF] mb-4 block">About</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                {t.aboutShort.heading}
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                {t.aboutShort.body}
              </p>
            </div>
            <div className="animate-fade-right flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-white/[0.02] rounded-2xl flex items-center justify-center border border-white/[0.08] animate-float">
                <div className="text-center">
                  <Image
                    src="/images/logo/SuiPortugal_Logo.png"
                    alt="Sui Portugal"
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <p className="text-[#298DFF] font-bold text-xl">
                    Sui Portugal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Dotted separator ─── */}
      <hr className="dotted-separator max-w-[1400px] mx-auto" />

      {/* ─── Community ─── */}
      <div id="community" className="scroll-mt-16">
        <CommunityCTA />
      </div>
    </>
  );
}
