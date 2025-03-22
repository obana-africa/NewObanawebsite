"use client";
import Button from "@/components/ui/button";
import { useModal } from "@/contexts/modal-context";
import React from "react";

const CtaSection = () => {
	const { openGetStartedModal } = useModal();

	const handleGetStarted = (): void => {
		openGetStartedModal();
	};
	return (
		<section className="container mx-auto px-4 pt-10 md:py-12">
			<div className="bg-primary rounded-lg px-4 md:px-16 py-8 md:py-12 relative overflow-hidden">
				<div
					className="absolute top-[250px] left-[0] w-[182px] h-[56px] opacity-38 blur-[50px] bg-[#fff] rounded-full"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				></div>
				<div
					className="absolute top-[0] right-[0] w-[182px] h-[56px] opacity-38 blur-[50px] bg-[#fff] rounded-full"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				></div>
				<div className="flex flex-col items-center mx-auto w-full md:w-[1090px]">
					<h3
						className="font-bold text-center text-white md:leading-12 mb-6 hidden md:block"
						data-aos="fade-up"
						data-aos-delay="100"
						data-aos-duration="1000"
					>
						We provide seamless sourcing, secure payments, reliable logistics,
						and business growth opportunities—all designed to help you succeed
						effortlessly
					</h3>
					<h4
						className="font-bold text-center text-white md:leading-12 mb-6 block md:hidden"
						data-aos="fade-up"
						data-aos-delay="100"
						data-aos-duration="1000"
					>
						We provide seamless sourcing, secure payments, reliable logistics,
						and business growth opportunities—all designed to help you succeed
						effortlessly
					</h4>
					<div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000">
						<Button
							variant="primary"
							animation="ripple"
							className="bg-white hover:bg-secondary !text-primary  font-bold relative overflow-hidden w-40"
							onClick={handleGetStarted}
						>
							<span className="relative z-10">Get Started</span>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtaSection;
