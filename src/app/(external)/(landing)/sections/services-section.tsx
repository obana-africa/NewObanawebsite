"use client";
import React from "react";
import Image from "next/image";
import Seperator from "@/components/external/components/seperator";
import { ServiceSectionProps } from "../types";
import ServiceFeatureBox from "@/components/external/components/service-feature-box";

const ServiceSection: React.FC<ServiceSectionProps> = ({
	title = "What We Do?",
	subtitle = "We power Africa's circular and ethical sourcing, connecting global brands and local vendors through a single, tech-enabled platform.",
	features = [],
	imageSrc = "",
}) => {
	return (
		<div className="w-full relative py-12 px-2 overflow-hidden">
			<div className="absolute -top-48 -right-20 md:-top-20 md:-right-5">
				<Image
					src={imageSrc}
					alt="Shipping boxes with globe"
					width={300}
					height={300}
				/>
			</div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-12 flex items-center justify-center flex-col w-full max-w-full sm:w-full text-center z-20">
					<h2 className="text-primary hidden sm:block" data-aos="fade-down">
						{title}
					</h2>
					<h1 className="text-primary block sm:hidden" data-aos="fade-down">
						{title}
					</h1>
					<Seperator />
					<div
						className="w-full md:w-3/4 lg:w-2/3 mt-4"
						data-aos="fade-up"
						data-aos-delay="100"
					>
						<h5 className="text-primary">{subtitle}</h5>
					</div>
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
					{features.map((feature, index) => (
						<ServiceFeatureBox
							key={index}
							title={feature.title}
							description={feature.description}
							buttonText={feature.buttonText}
							imageSrc={feature.imageSrc}
							href={feature.href}
							aosAnimation={index % 2 === 0 ? "fade-right" : "fade-left"}
							aosDelay={100 + index * 100}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServiceSection;
