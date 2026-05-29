"use client";

import React from "react";
import Image from "next/image";
import customImage from "@/app/assets/customImg.png";

interface Props {
  onSubmitDeal?:       () => void;
  onBrowseCategories?: () => void;
}

/* Brand palette */
const NAVY = "#1B3B5F";
const CYAN = "#DCF8F9";

/* ──────────────────────────────────────────────
   ICONS
   ────────────────────────────────────────────── */
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3"  y="3"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3"  y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 3v6h6 M8 13h8 M8 17h5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLink = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M10 14a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTrend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 17l6-6 4 4 8-8 M14 7h7v7"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20.59 13.41L13.42 20.58a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" />
  </svg>
);
const IconWallet = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 8H6a2 2 0 010-4h12v4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 6v12a2 2 0 002 2h14V8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="17" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

const STEPS = [
  { title: "Browse Categories",     desc: "Explore verified fashion, beauty, fabrics, trims & equipment.", Icon: IconGrid  },
  { title: "Tell Us What You Need", desc: "Share product details, quantities & target pricing.",           Icon: IconDoc   },
  { title: "Get Matched",           desc: "Receive verified quotations & logistics support.",               Icon: IconLink  },
  { title: "Secure & Scale",        desc: "Access embedded financing & cross-border logistics.",            Icon: IconTrend },
];

/* ──────────────────────────────────────────────
   Floating value-card
   ────────────────────────────────────────────── */
type FloatingCardProps = {
  icon:      React.ReactNode;
  title:     string;
  desc:      string;
  style:     React.CSSProperties;
  className: string;
};

const FloatingCard: React.FC<FloatingCardProps> = ({
  icon, title, desc, style, className,
}) => (
  <div
    className={`floating-card ${className}`}
    tabIndex={0}
    style={{
      position:        "absolute",
      background:      "rgba(255,255,255,0.97)",
      backdropFilter:  "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius:    "12px",
      padding:         "9px 12px 9px 9px",
      display:         "flex",
      alignItems:      "center",
      gap:             "9px",
      boxShadow:       "0 8px 22px rgba(27,59,95,0.14), 0 1px 4px rgba(27,59,95,0.05)",
      border:          "1px solid rgba(255,255,255,0.7)",
      minWidth:        "158px",
      cursor:          "default",
      outline:         "none",
      ...style,
    }}
  >
    <div style={{ flexShrink: 0 }}>{icon}</div>
    <div style={{ minWidth: 0 }}>
      <h5 className="fc-title" style={{
        margin: 0, fontSize: "11.5px", fontWeight: 700,
        color: NAVY, lineHeight: 1.2,
      }}>
        {title}
      </h5>
      <p className="fc-desc" style={{
        margin: "2px 0 0", fontSize: "9.5px",
        color: "#647186", lineHeight: 1.35,
      }}>
        {desc}
      </p>
    </div>
  </div>
);

const IconBadge: React.FC<{ bg: string; fg: string; size?: number; children: React.ReactNode }> =
  ({ bg, fg, size = 32, children }) => (
    <div style={{
      width: size, height: size, borderRadius: 9,
      background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {children}
    </div>
  );

/* ──────────────────────────────────────────────
   Main
   ────────────────────────────────────────────── */
const CustomSourcingHero: React.FC<Props> = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cs-headline { animation: fadeUp    0.7s ease 0.10s both; }
        .cs-desc     { animation: fadeUp    0.7s ease 0.25s both; }
        .cs-steps    { animation: fadeUp    0.7s ease 0.40s both; }
        .cs-img      { animation: fadeIn    1.0s ease 0.20s both; }
        .deco        { animation: fadeIn    1.2s ease 0.05s both; }

        .float-card-1 { animation: fadeRight 0.55s ease 0.55s both; }
        .float-card-2 { animation: fadeRight 0.55s ease 0.70s both; }
        .float-card-3 { animation: fadeRight 0.55s ease 0.85s both; }

        .floating-card {
          transition:
            transform 0.35s cubic-bezier(.2,.7,.3,1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }
        .floating-card:hover,
        .floating-card:focus-visible {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 18px 38px rgba(27,59,95,0.25), 0 2px 6px rgba(27,59,95,0.08);
          border-color: rgba(27,59,95,0.35);
        }

        .step-item {
          transition:
            transform 0.3s cubic-bezier(.2,.7,.3,1),
            box-shadow 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }
        .step-item:hover,
        .step-item:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(27,59,95,0.14);
          border-color: rgba(27,59,95,0.28);
        }
        .step-item:hover .step-icon,
        .step-item:focus-visible .step-icon {
          background: ${NAVY};
          color: ${CYAN};
        }

        /* Desktop full-bleed image — fades from white into image as it goes right */
        .hero-image-desktop {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 100%);
                  mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 100%);
        }

        /* Tablet inline image — soft radial blend */
        .hero-image-tablet {
          -webkit-mask-image: radial-gradient(ellipse at center, #000 65%, transparent 100%);
                  mask-image: radial-gradient(ellipse at center, #000 65%, transparent 100%);
        }

        /* ── Responsive visibility ── */
        .hero-image-desktop { display: block; }
        .hero-image-tablet  { display: none; }

        /* ── Tablet ── */
        @media (max-width: 1023px) {
          .hero-section { padding: 88px 0 64px !important; }
          .hero-inner {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .hero-left, .hero-right {
            width: 100% !important;
            flex: none !important;
          }
          .hero-right { height: 420px !important; }
          .hero-headline { font-size: clamp(2rem, 6vw, 3rem) !important; }
          .hero-image-desktop { display: none !important; }
          .hero-image-tablet  { display: block !important; }
        }

        /* ── Mobile (image fully hidden) ── */
        @media (max-width: 640px) {
          .hero-section { padding: 82px 0 48px !important; }
          .hero-inner { padding: 0 16px !important; gap: 28px !important; }
          .hero-right { display: none !important; }
          .steps-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .deco-large { display: none !important; }
        }
      `}} />

      <section
        className="hero-section"
        style={{
          background: "#ffffff",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          paddingTop: "82px",
          paddingBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ─── Full-bleed image (DESKTOP) ─── */}
        <div
          className="cs-img hero-image-desktop"
          style={{
            position: "absolute",
            top:      "70px",
            right:    0,
            bottom:   0,
            width:    "50%",
            zIndex:   0,
          }}
        >
          <Image
            src={customImage}
            alt="Obana Africa sourcing"
            fill
            priority
            quality={95}
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        {/* ─── Decorative background objects ─── */}

        {/* Top-left navy dot cluster */}
        <div
          className="deco deco-large"
          aria-hidden
          style={{
            position: "absolute",
            top:      "70px",
            left:     "24px",
            width:    "110px",
            height:   "110px",
            opacity:  0.30,
            backgroundImage: `radial-gradient(${NAVY} 1.2px, transparent 1.2px)`,
            backgroundSize: "14px 14px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Bottom-left soft cyan blob */}
        <div
          className="deco deco-large"
          aria-hidden
          style={{
            position: "absolute",
            bottom:   "-100px",
            left:     "-80px",
            width:    "320px",
            height:   "320px",
            background:
              `radial-gradient(circle at center, ${CYAN} 0%, rgba(220,248,249,0) 70%)`,
            borderRadius: "50%",
            opacity: 0.75,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* ─── Content ─── */}
        <div
          className="hero-inner"
          style={{
            maxWidth:   "1320px",
            margin:     "0 auto",
            padding:    "0 40px",
            display:    "flex",
            alignItems: "center",
            gap:        "64px",
            position:   "relative",
            zIndex:     1,
          }}
        >
          {/* ── LEFT ── */}
          <div className="hero-left" style={{ flex: "1 1 0", minWidth: 0 }}>
            <h1
              className="cs-headline hero-headline"
              style={{
                fontSize:      "clamp(2.4rem, 4.8vw, 3.8rem)",
                fontWeight:    800,
                lineHeight:    1.04,
                margin:        0,
                color:         NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              What Are You<br />
              <span style={{ position: "relative", display: "inline-block", color: NAVY }}>
                Sourcing?
                <span
                  aria-hidden
                  style={{
                    position:     "absolute",
                    left:         0,
                    bottom:       "-2px",
                    width:        "55%",
                    height:       "3px",
                    background:   NAVY,
                    borderRadius: "2px",
                    opacity:      0.55,
                  }}
                />
              </span>
            </h1>

            <p
              className="cs-desc"
              style={{
                color:      "#3D5573",
                fontSize:   "clamp(0.94rem, 1.1vw, 1.05rem)",
                lineHeight: 1.65,
                margin:     "26px 0 0",
                maxWidth:   "560px",
              }}
            >
              Are you an SME looking to source fashion, beauty, safety wears,
              school uniforms, or everyday retail products? Connect with verified
              vendors, competitive pricing, and flexible financing solutions —
              built to help African businesses source smarter and grow faster.
            </p>

            {/* Steps */}
            <div
              className="cs-steps steps-row"
              style={{
                marginTop:  "36px",
                display:    "flex",
                gap:        "14px",
                alignItems: "stretch",
              }}
            >
              {STEPS.map(({ title, desc, Icon }, i) => (
                <div
                  key={i}
                  className="step-item"
                  tabIndex={0}
                  style={{
                    flex:           "1 1 0",
                    minWidth:       0,
                    padding:        "22px 14px 22px",
                    background:     CYAN,
                    border:         "1px solid rgba(27,59,95,0.10)",
                    borderRadius:   "10px",
                    boxShadow:      "0 2px 8px rgba(27,59,95,0.04)",
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    textAlign:      "center",
                    gap:            "14px",
                    outline:        "none",
                    cursor:         "default",
                  }}
                >
                  <div
                    className="step-icon"
                    style={{
                      width:        "38px",
                      height:       "38px",
                      borderRadius: "8px",
                      background:   "#ffffff",
                      color:        NAVY,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent: "center",
                      transition:   "background 0.3s ease, color 0.3s ease",
                      boxShadow:    "0 2px 6px rgba(27,59,95,0.06)",
                    }}
                  >
                    <Icon />
                  </div>
                  <h4 style={{
                    margin:     0,
                    fontSize:   "13.5px",
                    fontWeight: 700,
                    color:      NAVY,
                    lineHeight: 1.3,
                  }}>
                    {title}
                  </h4>
                  <p style={{
                    margin:     0,
                    fontSize:   "11.5px",
                    lineHeight: 1.55,
                    color:      "#3D5573",
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — holds floating cards + tablet image ── */}
          <div
            className="hero-right"
            style={{
              flex:     "1 1 0",
              minWidth: 0,
              position: "relative",
              height:   "520px",
            }}
          >
            {/* Tablet image (hidden on desktop & mobile) */}
            <div
              className="hero-image-tablet"
              style={{
                position:     "absolute",
                inset:        0,
                borderRadius: "20px",
                overflow:     "hidden",
                zIndex:       1,
              }}
            >
              <Image
                src={customImage}
                alt="Obana Africa sourcing"
                fill
                quality={95}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            {/* Floating cards — clustered upper-middle on the image */}
            <FloatingCard
              className="float-card-1"
              style={{ top: "16%", left: "-4%", zIndex: 3 }}
              icon={
                <IconBadge bg={NAVY} fg={CYAN}>
                  <IconShield />
                </IconBadge>
              }
              title="Verified Vendors"
              desc="Trusted partners, quality assured."
            />

            <FloatingCard
              className="float-card-2"
              style={{ top: "38%", left: "-7%", zIndex: 3 }}
              icon={
                <IconBadge bg={CYAN} fg={NAVY}>
                  <IconTag />
                </IconBadge>
              }
              title="Competitive Pricing"
              desc="Get the best value for your business."
            />

            <FloatingCard
              className="float-card-3"
              style={{ top: "60%", left: "-3%", zIndex: 3 }}
              icon={
                <IconBadge bg={NAVY} fg={CYAN}>
                  <IconWallet />
                </IconBadge>
              }
              title="Flexible Financing"
              desc="Access funds to grow your business."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomSourcingHero;