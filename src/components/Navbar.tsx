"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled"
          : "bg-[#0A1628]/80 backdrop-blur-sm"
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#4DA2FF] flex items-center justify-center font-bold text-white text-sm transition-transform duration-300 group-hover:scale-110">
              S
            </div>
            <span className="text-white font-bold text-lg">Sui Portugal</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#4DA2FF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/events"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#4DA2FF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#4DA2FF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/community"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#4DA2FF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {t.nav.community}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/10 rounded-full text-sm">
              <button
                onClick={() => setLocale("en")}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  locale === "en"
                    ? "bg-[#4DA2FF] text-white shadow-lg shadow-[#4DA2FF]/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("pt")}
                className={`px-3 py-1 rounded-full transition-all duration-300 ${
                  locale === "pt"
                    ? "bg-[#4DA2FF] text-white shadow-lg shadow-[#4DA2FF]/25"
                    : "text-gray-400 hover:text-white"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
        <div className="bg-[#0A1628]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/events"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/community"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300"
            >
              {t.nav.community}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
