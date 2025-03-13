"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import Seperator from "@/components/external/components/seperator";
import Button from "@/components/ui/button";

interface FeatureBoxProps {
	icon: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
}

interface Feature {
	icon: ReactNode;
	title: string;
	description: string;
	buttonText?: string;
}

interface ServiceSectionProps {
	title?: string;
	subtitle?: string;
	features: Feature[];
	imageSrc?: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
	icon,
	title,
	description,
	buttonText = "Get Started",
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div className="relative w-full px-2 sm:px-4 mb-6 md:mb-0">
			<div
				className="relative mx-auto w-full max-w-[550px] min-h-[300px] sm:min-h-[400px] bg-white z-10 rounded-[10px] border border-primary p-4 sm:p-6 md:p-8 transition-all duration-300 shadow hover:shadow hover:shadow-lg"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Image src={icon as string} alt="Feature icon" width={50} height={50} />
				{/* <div className="mb-2 text-primary">{icon}</div> */}
				<h2 className="font-medium text-primary mb-2">{title}</h2>
				<p className="text-primary-dark mb-8 leading-6 md:leading-8">
					{description}
				</p>
				<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
					<Button
						variant="primary"
						animation="ripple"
						className="border border-primary"
					>
						{buttonText} &gt;
					</Button>
				</div>
			</div>

			<div
				className={`absolute mx-auto top-[13px] right-[13px] sm:right-[40px] md:right-[80px] w-full max-w-[550px] h-[300px] sm:h-[400px] rounded-[10px] -z-10 pointer-events-none transition-bg duration-700 ${
					isHovered ? " bg-secondary" : "opacity-100 bg-primary "
				}`}
			/>
		</div>
	);
};

const ServiceSection: React.FC<ServiceSectionProps> = ({
	title = "What We Do?",
	subtitle = "We make it easy to source, purchase, and pay vendors worldwide in your local currency.",
	features = [],
	imageSrc = "",
}) => {
	return (
		<div className="w-full relative py-12 px-2 overflow-x-hidden">
			<div className="absolute -top-20 -right-5 ">
				<Image
					src={imageSrc}
					alt="Shipping boxes with globe"
					width={300}
					height={300}
				/>
			</div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-12 flex items-start md:items-center justify-center flex-col w-[33ch] max-w-full sm:w-full">
					<h2 className="text-primary">{title}</h2>
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
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServiceSection;
