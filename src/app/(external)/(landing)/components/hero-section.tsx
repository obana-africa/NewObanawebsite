"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import RotatingGlobe from "./hero-globe";

const HeroSection: React.FC = () => {
	const solutions = [
		"Inventory/product sourcing",
		"Logistics",
		"Payment in local currency",
		"Inventory financing",
		"Sales partners",
	];

	const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

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

	return (
		<section className="bg-primary text-white pt-32 pb-16 md:pt-16 md:pb-8 relative overflow-hidden">
			<div
				className="absolute top-[151px] left-[804px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-white rounded-full"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			></div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col-reverse md:flex-row items-center -mt-10  sm:mt-0">
					<div className=" w-full md:w-[60%]  mb-0 md:mb-0 md:pr-8 -mt-5  sm:mt-0">
						<h2 className="mb-2">Enabling SMEs scale</h2>

						<h3 className="bg-primary-light text-primary inline-block px-4 py-2 rounded-md">
							<span
								className={`animate-fade-in duration-700 ${
									isAnimating ? "opacity-50" : "opacity-100"
								}`}
							>
								{solutions[currentSolutionIndex]}
							</span>
						</h3>

						<h2 className="mb-6 md:leading-12 w-full 2xl:w-[85%]">
							by aggregating solutions to their business needs under one
							platform
						</h2>

						<p className="mb-8 text-md 2xl:text-lg ">
							We help SMEs in Nigeria and Sub-Saharan Africa (beginning from
							Nigeria) scale by providing a seamless, tech-driven supply chain
							and delivering cost-effective and convenient solutions that
							enhance efficiency and growth.
						</p>
						<Button
							variant="primary"
							animation="ripple"
							className="bg-white hover:bg-secondary !text-primary text-lg font-medium shadow-lg shadow-white/50 relative overflow-hidden"
							href="/get-started"
						>
							<span className="relative z-10">Get Started</span>
						</Button>

						<div className="absolute bottom-0 -left-8 w-32 h-32 bg-white opacity-20 blur-[50px] rounded-full transition-all duration-500 hover:opacity-30 hover:blur-[60px]"></div>
					</div>

					<div className="w-full md:w-[40%] flex justify-center">
						<div className="relative w-full max-w-lg aspect-square">
							<RotatingGlobe />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
