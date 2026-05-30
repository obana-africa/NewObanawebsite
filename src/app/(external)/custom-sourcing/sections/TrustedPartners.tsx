"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

// ── Update these paths to match where your partner logos live ──
import adidasLogo   from "@/app/assets/images/partners/adidas.png";
import jackJonesLogo from "@/app/assets/images/partners/jack&jones.svg";
import darlingLogo  from "@/app/assets/images/partners/darling.png";
import iconLogo     from "@/app/assets/images/partners/icon-wholesale.png";
import gigLogo      from "@/app/assets/images/partners/gig.png";
import stellasLogo  from "@/app/assets/images/partners/stellas.jpg";
import fazsionLogo  from "@/app/assets/images/partners/fazsion.png";

export interface Partner {
  name: string;
  logo: StaticImageData;
}

interface TrustedPartnersProps {
  /** Override the list of partners. Falls back to the default list. */
  partners?: Partner[];
  /** Override the section label. Defaults to "Trusted Partners". */
  label?:    string;
  /** Marquee duration in seconds. Lower = faster. Defaults to 28. */
  speed?:    number;
  /** Optional className for the outer <section>. */
  className?: string;
}

const DEFAULT_PARTNERS: Partner[] = [
  { name: "Adidas Recommerce", logo: adidasLogo  },
  { name: "Jack & Jones",      logo: jackJonesLogo },
  { name: "Darling",           logo: darlingLogo },
  { name: "ICON Wholesale",    logo: iconLogo    },
  { name: "GIG Logistics",     logo: gigLogo     },
  { name: "Stellas Finance",   logo: stellasLogo },
  { name: "Fazsion.ng",        logo: fazsionLogo },
];

const TrustedPartners: React.FC<TrustedPartnersProps> = ({
  partners = DEFAULT_PARTNERS,
  label    = "Trusted Partners",
  speed    = 28,
  className,
}) => {
  // Duplicate 4x so even wide screens stay filled (seamless with -50% loop)
  const track = [...partners, ...partners, ...partners, ...partners];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tp-track {
          display: flex;
          align-items: center;
          animation: tp-marquee ${speed}s linear infinite;
          width: max-content;
        }
        .tp-track:hover { animation-play-state: paused; }

        .tp-cell {
          flex-shrink: 0;
          padding: 0 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(.2,.7,.3,1);
        }
        .tp-cell:hover,
        .tp-cell:focus-visible {
          transform: translateY(-4px);
          outline: none;
        }

        @media (max-width: 640px) {
          .tp-cell { padding: 0 16px; }
        }
      ` }} />

      <section
        className={`overflow-hidden ${className ?? ""}`}
        style={{
          borderTop:    "1px solid rgba(27,59,95,0.08)",
          borderBottom: "1px solid rgba(27,59,95,0.08)",
          padding:      "22px 0",
          background:   "#ffffff",
          fontFamily:   "'Bricolage Grotesque', sans-serif",
        }}
        aria-label={label}
      >
        <div className="flex items-center gap-5 px-6">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] flex-shrink-0"
            style={{ color: "rgba(27,59,95,0.4)" }}
          >
            {label}
          </p>

          <div className="flex-1 overflow-hidden">
            <div className="tp-track">
              {track.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="tp-cell"
                  tabIndex={0}
                  aria-hidden={i >= partners.length ? true : undefined}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    height={44}
                    style={{
                      height:    "44px",
                      width:     "auto",
                      maxWidth:  "160px",
                      objectFit: "contain",
                      display:   "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedPartners;