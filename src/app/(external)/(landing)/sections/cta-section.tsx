"use client";
import Button from "@/components/ui/button";
import React from "react";

const CtaSection = () => {
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
					<h3 className="font-bold text-center text-white md:leading-12 mb-6 hidden md:block">
						We provide seamless sourcing, secure payments, reliable logistics,
						and business growth opportunities—all designed to help you succeed
						effortlessly
					</h3>
					<h4 className="font-bold text-center text-white md:leading-12 mb-6 block md:hidden">
						We provide seamless sourcing, secure payments, reliable logistics,
						and business growth opportunities—all designed to help you succeed
						effortlessly
					</h4>

					<Button
						variant="primary"
						animation="ripple"
						className="bg-white hover:bg-secondary !text-primary  font-bold relative overflow-hidden w-40"
						href="/get-started"
					>
						<span className="relative z-10">Get Started</span>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default CtaSection;
