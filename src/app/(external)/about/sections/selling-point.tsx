"use client";
import Image from "next/image";
import React from "react";
import team from "@/app/assets/images/about-page/team.png";
import Seperator from "@/components/external/components/seperator";
import NormalList from "@/components/external/components/lists";
import { sellingPoints } from "../data/core-values";

const SellingPoint = () => {

	return (
		<section className="container mx-auto px-4 pt-10 md:py-12">
			<div className="bg-secondary rounded-lg px-4 md:px-16 pt-10 pb-16 relative overflow-hidden text-white">
				<div className="flex flex-col-reverse justify-between md:flex-row gap-6 md:gap-16">
					<div className="w-full md:w-3/5">
						<h2
							className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
							data-aos="fade-right"
						>
							Our Unique Selling Points
						</h2>
						<Seperator />
						<div className="mt-4 md:mt-6 space-y-4 md:space-y-8 text-[#222]  md:text-base lg:text-md leading-6">
							<p data-aos="fade-right">
								Obana.Africa is a curated marketplace that connects vendors with
								the right customers through trusted sales partners. Our platform
								offers seamless trade with local currency payments, embedded
								inventory financing, and integrated logistics—ensuring a
								hassle-free buying and selling experience.
							</p>

							<NormalList
								items={sellingPoints}
								bulletColor="#1B3B5F"
								bulletSize="10px"
								aosAnimation="fade-up"
								contentClassName="font-['Bricolage_Grotesque'] font-bold text-primary text-lg"
							/>
						</div>
					</div>

					<div
						className="w-full md:w-2/5 flex justify-center items-center"
						data-aos="fade-left"
					>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg hidden md:block">
							<Image
								src={team}
								alt="Our team"
								width={600}
								height={500}
								sizes="(max-width: 640px) 20vw, (max-width: 768px) 60vw, 20vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg md:hidden">
							<Image
								src={team}
								alt="Our team"
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

export default SellingPoint;
