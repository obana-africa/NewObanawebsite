import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button";

interface ServiceFeatureBoxProps {
	title: string;
	description: string;
	buttonText?: string;
	imageSrc?: string;
	href?: string;
	aosAnimation?: string;
	aosDelay?: number;
}

const ServiceFeatureBox: React.FC<ServiceFeatureBoxProps> = ({
	title,
	description,
	buttonText = "Explore",
	imageSrc,
	href,
	aosAnimation = "fade-up",
	aosDelay = 0,
}) => {
	const handleClick = () => {
		if (href) {
			window.location.href = href;
		}
	};

	return (
		<div
			className="relative h-[500px] rounded-lg overflow-hidden group "
			data-aos={aosAnimation}
			data-aos-delay={aosDelay}
			data-aos-duration="800"
		>
			{imageSrc && (
				<Image
					src={imageSrc}
					alt={title}
					fill
					className="object-cover transition-transform duration-700 group-hover:scale-110"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			)}

			<div className="absolute inset-0 bg-black/40 group-hover:bg-primary/70 transition-all duration-500" />

			<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white z-10">
				<h3 className="text-3xl md:text-4xl font-bold mb-4 transition-transform duration-500 group-hover:scale-105">
					{title}
				</h3>
				<p className="text-base md:text-md mb-6 max-w-md md:max-w-2/3 leading-relaxed transition-opacity duration-500 group-hover:opacity-90 group-hover:font-bold">
					{description}
				</p>
				<Button
					onClick={handleClick}
					variant="secondary"
					animation="ripple"
					className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform group-hover:scale-110 px-8 py-3 rounded-md font-medium"
				>
					{buttonText}
				</Button>
			</div>

			<div className="absolute inset-0 border-4 border-transparent group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
		</div>
	);
};

export default ServiceFeatureBox;
