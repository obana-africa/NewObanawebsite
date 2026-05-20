"use client";

import React, { useEffect, useRef,} from "react";
import Button from "@/components/ui/button";
import { useModal } from "@/contexts/modal-context";
import {
  Package, Globe, TrendingUp,
   Users,
} from "lucide-react";

/* ── Stat card data — right panel ── */
const STAT_CARDS = [
  {
    id: "card-1",
    icon: Package,
    value: "10,000+",
    label: "Metric tons of produce supplied",
    gradient: "linear-gradient(135deg, #1b3b5f 0%, #24507f 100%)",
    iconBg: "rgba(255,255,255,0.15)",
    delay: 0,
  },
  {
    id: "card-2",
    icon: Globe,
    value: "20+",
    label: "Brands & Partners",
    gradient: "linear-gradient(135deg, #1b3b5f 0%, #24507f 100%)",
    iconBg: "rgba(255,255,255,0.15)",
    delay: 0.15,
  },
  {
    id: "card-3",
    icon: TrendingUp,
    value: "₦2B+",
    label: "Commerce Enabled",
    gradient: "linear-gradient(135deg, #ffff 0%, #ffff 100%)",
    iconBg: "rgba(255,255,255,0.15)",
    dark: true,
    delay: 0.3,
  },
  {
    id: "card-4",
    icon: Users,
    value: "5k+",
    label: "Registered Businesses",
    gradient: "linear-gradient(135deg, #ffff 0%, #ffff 100%)",
    iconBg: "rgba(255,255,255,0.15)",
    dark: true,
    delay: 0.45,
  },
];

const HeroSection: React.FC = () => {
  const { openGetStartedModal } = useModal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [setMounted] = useState(false);

  const handleExploreEcosystem = (): void => openGetStartedModal();
  const handleBecomePartner = (): void => openGetStartedModal();

  /* ── Mount animation trigger ── */
//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 80);
//     return () => clearTimeout(t);
//   }, []);

  /* ── Animated particle / line canvas background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    const DOTS = 90;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color:string };
    let dots: Dot[] = [];

	const COLORS = [
      "27,59,95",
      "27,59,95",
      "36,80,127",
      "251,191,36",
      "251,191,36",
    ];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      dots = Array.from({ length: DOTS }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.25,
		color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* ── Connection lines ── */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(27,59,95,${0.16 * (1 - d / 160)})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      /* ── Dots ── */
      dots.forEach(d => {
		 /* glow */
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
        grd.addColorStop(0, `rgba(${d.color},${d.alpha * 0.6})`);
        grd.addColorStop(1, `rgba(${d.color},0)`);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

		/* core */
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color},${d.alpha})`;
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
        @keyframes bgPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
        .hero-tag     { animation: heroFadeUp    0.6s ease 0.1s both; }
        .hero-heading { animation: heroFadeUp    0.7s ease 0.25s both; }
        .hero-desc    { animation: heroFadeUp    0.7s ease 0.4s both;  }
        .hero-btns    { animation: heroFadeUp    0.7s ease 0.55s both; }
        .hero-cards   { animation: heroFadeRight 0.8s ease 0.3s both;  }
        .stat-card-0  { animation: cardFloat 5s  ease-in-out 0s    infinite; }
        .stat-card-1  { animation: cardFloat 5s  ease-in-out 0.4s  infinite; }
        .stat-card-2  { animation: cardFloat 5.5s ease-in-out 0.8s  infinite; }
        .stat-card-3  { animation: cardFloat 5.5s ease-in-out 1.2s  infinite; }
        .bg-orb       { animation: bgPulse 6s ease-in-out infinite; }
        .hero-btn-primary {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.25s ease;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(27,59,95,0.35);
        }
        .hero-btn-outline {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      background 0.2s ease, color 0.2s ease;
        }
        .hero-btn-outline:hover {
          transform: translateY(-2px) scale(1.02);
        }
      ` }} />

      <section
        className="relative overflow-hidden w-full bg-white"
        style={{ minHeight: "480px" }}
      >
        {/* ── Animated canvas background ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* ── Soft orb accents ── */}
         <div className="bg-orb absolute top-[-80px] left-[-80px] w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,59,95,0.18) 0%, transparent 65%)", zIndex: 1 }} />
        <div className="bg-orb absolute top-[15%] right-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 65%)", zIndex: 1, animationDelay: "2s" }} />
        <div className="bg-orb absolute bottom-[-40px] left-[40%] w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,59,95,0.12) 0%, transparent 65%)", zIndex: 1, animationDelay: "4s" }} />

        {/* ── Main layout: left text | right cards ── */}
        <div
          className="relative container mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          style={{ 
			    zIndex: 10, 
			    paddingTop: "clamp(60px,20vw,70px)", 
			    paddingBottom: "clamp(20px,4vw,20px)" }}
        >

          {/* ── LEFT: Text content ── */}
          <div className="flex-1 max-w-[700px]">

            {/* Tag pill — fashion style */}
            <div className="hero-tag inline-flex items-center gap-2 mt-6 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <span className="text-xs font-bold text-primary/60 uppercase tracking-[0.18em]">
                SOURCING · LOGISTICS · COMMERCE · AFRICA
              </span>
            </div>

            {/* Heading — fashion typography with accent word */}
            <h1
              className="hero-heading font-extrabold leading-[1.1] mb-6 text-primary"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              }}
            >
              The digital platform powering{" "}
              <span style={{ color: "#fbbf24", fontStyle: "italic" }}>
                Africa&apos;s
              </span>{" "}
              Fashion&Beauty SMEs.
            </h1>

            {/* Description — fashion image style */}
            <p
              className="hero-desc text-primary/65 mb-6 leading-relaxed"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                maxWidth: "520px",
              }}
            >
              All-in-one infrastructure for businesses to source inventory,
              access logistics, reach customers, and fully digitalise commerce
              operations — from day one.
            </p>

           {/* Buttons */}
				<div className="flex flex-row gap-3 items-center">
 					<Button
 						variant="primary"
 						animation="ripple"
 						className="bg-primary hover:bg-primary-dark text-primary hover:text-primary text-sm px-4 py-2 md:text-base md:px-6 md:py-3 font-medium shadow-lg shadow-primary/30"
 						onClick={handleExploreEcosystem}
 					>
 						Explore Ecosystem
 					</Button>
 					<Button
 						variant="primary"
 						animation="ripple"
 						className="shadow-lg !text-primary bg-transparent hover:bg-primary hover:text-primary transition-all duration-300 ease-in-out text-sm px-4 py-2 md:text-base md:px-6 md:py-3 font-medium"
 						onClick={handleBecomePartner}
 					>
 						Become a Partner
 					</Button>
 				</div>
          </div>

          {/* ── RIGHT: Stat cards — 2×2 grid ── */}
          <div className="hero-cards flex-shrink-0 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-4" style={{ maxWidth: "380px" }}>
              {STAT_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`stat-card-${idx} rounded-2xl p-5 flex flex-col gap-3`}
                    style={{
                      background: card.gradient,
                      boxShadow: card.dark
                        ? "0 8px 32px rgba(27,59,95,0.2)"
                        : "0 8px 32px rgba(27,59,95,0.2)",
                      minHeight: "150px",
                    }}
                  >
                    {/* Icon pill */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: card.iconBg }}
                    >
                      <Icon
                        size={18}
                        color={card.dark ? "#1b3b5f" : "#fff"}
                      />
                    </div>

                    {/* Value */}
                    <p
                      className="font-extrabold leading-none"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: "clamp(1.5rem, 3vw, 2rem)",
                        color: card.dark ? "#1b3b5f" : "#fff",
                      }}
                    >
                      {card.value}
                    </p>

                    {/* Label */}
                    <p
                      className="text-xs font-semibold leading-snug"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        color: card.dark ? "rgba(27,59,95,0.75)" : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {card.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;