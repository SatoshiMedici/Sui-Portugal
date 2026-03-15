"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface VideoCardProps {
  src: string;
  title: string;
  description: string;
}

function VideoCard({ src, title, description }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full aspect-video object-cover"
      />
      {/* Subtle gradient overlay at the bottom for text */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      {/* Title & description */}
      <div className="absolute bottom-0 inset-x-0 p-6">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>
      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1A1A2E] text-center mb-12">
          {t.whatWeDo.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VideoCard
            src="/videos/meetup.mp4"
            title={t.whatWeDo.card2Title}
            description={t.whatWeDo.card2Body}
          />
          <VideoCard
            src="/videos/builders-activation.mp4"
            title={t.whatWeDo.card3Title}
            description={t.whatWeDo.card3Body}
          />
        </div>
      </div>
    </section>
  );
}
