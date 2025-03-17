"use client";
import React from "react";
import Image from "next/image";
import square from "@/app/assets/images/landing-page/square.svg";
import partners from "@/app/assets/images/landing-page/S-partners.png";
import logistics from "@/app/assets/images/landing-page/S-logistics.png";
import inventory from "@/app/assets/images/landing-page/S-inventory.png";
import financing from "@/app/assets/images/landing-page/S-financing.png";
import arrow from "@/app/assets/images/landing-page/S-arrow.svg";
import { ImageBoxProps } from "../types";

const ImageBox: React.FC<ImageBoxProps> = ({
	number,
	image,
	imageAlt,
	title,
	description,
	className = "",
}) => {
	return (
		<div className={`flex flex-col items-center text-center ${className}`}>
			<div className="relative mb-5">
				<div className="absolute -top-3 -left-3 w-10 h-10 bg-white text-primary border-8 border-primary rounded-full flex items-center justify-center font-bold z-10">
					{number}
				</div>
				<div className="relative rounded-lg overflow-hidden">
					<Image
						src={image}
						alt={imageAlt}
						width={170}
						height={170}
						className="object-cover"
					/>
				</div>
			</div>
			<h3 className="text-lg font-bold mb-2">{title}</h3>
			<p className="md:max-w-[270px]">{description}</p>
		</div>
	);
};

const WhyObanaSection: React.FC = () => {
	return (
		<section className="relative px-4 py-4 md:py-4 overflow-hidden">
			<div
				className="absolute top-[50px] right-[150px] w-[182px] h-[36px] opacity-30 blur-[50px] bg-[#222] rounded-full"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			></div>

			<div className="absolute top-4 left-0">
				<Image src={square} alt="square" width={180} height={180} />
			</div>
			<div className="container mx-auto px-4 md:px-6">
				<div className="text-center text-primary mb-6 md:mb-20 mt-4 w-full md:w-[800px] mx-auto">
					<h1 className="flex items-center justify-center text-3xl md:text-4xl font-bold mb-2">
						Why
						<span className="bg-secondary  ml-3 px-4 py-1 rounded-md">
							Obana
						</span>
					</h1>
					<h5>
						We provide seamless sourcing, secure payments, reliable logistics,
						and business growth opportunities—all designed to help you succeed
						effortlessly
					</h5>
				</div>

				<div
					className="absolute top-[50px] left-[350px] w-[182px] h-[36px] opacity-30 blur-[50px] bg-[#222] rounded-full"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				></div>

				<div className="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-2 md:mt-12">
					<div className="lg:mt-0 relative">
						<ImageBox
							number={1}
							image={inventory}
							imageAlt="Source Inventory"
							title="Source Inventory"
							description="We assist in finding and procuring the right inventory to meet your business needs efficiently."
						/>

						<div
							className="absolute top-[250px] left-[300px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-[#222] rounded-full"
							style={{
								transform: "translate(-50%, -50%)",
							}}
						></div>
						<div className="absolute top-5 -right-32 rotate-4 hidden md:block">
							<Image src={arrow} alt="arrow-right" width={220} height={180} />
						</div>
					</div>

					<div className="lg:mt-40 relative">
						<ImageBox
							number={2}
							image={partners}
							imageAlt="Sales Partners"
							title="Sales Partners"
							description="We connect businesses with trusted partners to drive sales and expand market reach."
						/>

						<div
							className="absolute top-[300px] left-[300px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-[#222] rounded-full"
							style={{
								transform: "translate(-50%, -50%)",
							}}
						></div>
						<div className="absolute -top-20 -right-[7rem] -rotate-z-[45deg] hidden md:block">
							<Image src={arrow} alt="arrow-right" width={200} height={180} />
						</div>
					</div>

					<div className="lg:mt-0 relative">
						<ImageBox
							number={3}
							image={logistics}
							imageAlt="Logistics"
							title="Logistics"
							description="We provide efficient logistics solutions to ensure timely delivery and smooth operations, helping businesses scale without transportation barriers."
						/>

						<div
							className="absolute top-[50px] left-[300px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-[#222] rounded-full"
							style={{
								transform: "translate(-50%, -50%)",
							}}
						></div>
						<div className="absolute top-5 -right-40 rotate-4 hidden md:block">
							<Image src={arrow} alt="arrow-right" width={245} height={180} />
						</div>
					</div>

					<div className="lg:mt-40">
						<ImageBox
							number={4}
							image={financing}
							imageAlt="Inventory Financing"
							title="Inventory Financing"
							description="We provide secure and efficient payment methods tailored for local transactions."
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyObanaSection;
