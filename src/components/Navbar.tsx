"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass =
    "text-white/60 hover:text-white transition-colors duration-300 text-sm tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#298DFF] after:transition-all after:duration-300 hover:after:w-full";

  const mobileLinkClass =
    "block text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled"
          : "bg-black/60 backdrop-blur-sm"
      } border-b border-white/[0.08]`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo/SuiPortugal_Logo.png"
              alt="Sui Portugal"
              width={28}
              height={28}
              className="rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-semibold tracking-tight">Sui Portugal</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className={navLinkClass}>{t.nav.home}</a>
            <a href="#event" className={navLinkClass}>{t.nav.events}</a>
            <a href="#about" className={navLinkClass}>{t.nav.about}</a>
            <a href="#community" className={navLinkClass}>{t.nav.community}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex items-center bg-white/[0.06] rounded-full text-xs border border-white/[0.08]">
              {/* Sliding indicator */}
              <div
                className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[#298DFF] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_12px_rgba(41,141,255,0.4)]"
                style={{ left: locale === "en" ? "2px" : "calc(50% + 0px)" }}
              />
              <button
                onClick={() => setLocale("en")}
                className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300 ${
                  locale === "en"
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("pt")}
                className={`relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300 ${
                  locale === "pt"
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                PT
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/[0.08]">
          <div className="px-6 py-4 space-y-3">
            <a href="#home" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>{t.nav.home}</a>
            <a href="#event" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>{t.nav.events}</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>{t.nav.about}</a>
            <a href="#community" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>{t.nav.community}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
