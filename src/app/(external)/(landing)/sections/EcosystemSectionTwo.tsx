"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/contexts/modal-context";

// Replace with your actual ecosystem illustration
import ecosystemDiagram from "@/app/assets/images/landing-page/ecosystem-diagram.png";

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

// ---------- Main Section ----------
const CommerceMoveBetter: React.FC = () => {
  const { openGetStartedModal } = useModal();
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });

  const handleExploreEcosystem = () => {
    openGetStartedModal();
  };

  const handleBecomePartner = () => {
    // route to partner page or modal – adjust as needed
    openGetStartedModal(); // placeholder
  };

  return (
    <section
      className="w-full py-20 bg-white overflow-hidden"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
    >
      <div className="mx-auto max-w-[1271px] px-4 md:px-0">
        {/* Card container with exact Figma dimensions */}
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className={`
            w-full h-[602px] bg-[#1B3B5F] rounded-[30px]
            px-[49px] py-[48px]
            transition-all duration-700 ease-out
            hover:shadow-2xl hover:scale-[1.01]
            shadow-lg
            ${isSectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <div className="flex h-full gap-[30px]">
            {/* LEFT SIDE – Text & Buttons – width exactly 492px, height 342px (centered vertically) */}
            <div className="w-[492px] h-full flex flex-col justify-center gap-[41px]">
              <div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F9C319] mb-4 leading-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Let Commerce Move Better
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
                  onClick={handleExploreEcosystem}
                >
                  Explore Ecosystem
                  <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  variant="primary"
                  animation="ripple"
                  className="border border-white text-primary bg-transparent hover:bg-white  transition-all duration-300 font-medium"
                  onClick={handleBecomePartner}
                >
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4 rotate-[-40deg] transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE – Ecosystem Diagram */}
            <div className="flex-1 h-full relative">
              <Image
                src={ecosystemDiagram}
                alt="Obana ecosystem diagram"
                fill
                className="object-contain"
                sizes="(max-width: 1271px) 100vw, 651px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceMoveBetter;