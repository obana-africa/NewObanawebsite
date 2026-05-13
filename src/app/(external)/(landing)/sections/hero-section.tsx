"use client";

import React from "react";
// import Image from "next/image";
import Button from "@/components/ui/button";
import { useModal } from "@/contexts/modal-context";
// import heroBgImage from "@/app/assets/images/landing-page/global-network.png";

const HeroSection: React.FC = () => {
	const { openGetStartedModal } = useModal();

	const handleExploreEcosystem = (): void => {
		openGetStartedModal();
	};

	const handleBecomePartner = (): void => {
		// Route to partner sign-up or a dedicated partner page
		// TODO: Replace with actual partner route or modal
		openGetStartedModal(); // placeholder – adjust as needed
	};

	return (
		<section className=" relative overflow-hidden w-full h-[830px] md:h-[830px] bg-white">
			

			
			<div
				className="absolute top-[151px] left-[804px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-white rounded-full z-20"
				style={{ transform: "translate(-50%, -50%)" }}
			></div>

			
			<div className="container mx-auto px-4 md:px-6 relative z-30 text-center max-w-[1440px] h-full flex flex-col justify-start pt-24 md:pt-32 lg:pt-36">
				{/* Main heading */}
				<h1
					className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto text-primary"
					style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
				>
					Powering the Movement of Commerce Across Africa
				</h1>

				
				<p
					className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90 text-primary"
					style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
				>
					Obana.Africa connects sourcing, logistics, distribution, and commerce
					into one ecosystem <br />
					designed to help businesses move smarter, scale faster, and operate
					without limits.
				</p>

				{/* Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button
						variant="primary"
						animation="ripple"
						className="bg-primary hover:bg-primary-dark text-primary hover:text-primary text-lg font-medium shadow-lg shadow-primary/30"
						onClick={handleExploreEcosystem}
					>
						Explore Ecosystem
					</Button>
					<Button
						variant="primary"
						animation="ripple"
						className="border border-primary !text-primary bg-transparent hover:bg-primary hover:text-primary transition-all duration-300 ease-in-out text-lg font-medium"
						onClick={handleBecomePartner}
					>
						Become a Partner
					</Button>
				</div>
			</div>

			
			{/* <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center">
				<Image
					src={heroBgImage}
					alt="Global network illustration"
					width={1440}
					height={830}
					className="object-contain w-full h-auto max-h-[500px]"
					priority
				/>
			</div> */}
		</section>
	);
};

export default HeroSection;