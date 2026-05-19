// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image, { StaticImageData } from "next/image";

// interface Testimonial {
//   quote: string;
//   quoteTitle: string;
//   name: string;
//   role: string;
//   image: string | StaticImageData;
//   date: string;
// }

// interface TestimonialSectionProps {
//   title: string;
//   testimonials: Testimonial[];
//   autoPlayInterval?: number;
// }

// // ─── Single Testimonial Card ─────────────────────────────────────────────────
// interface TestimonialCardProps {
//   testimonial: Testimonial;
//   /** Alternates the card between light and dark variants */
//   variant: "light" | "dark";
// }

// const TestimonialCard: React.FC<TestimonialCardProps> = ({
//   testimonial,
//   variant,
// }) => {
//   const { quote, quoteTitle, name, role, image, date } = testimonial;

//   const isDark = variant === "dark";

//   const textColor = isDark ? "#FFFFFF" : "#1B3B5F";
//   const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(27,59,95,0.55)";
//   const bodyColor = isDark ? "rgba(255,255,255,0.82)" : "rgba(27,59,95,0.82)";
//   const dateColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(27,59,95,0.45)";
//   const bgColor = isDark ? "#1B3B5F" : "#E9F9FF";

//   return (
//     <div className="flex flex-row items-stretch gap-3 h-[280px] md:h-[300px] lg:h-[340px]">
//       {/* Left panel: Image — standalone rounded card */}
//       <div className="relative w-[44%] shrink-0 rounded-2xl overflow-hidden shadow-md">
//         <Image
//           src={image}
//           alt={name}
//           fill
//           quality={100}
//           className="object-cover object-top"
//           sizes="(max-width: 768px) 44vw, 210px"
//           priority
//         />
//       </div>

//       {/* Right panel: Description — separate rounded card, narrower */}
//       <div
//         className="flex flex-col rounded-2xl p-4 md:p-5 shadow-md min-w-0 w-[56%]"
//         style={{ backgroundColor: bgColor }}
//       >
//         {/* Top: name + role */}
//         <div className="mt-4">
//           <h4
//             className="font-bold text-sm md:text-base leading-tight"
//             style={{ color: textColor }}
//           >
//             {name}
//           </h4>
//           <p className="text-xs md:text-sm font-bold mt-0.5" style={{ color: subColor }}>
//             {role}
//           </p>
//         </div>

//         {/* Middle: quote title + quote body */}
//         <div className="mt-4 flex-1 flex flex-col">
//           <h5
//             className="font-bold text-md md:text-base mb-2 leading-snug mt-10"
//             style={{ color: textColor }}
//           >
//             {quoteTitle}
//           </h5>
//           <p
//             className="text-xs md:text-sm leading-relaxed line-clamp-4"
//             style={{ color: bodyColor }}
//           >
//             {quote}
//           </p>
//         </div>

//         {/* Bottom: date pinned to bottom-right */}
//         <div className="flex justify-end pt-2 font-bold">
//           <p className="text-xs" style={{ color: dateColor }}>
//             {date}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Card width + gap constants — used for offset calculation
// const CARD_WIDTH = 560; // px
// const CARD_GAP   = 24;  // px
// const STEP       = CARD_WIDTH + CARD_GAP;

// // ─── Main Section ─────────────────────────────────────────────────────────────
// const TestimonialSection: React.FC<TestimonialSectionProps> = ({
//   title,
//   testimonials,
//   autoPlayInterval = 4000,
// }) => {
//   const [offset, setOffset]   = useState(0);
//   const [animated, setAnimated] = useState(true);
//   const [isPaused, setIsPaused] = useState(false);

//   // Duplicate for seamless infinite loop
//   const looped = [...testimonials, ...testimonials];
//   const loopWidth = testimonials.length * STEP;

//   const advance = useCallback(() => {
//     setAnimated(true);
//     setOffset((prev) => {
//       const next = prev + STEP;
//       if (next >= loopWidth) {
//         setTimeout(() => {
//           setAnimated(false);
//           setOffset(0);
//         }, 500);
//       }
//       return next;
//     });
//   }, [loopWidth]);

//   const retreat = useCallback(() => {
//     setAnimated(true);
//     setOffset((prev) => {
//       if (prev <= 0) {
//         // Jump to end of first copy instantly, then animate back one step
//         setAnimated(false);
//         setOffset(loopWidth);
//         setTimeout(() => {
//           setAnimated(true);
//           setOffset(loopWidth - STEP);
//         }, 20);
//         return prev;
//       }
//       return prev - STEP;
//     });
//   }, [loopWidth]);

//   useEffect(() => {
//     if (isPaused) return;
//     const id = setInterval(advance, autoPlayInterval);
//     return () => clearInterval(id);
//   }, [isPaused, advance, autoPlayInterval]);

//   if (testimonials.length === 0) return null;

//   return (
//     <section className="w-full py-0 md:py-2 bg-white relative">
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Header */}
//         <div className="text-center mb-8 md:mb-10">
//           <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
//             {title}
//           </h2>
//         </div>
//       </div>

//       {/* Full-width slider viewport — overflow hidden, left-aligned so peek shows on right */}
//       <div
//         className="overflow-hidden"
//         style={{ paddingLeft: "max(1rem, calc((100vw - 1152px) / 2))" }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//       >
//         <div
//           className="flex"
//           style={{
//             gap: `${CARD_GAP}px`,
//             transform: `translateX(-${offset}px)`,
//             transition: animated
//               ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
//               : "none",
//           }}
//         >
//           {looped.map((testimonial, idx) => (
//             <div
//               key={idx}
//               style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
//             >
//               <TestimonialCard
//                 testimonial={testimonial}
//                 variant={idx % 2 === 0 ? "light" : "light"}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-center items-center gap-4 mt-8 mb-4">
//         <button
//           onClick={retreat}
//           className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
//           aria-label="Previous testimonial"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <button
//           onClick={advance}
//           className="w-12 h-12 rounded-full border-primary border-2 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
//           aria-label="Next testimonial"
//         >
//           <ChevronRight size={24} />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

// ─── Single Testimonial Card ─────────────────────────────────────────────────
interface TestimonialCardProps {
  testimonial: Testimonial;
  variant: "light" | "dark";
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { quote, quoteTitle, name, role, image, date } = testimonial;

  return (
    <div
      className="flex flex-col rounded-3xl bg-white p-6 shadow-lg"
      style={{ minHeight: "360px" }}
    >

      {/* Top: circular avatar + name + role */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top"
            sizes="58px"
            priority
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-md md:text-base text-gray-900 leading-tight truncate">
            {name}
          </h4>
          <p className="text-sm text-primary font-semibold mt-0.5 truncate">
            {role}
          </p>
        </div>
      </div>

      {/* Quote title */}
      {quoteTitle && (
        <h5 className="font-bold text-md md:text-[15px] text-primary mb-2 leading-snug">
          {quoteTitle}
        </h5>
      )}

      {/* Quote body */}
      <p className="text-[12px] text-primary leading-relaxed flex-1 line-clamp-6">
        {quote}
      </p>

      {/* Date — bottom right */}
      <div className="flex justify-end mt-4 pt-3 border-t border-primary/20">
        <p className="text-sm font-semibold text-primary/60">{date}</p>
      </div>
    </div>
  );
};

// Card width + gap constants — used for offset calculation
const CARD_WIDTH = 340; // px — slightly narrower
const CARD_GAP   = 20;  // px
const STEP       = CARD_WIDTH + CARD_GAP;

// ─── Main Section ─────────────────────────────────────────────────────────────
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  testimonials,
  autoPlayInterval = 4000,
}) => {
  const [offset, setOffset]   = useState(0);
  const [animated, setAnimated] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless infinite loop
  const looped = [...testimonials, ...testimonials];
  const loopWidth = testimonials.length * STEP;

  const advance = useCallback(() => {
    setAnimated(true);
    setOffset((prev) => {
      const next = prev + STEP;
      if (next >= loopWidth) {
        setTimeout(() => {
          setAnimated(false);
          setOffset(0);
        }, 500);
      }
      return next;
    });
  }, [loopWidth]);

  const retreat = useCallback(() => {
    setAnimated(true);
    setOffset((prev) => {
      if (prev <= 0) {
        // Jump to end of first copy instantly, then animate back one step
        setAnimated(false);
        setOffset(loopWidth);
        setTimeout(() => {
          setAnimated(true);
          setOffset(loopWidth - STEP);
        }, 20);
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
    <section className="w-full py-12 md:py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
        </div>
      </div>

      {/* Full-width slider viewport — py exposes top/bottom shadow, overflow-x clips sides */}
      <div
        className="overflow-x-hidden"
        style={{
          paddingLeft: "max(1rem, calc((100vw - 1152px) / 2))",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            transform: `translateX(-${offset}px)`,
            transition: animated
              ? "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none",
          }}
        >
          {looped.map((testimonial, idx) => (
            <div
              key={idx}
              style={{ width: `${CARD_WIDTH}px`, flexShrink: 0 }}
            >
              <TestimonialCard
                testimonial={testimonial}
                variant={idx % 2 === 0 ? "light" : "light"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-4">
        <button
          onClick={retreat}
          className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={advance}
          className="w-12 h-12 rounded-full border-primary border-2 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;