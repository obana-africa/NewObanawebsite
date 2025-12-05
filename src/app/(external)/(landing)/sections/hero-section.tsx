"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useModal } from "@/contexts/modal-context";
import heroBgImage from "@/app/assets/images/landing-page/bgbg.png"; 

const HeroSection: React.FC = () => {
	const solutions = ["Earn as a Sales Partner", "Sell on Obana.africa", "Buy in Bulk" ];

	const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const { openGetStartedModal } = useModal();

	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setCurrentSolutionIndex(
					(prevIndex) => (prevIndex + 1) % solutions.length
				);
				setIsAnimating(false);
			}, 1500);
		}, 3000);

		return () => clearInterval(intervalId);
	}, [solutions.length]);

	const handleGetStarted = (): void => {
		openGetStartedModal();
	};

	return (
		<section className="text-white pt-32 pb-12 md:pt-16 md:pb-2 relative overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src={heroBgImage}
					alt="Hero Background"
					fill
					className="object-cover"
					priority
					quality={90}
					sizes="100vw"
				/>
			</div>

			<div className="absolute inset-0 bg-primary opacity-85 z-10"></div>

			<div
				className="absolute top-[151px] left-[804px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-white rounded-full z-20"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			></div>

			<div className="container mx-auto px-4 md:px-6 relative z-30">
				<div className="flex flex-col-reverse md:flex-row items-center -mt-10 sm:mt-0">
					<div className="w-full md:w-[60%] mb-0 md:mb-0 md:pr-8 -mt-5 sm:mt-0">
						<h2 className="text-sm md:text-base lg:text-lg font-semibold mb-1"></h2>

						<h3 className="bg-primary-light text-primary inline-block px-4 py-2 rounded-md">
							<span
								className={`animate-fade-in duration-700 ${
									isAnimating ? "opacity-50" : "opacity-100"
								}`}
							>
								{solutions[currentSolutionIndex]}
							</span>
						</h3>

						<h2 className="mb-6 md:leading-12 w-full 2xl:w-[85%] md:text-[31px]">
							Africa&apos;s circular sourcing ecosystem for Fashion & Beauty
							SMEs — Powered by Technology.
						</h2>

						<p className="mb-8 text-md 2xl:text-lg">
							We connect global brands and African SMEs through tech-driven
							supply chains, extending the life of fashion and beauty products
							while unlocking sustainable growth across the continent
						</p>

						<Button
							variant="primary"
							animation="ripple"
							className="bg-white hover:bg-secondary !text-primary text-lg font-medium shadow-lg shadow-white/50 relative overflow-hidden"
							onClick={handleGetStarted}
						>
							<span className="relative z-10">Partner with Us</span>
						</Button>

						<div className="absolute bottom-0 -left-8 w-32 h-32 bg-white opacity-20 blur-[50px] rounded-full transition-all duration-500 hover:opacity-30 hover:blur-[60px]"></div>
					</div>

					<div className="w-full md:w-[40%] flex justify-center">
						<div className="relative w-full max-w-lg aspect-square">
							{/* <RotatingGlobe /> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
