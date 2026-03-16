"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();

  const channels = [
    {
      name: "Telegram",
      desc: t.communityPage.telegramDesc,
      cta: t.communityPage.telegramCta,
      href: "https://t.me/suiportugal",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      desc: t.communityPage.twitterDesc,
      cta: t.communityPage.twitterCta,
      href: "https://x.com/suiportugal",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Luma",
      desc: t.communityPage.lumaDesc,
      cta: t.communityPage.lumaCta,
      href: "https://luma.com/wha9jsu2",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t.communityPage.heading}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-gray-50 min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {channels.map((channel) => (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl p-8 border border-gray-200 hover:border-[#4DA2FF]/40 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="text-[#4DA2FF] flex-shrink-0">
                  {channel.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                    {channel.name}
                  </h3>
                  <p className="text-[#6B7280] mb-4">{channel.desc}</p>
                  <span className="text-[#4DA2FF] font-medium group-hover:text-[#3d8de6] transition-colors">
                    {channel.cta}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
