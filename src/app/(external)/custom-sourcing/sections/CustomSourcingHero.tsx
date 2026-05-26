"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import globe from "@/app/assets/images/globe-svg.svg";
import ngn from "@/app/assets/images/ngn-flag.svg";
import Image from "next/image";

interface Props {
	onSubmitDeal: () => void;
	onBrowseCategories: () => void;
}

const CustomSourcingHero: React.FC<Props> = ({
	onSubmitDeal,
	onBrowseCategories,
}) => {
	return (
		<section
			className="relative pt-24 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 md:px-10"
			style={{ background: "#1B3B5F" }}
		>
			<div className="container mx-auto max-w-7xl">
				<div
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 md:mb-8"
					style={{
						border: "1px solid #F9C319",
						color: "#F9C319",
						background: "#F9C31914",
					}}
				>
					<span className="w-2 h-2 rounded-full bg-[#F9C319]" />
					<span className="text-[11px] md:text-sm font-medium">
						Deal Pipeline — Open for Submissions
					</span>
				</div>

				<div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
					<div className="lg:col-span-7">
						<h1
							className="text-white font-extrabold"
							style={{
								fontSize: "clamp(2rem, 5vw, 3.8rem)",
								lineHeight: 1.05,
								fontFamily: "'Bricolage Grotesque', sans-serif",
								letterSpacing: "-0.02em",
							}}
						>
							Source.
							<br />
							Stock. <span style={{ color: "#F9C319" }}>Scale</span> your
							<br />
							fashion business.
						</h1>
						<p className="text-white/70 my-5 max-w-[80%] text-base md:text-base leading-relaxed">
							Obana.Africa connects African fashion & beauty SMEs to verified
							global inventory, embedded logistics, and working capital all in
							one platform.
						</p>

						<div className="flex flex-col sm:flex-row gap-3 mt-7">
							<button
								onClick={onSubmitDeal}
								className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#1B3B5F] font-semibold rounded-lg hover:bg-[#F9C319] transition-colors text-sm"
							>
								Submit your deal <ArrowRight className="h-4 w-4" />
							</button>
							<button
								onClick={onBrowseCategories}
								className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm"
							>
								Browse Categories <ArrowRight className="h-4 w-4" />
							</button>
						</div>
					</div>

					<div className="lg:col-span-5 space-y-4 w-full hidden md:block">
						<div
							className="rounded-xl py-5 px-2"
							style={{
								border: "1px solid rgba(249, 195, 249, 0.3)",
								background: "rgba(255, 255, 255, 0.03)",
							}}
						>
							<div className="grid grid-cols-3 divide-x divide-white/10">
								{[
									{ v: "100+", l: "SMEs Onboarded" },
									{ v: "$90K", l: "GMV to Date" },
									{ v: "10+", l: "Global Vendors" },
								].map((s, i) => (
									<div key={i} className="text-center px-2">
										<p
											className="font-extrabold leading-none"
											style={{
												color: "#F9C319",
												fontSize: "clamp(1.5rem, 3vw, 2rem)",
												fontWeight: 700,
												fontFamily: "'Bricolage Grotesque', sans-serif",
											}}
										>
											{s.v}
										</p>
										<p className="text-[10px] md:text-[11px] text-white/60 mt-1.5 leading-tight">
											{s.l}
										</p>
									</div>
								))}
							</div>
						</div>

						<div
							className="p-5 rounded-xl"
							style={{
								border: "1px solid rgba(255,255,255,0.15)",
								background: "rgba(255,255,255,0.03)",
							}}
						>
							<p
								className="text-white  text-[22px] mb-3"
								style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
							>
								Currently Serving
							</p>
							<div className="flex flex-wrap gap-2">
								{[
									{ flag: ngn, name: "Nigeria" },
									{ icon: globe, name: "West Africa (2027)" },
									{ icon: globe, name: "Sub-Saharan (2028)" },
								].map((c, i) => (
									<span
										key={i}
										className="inline-flex items-center gap-2 text-[11px] md:text-xs px-3 py-2 rounded-full text-white"
										style={{
											border: "1px solid #F9C319",
											color: "#F9C319",
											background: "#F9C31914",
										}}
									>
										<Image
											src={c.flag || c.icon}
											alt="Obana Logo"
											width={13}
											height={13}
											priority
											className="object-contain"
										/>
										<span>{c.name}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomSourcingHero;
