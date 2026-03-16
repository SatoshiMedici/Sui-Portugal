"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

interface Partner {
  name: string;
  logo?: string;
  url?: string;
}

const partners: Partner[] = [
  { name: "IPX", logo: "/images/partners/IPX.png" },
  { name: "Scallop", logo: "/images/partners/Scallop.png" },
  { name: "Winter Walrus", logo: "/images/partners/Winter.png" },
];

export default function Partners() {
  const { locale } = useLanguage();

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <span className="mono-label text-[#298DFF] mb-4 block">
            {locale === "pt" ? "Parceiros" : "Partners"}
          </span>
          <h2 className="animate-on-scroll text-3xl md:text-5xl font-bold text-white tracking-tight">
            {locale === "pt" ? "Quem nos apoia" : "Backed by the best"}
          </h2>
        </div>

        <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {partners.map((partner) => {
            const inner = (
              <div className="group bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex items-center justify-center aspect-[2/1] hover:border-[#298DFF]/20 hover:bg-[#298DFF]/[0.04] transition-all duration-300">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={48}
                    className="max-h-10 sm:max-h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300 text-sm sm:text-base font-semibold tracking-tight text-center leading-tight">
                    {partner.name}
                  </span>
                )}
              </div>
            );

            return partner.url ? (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={partner.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
