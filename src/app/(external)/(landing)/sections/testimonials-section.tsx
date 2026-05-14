// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image, { StaticImageData } from "next/image";
// import Seperator from "@/components/external/components/seperator";

// interface Testimonial {
// 	quote: string;
// 	rating?: any;
// 	name: string;
// 	role: string;
// 	image: string | StaticImageData;
// }

// interface TestimonialSectionProps {
// 	title: string;
// 	testimonials: Testimonial[];
// 	autoPlayInterval?: number;
// }

// const TestimonialSection: React.FC<TestimonialSectionProps> = ({
// 	title,
// 	testimonials,
// 	autoPlayInterval = 5000,
// }) => {
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [isPaused, setIsPaused] = useState(false);

// 	const goToNext = () => {
// 		setCurrentIndex((prevIndex) =>
// 			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
// 		);
// 	};

// 	const goToPrevious = () => {
// 		setCurrentIndex((prevIndex) =>
// 			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
// 		);
// 	};

// 	useEffect(() => {
// 		if (!isPaused && testimonials.length > 1) {
// 			const interval = setInterval(() => {
// 				goToNext();
// 			}, autoPlayInterval);

// 			return () => clearInterval(interval);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [currentIndex, isPaused, autoPlayInterval, testimonials.length]);

// 	const currentTestimonial = testimonials[currentIndex];

// 	return (
// 		<section className="w-full py-0 md:py-2 bg-white relative overflow-hidden">
// 			<div className="container mx-auto px-4 md:px-6">
// 				<div className="text-center mb-5 md:mb-2 items-center flex-col flex">
// 					<h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
// 						{title}
// 					</h2>
// 					<Seperator />
// 				</div>

// 				<div
// 					className="max-w-6xl mx-auto"
// 					onMouseEnter={() => setIsPaused(true)}
// 					onMouseLeave={() => setIsPaused(false)}
// 				>
// 					<div className="min-h-[600px] md:min-h-[300px]   lg:min-h-[500px]   ">
// 						<TestimonialCard
// 							message={currentTestimonial.quote}
// 							rating={currentTestimonial.rating}
// 							name={currentTestimonial.name}
// 							role={currentTestimonial.role}
// 							image={currentTestimonial.image}
// 							currentIndex={currentIndex}
// 							totalTestimonials={testimonials.length}
// 						/>
// 					</div>

// 					<div className="flex justify-center items-center gap-4 mb-8   ">
// 						<button
// 							onClick={goToPrevious}
// 							className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg  hover:cursor-pointer"
// 							aria-label="Previous testimonial"
// 						>
// 							<ChevronLeft size={24} />
// 						</button>
// 						<button
// 							onClick={goToNext}
// 							className="w-12 h-12 rounded-full border-primary border-2  hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
// 							aria-label="Next testimonial"
// 						>
// 							<ChevronRight size={24} />
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default TestimonialSection;

// interface TestimonialCardProps {
// 	message: string;
// 	name: string;
// 	role: string;
// 	image: string | StaticImageData;
// 	rating: string;
// 	currentIndex: number;
// 	totalTestimonials: number;
// }

// const TestimonialCard: React.FC<TestimonialCardProps> = ({
// 	message,
// 	name,
// 	role,
// 	image,
// 	rating,
// 	currentIndex,
// 	totalTestimonials,
// }) => {
// 	return (
// 		<div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 p-2 md:p-12 rounded-3xl transition-all duration-700">
// 			<div className="w-full md:w-2/5 flex justify-center items-center">
// 				<div className="relative w-full max-w-[220px] md:max-w-[270px]  lg:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
// 					<Image
// 						src={image}
// 						alt={name}
// 						fill
// 						quality={100}
// 						className="object-cover"
// 						sizes="(max-width: 768px) 80vw, 320px"
// 						priority
// 					/>
// 				</div>
// 			</div>

// 			<div className="w-full md:w-3/5 flex flex-col justify-center">
// 				<div className="mb-6">
// 					<svg
// 						width="48"
// 						height="40"
// 						viewBox="0 0 48 40"
// 						fill="none"
// 						xmlns="http://www.w3.org/2000/svg"
// 						className="text-primary"
// 					>
// 						<path
// 							d="M0 40V20C0 8.95 8.95 0 20 0V8C13.35 8 8 13.35 8 20V24H20V40H0ZM28 40V20C28 8.95 36.95 0 48 0V8C41.35 8 36 13.35 36 20V24H48V40H28Z"
// 							fill="currentColor"
// 						/>
// 					</svg>
// 				</div>

// 				<p className="text-primary text-xl md:text-xl lg:text-2xl font-semibold leading-relaxed mb-8">
// 					{message}
// 				</p>

// 				<p className="text-[#6B7280] text-sm md:text-base mb-2">{rating}</p>

// 				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
// 					<div>
// 						<h4 className="text-primary text-xl md:text-2xl font-bold mb-1">
// 							{name}
// 						</h4>
// 						<p className="text-[#6B7280] text-base md:text-lg">{role}</p>
// 					</div>

// 					<div className="flex items-center gap-4 min-w-[200px]">
// 						<span className="text-primary font-semibold text-sm whitespace-nowrap">
// 							{String(currentIndex + 1).padStart(2, "0")}
// 						</span>
// 						<div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
// 							<div
// 								className="h-full bg-primary transition-all duration-300"
// 								style={{
// 									width: `${((currentIndex + 1) / totalTestimonials) * 100}%`,
// 								}}
// 							/>
// 						</div>
// 						<span className="text-[#6B7280] font-semibold text-sm whitespace-nowrap">
// 							{String(totalTestimonials).padStart(2, "0")}
// 						</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
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
      <div className="relative w-[44%] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
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
        className="flex flex-col rounded-2xl p-4 md:p-5 shadow-sm min-w-0 w-[56%]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Top: name + role */}
        <div>
          <h4
            className="font-bold text-sm md:text-base leading-tight"
            style={{ color: textColor }}
          >
            {name}
          </h4>
          <p className="text-xs md:text-sm mt-0.5" style={{ color: subColor }}>
            {role}
          </p>
        </div>

        {/* Middle: quote title + quote body */}
        <div className="mt-4 flex-1 flex flex-col">
          <h5
            className="font-bold text-sm md:text-base mb-2 leading-snug"
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
        <div className="flex justify-end pt-2">
          <p className="text-xs" style={{ color: dateColor }}>
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  title,
  testimonials,
  autoPlayInterval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Group testimonials into slides of 2
  const slides: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    slides.push(testimonials.slice(i, i + 2));
  }
  const slideCount = slides.length;

  const goToNext = () =>
    setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));

  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isPaused, autoPlayInterval, slideCount]);

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full py-0 md:py-2 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIdx) => (
                <div key={slideIdx} className="w-full flex-shrink-0 px-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {slide.map((testimonial, cardIdx) => {
                      // Alternate: first card per slide = light, second = dark
                      const variant = cardIdx % 2 === 0 ? "light" : "dark";
                      return (
                        <TestimonialCard
                          key={cardIdx}
                          testimonial={testimonial}
                          variant={variant}
                        />
                      );
                    })}
                    {/* If odd testimonial on last slide, render empty placeholder */}
                    {slide.length === 1 && (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8 mb-4">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Dot indicators */}
            {slideCount > 1 && (
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-6 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border-primary border-2 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg hover:cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;