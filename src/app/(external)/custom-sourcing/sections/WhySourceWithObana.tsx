"use client";

// WhySourceWithObana.tsx

import React from "react";
import Image from "next/image";

// ── Assets — update these paths to match your project ──────────
import warehouseImg  from "@/app/assets/images/custom-sourcing-image/warehouseImg.png";
import iconFast      from "@/app/assets/images/custom-sourcing-image/iconFast.png";
import iconLogistics from "@/app/assets/images/custom-sourcing-image/iconLogistic.png";
import iconFinance   from "@/app/assets/images/custom-sourcing-image/iconFinance.png";
import iconGlobal    from "@/app/assets/images/custom-sourcing-image/iconGlobal.png";

const FEATURES = [
  {
    icon:  iconFast,
    title: "Fast Response",
    desc:  "Our sourcing team responds within 24–48 hours of submission.",
    side:  "left",
  },
  {
    icon:  iconFinance,
    title: "Embedded Financing",
    desc:  "Access working capital to fund inventory purchases — built into the platform.",
    side:  "left",
  },
  {
    icon:  iconLogistics,
    title: "Logistics Included",
    desc:  "We aggregate and optimise delivery via GIG Logistics and other partners.",
    side:  "right",
  },
  {
    icon:  iconGlobal,
    title: "Cross-Border Access",
    desc:  "Source globally, fashion, beauty, textiles, and equipment from verified brands.",
    side:  "right",
  },
];

const PARTNERS = [
  "Adidas Recommerce",
  "Jack & Jones",
  "Darling",
  "ICON Wholesale",
  "GIG Logistics",
  "Stellas Finance",
  "Fazsion.ng",
];

const FeatureCard: React.FC<{
  icon:  any;
  title: string;
  desc:  string;
}> = ({ icon, title, desc }) => (
  <div
    className="flex flex-col gap-3 rounded-2xl p-6"
    style={{
      background: "#DCF8F9",
      flex:       "1 1 0",
      minHeight:  "180px",
    }}
  >
    {/* Icon */}
    <div className="flex-shrink-0">
      <Image
        src={icon}
        alt={title}
        width={36}
        height={36}
        className="object-contain"
        unoptimized
      />
    </div>

    {/* Text */}
    <div>
      <h3
        className="font-bold mb-1.5 leading-snug"
        style={{
          color:      "#1B3B5F",
          fontSize:   "16px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed"
        style={{
          color:      "rgba(27,59,95,0.65)",
          fontSize:   "13px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        {desc}
      </p>
    </div>
  </div>
);

const WhySourceWithObana: React.FC = () => {
  const leftCards  = FEATURES.filter(f => f.side === "left");
  const rightCards = FEATURES.filter(f => f.side === "right");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          animation: marquee 22s linear infinite;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
      ` }} />

      <section
        className="w-full"
        style={{
          background: "#ffffff",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          padding:    "clamp(48px,7vw,80px) 0 0",
        }}
      >
        <div
          className="mx-auto px-4 sm:px-6 md:px-10"
          style={{ maxWidth: "1200px" }}
        >

          {/* ── Header ── */}
          <div className="text-center mb-10">
            <h2
              className="font-extrabold leading-tight mb-3"
              style={{
                color:      "#1B3B5F",
                fontSize:   "clamp(1.8rem, 4vw, 2.8rem)",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Why Source With Obana
            </h2>
            <p
              className="mx-auto"
              style={{
                color:     "rgba(27,59,95,0.6)",
                fontSize:  "clamp(0.9rem, 1.6vw, 1rem)",
                maxWidth:  "520px",
                lineHeight: 1.65,
              }}
            >
              Built to simplify sourcing, reduce operational stress, and connect
              businesses to verified supply opportunities globally.
            </p>
          </div>

          {/* ── 3-column grid ── */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: "1fr 340px 1fr",
              gap:    "16px",
              alignItems: "stretch",
            }}
          >

            {/* Left column */}
            <div className="flex flex-col gap-4">
              {leftCards.map(c => (
                <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} />
              ))}
            </div>

            {/* Center — warehouse image */}
            <div
              className="rounded-2xl overflow-hidden flex-shrink-0"
              style={{ position: "relative" }}
            >
              <Image
                src={warehouseImg}
                alt="Obana warehouse"
                fill
                className="object-cover object-center"
                sizes="340px"
                priority
                unoptimized
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              {rightCards.map(c => (
                <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} />
              ))}
            </div>

          </div>

          {/* ── Mobile — 2 col grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {/* Warehouse image on mobile */}
            <div
              className="sm:col-span-2 rounded-2xl overflow-hidden"
              style={{ height: "220px", position: "relative" }}
            >
              <Image
                src={warehouseImg}
                alt="Obana warehouse"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
                unoptimized
              />
            </div>

            {/* Feature cards */}
            {FEATURES.map(c => (
              <FeatureCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} />
            ))}
          </div>

        </div>

        {/* ── Trusted Partners strip ── */}
        <div
          className="mt-12 overflow-hidden"
          style={{
            borderTop:    "1px solid rgba(27,59,95,0.08)",
            borderBottom: "1px solid rgba(27,59,95,0.08)",
            padding:      "14px 0",
            background:   "#ffffff",
          }}
        >
          <div className="flex items-center gap-6 px-6 mb-0">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] flex-shrink-0"
              style={{ color: "rgba(27,59,95,0.4)" }}
            >
              Trusted Partners
            </p>
            <div className="flex-1 overflow-hidden">
              <div className="marquee-track">
                {[...PARTNERS, ...PARTNERS].map((p, i) => (
                  <span
                    key={i}
                    className="flex-shrink-0 mx-8 text-sm font-semibold"
                    style={{ color: "rgba(27,59,95,0.55)" }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default WhySourceWithObana;