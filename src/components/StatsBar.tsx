"use client";

import { useEffect, useRef, useState } from "react";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedStat({ value, suffix, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center px-4 py-6 sm:py-8">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
        {count}
        <span className="text-[#298DFF]">{suffix}</span>
      </div>
      <div className="mono-label text-white/30 text-[0.65rem] sm:text-xs">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  const stats = [
    { value: 1000, suffix: "+", label: "Community Members" },
    { value: 21, suffix: "", label: "Events" },
    { value: 100, suffix: "+", label: "Builders Activated" },
    { value: 2, suffix: "", label: "Cities" },
  ];

  return (
    <section className="py-4 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.01]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${
                i < stats.length - 1 ? "border-b md:border-b-0 md:border-r border-white/[0.06]" : ""
              } ${i === 1 ? "border-r-0 md:border-r border-white/[0.06]" : ""}
              ${i === 0 ? "border-r border-white/[0.06] md:border-r" : ""}`}
            >
              <AnimatedStat {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
