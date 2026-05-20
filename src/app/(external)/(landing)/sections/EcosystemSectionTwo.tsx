// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Button from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { useModal } from "@/contexts/modal-context";

// // Replace with your actual ecosystem illustration
// import ecosystemDiagram from "@/app/assets/images/landing-page/ecosystem-diagram.png";

// // ---------- Hooks ----------
// const useInView = (options?: IntersectionObserverInit) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsInView(true);
//         observer.unobserve(element);
//       }
//     }, options);

//     observer.observe(element);
//     return () => observer.disconnect();
//   }, [options]);

//   return [ref, isInView] as const;
// };

// // ---------- Main Section ----------
// const CommerceMoveBetter: React.FC = () => {
//   const { openGetStartedModal } = useModal();
//   const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });

//   const handleExploreEcosystem = () => {
//     openGetStartedModal();
//   };

//   const handleBecomePartner = () => {
//     // route to partner page or modal – adjust as needed
//     openGetStartedModal(); // placeholder
//   };

//   return (
//     <section
//       className="w-full py-20 bg-white overflow-hidden"
//       style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
//     >
//       <div className="mx-auto max-w-[1271px] px-4 md:px-0">
//         {/* Card container with exact Figma dimensions */}
//         <div
//           ref={sectionRef as React.RefObject<HTMLDivElement>}
//           className={`
//             w-full h-[602px] bg-[#1B3B5F] rounded-[30px]
//             px-[49px] py-[48px]
//             transition-all duration-700 ease-out
//             hover:shadow-2xl hover:scale-[1.01]
//             shadow-lg
//             ${isSectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
//           `}
//         >
//           <div className="flex h-full gap-[30px]">
//             {/* LEFT SIDE – Text & Buttons – width exactly 492px, height 342px (centered vertically) */}
//             <div className="w-[492px] h-full flex flex-col justify-center gap-[41px]">
//               <div>
//                 <h2
//                   className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F9C319] mb-4 leading-tight"
//                   style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
//                 >
//                   Let Commerce Move Better
//                 </h2>
//                 <p className="text-base md:text-lg text-white/80 leading-relaxed">
//                   Obana is building connected systems that reduce friction in
//                   sourcing, logistics, and distribution – creating smarter
//                   pathways for businesses to grow.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button
//                   variant="primary"
//                   animation="ripple"
//                   className="bg-white hover:bg-secondary !text-primary font-medium shadow-md"
//                   onClick={handleExploreEcosystem}
//                 >
//                   Explore Ecosystem
//                   <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
//                 </Button>
//                 <Button
//                   variant="primary"
//                   animation="ripple"
//                   className="border border-white text-primary bg-transparent hover:bg-white  transition-all duration-300 font-medium"
//                   onClick={handleBecomePartner}
//                 >
//                   Become a Partner
//                   <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
//                 </Button>
//               </div>
//             </div>

//             {/* RIGHT SIDE – Ecosystem Diagram */}
//             <div className="flex-1 h-full relative">
//               <Image
//                 src={ecosystemDiagram}
//                 alt="Obana ecosystem diagram"
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 1271px) 100vw, 651px"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommerceMoveBetter;


"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/contexts/modal-context";

import ecosystemDiagram from "@/app/assets/images/landing-page/ecosystem-diagram.png";

const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
};

const CommerceMoveBetter: React.FC = () => {
  const { openGetStartedModal } = useModal();
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Particle canvas background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let W = 0, H = 0;
    const DOTS = 70;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string };
    const PALETTE = ["27,59,95","27,59,95","36,80,127","251,191,36","251,191,36","255,255,255"];
    let dots: Dot[] = [];

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      dots = Array.from({ length: DOTS }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2.4 + 0.8,
        alpha: Math.random() * 0.45 + 0.18,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(27,59,95,${0.15 * (1 - d / 135)})`;
            ctx.lineWidth = 3;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      dots.forEach(d => {
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3.5);
        g.addColorStop(0, `rgba(${d.color},${d.alpha * 0.75})`);
        g.addColorStop(1, `rgba(${d.color},0)`);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color},${d.alpha})`; ctx.fill();
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      className="w-full py-20 relative overflow-hidden"
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        background: "linear-gradient(135deg, #f8faff 0%, #eef3fb 50%, #f5f8ff 100%)",
      }}
    >
      {/* ── Animated particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* ── Floating orbs ── */}
      <div className="absolute pointer-events-none"
        style={{
          top: "-70px", left: "-70px",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(27,59,95,0.13) 0%, transparent 65%)",
          animation: "ecoOrb1 8s ease-in-out infinite", zIndex: 1,
        }}
      />
      <div className="absolute pointer-events-none"
        style={{
          bottom: "-50px", right: "-50px",
          width: "380px", height: "380px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.16) 0%, transparent 65%)",
          animation: "ecoOrb2 10s ease-in-out infinite", zIndex: 1,
        }}
      />
      <div className="absolute pointer-events-none"
        style={{
          top: "35%", left: "42%",
          width: "260px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(27,59,95,0.08) 0%, transparent 65%)",
          animation: "ecoOrb3 7s ease-in-out infinite", zIndex: 1,
        }}
      />

      {/* ── Dot grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(27,59,95,0.10) 1.2px, transparent 1.2px)",
          backgroundSize: "30px 30px",
          zIndex: 1,
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ecoOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(22px,-18px) scale(1.08); }
        }
        @keyframes ecoOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-20px,15px) scale(1.06); }
        }
        @keyframes ecoOrb3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(14px,20px) scale(1.05); }
        }
        @keyframes cardDeco1 {
          0%,100% { transform: rotate(0deg) scale(1); opacity: 0.07; }
          50%      { transform: rotate(6deg) scale(1.04); opacity: 0.12; }
        }
        @keyframes cardDeco2 {
          0%,100% { transform: translate(0,0); opacity: 0.08; }
          50%      { transform: translate(6px,-6px); opacity: 0.14; }
        }
        @keyframes cardDeco3 {
          0%,100% { transform: translateY(-50%) rotate(0deg); opacity: 0.05; }
          50%      { transform: translateY(-50%) rotate(15deg); opacity: 0.09; }
        }
        @keyframes dashFlow {
          0%   { stroke-dashoffset: 300; opacity: 0.25; }
          50%  { opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 0.25; }
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(249,195,25,0.2)); }
          50%       { filter: drop-shadow(0 0 10px rgba(249,195,25,0.8)); }
        }
        .lf1 { animation: dashFlow 2.4s ease-in-out infinite 0s; }
        .lf2 { animation: dashFlow 2.4s ease-in-out infinite 0.6s; }
        .lf3 { animation: dashFlow 2.4s ease-in-out infinite 1.2s; }
        .lf4 { animation: dashFlow 2.4s ease-in-out infinite 1.8s; }
        .lf5 { animation: dashFlow 2.4s ease-in-out infinite 0.3s; }
        .np  { animation: nodePulse 2s ease-in-out infinite; }
        .diagram-svg { animation: glowPulse 3s ease-in-out infinite; }
      `}} />

      <div className="mx-auto max-w-[1271px] px-4 md:px-0 relative" style={{ zIndex: 10 }}>
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className={`
            w-full bg-[#1B3B5F] rounded-[30px]
            px-8 py-10 md:h-[602px] md:px-[49px] md:py-12
            transition-all duration-700 ease-out
            hover:shadow-2xl hover:scale-[1.01] shadow-lg
            ${isSectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {/* ── Card decorative design layer ── */}

          {/* Large hexagon outline — top right */}
          <svg className="absolute pointer-events-none" style={{ top: "-30px", right: "120px", opacity: 0.07, animation: "cardDeco1 8s ease-in-out infinite" }}
            width="200" height="200" viewBox="0 0 200 200" fill="none">
            <polygon points="100,5 191,52 191,148 100,195 9,148 9,52"
              stroke="#F9C319" strokeWidth="2" fill="none" strokeDasharray="12 6" />
            <polygon points="100,25 171,62 171,138 100,175 29,138 29,62"
              stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Circuit-board style lines — bottom left */}
          <svg className="absolute pointer-events-none" style={{ bottom: "0", left: "0", opacity: 0.08, animation: "cardDeco2 10s ease-in-out infinite" }}
            width="260" height="180" viewBox="0 0 260 180" fill="none">
            {/* Horizontal rails */}
            <line x1="0" y1="60" x2="180" y2="60" stroke="#F9C319" strokeWidth="1.5" strokeDasharray="8 5" />
            <line x1="0" y1="100" x2="140" y2="100" stroke="white" strokeWidth="1" strokeDasharray="6 4" />
            <line x1="0" y1="140" x2="100" y2="140" stroke="#F9C319" strokeWidth="1.5" strokeDasharray="8 5" />
            {/* Vertical connectors */}
            <line x1="60" y1="60" x2="60" y2="180" stroke="white" strokeWidth="1" strokeDasharray="5 4" />
            <line x1="120" y1="60" x2="120" y2="140" stroke="#F9C319" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="100" y1="100" x2="100" y2="180" stroke="white" strokeWidth="1" strokeDasharray="5 4" />
            {/* Junction nodes */}
            <circle cx="60" cy="60" r="5" fill="#F9C319" opacity="0.7" />
            <circle cx="120" cy="60" r="4" fill="white" opacity="0.5" />
            <circle cx="100" cy="100" r="4" fill="#F9C319" opacity="0.6" />
            <circle cx="60" cy="140" r="3" fill="white" opacity="0.4" />
            <circle cx="120" cy="140" r="5" fill="#F9C319" opacity="0.7" />
          </svg>

          {/* Concentric rings — far right center */}
          <svg className="absolute pointer-events-none" style={{ right: "-60px", top: "50%", transform: "translateY(-50%)", opacity: 0.05, animation: "cardDeco3 6s ease-in-out infinite" }}
            width="300" height="300" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="130" stroke="#F9C319" strokeWidth="1.5" strokeDasharray="10 8" />
            <circle cx="150" cy="150" r="100" stroke="white" strokeWidth="1" strokeDasharray="8 6" />
            <circle cx="150" cy="150" r="70"  stroke="#F9C319" strokeWidth="1.5" strokeDasharray="6 5" />
            <circle cx="150" cy="150" r="40"  stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="150" cy="150" r="12"  fill="rgba(249,195,25,0.3)" />
          </svg>

          {/* Floating data bars — top left area */}
          <svg className="absolute pointer-events-none" style={{ top: "24px", left: "24px", opacity: 0.06, animation: "cardDeco1 9s ease-in-out infinite 1s" }}
            width="120" height="60" viewBox="0 0 120 60" fill="none">
            <rect x="0"  y="40" width="14" height="20" rx="3" fill="#F9C319" />
            <rect x="20" y="25" width="14" height="35" rx="3" fill="white" opacity="0.7" />
            <rect x="40" y="10" width="14" height="50" rx="3" fill="#F9C319" />
            <rect x="60" y="30" width="14" height="30" rx="3" fill="white" opacity="0.7" />
            <rect x="80" y="15" width="14" height="45" rx="3" fill="#F9C319" />
            <rect x="100" y="35" width="14" height="25" rx="3" fill="white" opacity="0.7" />
          </svg>

          {/* Mobile: stacked. Desktop: exact original side-by-side at h-[602px] */}
          <div className="flex flex-col md:flex-row md:h-full gap-8 md:gap-[30px]">

            {/* LEFT — unchanged from original */}
            <div className="w-full md:w-[492px] flex flex-col justify-center gap-8 md:gap-[41px]">
              <div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F9C319] mb-4 leading-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Let Trade Flow
                </h2>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Obana is building connected systems that reduce friction in
                  sourcing, logistics, and distribution – creating smarter
                  pathways for businesses to grow.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  animation="ripple"
                  className="bg-white hover:bg-secondary !text-primary font-medium shadow-md"
                  onClick={openGetStartedModal}
                >
                  Explore Ecosystem
                  <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  variant="primary"
                  animation="ripple"
                  className="border border-white-2x1 text-primary bg-transparent hover:bg-white transition-all duration-300 font-medium"
                  onClick={openGetStartedModal}
                >
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>

            {/* RIGHT — diagram + lightning SVG overlay */}
            <div className="flex-1 relative min-h-[280px] md:min-h-0 md:h-full">

              <Image
                src={ecosystemDiagram}
                alt="Obana ecosystem diagram"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 651px"
                priority
              />

              {/* Lightning overlay — every dashed line from the diagram traced */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none diagram-svg"
                viewBox="0 0 1000 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* ═══════════════════════════════════════════════
                    OUTER BORDER — big rounded dashed rectangle
                ═══════════════════════════════════════════════ */}
                <rect x="28" y="28" width="944" height="744"
                  rx="24" ry="24"
                  stroke="#F9C319" strokeWidth="2"
                  strokeDasharray="14 8" strokeDashoffset="0"
                  fill="none" className="lf1" />

                {/* ═══════════════════════════════════════════════
                    INNER DASHED BORDER — inner ecosystem box
                ═══════════════════════════════════════════════ */}
                <rect x="68" y="310" width="784" height="340"
                  rx="16" ry="16"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="10 6" strokeDashoffset="0"
                  fill="none" className="lf2" />

                {/* ═══════════════════════════════════════════════
                    TOP SECTION LINES
                    Webshop → POS horizontal connector
                ═══════════════════════════════════════════════ */}
                {/* Webshop box right → POS box left (horizontal dashed) */}
                <line x1="430" y1="215" x2="540" y2="215"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf3" />

                {/* POS → Retail Ops label (right horizontal) */}
                <line x1="730" y1="215" x2="830" y2="215"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf4" />

                {/* ═══════════════════════════════════════════════
                    WEBSHOP ↕ SHOP — diagonal/vertical connectors
                    Webshop bottom-left → Shop top-left
                ═══════════════════════════════════════════════ */}
                <line x1="400" y1="278" x2="460" y2="355"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf5" />

                {/* Webshop bottom-right → Shop top-right */}
                <line x1="470" y1="278" x2="510" y2="355"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf1" />

                {/* ═══════════════════════════════════════════════
                    POS ↕ SHOP — diagonal connectors
                ═══════════════════════════════════════════════ */}
                <line x1="590" y1="278" x2="540" y2="355"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf2" />

                <line x1="640" y1="278" x2="580" y2="355"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf3" />

                {/* ═══════════════════════════════════════════════
                    SHOP ↔ FINANCING (left horizontal)
                ═══════════════════════════════════════════════ */}
                <line x1="290" y1="450" x2="450" y2="450"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf4" />

                {/* ═══════════════════════════════════════════════
                    SHOP ↔ LOGISTICS (right horizontal)
                ═══════════════════════════════════════════════ */}
                <line x1="560" y1="450" x2="710" y2="450"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf5" />

                {/* Logistics → B2B Ops label (far right vertical) */}
                <line x1="852" y1="450" x2="852" y2="570"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf1" />

                {/* ═══════════════════════════════════════════════
                    SHOP BOTTOM → SUPPLY SOURCES
                    Shop → Global Brands (left diagonal)
                ═══════════════════════════════════════════════ */}
                <line x1="475" y1="520" x2="390" y2="570"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf2" />

                {/* Shop → Local Distributors (straight down) */}
                <line x1="510" y1="520" x2="510" y2="570"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf3" />

                {/* Shop → Equipment (right diagonal) */}
                <line x1="545" y1="520" x2="620" y2="570"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf4" />

                {/* ═══════════════════════════════════════════════
                    BOTTOM TIER — supply nodes → bottom boxes
                    Left blue node → Cross-border box (down)
                ═══════════════════════════════════════════════ */}
                <line x1="260" y1="648" x2="260" y2="678"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf5" />

                {/* Right blue node → Intra-African box (down) */}
                <line x1="740" y1="648" x2="740" y2="678"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="7 5" strokeDashoffset="150"
                  strokeLinecap="round" className="lf1" />

                {/* Intra-African → Supply Infrastructure label (right) */}
                <line x1="842" y1="726" x2="900" y2="726"
                  stroke="#F9C319" strokeWidth="1.5"
                  strokeDasharray="8 5" strokeDashoffset="200"
                  strokeLinecap="round" className="lf2" />

                {/* ═══════════════════════════════════════════════
                    JUNCTION NODES — blue squares in diagram
                ═══════════════════════════════════════════════ */}
                <rect x="248" y="636" width="24" height="24" rx="4"
                  fill="#F9C319" opacity="0.9" className="np" />
                <rect x="728" y="636" width="24" height="24" rx="4"
                  fill="#F9C319" opacity="0.9" className="np"
                  style={{ animationDelay: "0.6s" }} />

                {/* ═══════════════════════════════════════════════
                    TRAVELLING SPARKS — one per major path
                ═══════════════════════════════════════════════ */}

                {/* Outer border — clockwise spark */}
                <circle r="4" fill="white" opacity="0.95">
                  <animateMotion dur="6s" repeatCount="indefinite"
                    path="M 28 52 L 972 52 Q 972 28 948 28 L 80 28 Q 28 28 28 80 L 28 720 Q 28 772 80 772 L 920 772 Q 972 772 972 720 L 972 80 Q 972 28 948 28" />
                </circle>

                {/* Inner box border spark */}
                <circle r="3" fill="#F9C319" opacity="0.9">
                  <animateMotion dur="4s" begin="1s" repeatCount="indefinite"
                    path="M 68 460 L 68 630 Q 68 650 88 650 L 852 650 Q 852 650 852 630 L 852 330 Q 852 310 832 310 L 88 310 Q 68 310 68 330 L 68 460" />
                </circle>

                {/* Webshop → POS spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.8s" begin="0.3s" repeatCount="indefinite"
                    path="M 430 215 L 540 215" />
                </circle>

                {/* POS → Retail Ops spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite"
                    path="M 730 215 L 830 215" />
                </circle>

                {/* Shop ↔ Financing spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.6s" begin="0s" repeatCount="indefinite"
                    path="M 450 450 L 290 450" />
                </circle>

                {/* Shop ↔ Logistics spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.6s" begin="0.5s" repeatCount="indefinite"
                    path="M 560 450 L 710 450" />
                </circle>

                {/* Webshop → Shop spark */}
                <circle r="3" fill="#F9C319" opacity="0.9">
                  <animateMotion dur="1.4s" begin="0.2s" repeatCount="indefinite"
                    path="M 400 278 L 460 355" />
                </circle>

                {/* POS → Shop spark */}
                <circle r="3" fill="#F9C319" opacity="0.9">
                  <animateMotion dur="1.4s" begin="0.7s" repeatCount="indefinite"
                    path="M 640 278 L 580 355" />
                </circle>

                {/* Shop → Local Distributors spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.3s" begin="0.4s" repeatCount="indefinite"
                    path="M 510 520 L 510 570" />
                </circle>

                {/* Left node → Cross-border spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1s" begin="0.1s" repeatCount="indefinite"
                    path="M 260 648 L 260 678" />
                </circle>

                {/* Right node → Intra-African spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1s" begin="0.6s" repeatCount="indefinite"
                    path="M 740 648 L 740 678" />
                </circle>

                {/* Intra-African → Supply Infra spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.5s" begin="0.8s" repeatCount="indefinite"
                    path="M 842 726 L 900 726" />
                </circle>

                {/* Logistics → B2B spark */}
                <circle r="3" fill="white" opacity="0.95">
                  <animateMotion dur="1.5s" begin="1.1s" repeatCount="indefinite"
                    path="M 852 450 L 852 570" />
                </circle>
              </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceMoveBetter;