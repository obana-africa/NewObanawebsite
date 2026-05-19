// "use client";
// import React from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import { logoSlickSettings } from "@/lib/slick";
// import asos from "@/app/assets/images/landing-page/gig.png";
// import boohoo from "@/app/assets/images/landing-page/boohoo.png";
// import tommy from "@/app/assets/images/landing-page/tommy.png";
// import zara from "@/app/assets/images/landing-page/zara.png";
// import terminal from "@/app/assets/images/landing-page/Terminal.png";
// import gap from "@/app/assets/images/landing-page/cargplug.png";
// import hacket from "@/app/assets/images/landing-page/hacket.png";
// import adidas from "@/app/assets/images/landing-page/adidas.png";
// import jack from "@/app/assets/images/landing-page/jack.png";
// import select from "@/app/assets/images/landing-page/select.png";
// import spar from "@/app/assets/images/landing-page/spar.png";
// import foodco from "@/app/assets/images/landing-page/foodco.png";
// import market from "@/app/assets/images/landing-page/market.png";
// import Seperator from "@/components/external/components/seperator";

// const logoImages = [
//   { id: 1,  src: asos,     alt: "Asos" },
//   { id: 2,  src: zara,     alt: "Zara" },
//   { id: 3,  src: terminal, alt: "Terminal" },
//   { id: 4,  src: boohoo,   alt: "BoohooMAN" },
//   { id: 5,  src: gap,      alt: "Gap" },
//   { id: 6,  src: tommy,    alt: "Tommy Hilfiger" },
//   { id: 7,  src: hacket,   alt: "Hackett" },
//   { id: 8,  src: adidas,   alt: "Adidas" },
//   { id: 9,  src: jack,     alt: "Jack" },
//   { id: 10, src: select,   alt: "Select" },
//   { id: 11, src: spar,     alt: "Spar" },
//   { id: 12, src: foodco,   alt: "Foodco" },
//   { id: 13, src: market,   alt: "Market" },
// ];

// // Override slidesToShow per breakpoint so logos breathe on mobile
// const sliderSettings = {
//   ...logoSlickSettings,
//   slidesToShow: 4,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: { slidesToShow: 4 },
//     },
//     {
//       breakpoint: 768,
//       settings: { slidesToShow: 3 },
//     },
//     {
//       breakpoint: 480,
//       settings: { slidesToShow: 2 },
//     },
//   ],
// };

// const GlobalBrands = () => {
//   return (
//     <div className="w-full h-[200px] py-4 md:py-4 bg-secondary relative overflow-hidden z-10">
//       {/* Decorative blur */}
//       <div
//         className="absolute w-[182px] h-[56px] opacity-30 blur-[50px] bg-[#222] rounded-full pointer-events-none"
//         style={{ top: "50px", left: "50%", transform: "translateX(-50%)" }}
//       />

//       {/* Header */}
//       <div className="container mx-auto px-4 mb-6 flex flex-col items-center relative z-10">
//         <h5 className="text-center mb-2 font-bold sm:font-normal text-sm md:text-base">
//           Over 20 brands and partners and growing everyday
//         </h5>
//         <Seperator />
//       </div>

//       {/* Force slick to reduce internal slide gap */}
//       <style>{`
//         .brand-logo-slider .slick-slide { padding: 0; }
//         .brand-logo-slider .slick-list  { margin: 0; }
//       `}</style>

//       {/* Slider */}
//       <div className="container mx-auto relative z-10">
//         <Slider {...sliderSettings} className="brand-logo-slider">
//           {logoImages.map((image) => (
//             <div
//               key={image.id}
//               className="outline-none"
//             >
//               {/* Logo container — smaller on mobile, larger on desktop */}
//               <div className="relative mx-auto h-12 md:h-16 lg:h-20 w-full max-w-[100px] md:max-w-[140px] lg:max-w-[160px]">
//                 <Image
//                   src={image.src}
//                   alt={image.alt}
//                   fill
//                   className="object-contain"
//                   sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 160px"
//                 />
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default GlobalBrands;

"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import asos     from "@/app/assets/images/landing-page/gig.png";
import boohoo   from "@/app/assets/images/landing-page/boohoo.png";
import tommy    from "@/app/assets/images/landing-page/tommy.png";
import zara     from "@/app/assets/images/landing-page/zara.png";
import terminal from "@/app/assets/images/landing-page/Terminal.png";
import gap      from "@/app/assets/images/landing-page/cargplug.png";
import hacket   from "@/app/assets/images/landing-page/hacket.png";
import adidas   from "@/app/assets/images/landing-page/adidas.png";
import jack     from "@/app/assets/images/landing-page/jack.png";
import select   from "@/app/assets/images/landing-page/select.png";
import spar     from "@/app/assets/images/landing-page/spar.png";
import foodco   from "@/app/assets/images/landing-page/foodco.png";
import market   from "@/app/assets/images/landing-page/market.png";

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

/* Triplicate for seamless infinite loop at any screen width */
const marqueeLogos = [...logoImages, ...logoImages, ...logoImages];

const GlobalBrands = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Pause on hover */
  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .brands-bg {
          background: #f0f2f5;
        }

        @keyframes scanLine {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.04; }
          90%  { opacity: 0.04; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(27,59,95,0.3), transparent);
          animation: scanLine 8s ease-in-out infinite;
          pointer-events: none;
        }
      ` }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes dotNavy {
          0%, 100% { opacity: 0.55; transform: scale(1);   box-shadow: 0 0 0px 0px rgba(27,59,95,0); }
          50%       { opacity: 1;   transform: scale(1.6); box-shadow: 0 0 7px 3px rgba(27,59,95,0.35); }
        }
        @keyframes dotGold {
          0%, 100% { opacity: 0.6;  transform: scale(1);   box-shadow: 0 0 0px 0px rgba(251,191,36,0); }
          50%       { opacity: 1;   transform: scale(1.7); box-shadow: 0 0 8px 4px rgba(251,191,36,0.5); }
        }
        .dot-navy { animation: dotNavy 2.6s ease-in-out infinite; }
        .dot-gold { animation: dotGold 2.2s ease-in-out infinite; }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, -15px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-18px, 12px) scale(1.06); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(12px, 16px) scale(1.05); }
        }
        .orb-1 { animation: orbFloat1 7s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 9s ease-in-out infinite; }
        .orb-3 { animation: orbFloat3 6s ease-in-out infinite; }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.7;  transform: scale(1);   }
          50%       { opacity: 1;    transform: scale(1.4); }
        }
        .logo-dot { animation: dotPulse 2.5s ease-in-out infinite; }
      ` }} />

      <div className="w-full py-5 relative overflow-hidden z-10 bg-white">

        {/* ── Dynamic background design ── */}

        {/* Dot grid pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(27,59,95,0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Large floating orbs */}
        <div className="orb-1 absolute top-[-40px] left-[10%] w-[220px] h-[220px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,59,95,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />
        <div className="orb-2 absolute bottom-[-50px] right-[12%] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)", filter: "blur(28px)" }} />
        <div className="orb-3 absolute top-[10%] left-[50%] w-[160px] h-[160px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(27,59,95,0.07) 0%, transparent 70%)", filter: "blur(24px)" }} />

        {/* Header */}
        <div className="relative z-10 text-center mb-4 px-4">
          <p
            className="text-primary/50 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Trusted by 20+ brands and partners — growing every day
          </p>
          <div className="mx-auto mt-2 w-16 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #1b3b5f, transparent)" }} />
        </div>

        {/* Edge fade masks — white */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #ffffff 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #ffffff 0%, transparent 100%)" }} />

        {/* Marquee */}
        <div
          className="relative z-10 overflow-hidden"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div ref={trackRef} className="marquee-track">
            {marqueeLogos.map((image, idx) => (
              <div
                key={`${image.id}-${idx}`}
                className="flex items-center gap-0 flex-shrink-0"
              >
                {/* Logo */}
                <div className="flex items-center justify-center px-4 md:px-5">
                  <div className="relative h-9 md:h-11 lg:h-12 w-[90px] md:w-[110px] lg:w-[130px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                      sizes="(max-width: 768px) 90px, 130px"
                    />
                  </div>
                </div>
                {/* Dot separator — bright pulsing */}
                <span
                  className={`flex-shrink-0 rounded-full ${idx % 2 === 0 ? "dot-navy" : "dot-gold"}`}
                  style={{
                    width: "7px",
                    height: "7px",
                    minWidth: "7px",
                    display: "block",
                    background: idx % 2 === 0 ? "#1b3b5f" : "#fbbf24",
                    animationDelay: `${(idx % 6) * 0.35}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalBrands;