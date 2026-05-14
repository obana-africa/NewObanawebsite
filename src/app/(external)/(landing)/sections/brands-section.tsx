"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { logoSlickSettings } from "@/lib/slick";
import asos from "@/app/assets/images/landing-page/gig.png";
import boohoo from "@/app/assets/images/landing-page/boohoo.png";
import tommy from "@/app/assets/images/landing-page/tommy.png";
import zara from "@/app/assets/images/landing-page/zara.png";
import terminal from "@/app/assets/images/landing-page/Terminal.png";
import gap from "@/app/assets/images/landing-page/cargplug.png";
import hacket from "@/app/assets/images/landing-page/hacket.png";
import adidas from "@/app/assets/images/landing-page/adidas.png";
import jack from "@/app/assets/images/landing-page/jack.png";
import select from "@/app/assets/images/landing-page/select.png";
import spar from "@/app/assets/images/landing-page/spar.png";
import foodco from "@/app/assets/images/landing-page/foodco.png";
import market from "@/app/assets/images/landing-page/market.png";
import Seperator from "@/components/external/components/seperator";

const logoImages = [
  { id: 1,  src: asos,     alt: "Asos" },
  { id: 2,  src: zara,     alt: "Zara" },
  { id: 3,  src: terminal, alt: "Terminal" },
  { id: 4,  src: boohoo,   alt: "BoohooMAN" },
  { id: 5,  src: gap,      alt: "Gap" },
  { id: 6,  src: tommy,    alt: "Tommy Hilfiger" },
  { id: 7,  src: hacket,   alt: "Hackett" },
  { id: 8,  src: adidas,   alt: "Adidas" },
  { id: 9,  src: jack,     alt: "Jack" },
  { id: 10, src: select,   alt: "Select" },
  { id: 11, src: spar,     alt: "Spar" },
  { id: 12, src: foodco,   alt: "Foodco" },
  { id: 13, src: market,   alt: "Market" },
];

// Override slidesToShow per breakpoint so logos breathe on mobile
const sliderSettings = {
  ...logoSlickSettings,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 2 },
    },
  ],
};

const GlobalBrands = () => {
  return (
    <div className="w-full h-[200px] py-4 md:py-4 bg-secondary relative overflow-hidden z-10">
      {/* Decorative blur */}
      <div
        className="absolute w-[182px] h-[56px] opacity-30 blur-[50px] bg-[#222] rounded-full pointer-events-none"
        style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 mb-6 flex flex-col items-center relative z-10">
        <h5 className="text-center mb-2 font-bold sm:font-normal text-sm md:text-base">
          Over 20 brands and partners and growing everyday
        </h5>
        <Seperator />
      </div>

      {/* Force slick to reduce internal slide gap */}
      <style>{`
        .brand-logo-slider .slick-slide { padding: 0; }
        .brand-logo-slider .slick-list  { margin: 0; }
      `}</style>

      {/* Slider */}
      <div className="container mx-auto relative z-10">
        <Slider {...sliderSettings} className="brand-logo-slider">
          {logoImages.map((image) => (
            <div
              key={image.id}
              className="outline-none"
            >
              {/* Logo container — smaller on mobile, larger on desktop */}
              <div className="relative mx-auto h-12 md:h-16 lg:h-20 w-full max-w-[100px] md:max-w-[140px] lg:max-w-[160px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 160px"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GlobalBrands;