"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
  isUnmuted: boolean;
  onToggleSound: () => void;
}

function VideoCard({ videoId, title, description, isUnmuted, onToggleSound }: VideoCardProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Stable iframe src — never changes after mount so the video doesn't reload
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1${origin ? `&origin=${origin}` : ""}`;

  const postCommand = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  }, []);

  // Sync mute/unmute state via postMessage whenever isUnmuted changes
  useEffect(() => {
    if (isUnmuted) {
      postCommand("unMute");
      postCommand("setVolume", [100]);
    } else {
      postCommand("mute");
    }
  }, [isUnmuted, postCommand]);

  return (
    <div className="relative overflow-hidden">
      {/* Scale up to crop YouTube title/watermark area */}
      <div className="relative w-full aspect-video overflow-hidden">
        <iframe
          ref={iframeRef}
          src={origin ? embedUrl : undefined}
          title={title}
          className="absolute w-full h-full pointer-events-none"
          style={{
            top: "-10%",
            left: "-5%",
            width: "110%",
            height: "120%",
          }}
          allow="autoplay; encrypted-media"
        />
      </div>
      {/* Opaque strip at top to cover any YouTube title that briefly appears */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      {/* Title and description overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none px-5 pb-5 pt-12">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-white/80 text-sm mt-1 leading-relaxed">{description}</p>
      </div>
      {/* Sound toggle button */}
      <button
        onClick={onToggleSound}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
        aria-label={isUnmuted ? "Mute video" : "Unmute video"}
      >
        {!isUnmuted ? (
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
  // null = both muted, "video1" or "video2" = that one is unmuted
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const toggleVideo = (id: string) => {
    setActiveVideo((prev) => (prev === id ? null : id));
  };

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
            isUnmuted={activeVideo === "video1"}
            onToggleSound={() => toggleVideo("video1")}
          />
          <VideoCard
            videoId="GE-LTKNCBtA"
            title={t.whatWeDo.card3Title}
            description={t.whatWeDo.card3Body}
            isUnmuted={activeVideo === "video2"}
            onToggleSound={() => toggleVideo("video2")}
          />
      </div>
    </section>
  );
}
