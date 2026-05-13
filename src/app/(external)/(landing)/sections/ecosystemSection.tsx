"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import  Image, { StaticImageData }  from "next/image";

// ---------- your product screenshot imports ----------
import shopPreview from "@/app/assets/images/landing-page/obana-shop.png";
import tajaPreview from "@/app/assets/images/landing-page/taja.png";
import logisticsPreview from "@/app/assets/images/landing-page/obana-logistics.png";

// ---------- Intersection Observer hook (scroll‑in) ----------
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

// ---------- Custom hover hook ----------
const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    hoverHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};

// =========== Card component ===========
const EcosystemCard: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  previewImage: string | StaticImageData;
  index: number;
}> = ({ title, description, buttonText, buttonHref, previewImage, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const { isHovered, hoverHandlers } = useHover();

  return (
    <div
      ref={ref}
      {...hoverHandlers}
      className={`
        w-[404px] rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        ${isHovered ? "shadow-2xl -translate-y-1" : "shadow-sm translate-y-0"}
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        bg-[#EFFAFD] border border-[#EFFAFD]
      `}
      style={{
        transitionDelay: isInView ? `${index * 150}ms` : "0ms",
      }}
    >
      {/* Full‑width screenshot image */}
      <div className="w-full h-[200px] relative overflow-hidden">
        <Image
          src={previewImage}
          alt={title}
          fill
          className="object-cover"
          sizes="404px"
        />
      </div>

      {/* Text area – centered */}
      <div className="p-6 flex flex-col items-center text-center gap-4">
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm text-primary/70 leading-relaxed">{description}</p>

        {/* Button */}
        <div>
          {buttonHref.startsWith("http") ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1 p-3 rounded-md text-white bg-[#1B3B5F]  font-semibold text-sm
                transition-colors duration-200
                ${isHovered ? "text-primary-light" : ""}
              `}
            >
              {buttonText}
              <span
                className={`
                  transition-transform duration-300
                  ${isHovered ? "translate-x-0.5" : ""}
                `}
              >
                →
              </span>
            </a>
          ) : (
            <Link
              href={buttonHref}
              className={`
                inline-flex items-center gap-1 text-primary font-semibold text-sm
                transition-colors duration-200
                ${isHovered ? "text-primary-light" : ""}
              `}
            >
              {buttonText}
              <span
                className={`
                  transition-transform duration-300
                  ${isHovered ? "translate-x-0.5" : ""}
                `}
              >
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// =========== Main Section (unchanged) ===========
const EcosystemSection: React.FC = () => {
  return (
    <section
      className="w-full bg-white py-16 md:py-20 overflow-hidden"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
    >
      <div className="mx-auto max-w-[1271px] px-4 md:px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          One Connected Ecosystem
        </h2>
        <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
          From accessing products to moving goods and enabling distribution,
          every part of Obana works together to simplify modern commerce.
        </p>
      </div>

      <div className="mx-auto max-w-[1271px] px-0">
        <div className="flex justify-center gap-6 items-start">
          <EcosystemCard
            index={0}
            title="OBANA SHOP"
            description="Obana Shop connects businesses and individuals to global products through a sourcing-driven commerce system built for accessibility and scale."
            buttonText="Visit shop"
            buttonHref="https://shop.obana.africa/"
            previewImage={shopPreview}
          />
          <EcosystemCard
            index={1}
            title="TAJA"
            description="Taja equips vendors and sales partners with the systems needed to distribute products, manage sales, and grow within the Obana ecosystem."
            buttonText="Discover Taja"
            buttonHref="https://taja.obana.africa/"
            previewImage={tajaPreview}
          />
          <EcosystemCard
            index={2}
            title="OBANA LOGISTICS"
            description="Handle imports, exports, shipping, and delivery through a logistics infrastructure designed to support smooth movement across borders and markets."
            buttonText="Explore Logistics"
            buttonHref="http://logistics.obana.africa/"
            previewImage={logisticsPreview}
          />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;