"use client";

import React, { useEffect, useRef } from "react";
import { Recycle, Users, TrendingUp, Landmark,} from "lucide-react";

/* ── Impact pillars — top row ─────────────────────────────── */
const PILLARS = [
  {
    icon: Recycle,
    title: "Re-commerce",
    description:
      "Helping high street brands solve overstock challenges through circular commerce — saving significant carbon footprints and reducing fashion waste across Africa.",
  },
  {
    icon: Users,
    title: "Job Creation",
    description:
      "Building Africa's largest sales partner network — creating meaningful income opportunities for individuals as Obana.Africa Sales Partners.",
  },
  {
    icon: TrendingUp,
    title: "SME Growth",
    description:
      "Empowering small and medium enterprises with the tools, inventory access, and logistics infrastructure needed to scale faster and operate without limits.",
  },
  {
    icon: Landmark,
    title: "Loans Disbursed",
    description:
      "Providing SMEs access to flexible financing through Order Now, Pay Small Small (ONPSS) — unlocking working capital for businesses that need it most.",
  },
];

/* ── Key stats — bottom row ───────────────────────────────── */
const STATS = [
  { value: "50k+",  label: "Packages Delivered",   sub: "Across Nigeria & Africa"        },
  { value: "20+",   label: "Brand Partners",        sub: "High street & African brands"   },
  { value: "5k+",   label: "Active SMEs",           sub: "Registered on the platform"     },
  { value: "500+",  label: "Sales Partners",        sub: "Earning across the network"     },
];

export default function HowObanaWorksSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Dynamic canvas background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string;
    };

    const PALETTE = [
      "255,255,255",  // white
      "255,255,255",
      "251,191,36",   // gold accent
      "100,160,220",  // cool blue
    ];

    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      particles = Array.from({ length: 70 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 1.0) * 0.8,
        vy:    (Math.random() - 1.0) * 0.8,
        r:     Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.55 + 0.4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* connection lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - d / 150)})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* dots with glow */
      particles.forEach(p => {
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(${p.color},${p.alpha * 0.9})`);
        grd.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes impactFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes impactPulse {
          0%, 100% { opacity: 0.7; transform: scale(1);    }
          50%       { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .impact-heading { animation: impactFadeUp 0.7s ease 0.1s both; }
        .impact-sub     { animation: impactFadeUp 0.7s ease 0.25s both; }
        .pillar-card    { animation: impactFadeUp 0.6s ease both; }
        .stat-card      { animation: countUp 0.6s ease both; }
        .orb-pulse      { animation: impactPulse 7s ease-in-out infinite; }

        .pillar-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s ease;
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.1) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .stat-card {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }
      ` }} />

      <section
        className="relative overflow-hidden w-full rounded-tl-[60px] rounded-tr-[60px]"
        style={{
          background: "linear-gradient(160deg, #0a1628 0%, #1b3b5f 45%, #0d2240 100%)",
          padding: "clamp(60px,8vw,100px) 0",
        }}
      >
        {/* ── Canvas particle background ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* ── Orb accents ── */}
        <div className="orb-pulse absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 65%)", zIndex: 1 }} />
        <div className="orb-pulse absolute bottom-[-80px] left-[-60px] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(100,160,220,0.1) 0%, transparent 65%)", zIndex: 1, animationDelay: "3.5s" }} />
        <div className="orb-pulse absolute top-[40%] left-[45%] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 65%)", zIndex: 1, animationDelay: "1.5s" }} />

        <div
          className="relative mx-auto px-4 md:px-6"
          style={{ maxWidth: "1280px", zIndex: 10 }}
        >
          {/* ── Section header ── */}
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="impact-heading font-extrabold text-white mb-4"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Our Impact
            </h2>
            <p
              className="impact-sub text-white/60 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              }}
            >
              We measure our success through the real change we create — for brands,
              entrepreneurs, SMEs, and communities across Africa.
            </p>
          </div>

          {/* ── TOP ROW: Pillar cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="pillar-card rounded-2xl p-6 flex flex-col gap-5"
                  style={{
                    animationDelay: `${0.1 + idx * 0.1}s`,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Icon container */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(251,191,36,0.15)",
                      border: "1px solid rgba(251,191,36,0.3)",
                    }}
                  >
                    <Icon size={22} color="#fbbf24" strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-bold text-white mb-2"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "1rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-white/55 text-sm leading-relaxed"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM ROW: Stat cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="stat-card rounded-2xl p-6 bg-white flex flex-col justify-center"
                style={{
                  animationDelay: `${0.4 + idx * 0.1}s`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  minHeight: "150px",
                }}
              >
                <p
                  className="font-extrabold text-primary leading-none mb-2"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-bold text-primary/90 text-sm md:text-base mb-1"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-primary/50 text-xs md:text-sm"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* ── Footer tagline ── */}
          <div
            className="text-center pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-white/70 leading-relaxed max-w-2xl mx-auto"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
              }}
            >
              <span className="font-bold text-white">By 2030</span>, we aim to power over{" "}
              <span className="text-[#fbbf24] font-semibold">100,000 SMEs</span> across Africa —
              connecting re-commerce, logistics, and financial access into one seamless ecosystem.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}