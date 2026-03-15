"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

function VideoCard({ videoId, title }: VideoCardProps) {
  const [muted, setMuted] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const baseParams = `autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${baseParams}&mute=${muted ? 1 : 0}${origin ? `&origin=${origin}` : ""}`;

  return (
    <div className="relative overflow-hidden group">
      <div className="relative w-full aspect-video overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full scale-[1.05] pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      </div>
      {/* Sound toggle button */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-3.72a.75.75 0 0 1 1.28.53v14.88a.75.75 0 0 1-1.28.53l-4.72-3.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-3.72a.75.75 0 0 1 1.28.53v14.88a.75.75 0 0 1-1.28.53L6.75 15.75H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function WhatWeDoCards() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-[#1A1A2E] text-center mb-12 px-4">
        {t.whatWeDo.heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
          <VideoCard
            videoId="aCwi8uXMA8A"
            title={t.whatWeDo.card2Title}
            description={t.whatWeDo.card2Body}
          />
          <VideoCard
            videoId="GE-LTKNCBtA"
            title={t.whatWeDo.card3Title}
            description={t.whatWeDo.card3Body}
          />
      </div>
    </section>
  );
}
