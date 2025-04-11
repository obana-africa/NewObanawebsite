"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import square from "@/app/assets/images/landing-page/square.svg";
import Seperator from "@/components/external/components/seperator";
import { TestimonialsProps } from "../types";
import { testimonials } from "../data/testimonials";
import { getTestimonialPositions } from "../utils/testimonialUtils";

const Testimonials: React.FC<TestimonialsProps> = ({ title }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const nextTestimonial = () => {
		if (isAnimating) return;

		setIsAnimating(true);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const prevTestimonial = () => {
		if (isAnimating) return;

		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
		setTimeout(() => setIsAnimating(false), 500);
	};

	useEffect(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
		}

		timerRef.current = setInterval(() => {
			nextTestimonial();
		}, 3000);

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex]);

	const testimonialPositions = getTestimonialPositions(
		currentIndex,
		testimonials.length
	);

	return (
		<div className="w-full relative py-8 md:pt-2 px-2 !overflow-hidden">
			<div className="absolute -bottom-8 -right-4 rotate-180">
				<Image src={square} alt="Decorative square" width={200} height={300} />
			</div>

			<div className="container mx-auto px-4 md:px-6">
				<div
					className="mb-4 flex mx-auto text-center items-center justify-center flex-col w-full md:w-[70ch] max-w-full z-20"
					// data-aos="fade-up"
					// data-aos-delay="100"
					// data-aos-duration="1000"
				>
					<h2 className="text-primary hidden sm:block leading-12 mb-2">
						{title}
					</h2>
					<h1 className="text-primary block sm:hidden">{title}</h1>
					<Seperator />
					<div
						className="absolute top-[100px] left-[150px] w-[182px] h-[36px] opacity-40 blur-[50px] bg-[#222] rounded-full"
						style={{
							transform: "translate(-50%, -50%)",
						}}
					></div>
				</div>

				{/* Desktop Carousel */}
				<div className="hidden md:block">
					<div
						className="mx-auto flex items-center justify-center relative"
						style={{ height: "450px" }}
					>
						<div className="relative w-full h-full select-none">
							{testimonialPositions.map((position) => (
								<div
									key={position.index}
									className="absolute top-1/2 left-1/2 transition-all duration-500 ease-in-out"
									style={{
										transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${position.scale}) rotate(${position.rotation}deg)`,
										zIndex: position.zIndex,
										opacity: position.opacity,
									}}
								>
									<div className="flex flex-col items-center gap-2">
										<div
											className={`overflow-hidden rounded-lg shadow-lg ${
												position.isCurrent
													? "w-32 h-32 border-4 border-blue-500"
													: "w-24 h-24 border-2 border-gray-300"
											}`}
										>
											<Image
												src={testimonials[position.index].image}
												alt={testimonials[position.index].name}
												width={position.isCurrent ? 128 : 96}
												height={position.isCurrent ? 128 : 96}
												className="object-cover"
											/>
										</div>

										{position.isCurrent && (
											<div
												className="mt-4 text-center max-w-full md:max-w-[55ch] p-4"
												// data-aos="fade-up"
												// data-aos-delay="100"
												// data-aos-duration="900"
											>
												<h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
													{testimonials[position.index].name}
												</h3>
												<p className="text-gray-600 font-bold mb-4">
													{testimonials[position.index].role}
												</p>
												<p className="text-center text-sm text-gray-700 italic w-full">
													{testimonials[position.index].message}
												</p>
											</div>
										)}
									</div>
								</div>
							))}
						</div>

						<button
							onClick={(e) => {
								e.stopPropagation();
								prevTestimonial();
								if (timerRef.current) {
									clearInterval(timerRef.current);
									timerRef.current = setInterval(nextTestimonial, 3000);
								}
							}}
							disabled={isAnimating}
							className="absolute left-4 2xl:left-[600px] top-1/3 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
							aria-label="Previous testimonial"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								nextTestimonial();
								if (timerRef.current) {
									clearInterval(timerRef.current);
									timerRef.current = setInterval(nextTestimonial, 3000);
								}
							}}
							disabled={isAnimating}
							className="absolute right-4 2xl:right-[600px] top-1/3 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
							aria-label="Next testimonial"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Carousel */}
				<div className="block md:hidden">
					<div className="mx-auto flex items-center justify-center relative">
						<div className="relative w-full h-full select-none">
							<div className="flex flex-col items-center gap-2">
								<div className="overflow-hidden rounded-lg shadow-lg w-32 h-32 border-4 border-blue-500">
									<Image
										src={testimonials[currentIndex].image}
										alt={testimonials[currentIndex].name}
										width={128}
										height={128}
										className="object-cover"
									/>
								</div>

								<div className="mt-4 text-center max-w-full p-4">
									<h3 className="text-xl font-bold text-primary mb-1">
										{testimonials[currentIndex].name}
									</h3>
									<p className="text-gray-600 font-bold mb-4">
										{testimonials[currentIndex].role}
									</p>
									<p className="text-center text-sm text-gray-700 italic w-full">
										{testimonials[currentIndex].message}
									</p>
								</div>
							</div>
						</div>

						<button
							onClick={(e) => {
								e.stopPropagation();
								prevTestimonial();
								if (timerRef.current) {
									clearInterval(timerRef.current);
									timerRef.current = setInterval(nextTestimonial, 3000);
								}
							}}
							disabled={isAnimating}
							className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
							aria-label="Previous testimonial"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								nextTestimonial();
								if (timerRef.current) {
									clearInterval(timerRef.current);
									timerRef.current = setInterval(nextTestimonial, 3000);
								}
							}}
							disabled={isAnimating}
							className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
							aria-label="Next testimonial"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-center mt-4">
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								if (isAnimating) return;
								setIsAnimating(true);
								setCurrentIndex(index);
								setTimeout(() => setIsAnimating(false), 500);
								if (timerRef.current) {
									clearInterval(timerRef.current);
									timerRef.current = setInterval(nextTestimonial, 3000);
								}
							}}
							className={`mx-1 w-3 h-3 rounded-full ${
								index === currentIndex ? "bg-primary" : "bg-secondary-light"
							} transition-colors duration-300`}
							aria-label={`Go to testimonial ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
