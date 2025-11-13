"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface Testimonial {
	quote: string;
	rating?: any;
	name: string;
	role: string;
	image: string | StaticImageData;
}

interface TestimonialSectionProps {
	title: string;
	testimonials: Testimonial[];
	autoPlayInterval?: number;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
	title,
	testimonials,
	autoPlayInterval = 5000,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	useEffect(() => {
		if (!isPaused && testimonials.length > 1) {
			const interval = setInterval(() => {
				goToNext();
			}, autoPlayInterval);

			return () => clearInterval(interval);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, isPaused, autoPlayInterval, testimonials.length]);

	const currentTestimonial = testimonials[currentIndex];

	return (
		<section className="w-full py-0 md:py-2 bg-white relative overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<div className="text-center mb-12 md:mb-8">
					<h2
						className="text-primary text-3xl md:text-4xl lg:text-5xl font-bold"
					>
						{title}
					</h2>
				</div>

				<div
					className="max-w-6xl mx-auto"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					<div className="min-h-[600px] md:min-h-[500px]">
						<TestimonialCard
							message={currentTestimonial.quote}
							rating={currentTestimonial.rating}
							name={currentTestimonial.name}
							role={currentTestimonial.role}
							image={currentTestimonial.image}
							currentIndex={currentIndex}
							totalTestimonials={testimonials.length}
						/>
					</div>

					<div className="flex justify-center items-center gap-4 mb-8 ">
						<button
							onClick={goToPrevious}
							className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
							aria-label="Previous testimonial"
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={goToNext}
							className="w-12 h-12 rounded-full bg-primary text-white hover:bg-[#1E3A5F] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
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

interface TestimonialCardProps {
	message: string;
	name: string;
	role: string;
	image: string | StaticImageData;
	rating: string;
	currentIndex: number;
	totalTestimonials: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
	message,
	name,
	role,
	image,
	rating,
	currentIndex,
	totalTestimonials,
}) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 p-2 md:p-12 rounded-3xl transition-all duration-700">
			<div className="w-full md:w-2/5 flex justify-center items-center">
				<div className="relative w-full max-w-[220px] md:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
					<Image
						src={image}
						alt={name}
						fill
						quality={100}
						className="object-cover"
						sizes="(max-width: 768px) 80vw, 320px"
						priority
					/>
				</div>
			</div>

			<div className="w-full md:w-3/5 flex flex-col justify-center">
				<div className="mb-6">
					<svg
						width="48"
						height="40"
						viewBox="0 0 48 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-primary"
					>
						<path
							d="M0 40V20C0 8.95 8.95 0 20 0V8C13.35 8 8 13.35 8 20V24H20V40H0ZM28 40V20C28 8.95 36.95 0 48 0V8C41.35 8 36 13.35 36 20V24H48V40H28Z"
							fill="currentColor"
						/>
					</svg>
				</div>

				<p className="text-primary text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed mb-8">
					{message}
				</p>

				<p className="text-[#6B7280] text-sm md:text-base mb-2">{rating}</p>

				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
					<div>
						<h4 className="text-primary text-xl md:text-2xl font-bold mb-1">
							{name}
						</h4>
						<p className="text-[#6B7280] text-base md:text-lg">{role}</p>
					</div>

					<div className="flex items-center gap-4 min-w-[200px]">
						<span className="text-primary font-semibold text-sm whitespace-nowrap">
							{String(currentIndex + 1).padStart(2, "0")}
						</span>
						<div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
							<div
								className="h-full bg-primary transition-all duration-300"
								style={{
									width: `${((currentIndex + 1) / totalTestimonials) * 100}%`,
								}}
							/>
						</div>
						<span className="text-[#6B7280] font-semibold text-sm whitespace-nowrap">
							{String(totalTestimonials).padStart(2, "0")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
