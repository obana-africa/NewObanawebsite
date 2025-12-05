/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";

interface ImpactCardProps {
	number: string;
	title: string;
	subtitle: string;
	description: string;
	variant?: "default" | "primary";
	aosDelay?: number;
	backgroundImage?: any;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
	number,
	title,
	subtitle,
	description,
	variant = "default",
	aosDelay = 0,
	backgroundImage,
}) => {
	const isPrimary = variant === "primary";

	return (
		<div
			className={`${
				isPrimary
					? "bg-[#1E3A5F] text-white"
					: "bg-white text-[#4A5568] border border-secondary-light"
			} rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between min-h-[300px] relative overflow-hidden`}
			data-aos="fade-up"
			data-aos-delay={aosDelay}
			data-aos-duration="800"
		>
			{isPrimary && backgroundImage && (
				<>
					<div className="absolute inset-0 z-0 bg-transparent">
						<Image
							src={backgroundImage}
							alt="Background pattern"
							fill
							className="object-cover opacity-10"
							sizes="(max-width: 768px) 100vw, 33vw"
						/>
					</div>
				</>
			)}

			<div className="relative z-10">
				<div className="mb-6">
					<h2
						className={`text-5xl md:text-6xl font-bold mb-4 ${
							isPrimary ? "text-white" : "text-primary"
						}`}
					>
						{number}
					</h2>
					<h3
						className={`text-xl md:text-2xl font-semibold ${
							isPrimary ? "text-white" : "text-primary"
						}`}
					>
						{title}
					</h3>
				</div>

				<div
					className={`w-full h-[1px] ${
						isPrimary ? "bg-white/30" : "bg-secondary-light"
					} my-6`}
				/>

				<p
					className={`text-sm md:text-base font-medium mb-4 ${
						isPrimary ? "text-white/90" : "text-primary"
					}`}
				>
					{subtitle}
				</p>

				<div
					className={`w-full h-[1px] ${
						isPrimary ? "bg-white/30" : "bg-secondary-light"
					} mb-6`}
				/>

				<p
					className={`text-sm md:text-base leading-relaxed ${
						isPrimary ? "text-white/80" : "text-[#4A5568]"
					}`}
				>
					{description}
				</p>
			</div>
		</div>
	);
};

export default ImpactCard;
