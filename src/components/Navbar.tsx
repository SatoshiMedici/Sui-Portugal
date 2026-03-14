"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Navbar() {
  const { locale, t, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4DA2FF] flex items-center justify-center font-bold text-white text-sm">
              S
            </div>
            <span className="text-white font-bold text-lg">Sui Portugal</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/events"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/community"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t.nav.community}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/10 rounded-full text-sm">
              <button
                onClick={() => setLocale("en")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  locale === "en"
                    ? "bg-[#4DA2FF] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("pt")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  locale === "pt"
                    ? "bg-[#4DA2FF] text-white"
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
                className="w-6 h-6"
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

      {menuOpen && (
        <div className="md:hidden bg-[#0A1628] border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/events"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/community"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              {t.nav.community}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
