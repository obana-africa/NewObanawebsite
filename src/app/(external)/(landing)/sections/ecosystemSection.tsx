"use client";

import React, { useState, useRef } from "react";
import { Landmark, Truck, LayoutDashboard, Box } from "lucide-react";

const ECOSYSTEM_FEATURES = [
  {
    id: "source",
    title: "Source",
    description: "Discover & procure inventory from verified local and global suppliers at competitive prices.",
    icon: Box,
    href: "http://shop.obana.africa",
  },
  {
    id: "finance",
    title: "Finance",
    description: "Flexible credit, ONPSS for stock, and working capital tools built for fashion & beauty cash flows.",
    icon: Landmark,
    href: "/obana-pss",
  },
  {
    id: "deliver",
    title: "Deliver",
    description: "logistics across cities and cross-border — trackable, reliable, affordable.",
    icon: Truck,
    href: "http://logistics.obana.africa",
  },
  {
    id: "digitalise",
    title: "Digitalise",
    description: "POS, online storefront, inventory management, and analytics — in one seamless dashboard.",
    icon: LayoutDashboard,
    href: "http://thaja.africa", 
  },
];

/* Determine if a URL is external (full http(s)) vs internal (relative path) */
const isExternal = (url: string) => /^https?:\/\//i.test(url);

// ── Separate card component so useState is at component level ──
const EcoCard: React.FC<{
  feature: typeof ECOSYSTEM_FEATURES[0];
  idx: number;
}> = ({ feature, idx }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  const external = isExternal(feature.href);

  return (
    <a
      href={feature.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${feature.title}: ${feature.description}`}
      className="group flex flex-col items-center text-center rounded-2xl no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-[#1b3b5f]"
      style={{
        width: "250px",
        flexShrink: 0,
        animationDelay: `${idx * 100}ms`,
        textDecoration: "none",
        color: "inherit",
        padding: "8px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Circle */}
      <div
        style={{
          width: "130px", height: "130px", flexShrink: 0,
          borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          background: hovered ? "#1b3b5f" : "#ffffff",
          border: hovered ? "2px solid transparent" : "2px dashed rgba(27,59,95,0.4)",
          boxShadow: hovered
            ? "0 8px 24px rgba(27,59,95,0.25)"
            : "0 2px 8px rgba(27,59,95,0.06)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      >
        <Icon
          size={50}
          strokeWidth={1.2}
          style={{ color: hovered ? "#ffffff" : "#1b3b5f", transition: "color 0.3s ease" }}
        />
      </div>

      <h3
        className="text-xl md:text-2xl font-bold text-primary mb-3 tracking-tight"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {feature.title}
      </h3>

      <p
        className="text-primary/65 text-sm leading-relaxed font-semibold"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif", maxWidth: "190px" }}
      >
        {feature.description}
      </p>
    </a>
  );
};

const EcosystemSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes softPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.03); }
        }
        .eco-orb { animation: softPulse 8s ease-in-out infinite; }
      ` }} />

      <section
        id="how-it-works"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#F9FCFE",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          padding: "clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />

        {/* Orbs */}
        <div className="eco-orb absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,59,95,0.1) 0%, transparent 70%)", zIndex: 0 }} />
        <div className="eco-orb absolute bottom-10 right-10 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", zIndex: 0, animationDelay: "2s" }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 tracking-tight">
              Obana Ecosystem
            </h2>
            <p className="text-base md:text-lg text-primary/70 max-w-2xl mx-auto">
              From accessing products to moving goods and enabling distribution, every part of Obana works together to simplify modern commerce.
            </p>
          </div>

          {/* ── Cards row ── */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
            {ECOSYSTEM_FEATURES.map((feature, idx) => (
              <React.Fragment key={feature.id}>
                <EcoCard feature={feature} idx={idx} />
                {idx < ECOSYSTEM_FEATURES.length - 1 && (
                  <>
                    <div
                      className="hidden md:block flex-shrink-0"
                      style={{ marginTop: "45px", width: "80px" }}
                      aria-hidden="true"
                    >
                      <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                        <path
                          d="M2 20 Q15 4 30 20 Q45 36 60 20"
                          stroke="#1b3b5f"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div
                      className="flex md:hidden justify-center my-1"
                      style={{ width: "200px" }}
                      aria-hidden="true"
                    >
                      <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
                        <path
                          d="M20 0 Q4 9 20 18 Q36 27 20 36"
                          stroke="#1b3b5f"
                          strokeWidth="2"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default EcosystemSection;