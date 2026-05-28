"use client";

import React from "react";
import Image from "next/image";
import customImage from "@/app/assets/customImage.png";

interface Props {
  onSubmitDeal:       () => void;
  onBrowseCategories: () => void;
}

const CustomSourcingHero: React.FC<Props> = ({}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity:0; transform:translateX(32px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .cs-h1   { animation:fadeUp    0.7s ease 0.2s  both; }
        .cs-desc { animation:fadeUp    0.7s ease 0.35s both; }
        .cs-img  { animation:fadeRight 0.8s ease 0.3s  both; }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .hero-section {
            height: auto !important;
            padding-top: 80px !important;
            padding-bottom: 32px !important;
          }
          .hero-inner {
            flex-direction: column !important;
            padding: 0 16px !important;
            gap: 16px !important;
          }
          .hero-left {
            flex: none !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .hero-right {
            flex: none !important;
            width: 100% !important;
            height: 220px !important;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section {
            height: auto !important;
            padding-top: 80px !important;
            padding-bottom: 32px !important;
          }
          .hero-inner {
            flex-direction: column !important;
            padding: 0 32px !important;
            gap: 20px !important;
          }
          .hero-left {
            flex: none !important;
            width: 100% !important;
            height: auto !important;
          }
          .hero-right {
            flex: none !important;
            width: 100% !important;
            height: 300px !important;
          }
        }
      ` }} />

      <section
        className="hero-section"
        style={{
          background: "white",
          fontFamily: "'Bricolage Grotesque',sans-serif",
          height:     "450px",
          overflow:   "hidden",
          display:    "flex",
          alignItems: "center",
          paddingTop: "64px",
        }}
      >
        <div
          className="hero-inner"
          style={{
            maxWidth:   "1440px",
            width:      "100%",
            margin:     "0 auto",
            padding:    "0 40px",
            display:    "flex",
            alignItems: "center",
            gap:        "24px",
          }}
        >
          {/* ── LEFT ── */}
          <div
            className="cs-h1 hero-left"
            style={{
              flex:           "1 1 0",
              minWidth:       "573px",
              height:         "351px",
              background:     "#1B3B5F",
              borderRadius:   "24px",
              color:          "white",
              padding:        "32px 28px",
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              gap:            "16px",
              boxSizing:      "border-box",
            }}
          >
            <h1
              className="cs-h1"
              style={{
                fontSize:   "clamp(1.6rem, 4vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                margin:     0,
              }}
            >
              What are you sourcing?
            </h1>
            <p
              className="cs-desc"
              style={{
                color:      "rgba(255,255,255,0.65)",
                fontSize:   "clamp(0.82rem, 1.4vw, 1rem)",
                lineHeight: 1.65,
                margin:     0,
              }}
            >
              Are you an SME looking to source fashion, beauty, safety wears,
              school uniforms, or everyday retail products? Explore our active
              sourcing categories and connect with verified vendors, competitive
              pricing, and flexible financing solutions — built to help African
              businesses source smarter and grow faster.
            </p>
          </div>

          {/* ── RIGHT — Image ── */}
          <div
            className="cs-img hero-right"
            style={{
              flex:         "1.2 1 0",
              minWidth:     0,
              height:       "351px",
              borderRadius: "16px",
              overflow:     "hidden",
              boxShadow:    "0 12px 40px rgba(0,0,0,0.2)",
              position:     "relative",
            }}
          >
            <Image
              src={customImage}
              alt="Obana Africa sourcing"
              fill
              priority
              unoptimized
              style={{
                objectFit:      "cover",
                objectPosition: "center",
              }}
            />
          </div>

        </div>
      </section>
    </>
  );
};

export default CustomSourcingHero;