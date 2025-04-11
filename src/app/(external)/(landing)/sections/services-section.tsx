"use client";
import React from "react";
import Image from "next/image";
import Seperator from "@/components/external/components/seperator";
import { ServiceSectionProps } from "../types";
import FeatureBox from "@/components/external/components/feature-box";

const ServiceSection: React.FC<ServiceSectionProps> = ({
	title = "What We Do?",
	subtitle = "We make it easy to source, purchase, and pay vendors worldwide in your local currency.",
	features = [],
	imageSrc = "",
}) => {
	return (
		<div className="w-full relative py-12 px-2 overflow-hidden">
			<div className="absolute -top-48 -right-20 md:-top-20 md:-right-5 ">
				<Image
					src={imageSrc}
					alt="Shipping boxes with globe"
					width={300}
					height={300}
				/>
			</div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-12 flex items-start md:items-center justify-center flex-col w-[33ch] max-w-full sm:w-full z-20">
					<h2 className="text-primary hidden sm:block">{title}</h2>
					<h1 className="text-primary block sm:hidden">{title}</h1>
					<Seperator />
					<h5 className="text-primary">{subtitle}</h5>
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-10">
					{features.map((feature, index) => (
						<FeatureBox
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							buttonText={feature.buttonText}
							href={feature.href}
							// data-aos={index % 2 === 0 ? "fade-up" : "fade-up"}
							// data-aos-delay={100 + index * 100}
							// data-aos-duration="800"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServiceSection;
