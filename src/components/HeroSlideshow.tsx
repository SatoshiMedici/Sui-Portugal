"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroImages = [
  "/images/hero/Hero-1.jpeg",
  "/images/hero/Hero-2.jpg",
  "/images/hero/Hero-3.jpg",
  "/images/hero/Hero-4.jpg",
  "/images/hero/Hero-5.jpg",
  "/images/hero/Hero-6.jpg",
  "/images/hero/Hero-7.jpg",
  "/images/hero/Hero-8.jpg",
  "/images/hero/Hero-9.jpg",
  "/images/hero/Hero-10.jpg",
  "/images/hero/Hero-11.jpeg",
  "/images/hero/Hero-12.jpeg",
  "/images/hero/Hero-13.jpeg",
  "/images/hero/Hero-14.jpg",
  "/images/hero/Hero-15.jpg",
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="absolute inset-0">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-all duration-[1500ms] ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
          }}
        >
          <Image
            src={src}
            alt={`Sui Portugal community event ${i + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}
      {/* Bottom fade only - no dark filter */}
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent" />
    </div>
  );
}
