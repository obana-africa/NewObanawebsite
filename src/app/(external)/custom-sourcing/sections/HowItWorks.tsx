"use client";

import React from "react";

const STEPS = [
  {
    n: 1,
    title: "Browse Categories",
    desc: "Browse fashion, beauty, fabrics, trims, and equipment from verified supply pipelines.",
  },
  {
    n: 2,
    title: "Tell Us What You Need",
    desc: "Share product details, quantities, target pricing, and sourcing requirements.",
  },
  {
    n: 3,
    title: "Get Matched",
    desc: "Receive verified supplier options, quotations, and logistics support tailored to your request.",
  },
  {
    n: 4,
    title: "Secure & Scale",
    desc: "Access embedded financing, cross-border logistics, and scalable sourcing support.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeStepUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .step-card {
          opacity: 0;
          animation: fadeStepUp 0.6s ease forwards;
        }
        .step-card:nth-child(1) { animation-delay: 0.1s; }
        .step-card:nth-child(2) { animation-delay: 0.22s; }
        .step-card:nth-child(3) { animation-delay: 0.34s; }
        .step-card:nth-child(4) { animation-delay: 0.46s; }
        .step-card:nth-child(5) { animation-delay: 0.1s; }
        .step-card:nth-child(6) { animation-delay: 0.22s; }
        .step-card:nth-child(7) { animation-delay: 0.34s; }
        .step-card:nth-child(8) { animation-delay: 0.46s; }
      ` }} />

      <section
        style={{
        //   background: "linear-gradient(180deg, #dff4f4 0%, #e8f8f8 40%, #f0fafa 70%, #ffffff 100%)",
          background: "rgba(223,244,244,0.8)",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          padding: "clamp(10px, 8vw, 10px) 0",
        }}
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-10" style={{ maxWidth: "1300px" }}>

          {/* ── Desktop layout ── */}
          <div className="hidden md:block">
            <div className="flex items-start justify-between">
              {STEPS.map((step, idx) => (
                <React.Fragment key={step.n}>

                  {/* Step card */}
                  <div
                    className="step-card flex flex-col items-center text-center"
                    style={{ flex: "1 1 0", minWidth: 0, padding: "0 2px" }}
                  >
                    {/* Number circle */}
                    <div
                      className="flex items-center justify-center rounded-full font-extrabold flex-shrink-0 mb-4"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "#F9C319",
                        color: "#1B3B5F",
                        fontSize: "18px",
                        boxShadow: "0 4px 14px rgba(249,195,25,0.4)",
                      }}
                    >
                      {step.n}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bold leading-snug mb-2"
                      style={{
                        color: "#1B3B5F",
                        fontSize: "clamp(13px, 1.4vw, 15px)",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="leading-relaxed"
                      style={{
                        color: "#1B3B5F",
                        fontSize: "clamp(11px, 1.1vw, 13px)",
                        maxWidth: "300px",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className="flex-shrink-0 flex items-center"
                      style={{ paddingTop: "20px" }} // aligns with center of number circle
                    >
                      <svg
                        width="80"
                        height="16"
                        viewBox="0 0 80 16"
                        fill="none"
                      >
                        <line
                          x1="0" y1="8" x2="66" y2="8"
                          stroke="#1B3B5F"
                          strokeWidth="1.5"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                          
                        />
                        <path
                          d="M64 3 L74 8 L64 13"
                          stroke="#1B3B5F"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                         
                        />
                      </svg>
                    </div>
                  )}

                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Mobile layout — 2×2 grid ── */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="step-card flex flex-col items-center text-center"
                style={{
                  padding: "16px 12px 20px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "16px",
                  border: "1px solid rgba(27,59,95,0.08)",
                  boxShadow: "0 2px 12px rgba(27,59,95,0.06)",
                }}
              >
                {/* Number circle */}
                <div
                  className="flex items-center justify-center rounded-full font-extrabold mb-3 flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#F9C319",
                    color: "#1B3B5F",
                    fontSize: "16px",
                    boxShadow: "0 4px 10px rgba(249,195,25,0.35)",
                  }}
                >
                  {step.n}
                </div>

                {/* Title */}
                <h3
                  className="font-bold leading-snug mb-2"
                  style={{ color: "#1B3B5F", fontSize: "13px" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="leading-relaxed"
                  style={{ color: "#1B3B5F", fontSize: "11px" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default HowItWorks;