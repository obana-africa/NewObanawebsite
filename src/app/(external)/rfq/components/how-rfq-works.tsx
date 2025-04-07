import Seperator from "@/components/external/components/seperator";
import Image from "next/image";
import React from "react";
import inventory111 from "@/app/assets/images/services-page/inventory111.png";
import rfq from "@/app/assets/images/rfq/rfq.png";
import Button from "@/components/ui/button";

const HowRfqWorks = () => {
	return (
		<div className=" relative z-10">
			<section className="container mx-auto px-4 md:px-6 py-8 md:py-16 mt-12 md:mt-12">
				<div className="flex flex-col-reverse justify-between md:flex-row gap-6 md:gap-16">
					<div className="w-full md:w-3/5">
						<h2
							className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
							data-aos="fade-right"
						>
							How Our RFQ Works
						</h2>
						<Seperator />
						<div className="mt-4 md:mt-6 space-y-4 md:space-y-8 text-[#222]  md:text-base lg:text-md leading-8">
							<div>
								<p data-aos="fade-right">
									We simplify the process of getting accurate pricing by
									providing a seamless Request for Quote service. Easily submit
									your requirements, compare options, and receive tailored
									quotes to make informed decisions quickly and efficiently.
								</p>
							</div>

							<Button
								// onClick={handleGetStarted}
								variant="primary"
								animation="ripple"
								className="border border-primary "
							>
								Request For Quote
							</Button>
						</div>
					</div>

					<div
						className="w-full md:w-2/5 flex justify-center items-center z-20"
						data-aos="fade-left"
					>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg hidden md:block">
							<Image
								src={rfq}
								alt="Our Founder"
								width={600}
								height={500}
								sizes="(max-width: 640px) 20vw, (max-width: 768px) 60vw, 20vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg md:hidden">
							<Image
								src={rfq}
								alt="Our Founder"
								width={400}
								height={500}
								sizes="(max-width: 640px) 20vw, (max-width: 768px) 60vw, 20vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
					</div>

					<div
						className="absolute top-[0px] right-0   bg-white/10 rounded-lg hidden sm:block"
						data-aos="zoom-in"
					>
						<Image
							src={inventory111}
							alt="Decorative square"
							width={400}
							height={300}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HowRfqWorks;
