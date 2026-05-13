"use client";

import React, { useState, useEffect, useRef } from "react";

// ---------- Hooks ----------
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

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    hoverHandlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onFocus: () => setIsHovered(true),
      onBlur: () => setIsHovered(false),
    },
  };
};

// ---------- Card Data ----------
const steps = [
  {
    title: "Source",
    description:
      "Access global suppliers and source high‑demand products directly through Obana’s expansive network.",
  },
  {
    title: "Move",
    description:
      "Seamless logistics and delivery from pick‑up to final destination, powered by EV‑enabled infrastructure.",
  },
  {
    title: "Sell",
    description:
      "Turn products into profit with sophisticated tools to resell, manage inventory, and grow your business.",
  },
];

// ---------- Card Component ----------
const ProcessCard: React.FC<{
  title: string;
  description: string;
  index: number;
}> = ({ title, description, index }) => {
  const { isHovered, hoverHandlers } = useHover();
  const [cardRef, isInView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      {...hoverHandlers}
      className={`
        w-[349px] h-[273px] rounded-[17.28px] 
        flex flex-col items-center justify-center text-center p-8
        transition-all duration-400 ease-out
        ${isHovered ? "bg-[#1B3B5F] shadow-2xl scale-[1.02]" : "bg-transparent shadow-md scale-100"}
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: isInView ? `${index * 150}ms` : "0ms",
        fontFamily: "'Bricolage Grotesque', sans-serif",
      }}
    >
      <h3 className={`text-2xl font-bold mb-4 transition-colors duration-400 ${
          isHovered ? "text-white" : "text-primary"
        }`}>{title}</h3>

       {/* Divider */}
      <div  className={`w-[250px] h-px mb-4 transition-colors duration-400 ${
    isHovered ? "bg-white" : "bg-[#1B3B5F]"
  }`} />

      <p className={`text-sm font-bold leading-relaxed transition-all duration-400 ${
          isHovered ? "text-white" : "text-primary/70"
        }`}>{description}</p>
    </div>
  );
};



// ---------- Section Component ----------
const HowObanaWorks: React.FC = () => {
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });

  return (
    <section
      className="w-full bg-white py-20 overflow-hidden"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
    >
      <div className="mx-auto max-w-[1109px] px-4">
        {/* Header */}
        <div
          className="text-center mb-16"
          ref={sectionRef as React.RefObject<HTMLDivElement>}
        >
          <h2
            className={`
              text-4xl md:text-5xl font-bold text-primary mb-4
              transition-all duration-700
              ${isSectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            How Obana Works
          </h2>
          <p
            className={`
              text-lg md:text-xl text-primary/70 max-w-2xl mx-auto
              transition-all duration-700 delay-100
              ${isSectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            A simple, connected process that takes you from sourcing to delivery
            to selling — all within one ecosystem.
          </p>
        </div>

        {/* Cards area – exact dimensions */}
        <div
          className="mx-auto w-[1109px] h-[441px] flex justify-center items-center gap-[54px]"
          style={{ maxWidth: "100%" }} // prevent overflow on smaller screens
        >
          {steps.map((step, idx) => (
            <ProcessCard
              key={idx}
              title={step.title}
              description={step.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowObanaWorks;