"use client";

export default function EcosystemTicker() {
  const items = [
    "Move Language",
    "Object-Centric Model",
    "zkLogin",
    "Sponsored Transactions",
    "Programmable Transaction Blocks",
    "Parallel Execution",
    "Sui dApp Kit",
    "Kiosk Framework",
    "DeepBook",
    "Sui Bridge",
    "Dynamic NFTs",
    "On-Chain Governance",
  ];

  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="py-6 bg-black overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 mx-4 sm:mx-6 text-white/20 text-sm sm:text-base font-medium tracking-wide shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-[#298DFF]/40 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
