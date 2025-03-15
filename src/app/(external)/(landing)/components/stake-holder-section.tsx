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
		<div className="flex flex-col items-start min-h-[20.125rem] border-l-[5px] border-primary bg-white py-6">
			<div className="flex items-center">
				<Image
					src={rightIcon}
					alt="right arrow"
					width={40}
					height={40}
					className="relative -left-1"
				/>
				<h3 className=" text-primary">{label}</h3>
			</div>
			<div className="p-6 pt-4">
				<div className=" leading-6 md:leading-8">{description}</div>
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
		<section className="container mx-auto px-4 py-12">
			<div className="bg-secondary rounded-lg px-8 pt-10 pb-16 relative overflow-hidden">
				<div className="absolute -top-20 -right-40 rotate-230">
					<Image src={globeImage} alt="Globe" width={300} height={180} />
				</div>

				<div className="mb-10 relative z-10">
					<h2 className=" font-bold text-primary mb-2 w-[20ch] leading-12">
						{title}
					</h2>
					<Seperator />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y-1 relative z-10">
					{stakeholders.map((stakeholder, index) => (
						<StakeholderBox
							key={index}
							label={stakeholder.label}
							description={stakeholder.description}
							rightIcon={stakeholder.rightIcon}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default StakeholderSection;
