// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image, { StaticImageData } from "next/image";

// import shopPreview from "@/app/assets/images/landing-page/obana-shop.png";
// import tajaPreview from "@/app/assets/images/landing-page/taja.png";
// import logisticsPreview from "@/app/assets/images/landing-page/obana-logistics.png";
// import salesforcePreview from "@/app/assets/images/landing-page/sales-force.png";

// const cardsData = [
//   {
//     title: "B2B MARKETPLACE",
//     description:
//       "Obana Shop connects businesses and individuals to global products through a sourcing-driven commerce system built for accessibility and scale.",
//     buttonText: "Visit shop",
//     buttonHref: "https://shop.obana.africa/",
//     previewImage: shopPreview,
//   },
//   {
//     title: "TAJA POS/WEBSHOP",
//     description:
//       "Taja equips vendors and sales partners with the systems needed to distribute products, manage sales, and grow within the Obana ecosystem.",
//     buttonText: "Discover Taja",
//     buttonHref: "https://taja.obana.africa/",
//     previewImage: tajaPreview,
//   },
//   {
//     title: "OBANA LOGISTICS",
//     description:
//       "Handle imports, exports, shipping, and delivery through a logistics infrastructure designed to support smooth movement across borders and markets.",
//     buttonText: "Explore Logistics",
//     buttonHref: "http://logistics.obana.africa/",
//     previewImage: logisticsPreview,
//   },
//   {
//     title: "SALES PARTNER",
//     description:
//       "Obana Sales Partners connects individuals and businesses to opportunities within the ecosystem – enabling smarter distribution, customer reach, and scalable growth through connected commerce tools.",
//     buttonText: "Become a Sales Partner",
//     buttonHref: "http://logistics.obana.africa/",
//     previewImage: salesforcePreview,
//   },
// ];

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

// const EcosystemCard: React.FC<{
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonHref: string;
//   previewImage: string | StaticImageData;
//   index: number;
// }> = ({ title, description, buttonText, buttonHref, previewImage, index }) => {
//   const [ref, isInView] = useInView({ threshold: 0.2 });
//   const [isHovered, setIsHovered] = useState(false);

//   const isExternal = buttonHref.startsWith("http");

//   const buttonClass =
//     "inline-flex items-center gap-3 px-8 py-3 rounded-lg text-white bg-[#1B3B5F] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#2a4d74]";

//   const arrowStyle: React.CSSProperties = {
//     display: "inline-block",
//     fontSize: "1rem",
//     transition: "transform 0.3s ease",
//     transform: isHovered ? "translateX(5px)" : "translateX(0px)",
//   };

//   return (
//     <div
//       ref={ref}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="rounded-3xl overflow-hidden transition-all duration-300 ease-out"
//       style={{
//         backgroundColor: "#EFFAFD",
//         boxShadow: isHovered
//           ? "0 20px 40px rgba(27,59,95,0.18)"
//           : "0 2px 8px rgba(27,59,95,0.08)",
//         transform: isInView
//           ? isHovered
//             ? "translateY(-6px)"
//             : "translateY(0)"
//           : "translateY(40px)",
//         opacity: isInView ? 1 : 0,
//         transitionDelay: isInView ? `${index * 100}ms` : "0ms",
//       }}
//     >
     
//       <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
//         <Image
//           src={previewImage}
//           alt={title}
//           fill
//           className="object-cover object-top"
//           style={{
//             transition: "transform 0.7s ease",
//             transform: isHovered ? "scale(1.02)" : "scale(1)",
//             borderRadius: "24px 24px 0 0",
//           }}
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />
//         <div
//           aria-hidden
//           style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "20px",
//             background:
//               "linear-gradient(to bottom, transparent, #EFFAFD 100%)",
//             pointerEvents: "none",
//           }}
//         />
//       </div>

     
//       <div
//         className="flex flex-col items-center text-center"
//         style={{ padding: "0.5rem 2.5rem 2.5rem" }}
//       >
//         <h3 className="text-3xl font-bold text-primary mb-3">{title}</h3>
//         <p className="text-md text-primary/70 leading-relaxed max-w-[440px] mb-6">
//           {description}
//         </p>
//         {isExternal ? (
//           <a
//             href={buttonHref}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={buttonClass}
//           >
//             {buttonText}
//             <span style={arrowStyle}>↗</span>
//           </a>
//         ) : (
//           <Link href={buttonHref} className={buttonClass}>
//             {buttonText}
//             <span style={arrowStyle}>↗</span>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// const EcosystemSection: React.FC = () => {
//   return (
//     <section
//       className="w-full bg-white py-16 md:py-16 overflow-hidden"
//       style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
//     >
//       <div className="mx-auto max-w-[1271px] px-4 md:px-6 text-center mb-12">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
//           Obana Ecosystem
//         </h2>
//         <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto">
//           From accessing products to moving goods and enabling distribution,
//           every part of Obana works together to simplify modern commerce.
//         </p>
//       </div>

//       <div className="mx-auto max-w-[1271px] px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {cardsData.map((card, idx) => (
//             <EcosystemCard
//               key={card.title}
//               index={idx}
//               title={card.title}
//               description={card.description}
//               buttonText={card.buttonText}
//               buttonHref={card.buttonHref}
//               previewImage={card.previewImage}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EcosystemSection;

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PackageSearch,
  Landmark,
  Truck,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

const ECOSYSTEM_FEATURES = [
  {
    id: "source",
    title: "Source",
    description:
      "Discover & procure inventory from verified local and global suppliers at competitive prices.",
    icon: PackageSearch,
    href:"/rfq",
  },
  {
    id: "finance",
    title: "Finance",
    description:
      "Flexible credit, ONPSS for stock, and working capital tools built for fashion & beauty cash flows.",
    icon: Landmark,
    href:"http://obana.pss",
  },
  {
    id: "deliver",
    title: "Deliver",
    description:
      "logistics across cities and cross-border — trackable, reliable, affordable.",
    icon: Truck,
    href: "http://logistics.obana.africa",
  },
  {
    id: "digitalise",
    title: "Digitalise",
    description:
      "POS, online storefront, inventory management, and analytics — in one seamless dashboard.",
    icon: LayoutDashboard,
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
      className="group rounded-2xl overflow-hidden transition-all duration-500 ease-out will-change-transform h-full"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: isHovered
          ? "0 20px 30px -12px rgba(27,59,95,0.2)"
          : "0 8px 20px -6px rgba(27,59,95,0.08)",
        transform: isInView
          ? isHovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transitionDelay: isInView ? `${index * 80}ms` : "0ms",
      }}
    >
      <div className="p-5 md:p-6 flex flex-col items-start text-left gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgba(27,59,95,0.08) 0%, rgba(36,80,127,0.12) 100%)",
          }}
        >
          <Icon size={24} strokeWidth={1.7} style={{ color: "#1b3b5f" }} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-primary/70 leading-relaxed text-sm md:text-base">
          {description}
        </p>
        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowRight size={18} className="text-primary/40" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

const useAnimatedCanvas = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0, height = 0;
    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 140;
    const COLORS = ["27,59,95", "36,80,127", "251,191,36"];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; color: string;
    }
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.8, alpha: Math.random() * 0.4 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            const opacity = 0.1 * (1 - dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(27,59,95,${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha + 0.2})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
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

const EcosystemSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAnimatedCanvas(canvasRef);

  return (
    <>
      <style jsx>{`
        @keyframes softPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }
        .eco-orb { animation: softPulse 8s ease-in-out infinite; }
      `}</style>
      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: "#F9FCFE",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          padding: "clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
        <div className="eco-orb absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(27,59,95,0.1) 0%, transparent 70%)", zIndex: 0 }} />
        <div className="eco-orb absolute bottom-10 right-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", zIndex: 0, animationDelay: "2s" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold text-primary mb-3 tracking-tight">
              Obana Ecosystem
            </h2>
            <p className="text-base md:text-lg text-primary/70 max-w-2xl mx-auto">
             From accessing products to moving goods and enabling distribution, every part of Obana works together to simplify modern commerce.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {ECOSYSTEM_FEATURES.map((feature, idx) => (
              <EcosystemCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EcosystemSection;