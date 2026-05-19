"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Users, Zap, Clock } from "lucide-react";

/* ------------------------------------------------------------------
   Data for the left column: SME Journey steps
------------------------------------------------------------------ */
const JOURNEY_STEPS = [
  {
    title: "Start",
    description:
      "Build the foundation for your fashion business with the right infrastructure from day one. Create your business account, set up your online webshop, configure your POS system, and access global sourcing networks tailored to your operational needs.",
    icon: Zap,
  },
  {
    title: "Operate",
    description:
      "Streamline your daily operations through one connected ecosystem. Manage inventory, fulfill orders, coordinate logistics, track stock movement, process retail and B2B transactions, and maintain visibility across your entire supply chain in real time.",
    icon: Clock,
  },
  {
    title: "Scale",
    description:
      "Expand confidently with infrastructure designed for long-term growth. Access financing opportunities, optimize procurement, automate workflows, unlock business insights, expand into new markets, and strengthen distribution channels with enterprise-grade commerce and logistics support.",
    icon: TrendingUp,
  },
];

/* ------------------------------------------------------------------
   Stats data (right column)
------------------------------------------------------------------ */
const STATS_DATA = [
  { value: "$600B+", label: "African fashion market" },
  { value: "90%", label: "SMEs underserved digitally" },
  { value: "3x", label: "Faster inventory turnover" },
  { value: "24/7", label: "Platform availability" },
];

/* ------------------------------------------------------------------
   Intersection Observer hook – reusable animation trigger
------------------------------------------------------------------ */
const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(element);
      }
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
};

/* ------------------------------------------------------------------
   Animated canvas background (same as ecosystem section)
   Adjusted colors for dark theme – softer particles
------------------------------------------------------------------ */
const useAnimatedCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0,
      height = 0;
    const PARTICLE_COUNT = 45;
    const CONNECTION_DISTANCE = 140;
    // Lighter colors for dark background
    const COLORS = ["100,149,237", "173,216,230", "255,215,0"];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines with soft visibility
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            const opacity = 0.08 * (1 - dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(200,220,255,${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with glow
      particles.forEach((p) => {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha + 0.2})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [canvasRef]);
};

/* ------------------------------------------------------------------
   Single Journey Step Card (left column) – light text on dark bg
------------------------------------------------------------------ */
const JourneyStep: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}> = ({ title, description, icon: Icon, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-4 transition-all duration-500 ease-out"
      style={{
        transform: isInView ? "translateX(0)" : "translateX(-20px)",
        opacity: isInView ? 1 : 0,
        transitionDelay: isInView ? `${index * 100}ms` : "0ms",
      }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(2px)",
          transform: isHovered ? "scale(1.05) rotate(2deg)" : "scale(1)",
        }}
      >
        <Icon size={22} strokeWidth={1.7} style={{ color: "#fbbf24" }} />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------
   Main Why Us Section – Dark gradient background, reduced left width
------------------------------------------------------------------ */
const WhyUsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAnimatedCanvas(canvasRef);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <>
      <style jsx>{`
        @keyframes softPulseWhy {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.03); }
        }
        .why-orb {
          animation: softPulseWhy 8s ease-in-out infinite;
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0a1628 0%, #1b3b5f 45%, #0d2240 100%)",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          padding: "clamp(3rem, 8vw, 5rem) 0",
        }}
      >
        {/* Animated canvas background (overlay) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0, opacity: 0.5 }}
        />

        {/* Soft floating orbs for depth – with lighter colors */}
        <div
          className="why-orb absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div
          className="why-orb absolute bottom-20 left-10 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            zIndex: 0,
            animationDelay: "2.5s",
          }}
        />

        {/* Content container */}
        <div
          ref={ref}
          className="relative z-10 max-w-5xl mx-auto px-5 md:px-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT COLUMN — SME JOURNEY (reduced width) */}
            <div className="lg:max-w-md">
              <div className="mb-8">
                <span className="text-lg font-bold uppercase tracking-wider text-[#F9C319]">
                  THE SME JOURNEY
                </span>
              </div>
              <div className="space-y-8">
                {JOURNEY_STEPS.map((step, idx) => (
                  <JourneyStep
                    key={step.title}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    index={idx}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN — WHY US */}
            <div>
              <div className="mb-6">
                <span className="text-lg font-bold uppercase tracking-wider text-[#F9C319]">
                  WHY US
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Built for the{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">real African market.</span>
                  <span
                    className="absolute bottom-2 left-0 w-full h-3 bg-yellow-500/40 -z-0"
                    style={{ transform: "rotate(-1deg)" }}
                  />
                </span>
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Designed around how fashion & beauty SMEs actually work —
                informal, fast-moving, relationship-driven — with the digital
                tools to match.
              </p>

              {/* Stats grid – cards with semi-transparent background */}
              <div className="grid grid-cols-2 gap-5 mb-8">
                {STATS_DATA.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="text-2xl md:text-3xl font-black text-[#F9C319]">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-md cursor-pointer bg-white text-primary font-semibold text-sm transition-all duration-300 hover:bg-white/80 hover:shadow-lg hover:shadow-yellow-500/20"
                onClick={() => { }}
                
              >
                Learn how it works
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* Bottom tags */}
              <div className="flex flex-wrap gap-3 mt-10">
                {["Fashion", "Beauty", "Retail", "SMEs"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/15"
                  >
                    {tag}
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

export default WhyUsSection;