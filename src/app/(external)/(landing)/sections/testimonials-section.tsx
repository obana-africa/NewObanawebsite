
// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image, { StaticImageData } from "next/image";

// interface Testimonial {
//   quote: string;
//   quoteTitle?: string;
//   name: string;
//   role: string;
//   image: string | StaticImageData;
//   date?: string;
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
//       <div className="relative w-[44%] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
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

    
//       <div
//         className="flex flex-col rounded-2xl p-4 md:p-5 shadow-sm min-w-0 w-[50%]"
//         style={{ backgroundColor: bgColor }}
//       >
//         {/* Top: name + role */}
//         <div>
//           <h4
//             className="font-bold text-sm md:text-base leading-tight"
//             style={{ color: textColor }}
//           >
//             {name}
//           </h4>
//           <p className="text-xs md:text-m mt-0.5 font-bold" style={{ color: subColor }}>
//             {role}
//           </p>
//         </div>

//         {/* Middle: quote title + quote body */}
//         <div className="mt-10 flex-1 flex flex-col">
//           <h5
//             className="font-bold text-md md:text-base mb-2 leading-snug"
//             style={{ color: textColor }}
//           >
//             {quoteTitle}
//           </h5>
//           <p
//             className="text-xs md:text-[14px] leading-relaxed line-clamp-4"
//             style={{ color: bodyColor }}
//           >
//             {quote}
//           </p>
//         </div>

//         {/* Bottom: date pinned to bottom-right */}
//         <div className="flex justify-end pt-2">
//           <p className="text-xs" style={{ color: dateColor }}>
//             {date}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Main Section ─────────────────────────────────────────────────────────────
// const TestimonialSection: React.FC<TestimonialSectionProps> = ({
//   title,
//   testimonials,
//   autoPlayInterval = 5000,
// }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Group testimonials into slides of 2
//   const slides: Testimonial[][] = [];
//   for (let i = 0; i < testimonials.length; i += 1) {
//     slides.push(testimonials.slice(i, i + 2));
//   }
//   const slideCount = slides.length;

//   const goToNext = () =>
//     setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));

//   const goToPrevious = () =>
//     setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));

//   useEffect(() => {
//     if (isPaused || slideCount <= 1) return;
//     const timer = setInterval(goToNext, autoPlayInterval);
//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentSlide, isPaused, autoPlayInterval, slideCount]);

//   if (testimonials.length === 0) return null;

//   return (
//     <section className="w-full py-0 md:py-2 bg-white relative overflow-hidden">
//       <div className="container mx-auto px-4 md:px-6">
//         {/* Header */}
//         <div className="text-center mb-8 md:mb-10">
//           <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
//             {title}
//           </h2>
//         </div>

//         {/* Carousel */}
//         <div
//           className="max-w-6xl mx-auto"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           {/* Slides container */}
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {slides.map((slide, slideIdx) => (
//                 <div key={slideIdx} className="w-full shrink-0 px-1">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     {slide.map((testimonial, cardIdx) => {
//                       // Alternate: first card per slide = light, second = dark
//                       const variant = cardIdx % 2 === 0 ? "light" : "light";
//                       return (
//                         <TestimonialCard
//                           key={cardIdx}
//                           testimonial={testimonial}
//                           variant={variant}
//                         />
//                       );
//                     })}
//                     {/* If odd testimonial on last slide, render empty placeholder */}
//                     {slide.length === 1 && (
//                       <div className="hidden md:block" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-center items-center gap-4 mt-8 mb-4">
//             <button
//               onClick={goToPrevious}
//               className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft size={24} />
//             </button>

//             {/* Dot indicators */}
//             {slideCount > 1 && (
//               <div className="flex items-center gap-2">
//                 {slides.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentSlide(idx)}
//                     className={`h-2 rounded-full transition-all duration-300 ${
//                       currentSlide === idx
//                         ? "w-6 bg-primary"
//                         : "w-2 bg-primary/30 hover:bg-primary/50"
//                     }`}
//                     aria-label={`Go to slide ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//             )}

//             <button
//               onClick={goToNext}
//               className="w-12 h-12 rounded-full border-primary border-2 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>
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
  /** Alternates the card between light and dark variants */
  variant: "light" | "dark";
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  variant,
}) => {
  const { quote, quoteTitle, name, role, image, date } = testimonial;

  const isDark = variant === "dark";

  const textColor = isDark ? "#FFFFFF" : "#1B3B5F";
  const subColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(27,59,95,0.55)";
  const bodyColor = isDark ? "rgba(255,255,255,0.82)" : "rgba(27,59,95,0.82)";
  const dateColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(27,59,95,0.45)";
  const bgColor = isDark ? "#1B3B5F" : "#E9F9FF";

  return (
    <div className="flex flex-row items-stretch gap-3 h-[280px] md:h-[300px] lg:h-[340px]">
      {/* Left panel: Image — standalone rounded card */}
      <div className="relative w-[44%] shrink-0 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={image}
          alt={name}
          fill
          quality={100}
          className="object-cover object-top"
          sizes="(max-width: 768px) 44vw, 210px"
          priority
        />
      </div>

      {/* Right panel: Description — separate rounded card, narrower */}
      <div
        className="flex flex-col rounded-2xl p-4 md:p-5 shadow-md min-w-0 w-[56%]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Top: name + role */}
        <div className="mt-4">
          <h4
            className="font-bold text-sm md:text-base leading-tight"
            style={{ color: textColor }}
          >
            {name}
          </h4>
          <p className="text-xs md:text-sm font-bold mt-0.5" style={{ color: subColor }}>
            {role}
          </p>
        </div>

        {/* Middle: quote title + quote body */}
        <div className="mt-4 flex-1 flex flex-col">
          <h5
            className="font-bold text-md md:text-base mb-2 leading-snug mt-10"
            style={{ color: textColor }}
          >
            {quoteTitle}
          </h5>
          <p
            className="text-xs md:text-sm leading-relaxed line-clamp-4"
            style={{ color: bodyColor }}
          >
            {quote}
          </p>
        </div>

        {/* Bottom: date pinned to bottom-right */}
        <div className="flex justify-end pt-2 font-bold">
          <p className="text-xs" style={{ color: dateColor }}>
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

// Card width + gap constants — used for offset calculation
const CARD_WIDTH = 560; // px
const CARD_GAP   = 24;  // px
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
    <section className="w-full py-0 md:py-2 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
        </div>
      </div>

      {/* Full-width slider viewport — overflow hidden, left-aligned so peek shows on right */}
      <div
        className="overflow-hidden"
        style={{ paddingLeft: "max(1rem, calc((100vw - 1152px) / 2))" }}
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