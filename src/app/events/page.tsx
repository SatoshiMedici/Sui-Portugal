"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import EventCard from "@/components/EventCard";
import { useScrollAnimations } from "@/hooks/useInView";

type Filter = "all" | "upcoming" | "past";

export default function EventsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  useScrollAnimations();

  const events = [
    {
      name: t.upcomingEvents.event1Name,
      date: t.upcomingEvents.event1Date,
      location: t.upcomingEvents.event1Location,
      description: t.upcomingEvents.event1Desc,
      badge: t.upcomingEvents.event1Badge,
      cta: t.upcomingEvents.event1Cta,
      href: "/events/making-the-ai-move",
      type: "upcoming" as const,
    },
    {
      name: t.upcomingEvents.event2Name,
      date: t.upcomingEvents.event2Date,
      location: t.upcomingEvents.event2Location,
      description: t.upcomingEvents.event2Desc,
      badge: t.upcomingEvents.event2Badge,
      cta: t.upcomingEvents.event2Cta,
      href: "/events",
      type: "upcoming" as const,
    },
  ];

  const filtered =
    filter === "all" ? events : events.filter((e) => e.type === filter);

  return (
    <>
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="animate-hero-text text-4xl md:text-5xl font-bold text-white mb-4">
            {t.eventsPage.heading}
          </h1>
          <p className="animate-hero-text-delay-1 text-gray-400 text-lg max-w-2xl">
            {t.eventsPage.subheading}
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll flex gap-2 mb-8">
            {(["all", "upcoming", "past"] as Filter[]).map((f) => {
              const label =
                f === "all"
                  ? t.eventsPage.filterAll
                  : f === "upcoming"
                    ? t.eventsPage.filterUpcoming
                    : t.eventsPage.filterPast;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === f
                      ? "bg-[#4DA2FF] text-white shadow-lg shadow-[#4DA2FF]/25"
                      : "bg-white text-[#6B7280] hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {filtered.map((event) => (
              <div key={event.name} className="animate-on-scroll">
                <EventCard {...event} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#6B7280] py-12">
              No events found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
