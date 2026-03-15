"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import EventCard from "@/components/EventCard";
import WhatWeDoCards from "@/components/WhatWeDoCards";
import CommunityCTA from "@/components/CommunityCTA";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A1628] min-h-[90vh] flex items-center overflow-hidden">
        {/* Slideshow background */}
        <HeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-[#4DA2FF] font-medium text-sm tracking-wider uppercase mb-4">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
            {t.hero.headline}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
            {t.hero.subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-block px-8 py-4 bg-[#4DA2FF] hover:bg-[#3d8de6] text-white font-medium rounded-lg transition-colors text-lg"
            >
              {t.hero.cta}
            </Link>
            <Link
              href="/community"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg transition-colors text-lg border border-white/10"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-[#0F1D32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border bg-[#00D4B4]/10 text-[#00D4B4] border-[#00D4B4]/20 mb-6">
            {t.featuredEvent.tag}
          </span>
          <div className="bg-gradient-to-br from-[#4DA2FF]/5 to-[#00D4B4]/5 border border-[#4DA2FF]/20 rounded-2xl p-8 md:p-12">
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
              <span>📅 {t.featuredEvent.dateDetail}</span>
              <span>📍 {t.featuredEvent.locationDetail}</span>
              <span>👥 {t.featuredEvent.spots}</span>
              <span>🆓 {t.featuredEvent.price}</span>
            </div>
            <Link
              href="/events/making-the-ai-move"
              className="inline-block px-8 py-4 bg-[#00D4B4] hover:bg-[#00b89d] text-[#0A1628] font-bold rounded-lg transition-colors text-lg"
            >
              {t.featuredEvent.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <WhatWeDoCards />

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventCard
              name={t.upcomingEvents.event1Name}
              date={t.upcomingEvents.event1Date}
              location={t.upcomingEvents.event1Location}
              description={t.upcomingEvents.event1Desc}
              badge={t.upcomingEvents.event1Badge}
              cta={t.upcomingEvents.event1Cta}
              href="/events/making-the-ai-move"
            />
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
            <div>
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-6">
                {t.aboutShort.heading}
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-6">
                {t.aboutShort.body}
              </p>
              <Link
                href="/about"
                className="text-[#4DA2FF] hover:text-[#3d8de6] font-medium transition-colors"
              >
                {t.aboutShort.link}
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-[#4DA2FF]/10 to-[#00D4B4]/10 rounded-2xl flex items-center justify-center border border-[#4DA2FF]/20">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#4DA2FF] flex items-center justify-center font-bold text-white text-3xl mx-auto mb-4">
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
