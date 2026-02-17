"use client";
import React from "react";
import Image from "next/image";
import founder from "@/app/assets/images/about-page/founder.png";
import fazsion from "@/app/assets/images/about-page/fazsion.png";
import image1130 from "@/app/assets/images/about-page/image1103.png";
import Seperator from "@/components/external/components/seperator";

interface FoundersJourneyProps {
	founderFirstImage?: string;
	founderSecondImage?: string;
}

const FoundersJourney: React.FC<FoundersJourneyProps> = ({
	founderFirstImage,
	founderSecondImage,
}) => {
	return (
		<div className=" overflow-hidden">
			<FoundersJourneyOne founderImage={founderFirstImage} />
			<FoundersJourneyTwo founderImage={founderSecondImage} />
		</div>
	);
};

export default FoundersJourney;

const FoundersJourneyOne: React.FC<{ founderImage?: string }> = ({
	founderImage,
}) => {
	return (
		<div className="bg-secondary relative">
			<section className="container mx-auto px-4 md:px-6 py-8 md:py-16 mt-6 md:mt-12">
				<div className="flex flex-col-reverse justify-between md:flex-row gap-6 md:gap-16">
					<div
						className="w-full md:w-3/5"
						// data-aos="fade-right"
						// data-aos-delay="100"
					>
						<h2
							className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
							data-aos="fade-right"
						>
							Our founder&apos;s journey
						</h2>
						<Seperator />
						<div className="mt-4 md:mt-6 space-y-4 md:space-y-8 text-[#222]  md:text-base lg:text-md leading-6">
							<p data-aos="fade-right">
								In 2012, our founder began his journey as a pioneer staff member at{" "}
								<span className="font-bold">Jumia</span>, serving as a Category
								Manager for Fashion. Jumia, one of Africa&apos;s leading
								e-commerce platforms, revolutionized online shopping by
								providing a marketplace for various consumer goods, including
								fashion, electronics, and household items. This experience
								provided deep insights into the challenges and opportunities
								within the online retail industry.
							</p>

							<p data-aos="fade-left">
								In 2013, he moved to{" "}
								<span className="font-bold">Konga.com</span>, another major
								e-commerce platform in Nigeria, where he took charge of
								developing the fashion category. During his time at Konga, he
								played a key role in spearheading the creation of private-label
								brands, which generated an impressive{" "}
								<span className="font-bold">₦800 million in revenue</span>.
								Additionally, he was instrumental in migrating Konga from a
								first-party retail model to a third-party retail marketplace, where
								he identified a major gap in the market—local vendors needed to
								source products internationally to sell on online platforms
								locally.
							</p>

							<p data-aos="fade-right">
								By 2015, he co-founded{" "}
								<span className="font-bold">Fazsion.ng</span>, initially
								envisioned as a cross-border retail e-commerce platform,
								alongside Bo Hansen from Denmark. However, based on the market
								gap observed during his time at Konga, the business pivoted to a
								B2B wholesale model to better serve local vendors.
							</p>
						</div>
					</div>

					<div
						className="w-full md:w-2/5 flex justify-center items-center z-20"
						// data-aos="fade-right"
						// data-aos-delay="100"
						data-aos="fade-left"
					>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg hidden md:block">
							<Image
								src={founderImage || founder}
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
								src={founderImage || founder}
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
						className="absolute top-[0px] right-0   bg-white/10 rounded-lg "
						data-aos="zoom-in"
					>
						<Image
							src={image1130}
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

const FoundersJourneyTwo: React.FC<{ founderImage?: string }> = ({
	founderImage,
}) => {
	return (
		<div className="bg-white">
			<section className="container mx-auto px-4 md:px-6 py-8 md:py-16 mt-2">
				<div className="flex flex-col-reverse justify-between md:flex-row-reverse gap-6 md:gap-16">
					<div
						className="w-full md:w-3/5"
						// data-aos="fade-left"
						// data-aos-delay="100"
					>
						<div className="mt-4 md:mt-6 space-y-4 md:space-y-8 text-[#222]  md:text-base lg:text-md leading-6">
							<p data-aos="fade-up">
								In 2016, Fazsion Wholesale was officially launched. Working in
								collaboration with the sales team, the company successfully
								acquired over 1,000 SMEs within two years, generating an average{" "}
								<span className="font-bold ml-1">
									revenue of ₦500 million NGN yearly.
								</span>
								This solidified the need for an efficient, structured B2B
								marketplace that would empower local businesses.
							</p>

							<p data-aos="fade-up">
								Fast forward to 2024, he was part of the team that founded{" "}
								<span className="font-bold">Trade Enablers, </span> a company
								providing e-commerce as a service for B2B and B2C transactions,
								working in partnership with Nigerian banks to drive digital
								commerce.
							</p>

							<p data-aos="fade-up">
								Later in 2024, he took a bold step forward by founding
								<span className="font-bold"> Obana.Africa, </span> an innovative
								platform designed to enlarge the scope of B2B offerings for
								local SMEs. Obana goes beyond importation from China and the US,
								exposing Sub-Saharan African SMEs to regional trade
								opportunities, a $300 billion USD market. The vision for Obana
								is to operate as an ecosystem, integrating key partners that
								SMEs need to scale, offering them an all-in-one platform for
								seamless sourcing, payments, logistics, and financing solutions.
							</p>

							<p data-aos="fade-up">
								Today, Obana Africa stands as a transformative force, connecting
								businesses, enhancing trade, and unlocking endless opportunities
								for SMEs across Africa.
							</p>
						</div>
					</div>

					<div
						className="w-full md:w-2/5 flex justify-center items-center"
						// data-aos="fade-right"
						// data-aos-delay="100"
						data-aos="fade-right"
					>
						<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
							<Image
								src={founderImage || fazsion}
								alt="Our Founder"
								width={600}
								height={500}
								sizes="(max-width: 640px) 50vw, (max-width: 768px) 60vw, 40vw"
								className="object-cover rounded-sm mx-auto h-auto"
								priority
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
