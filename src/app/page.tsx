"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { CalendarIcon, LocationIcon, PeopleIcon, FreeIcon } from "@/components/Icons";
import EventCard from "@/components/EventCard";
import WhatWeDoCards from "@/components/WhatWeDoCards";
import CommunityCTA from "@/components/CommunityCTA";
import HeroSlideshow from "@/components/HeroSlideshow";
import { useScrollAnimations } from "@/hooks/useInView";

export default function Home() {
  const { t } = useLanguage();
  useScrollAnimations();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] min-h-[90vh] flex items-center overflow-hidden">
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
            <Link
              href="/events"
              className="btn-shine inline-block px-8 py-4 bg-[#4DA2FF] hover:bg-[#3d8de6] text-white font-medium rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-[#4DA2FF]/25 hover:-translate-y-0.5"
            >
              {t.hero.cta}
            </Link>
            <Link
              href="/community"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-300 text-lg border border-white/20 hover:border-white/30 hover:-translate-y-0.5"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-[#0F1D32] relative overflow-hidden">
        {/* Subtle background glow */}
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
                <Link
                  href="/events/making-the-ai-move"
                  className="btn-shine inline-block px-8 py-4 bg-[#00D4B4] hover:bg-[#00b89d] text-[#0A1628] font-bold rounded-lg transition-all duration-300 text-lg hover:shadow-lg hover:shadow-[#00D4B4]/25 hover:-translate-y-0.5"
                >
                  {t.featuredEvent.cta}
                </Link>
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

      {/* What We Do */}
      <WhatWeDoCards />

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A2E]">
              {t.upcomingEvents.heading}
            </h2>
            <Link
              href="/events"
              className="text-[#4DA2FF] hover:text-[#3d8de6] text-sm font-medium transition-colors hidden sm:block"
            >
              {t.upcomingEvents.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            <div className="animate-on-scroll">
              <EventCard
                name={t.upcomingEvents.event1Name}
                date={t.upcomingEvents.event1Date}
                location={t.upcomingEvents.event1Location}
                description={t.upcomingEvents.event1Desc}
                badge={t.upcomingEvents.event1Badge}
                cta={t.upcomingEvents.event1Cta}
                href="/events/making-the-ai-move"
              />
            </div>
            <div className="animate-on-scroll">
              <EventCard
                name={t.upcomingEvents.event2Name}
                date={t.upcomingEvents.event2Date}
                location={t.upcomingEvents.event2Location}
                description={t.upcomingEvents.event2Desc}
                badge={t.upcomingEvents.event2Badge}
                cta={t.upcomingEvents.event2Cta}
                href="/events"
              />
            </div>
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/events"
              className="text-[#4DA2FF] hover:text-[#3d8de6] text-sm font-medium transition-colors"
            >
              {t.upcomingEvents.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* About Short */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-left">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
                {t.aboutShort.heading}
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-6">
                {t.aboutShort.body}
              </p>
              <Link
                href="/about"
                className="text-[#4DA2FF] hover:text-[#3d8de6] font-medium transition-all duration-300 inline-flex items-center gap-1 group"
              >
                {t.aboutShort.link}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
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

      {/* Community CTA */}
      <CommunityCTA />
    </>
  );
}
