"use client";
import React from "react";
import Image from "next/image";
import ImpactCard from "./impact-card";
import impact from "@/app/assets/images/landing-page/impact.png";
import Seperator from "@/components/external/components/seperator";

interface ImpactItem {
	number: string;
	title: string;
	subtitle: string;
	description: string;
	variant?: "default" | "primary";
}

interface ImpactSectionProps {
	title: string;
	description: string;
	impactItems: ImpactItem[];
	backgroundImage?: string;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({
	title,
	description,
	impactItems,
	backgroundImage,
}) => {
	return (
		<section className="w-full py-16 md:py-20 bg-[#F8FAFC] relative overflow-hidden">
			{backgroundImage && (
				<div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
					<Image
						src={backgroundImage}
						alt="Africa Map"
						width={600}
						height={800}
						className="w-auto h-auto"
					/>
				</div>
			)}

			<div className="container mx-auto px-4 md:px-6 relative z-10">
				<div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto  items-center flex flex-col">
					<h2
						className="text-primary text-3xl md:text-2xl lg:text-3xl font-bold "
					>
						{title}
					</h2>
					<Seperator />
					<p
						className="text-primary text-base md:text-lg lg:text-xl leading-relaxed mt-2"
					>
						{description}
					</p>
				</div>

				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
						{impactItems.slice(0, 3).map((item, index) => (
							<ImpactCard
								key={index}
								number={item.number}
								title={item.title}
								subtitle={item.subtitle}
								description={item.description}
								variant={item.variant}
								aosDelay={200 + index * 100}
								backgroundImage={impact}
							/>
						))}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
						{impactItems.slice(3, 6).map((item, index) => (
							<ImpactCard
								key={index + 3}
								number={item.number}
								title={item.title}
								subtitle={item.subtitle}
								description={item.description}
								variant={item.variant}
								aosDelay={500 + index * 100}
								backgroundImage={impact}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImpactSection;
