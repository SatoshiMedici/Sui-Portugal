"use client";

import Link from "next/link";

interface EventCardProps {
  name: string;
  date: string;
  location: string;
  description: string;
  badge: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export default function EventCard({
  name,
  date,
  location,
  description,
  badge,
  cta,
  href,
  featured,
}: EventCardProps) {
  const badgeColor = badge.toLowerCase().includes("open")
    ? "bg-[#00D4B4]/10 text-[#00D4B4] border-[#00D4B4]/20"
    : "bg-[#4DA2FF]/10 text-[#4DA2FF] border-[#4DA2FF]/20";

  if (featured) {
    return (
      <div className="bg-gradient-to-br from-[#4DA2FF]/10 to-[#00D4B4]/10 border border-[#4DA2FF]/20 rounded-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${badgeColor} mb-4`}
            >
              {badge}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {name}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <span>📅</span> {date}
              </span>
              <span className="flex items-center gap-1">
                <span>📍</span> {location}
              </span>
            </div>
            <p className="text-gray-300 text-base max-w-xl">{description}</p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href={href}
              className="inline-block px-6 py-3 bg-[#4DA2FF] hover:bg-[#3d8de6] text-white font-medium rounded-lg transition-colors"
            >
              {cta}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBF4FF] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-[#4DA2FF]/40 transition-colors">
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${badgeColor} mb-3`}
      >
        {badge}
      </span>
      <h3 className="text-lg font-bold text-[#1A1A2E] dark:text-white mb-1">
        {name}
      </h3>
      <div className="flex flex-wrap gap-3 text-sm text-[#6B7280] mb-3">
        <span>📅 {date}</span>
        <span>📍 {location}</span>
      </div>
      <p className="text-[#6B7280] text-sm mb-4">{description}</p>
      <Link
        href={href}
        className="inline-block text-[#4DA2FF] hover:text-[#3d8de6] text-sm font-medium transition-colors"
      >
        {cta}
      </Link>
    </div>
  );
}
