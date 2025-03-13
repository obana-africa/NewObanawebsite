"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { logoSlickSettings } from "@/lib/slick";
import joop from "@/app/assets/images/landing-page/joop.svg";
import jack from "@/app/assets/images/landing-page/jack&jones.svg";
import boohooman from "@/app/assets/images/landing-page/boohooman.svg";
import ralph from "@/app/assets/images/landing-page/ralph.svg";
import tommy from "@/app/assets/images/landing-page/tommy.svg";
import Seperator from "@/components/external/components/seperator";

const logoImages = [
	{
		id: 1,
		src: joop,
		alt: "JOOP",
	},
	{
		id: 2,
		src: jack,
		alt: "Jack & Jones",
	},
	{
		id: 3,
		src: boohooman,
		alt: "BoohooMAN",
	},
	{
		id: 4,
		src: ralph,
		alt: "Ralph Lauren",
	},
	{
		id: 5,
		src: tommy,
		alt: "Tommy Hilfiger",
	},
];

const GlobalBrands = () => {
	return (
		<div className="w-full py-12 bg-secondary relative overflow-hidden z-10">
			<div
				className="absolute w-[182px] h-[56px] opacity-30 blur-[50px] bg-[#222] rounded-full"
				style={{
					top: "50px",
					left: "50%",
					transform: "translateX(-50%)",
				}}
			></div>

			<div className="container mx-auto px-4 mb-8 flex flex-col items-center relative z-10">
				<h5 className="text-center mb-2">
					Over 100 global brands and growing every day
				</h5>

				<Seperator />
			</div>

			<div className="container mx-auto px-4 mt-8">
				<Slider {...logoSlickSettings} className="brand-logo-slider">
					{logoImages.map((image) => (
						<div
							key={image.id}
							className="outline-none flex items-center justify-center h-24"
						>
							<div className="w-40 h-20 relative flex items-center justify-center">
								<Image
									src={image.src}
									alt={image.alt}
									className="object-contain"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									style={{ maxWidth: "100%", maxHeight: "100%" }}
								/>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default GlobalBrands;
