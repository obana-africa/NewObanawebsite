"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import customImage   from "@/app/assets/customImage.png";
import warehouseImg  from "@/app/assets/images/custom-sourcing-image/warehouseImg.png";

interface Props {
  onSubmitDeal:       () => void;
  onBrowseCategories: () => void;
}

const SLIDES = [customImage, warehouseImg];

const CustomSourcingHero: React.FC<Props> = ({}) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"in" | "out">("in");

  /* ── Auto-slide every 4s ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("out");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % SLIDES.length);
        setDirection("in");
        setTimeout(() => setAnimating(false), 600);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number, W = 0, H = 0;
    type Dot = { x:number; y:number; vx:number; vy:number; r:number; a:number; c:string };
    const COLORS = ["255,255,255","255,255,255","249,195,25"];
    let dots: Dot[] = [];
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      dots = Array.from({ length: 55 }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
        r: Math.random()*2+0.6, a: Math.random()*0.35+0.1,
        c: COLORS[Math.floor(Math.random()*COLORS.length)],
      }));
    };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<dots.length;i++) for (let j=i+1;j<dots.length;j++){
        const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){ ctx.beginPath(); ctx.strokeStyle=`rgba(255,255,255,${0.08*(1-d/130)})`; ctx.lineWidth=0.8; ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y); ctx.stroke(); }
      }
      dots.forEach(d=>{
        const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*4);
        g.addColorStop(0,`rgba(${d.c},${d.a*0.6})`); g.addColorStop(1,`rgba(${d.c},0)`);
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r*4,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fillStyle=`rgba(${d.c},${d.a})`; ctx.fill();
        d.x+=d.vx; d.y+=d.vy;
        if(d.x<0||d.x>W)d.vx*=-1; if(d.y<0||d.y>H)d.vy*=-1;
      });
      raf=requestAnimationFrame(draw);
    };
    resize(); draw(); window.addEventListener("resize",resize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);

  const slideStyle: React.CSSProperties = {
    opacity:   animating && direction === "out" ? 0 : 1,
    transform: animating
      ? direction === "out"
        ? "translateX(20px) scale(0.97)"
        : "translateX(-20px) scale(0.97)"
      : "translateX(0) scale(1)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
  };

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
        @keyframes orbFloat {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(16px,-12px) scale(1.06); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(-12px,16px) scale(1.05); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        .cs-h1   { animation:fadeUp    0.7s ease 0.2s  both; }
        .cs-desc { animation:fadeUp    0.7s ease 0.35s both; }
        .cs-img  { animation:fadeRight 0.8s ease 0.3s  both; }
        .orb-a   { animation:orbFloat  9s ease-in-out infinite; }
        .orb-b   { animation:orbFloat2 7s ease-in-out infinite; }
        .gold-text {
          background: linear-gradient(90deg,#fbbf24 0%,#fde68a 50%,#fbbf24 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      ` }} />

      <section
        className="relative overflow-hidden pt-20 md:pt-0"
        style={{
          background: "linear-gradient(135deg,#0a1628 0%,#1b3b5f 55%,#0d2240 100%)",
          fontFamily: "'Bricolage Grotesque',sans-serif",
          minHeight:  "420px",
        }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex:0, opacity:0.6 }} />

        {/* Orbs */}
        <div className="orb-a absolute pointer-events-none"
          style={{ top:"-60px", left:"-60px", width:"380px", height:"380px", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(251,191,36,0.12)0%,transparent 65%)", filter:"blur(40px)", zIndex:0 }} />
        <div className="orb-b absolute pointer-events-none"
          style={{ bottom:"-40px", right:"5%", width:"300px", height:"300px", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(255,255,255,0.05)0%,transparent 65%)", filter:"blur(32px)", zIndex:0, animationDelay:"3s" }} />

        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background:"linear-gradient(90deg,transparent,#fbbf24 40%,#f59e0b 60%,transparent)", zIndex:1 }} />

        {/* ── Main content ── */}
        <div
          className="relative z-10 mx-auto w-full px-6 md:px-10 lg:px-16"
          style={{ maxWidth:"1280px", paddingTop:"clamp(52px,8vw,80px)", paddingBottom:"clamp(40px,6vw,64px)" }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── LEFT ── */}
            <div className="flex-1 flex flex-col gap-5 max-w-[580px]">
              <h1 className="cs-h1 font-extrabold text-white leading-[1.08]"
                style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)" }}>
                What are you{" "}
                <span className="gold-text">sourcing?</span>
              </h1>
              <p className="cs-desc leading-relaxed"
                style={{ color:"rgba(255,255,255,0.65)", fontSize:"clamp(0.95rem,1.6vw,1.08rem)", maxWidth:"460px" }}>
                Browse our active deal pipelines. Each category connects you to
                verified vendors, competitive pricing, and embedded financing —
                built for African SMEs.
              </p>
            </div>

            {/* ── RIGHT — Sliding images ── */}
            <div className="cs-img hidden lg:block flex-shrink-0 relative mt-6">

              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg,rgba(251,191,36,0.15),transparent,rgba(255,255,255,0.05))",
                  border:     "1px solid rgba(251,191,36,0.2)",
                }}
              />

              {/* Image container */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width:     "340px",
                  height:    "400px",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                {/* Slides */}
                <div style={{ ...slideStyle }}>
                  <Image
                    src={SLIDES[current]}
                    alt="Obana Africa sourcing"
                    width={340}
                    height={400}
                    priority
                    unoptimized
                    className="object-cover object-center w-full h-full"
                    quality={100}
                  />
                </div>

                {/* Bottom label */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3"
                  style={{ background:"linear-gradient(to top,rgba(10,22,40,0.92),transparent)", zIndex: 2 }}
                >
                  <p className="text-white text-[12px] font-semibold">Verified Warehouse Sourcing</p>
                  <p className="text-white/55 text-[10px]">Direct from trusted suppliers</p>
                </div>

                {/* Dot indicators */}
                <div
                  className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5"
                  style={{ zIndex: 3 }}
                >
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (i === current || animating) return;
                        setDirection("out");
                        setAnimating(true);
                        setTimeout(() => {
                          setCurrent(i);
                          setDirection("in");
                          setTimeout(() => setAnimating(false), 500);
                        }, 350);
                      }}
                      style={{
                        width:        i === current ? "20px" : "6px",
                        height:       "6px",
                        borderRadius: "3px",
                        background:   i === current ? "#fbbf24" : "rgba(255,255,255,0.4)",
                        border:       "none",
                        cursor:       "pointer",
                        transition:   "all 0.3s ease",
                        padding:      0,
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default CustomSourcingHero;