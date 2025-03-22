"use client";
import React from "react";
import Image from "next/image";
import vision from "@/app/assets/images/about-page/vision-icon.svg";
import mission from "@/app/assets/images/about-page/mission-icon.svg";

const Vision = () => {
	return (
		<section className="container mx-auto px-4 pt-10 md:py-12">
			<div className="bg-primary rounded-lg px-4 md:px-16 pt-10 pb-16 relative overflow-hidden text-white">
				<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:divide-x-2 md:divide-white/50">
					<div className="flex flex-col md:w-[49%]" data-aos="fade-right">
						<div className="bg-white p-2 md:p-4 size-10 md:size-16 flex items-center justify-center mb-4 rounded-sm">
							<Image
								src={vision}
								alt="Vision Icon"
								width={40}
								height={40}
								className="text-primary"
							/>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
						<p className="text-base md:text-md md:leading-8">
							Driven by our core values of reliability, authenticity,
							transparency and community, Obana is here to bridge the gap
							between dreams and access, becoming the trusted source that
							businesses turn to for prosperity and progress.
						</p>
					</div>

					<div className="hidden md:block w-px bg-white/30 h-full mx-auto"></div>

					<div className="flex flex-col md:w-[49%]" data-aos="fade-left">
						<div className="bg-white p-2 md:p-4 size-10 md:size-16 flex items-center justify-center mb-4 rounded-sm">
							<Image
								src={mission}
								alt="Mission Icon"
								width={40}
								height={40}
								className="text-primary"
							/>
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
						<p className="text-base md:text-md md:leading-8">
							Our mission is simple; to help African SMEs focus on growing their
							businesses while we cater to their product assortment needs,
							efficient logistics, payment and inventory financing.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Vision;
