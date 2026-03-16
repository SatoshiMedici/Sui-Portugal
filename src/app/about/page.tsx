"use client";

import { useLanguage } from "@/lib/LanguageContext";
import WhatWeDoCards from "@/components/WhatWeDoCards";
import CommunityCTA from "@/components/CommunityCTA";
import { useScrollAnimations } from "@/hooks/useInView";

export default function AboutPage() {
  const { t } = useLanguage();
  useScrollAnimations();

  return (
    <>
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="animate-hero-text text-4xl md:text-5xl font-bold text-white">
            {t.aboutPage.heading}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 stagger-children">
          {t.aboutPage.whoWeAre.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="animate-on-scroll text-[#6B7280] text-lg leading-relaxed mb-6 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <WhatWeDoCards />
      <CommunityCTA />
    </>
  );
}
