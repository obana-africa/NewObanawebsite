"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import { FeatureBoxProps } from "@/app/(external)/(landing)/types";

const FeatureBox: React.FC<FeatureBoxProps> = ({
	icon,
	title,
	description,
	buttonText,
	href,
	...rest
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<div className="relative w-full px-2 sm:px-4 mb-6 md:mb-0" {...rest}>
			<div
				className="relative mx-auto w-full max-w-[550px] min-h-[360px] sm:min-h-[400px] bg-white z-10 rounded-[10px] border border-primary p-4 sm:p-6 md:p-8 transition-all duration-300 shadow hover:shadow hover:shadow-lg"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Image src={icon as string} alt="Feature icon" width={50} height={50} />
				<h2 className="font-medium text-primary mb-2">{title}</h2>
				<p className="text-primary-dark mb-8 leading-6 md:leading-8">
					{description}
				</p>
				{buttonText && href && (
					<div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
						<Button
							variant="primary"
							animation="ripple"
							className="border border-primary"
							href={href}
						>
							{buttonText} &gt;
						</Button>
					</div>
				)}
			</div>

			<div
				className={`absolute mx-auto top-[13px] right-[43px] xl:right-[50px] 2xl:right-[90px] w-[90%] max-w-[550px] h-[370px] sm:h-[400px] rounded-[10px] -z-10 pointer-events-none transition-bg duration-700 ${
					isHovered ? " bg-secondary" : "opacity-100 bg-primary "
				}`}
			/>
		</div>
	);
};

export default FeatureBox;
