"use client";
import Image from "next/image";
import React from "react";
import inventory from "@/app/assets/images/services-page/inventory001.png";
import Seperator from "@/components/external/components/seperator";
import NormalList from "@/components/external/components/lists";
import { inventoryFinancingSteps } from "../data/inventory-steps";

const InventoryWorks = () => {
	return (
		<section className="container mx-auto px-4 pt-10 md:py-12">
			<div className="bg-secondary rounded-lg px-4 md:px-16 pt-10 pb-16 relative overflow-hidden text-white">
				<div className="flex flex-col-reverse justify-between md:flex-row gap-6 md:gap-16">
					<div className="w-full md:w-3/5">
						<h2
							className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
						>
							How Our Inventory Financing Works
						</h2>
						<Seperator />
						<div className="mt-4 md:mt-6 space-y-4 md:space-y-8 text-[#222]  md:text-base lg:text-md leading-6">
							<NormalList
								items={inventoryFinancingSteps}
								bulletColor="#1B3B5F"
								bulletSize="10px"
								aosAnimation="fade-up"
								contentClassName="font-['Bricolage_Grotesque'] font-bold text-primary text-lg"
							/>
						</div>
					</div>

					<div
						className="w-full md:w-2/5 flex justify-center items-center"
					>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg hidden md:block">
							<Image
								src={inventory}
								alt="Our inventory"
								width={600}
								height={500}
								sizes="(max-width: 640px) 20vw, (max-width: 768px) 60vw, 20vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg md:hidden">
							<Image
								src={inventory}
								alt="Our inventory"
								width={400}
								height={500}
								sizes="(max-width: 640px) 20vw, (max-width: 768px) 60vw, 20vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InventoryWorks;
