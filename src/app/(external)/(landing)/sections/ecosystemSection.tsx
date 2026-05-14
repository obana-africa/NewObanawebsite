"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import shopPreview from "@/app/assets/images/landing-page/obana-shop.png";
import tajaPreview from "@/app/assets/images/landing-page/taja.png";
import logisticsPreview from "@/app/assets/images/landing-page/obana-logistics.png";
import salesforcePreview from "@/app/assets/images/landing-page/sales-force.png";

const cardsData = [
  {
    title: "B2B MARKETPLACE",
    description:
      "Obana Shop connects businesses and individuals to global products through a sourcing-driven commerce system built for accessibility and scale.",
    buttonText: "Visit shop",
    buttonHref: "https://shop.obana.africa/",
    previewImage: shopPreview,
  },
  {
    title: "TAJA POS/WEBSHOP",
    description:
      "Taja equips vendors and sales partners with the systems needed to distribute products, manage sales, and grow within the Obana ecosystem.",
    buttonText: "Discover Taja",
    buttonHref: "https://taja.obana.africa/",
    previewImage: tajaPreview,
  },
  {
    title: "OBANA LOGISTICS",
    description:
      "Handle imports, exports, shipping, and delivery through a logistics infrastructure designed to support smooth movement across borders and markets.",
    buttonText: "Explore Logistics",
    buttonHref: "http://logistics.obana.africa/",
    previewImage: logisticsPreview,
  },
  {
    title: "SALES PARTNER",
    description:
      "Obana Sales Partners connects individuals and businesses to opportunities within the ecosystem – enabling smarter distribution, customer reach, and scalable growth through connected commerce tools.",
    buttonText: "Become a Sales Partner",
    buttonHref: "http://logistics.obana.africa/",
    previewImage: salesforcePreview,
  },
];

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

const EcosystemCard: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  previewImage: string | StaticImageData;
  index: number;
}> = ({ title, description, buttonText, buttonHref, previewImage, index }) => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  const isExternal = buttonHref.startsWith("http");

  const buttonClass =
    "inline-flex items-center gap-3 px-8 py-3 rounded-lg text-white bg-[#1B3B5F] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#2a4d74]";

  const arrowStyle: React.CSSProperties = {
    display: "inline-block",
    fontSize: "1rem",
    transition: "transform 0.3s ease",
    transform: isHovered ? "translateX(5px)" : "translateX(0px)",
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-3xl overflow-hidden transition-all duration-300 ease-out"
      style={{
        backgroundColor: "#EFFAFD",
        boxShadow: isHovered
          ? "0 20px 40px rgba(27,59,95,0.18)"
          : "0 2px 8px rgba(27,59,95,0.08)",
        transform: isInView
          ? isHovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(40px)",
        opacity: isInView ? 1 : 0,
        transitionDelay: isInView ? `${index * 100}ms` : "0ms",
      }}
    >
      {/*
        Image and description share one continuous #EFFAFD background (the card itself).
        The image has top rounded corners only; the card's overflow-hidden clips it.
        The fade at the bottom of the image blends into the card bg — no separate
        panel, no margin, no gap possible at any point during the hover animation.
      */}
      <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
        <Image
          src={previewImage}
          alt={title}
          fill
          className="object-cover object-top"
          style={{
            transition: "transform 0.7s ease",
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            borderRadius: "24px 24px 0 0",
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "20px",
            background:
              "linear-gradient(to bottom, transparent, #EFFAFD 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

     
      <div
        className="flex flex-col items-center text-center"
        style={{ padding: "0.5rem 2.5rem 2.5rem" }}
      >
        <h3 className="text-3xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-md text-primary/70 leading-relaxed max-w-[440px] mb-6">
          {description}
        </p>
        {isExternal ? (
          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {buttonText}
            <span style={arrowStyle}>↗</span>
          </a>
        ) : (
          <Link href={buttonHref} className={buttonClass}>
            {buttonText}
            <span style={arrowStyle}>↗</span>
          </Link>
        )}
      </div>
    </div>
  );
};

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

      <div className="mx-auto max-w-[1271px] px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cardsData.map((card, idx) => (
            <EcosystemCard
              key={card.title}
              index={idx}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              buttonHref={card.buttonHref}
              previewImage={card.previewImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;