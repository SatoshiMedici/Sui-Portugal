"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function WhatWeDoCards() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: "🛠",
      title: t.whatWeDo.card1Title,
      body: t.whatWeDo.card1Body,
    },
    {
      icon: "🌐",
      title: t.whatWeDo.card2Title,
      body: t.whatWeDo.card2Body,
    },
    {
      icon: "🚀",
      title: t.whatWeDo.card3Title,
      body: t.whatWeDo.card3Body,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1A1A2E] text-center mb-12">
          {t.whatWeDo.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#EBF4FF] rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                {card.title}
              </h3>
              <p className="text-[#6B7280] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
