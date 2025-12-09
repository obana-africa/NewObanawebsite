"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { logoSlickSettings } from "@/lib/slick";
import asos from "@/app/assets/images/landing-page/asos.png";
import boohoo from "@/app/assets/images/landing-page/boohoo.png";
import tommy from "@/app/assets/images/landing-page/tommy.png";
import zara from "@/app/assets/images/landing-page/zara.png";
import gap from "@/app/assets/images/landing-page/gap.png";
import hacket from "@/app/assets/images/landing-page/hacket.png";
import adidas from "@/app/assets/images/landing-page/adidas.png";
import jack from "@/app/assets/images/landing-page/jack.png";
import select from "@/app/assets/images/landing-page/select.png";
import spar from "@/app/assets/images/landing-page/spar.png";
import foodco from "@/app/assets/images/landing-page/foodco.png";
import market from "@/app/assets/images/landing-page/market.png";
import Seperator from "@/components/external/components/seperator";

const logoImages = [
	{
		id: 1,
		src: asos,
		alt: "Asos",
	},
	{
		id: 2,
		src: zara,
		alt: "Zara",
	},
	{
		id: 3,
		src: boohoo,
		alt: "BoohooMAN",
	},
	{
		id: 4,
		src: gap,
		alt: "Gap",
	},
	{
		id: 5,
		src: tommy,
		alt: "Tommy Hilfiger",
	},
	{
		id: 6,
		src: hacket,
		alt: "Hackett",
	},
	{
		id: 7,
		src: adidas,
		alt: "Adidas",
	},
	{
		id: 5,
		src: jack,
		alt: "Jack",
	},
	{
		id: 5,
		src: select,
		alt: "Select",
	},
	{
		id: 5,
		src: spar,
		alt: "Spar",
	},
	{
		id: 5,
		src: foodco,
		alt: "Foodco",
	},
	{
		id: 5,
		src: market,
		alt: "Market",
	},
];

const GlobalBrands = () => {
	return (
		<div className="w-full pt-10 md:py-12 bg-secondary relative overflow-hidden z-10">
			<div
				className="absolute w-[182px] h-[56px] opacity-30 blur-[50px] bg-[#222] rounded-full"
				style={{
					top: "50px",
					left: "50%",
					transform: "translateX(-50%)",
				}}
			></div>

			<div className="container mx-auto px-4 mb-8 flex flex-col items-center relative z-10">
				<h5 className="text-center mb-2 font-bold sm:font-normal">
					Over 20 brands and partners and growing everyday
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
