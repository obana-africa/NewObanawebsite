"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface Testimonial {
  quote: string;
  quoteTitle: string;
  name: string;
  role: string;
  image: string | StaticImageData;
  date: string;
}

interface TestimonialSectionProps {
  title: string;
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant: "light" | "dark";
}

// ─── Single Testimonial Card ─────────────────────────────────────────────────
const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { quote, quoteTitle, name, role, image, date } = testimonial;

  return (
    <div
      className="flex flex-col rounded-2xl bg-[#E9F9FF] relative overflow-hidden"
      style={{
        width: "300px",
        minHeight: "310px",
        padding: "20px",
        boxShadow: "0 4px 24px rgba(27,59,95,0.10), 0 1px 4px rgba(27,59,95,0.06)",
        border: "1px solid rgba(27,59,95,0.07)",
      }}
    >
      {/* ── Decorative elements ── */}
      <div className="absolute pointer-events-none"
        style={{ top: "-40px", right: "-40px", width: "140px", height: "140px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(27,59,95,0.06) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none"
        style={{ bottom: "-24px", left: "-24px", width: "90px", height: "90px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 pointer-events-none opacity-25"
        style={{ width: "70px", height: "70px",
          backgroundImage: "radial-gradient(circle, rgba(27,59,95,0.4) 1.2px, transparent 1.2px)",
          backgroundSize: "10px 10px" }} />
      <div className="absolute top-4 right-4 pointer-events-none" style={{ opacity: 0.06 }}>
        <Quote size={44} color="#1b3b5f" fill="#1b3b5f" />
      </div>

      {/* ── Avatar + name + role ── */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        {/* Fixed-size container — required for next/image fill to render */}
        <div style={{
          position: "relative",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 0 0 3px rgba(27,59,95,0.1), 0 2px 8px rgba(27,59,95,0.15)",
        }}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top"
            sizes="52px"
            priority
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-sm text-gray-900 leading-tight truncate"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {name}
          </h4>
          <p className="text-xs font-semibold mt-0.5 truncate"
            style={{ color: "#1b3b5f", opacity: 0.6, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {role}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-3 relative z-10"
        style={{ background: "linear-gradient(90deg, rgba(27,59,95,0.13), rgba(251,191,36,0.25), transparent)" }} />

      {/* Quote title */}
      {quoteTitle && (
        <h5 className="font-bold text-sm mb-2 leading-snug relative z-10"
          style={{ color: "#1b3b5f", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          {quoteTitle}
        </h5>
      )}

      {/* Quote body */}
      <p className="text-[12px] leading-relaxed flex-1 line-clamp-5 relative z-10"
        style={{ color: "rgba(27,59,95,0.7)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        {quote}
      </p>

      {/* Date */}
      <div className="flex justify-between items-center mt-3 pt-3 relative z-10"
        style={{ borderTop: "1px solid rgba(27,59,95,0.08)" }}>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#fbbf24" }} />
          ))}
        </div>
        <p className="text-xs font-semibold"
          style={{ color: "rgba(27,59,95,0.45)", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          {date}
        </p>
      </div>
    </div>
  );
};

// Card width + gap constants
const CARD_WIDTH = 300;
const CARD_GAP   = 20;
const STEP       = CARD_WIDTH + CARD_GAP;

// ─── Main Section ─────────────────────────────────────────────────────────────
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  testimonials,
  autoPlayInterval = 4000,
}) => {
  const [offset,   setOffset]   = useState(0);
  const [animated, setAnimated] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const looped    = [...testimonials, ...testimonials];
  const loopWidth = testimonials.length * STEP;

  const advance = useCallback(() => {
    setAnimated(true);
    setOffset(prev => {
      const next = prev + STEP;
      if (next >= loopWidth) setTimeout(() => { setAnimated(false); setOffset(0); }, 500);
      return next;
    });
  }, [loopWidth]);

  const retreat = useCallback(() => {
    setAnimated(true);
    setOffset(prev => {
      if (prev <= 0) {
        setAnimated(false); setOffset(loopWidth);
        setTimeout(() => { setAnimated(true); setOffset(loopWidth - STEP); }, 20);
        return prev;
      }
      return prev - STEP;
    });
  }, [loopWidth]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(advance, autoPlayInterval);
    return () => clearInterval(id);
  }, [isPaused, advance, autoPlayInterval]);

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8faff 0%, #eef3fb 50%, #f5f8ff 100%)" }}
    >
      {/* ── Animated canvas ── */}
      <canvas ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }} />

      {/* ── Vivid orbs ── */}
      <div className="absolute top-[-60px] left-[-60px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27,59,95,0.12) 0%, transparent 65%)", zIndex: 1,
          animation: "orbFloat1 8s ease-in-out infinite" }} />
      <div className="absolute bottom-[-40px] right-[-40px] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 65%)", zIndex: 1,
          animation: "orbFloat2 10s ease-in-out infinite" }} />
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(27,59,95,0.07) 0%, transparent 65%)", zIndex: 1,
          animation: "orbFloat3 7s ease-in-out infinite" }} />

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(27,59,95,0.09) 1.2px, transparent 1.2px)",
        backgroundSize: "30px 30px", zIndex: 1,
      }} />

      {/* ── Header ── */}
      <div className="container mx-auto px-4 md:px-6 relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {title}
          </h2>
          {/* Gold underline accent */}
          <div className="mx-auto mt-3 w-16 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #fbbf24, transparent)" }} />
        </div>
      </div>

      {/* ── Slider ── */}
      <div
        className="overflow-x-hidden relative"
        style={{
          paddingLeft: "max(1rem, calc((100vw - 1152px) / 2))",
          paddingTop: "16px", paddingBottom: "20px",
          zIndex: 10,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            transform: `translateX(-${offset}px)`,
            transition: animated ? "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
          }}
        >
          {looped.map((testimonial, idx) => (
            <div key={idx} style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}>
              <TestimonialCard testimonial={testimonial} variant="light" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-center items-center gap-4 mt-6 mb-2 relative" style={{ zIndex: 10 }}>
        <button onClick={retreat}
          className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer"
          aria-label="Previous testimonial">
          <ChevronLeft size={24} />
        </button>
        <button onClick={advance}
          className="w-12 h-12 rounded-full border-primary border-2 bg-white hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg cursor-pointer"
          aria-label="Next testimonial">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;