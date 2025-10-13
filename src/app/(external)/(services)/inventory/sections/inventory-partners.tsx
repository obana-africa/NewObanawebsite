"use client";

import Image from "next/image";
import React from "react";
import Seperator from "@/components/external/components/seperator";
import { inventoryPartners } from "../data/partners";

const InventoryPartners = () => {
	return (
		<section className="container mx-auto px-4 py-10 md:py-4">
			<div className="text-center mb-8 md:mb-10 items-center flex flex-col">
				<h2
					className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
					data-aos="fade-up"
				>
					Our Financing Partners
				</h2>
				<Seperator />
				<p
					className="mt-3 text-[#222] text-sm md:text-base max-w-2xl mx-auto"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					We collaborate with trusted financial institutions to provide you with
					the best inventory financing options
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
				{inventoryPartners.map((partner, index) => (
					<div
						key={partner.id}
						className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
						data-aos="fade-up"
						data-aos-delay={index * 100}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500" />

						<div className="relative p-5 md:p-6">
							<div className="flex items-center justify-center mb-5 bg-white rounded-xl p-2 shadow-sm group-hover:shadow-md transition-shadow duration-300">
								<div className="relative w-48 h-24 md:w-56 md:h-28">
									<Image
										src={partner.logo}
										alt={`${partner.name} logo`}
										fill
										className="object-contain transition-transform duration-300 group-hover:scale-105"
									/>
								</div>
							</div>

							<h3 className="text-lg md:text-xl font-bold text-primary text-center mb-3 group-hover:text-secondary transition-colors duration-300">
								{partner.name}
							</h3>

							<p className="text-[#444] text-sm md:text-base leading-relaxed text-center">
								{partner.description}
							</p>
						</div>

						<div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 px-5 py-2.5">
							<div className="flex items-center justify-center gap-2">
								<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
								<span className="text-xs md:text-sm text-primary font-semibold tracking-wide">
									TRUSTED PARTNER
								</span>
								<div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default InventoryPartners;
