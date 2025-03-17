"use client";
import React from "react";
import Image from "next/image";
import { StakeholderBoxProps, StakeholderSectionProps } from "../types";
import Seperator from "@/components/external/components/seperator";

const StakeholderBox: React.FC<StakeholderBoxProps> = ({
	label,
	description,
	rightIcon,
}) => {
	return (
		<div className="flex flex-col items-start max-h-[30rem] md:min-h-[20.125rem] h-full border-l-[5px] border-primary bg-white py-6">
			<div className="flex items-center">
				<Image
					src={rightIcon}
					alt="right arrow"
					width={40}
					height={40}
					className="relative -left-1"
				/>
				<h3 className="text-primary hidden md:block">{label}</h3>
				<h2 className="text-primary md:hidden">{label}</h2>
			</div>
			<div className="md:pl-10 p-6 pt-4 h-full">
				<div className="leading-6 md:leading-8">{description}</div>
			</div>
		</div>
	);
};

const StakeholderSection: React.FC<StakeholderSectionProps> = ({
	title,
	stakeholders,
	globeImage,
}) => {
	return (
		<section className="container mx-auto px-4 pt-10 md:py-12">
			<div className="bg-secondary rounded-lg px-4 md:px-16 pt-10 pb-16 relative overflow-hidden">
				<div className="absolute -top-20 -right-40 rotate-230">
					<Image src={globeImage} alt="Globe" width={300} height={180} />
				</div>
				<div className="mb-10 relative z-10">
					<h2 className="font-bold text-primary mb-2 w-[15ch] md:w-[20ch] md:leading-12">
						{title}
					</h2>
					<Seperator />
				</div>

				<div className="md:hidden grid grid-cols-1 divide-y-2 relative z-10">
					{stakeholders.map((stakeholder, index) => (
						<StakeholderBox
							key={index}
							label={stakeholder.label}
							description={stakeholder.description}
							rightIcon={stakeholder.rightIcon}
						/>
					))}
				</div>

				{/* Desktop view - Using grid with rows and custom dividers */}
				<div className="hidden md:block relative z-10">
					<div className="grid md:grid-cols-2 gap-x-8">
						<StakeholderBox
							label={stakeholders[0].label}
							description={stakeholders[0].description}
							rightIcon={stakeholders[0].rightIcon}
						/>
						<StakeholderBox
							label={stakeholders[1].label}
							description={stakeholders[1].description}
							rightIcon={stakeholders[1].rightIcon}
						/>
					</div>

					<div className="grid md:grid-cols-2 gap-x-8">
						<div className="h-[2px] bg-primary my-0"></div>
						<div className="h-[2px] bg-primary my-0"></div>
					</div>

					<div className="grid md:grid-cols-2 gap-x-8">
						<StakeholderBox
							label={stakeholders[2].label}
							description={stakeholders[2].description}
							rightIcon={stakeholders[2].rightIcon}
						/>
						<StakeholderBox
							label={stakeholders[3].label}
							description={stakeholders[3].description}
							rightIcon={stakeholders[3].rightIcon}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default StakeholderSection;
