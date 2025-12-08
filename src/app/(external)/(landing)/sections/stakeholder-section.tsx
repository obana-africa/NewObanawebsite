/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Seperator from "@/components/external/components/seperator";
import StakeholderCard from "./stake-holder-card";

interface Stakeholder {
	title: string;
	description: string;
	imageSrc: any;
}

interface StakeholderSectionProps {
	title: string;
	stakeholders: Stakeholder[];
}

const StakeholderSection: React.FC<StakeholderSectionProps> = ({
	title,
	stakeholders,
}) => {
	return (
		<section className="w-full py-1 md:py-1 bg-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="text-center mb-8 md:mb-2 items-center flex flex-col">
					<h2
						className="text-primary text-3xl md:text-3xl lg:text-4xl font-bold mb-1"
					>
						{title}
					</h2>
					<Seperator />
				</div>

				<div className="max-w-7xl mx-auto space-y-12 md:space-y-5">
					{stakeholders.map((stakeholder, index) => (
						<StakeholderCard
							key={index}
							title={stakeholder.title}
							description={stakeholder.description}
							imageSrc={stakeholder.imageSrc}
							imagePosition={index % 2 === 0 ? "left" : "right"}
							aosDelay={100 + index * 150}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default StakeholderSection;
