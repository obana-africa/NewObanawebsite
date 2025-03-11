"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

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
		<section className="bg-primary text-white pt-32 pb-16 md:pt-20 md:pb-20">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col md:flex-row items-center">
					<div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
						<h2 className="mb-2">Enabling SMEs scale</h2>

						<h3 className="bg-white text-primary inline-block px-4 py-2 rounded-md">
							<span
								className={` animate-fade-in duration-700  ${
									isAnimating ? "opacity-50" : "opacity-100"
								}`}
							>
								{solutions[currentSolutionIndex]}
							</span>
						</h3>

						<h2 className="mb-6  md:leading-12">
							by aggregating solutions to their business needs under one
							platform
						</h2>

						<p className="mb-8 text-lg">
							We help SMEs in Nigeria and Sub-Saharan Africa (beginning from
							Nigeria) scale by providing a seamless, tech-driven supply chain
							and delivering cost-effective and convenient solutions that
							enhance efficiency and growth.
						</p>
						<Button
							variant="primary"
							animation="ripple"
							className="bg-white hover:bg-secondary !text-primary text-lg font-medium shadow  shadow-lg shadow-white/50"
							href="/get-started"
						>
							Get Started
						</Button>
					</div>

					<div className="w-full md:w-1/2 flex justify-center">
						<div className="relative w-full max-w-lg aspect-square">
							<Image
								src="/africa-map.png"
								alt="Africa Map Globe with Connected Points"
								fill
								style={{ objectFit: "contain" }}
								priority
							/>

							<div className="absolute" style={{ top: "20%", right: "20%" }}>
								<div className="relative bg-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
									<Image
										src="/flags/kenya.png"
										alt="Kenya Flag"
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>
							</div>

							<div className="absolute" style={{ top: "40%", left: "20%" }}>
								<div className="relative bg-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
									<Image
										src="/flags/nigeria.png"
										alt="Nigeria Flag"
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
