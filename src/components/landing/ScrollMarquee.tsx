import React from 'react'

export function ScrollMarquee() {
  const content = "GENETIC CEILING CALCULATOR  ·  INDIAN MEAL PLANS  ·  DAILY GROWTH PROTOCOL  ·  REAL SCIENCE  ·  ZERO SUGAR  ·  "

  return (
    <div className="relative z-20 flex w-full items-center overflow-hidden border-y border-border bg-surface py-4">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-marquee {
            animation-duration: 35s;
          }
        }
      `}</style>
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        <span className="pr-4 font-body text-[11px] uppercase tracking-widest text-text-muted">
          {content.repeat(4)}
        </span>
        <span className="pr-4 font-body text-[11px] uppercase tracking-widest text-text-muted">
          {content.repeat(4)}
        </span>
      </div>
    </div>
  )
}
