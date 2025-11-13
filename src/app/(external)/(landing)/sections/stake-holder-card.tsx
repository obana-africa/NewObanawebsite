"use client";
import React from "react";
import Image from "next/image";

interface StakeholderCardProps {
	title: string;
	description: string;
	imageSrc: string;
	imagePosition?: "left" | "right";
	aosDelay?: number;
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({
	title,
	description,
	imageSrc,
	imagePosition = "left",
	aosDelay = 0,
}) => {
	return (
		<div
			className={`flex flex-col ${
				imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
			} gap-2  md:gap-10 items-stretch`}
		>
			<div className="w-full md:w-[40%] rounded-2xl">
				<div className="relative w-full h-64 md:h-full min-h-[200px] md:min-h-[300px] rounded-2xl  overflow-hidden">
					<Image
						src={imageSrc}
						alt={title}
						fill
						className="object-contain  rounded-2xl"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
			</div>

			<div className="w-full md:w-[60%] bg-[#F5F7FA] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl p-8 md:p-12 flex flex-col justify-center">
				<h3 className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
					{title}
				</h3>
				<p className="text-[#4A5568] text-base md:text-md font-medium leading-relaxed">
					{description}
				</p>
			</div>
		</div>
	);
};

export default StakeholderCard;
