import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown, Check, AlertCircle } from "lucide-react";
import Seperator from "@/components/external/components/seperator";
import stellas from "@/app/assets/images/logos/stellas.jpg";

const InventoryPartners = () => {
	const [expandedPartner, setExpandedPartner] = useState<string | null>(null);

	const features = [
		{
			title: "Flexible Loan Terms",
			description:
				"Loan terms varying by loan facility to match your business needs",
		},
		{
			title: "Digital Process",
			description:
				"Loan offer is digitally presented and accepted via business platform",
		},
		{
			title: "Smart Protection",
			description: "We reserve the right to cancel if obligations are not met",
		},
		{
			title: "Reputation Matters",
			description: "Non-repayment negatively affects your company profile",
		},
	];

	const partnersData = [
		// {
		// 	id: "salad",
		// 	name: "Salad Africa",
		// 	logo: "/logos/salad.png",
		// 	description:
		// 		"Buy Now, Pay Later for Businesses - Salad covers 50% of your purchase upfront, you pay the rest over time.",
		// 	eligibility: [
		// 		"Business registration details",
		// 		"BVN and valid ID",
		// 		"Proof of Address or sales records",
		// 	],
		// 	payment:
		// 		"Business pays 50% upfront; Salad covers the remaining 50% to complete the purchase.",
		// 	repayment:
		// 		"Balance is spread across 30 days to 6 months, depending on company cashflow or sales history.",
		// 	feesInterest:
		// 		"Zero interest if repayment is made on schedule. Late or missed payments may attract penalties.",
		// 	conditions: [
		// 		"Default may limit future access to Salad's financing services.",
		// 	],
		// },
		// {
		// 	id: "carbon",
		// 	name: "Carbon Zero",
		// 	logo: "/logos/carbon.png",
		// 	description:
		// 		"Buy Now, Pay Later for Businesses - Carbon pays the full purchase amount upfront.",
		// 	eligibility: [
		// 		"Valid business account",
		// 		"BVN and ID of business owners",
		// 		"Must meet Carbon's KYC requirements",
		// 	],
		// 	payment:
		// 		"Carbon pays the full purchase amount upfront; business repays in instalments.",
		// 	repayment:
		// 		"Instalments are collected as scheduled at the time of purchase.",
		// 	feesInterest:
		// 		"Zero fees and zero interest if repayment is made on time. Late repayment attracts penalties and may be reported to credit bureaus.",
		// 	conditions: [
		// 		"Repayment account must have adequate funds.",
		// 		"Carbon may reject or delay a transaction if fraud or irregular activity is suspected.",
		// 	],
		// },

		
		{
			id: "stellas",
			name: "Stellas Microfinance Bank",
			logo: stellas,
			description:
				"Business Loans & Financing - Stellas provides flexible loan facilities for qualified businesses with transaction history on Obana.africa.",
			eligibility: [
				"Business must maintain an account with Stellas",
				"At least 3 months transaction history with Obana.africa",
				"Clean credit record and must meet Stellas' internal credit checks",
			],
			payment:
				"Loan is disbursed directly to the business for product purchases.",
			repayment: "Business repays according to the agreed loan schedule.",
			feesInterest: "Interest-based loan, with terms varying by loan facility.",
			conditions: [
				"Stellas reserves the right to cancel the loan if obligations are not met.",
				"Non-repayment negatively affects the company's credit profile and limits future borrowing.",
			],
		},
	];

	const toggleExpand = (id: string) => {
		setExpandedPartner(expandedPartner === id ? null : id);
	};

	return (
		<section className="container mx-auto px-4 py-10 md:pt-2">
			<div className="text-center mb-12 md:mb-14 items-center flex flex-col">
				<h2
					className="text-primary text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
				>
					Our Financing Partners
				</h2>
				<Seperator />
				<p
					className="mt-3 text-[#222] text-sm md:text-base max-w-2xl mx-auto"
				>
					We collaborate with trusted financial institutions to provide you with
					the best inventory financing options
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
				{features.map((feature, index) => (
					<div
						key={index}
						className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 md:p-5 border border-secondary-light hover:border-primary/20"
					>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 mt-1">
								<div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
									<Check className="h-5 w-5 text-primary" />
								</div>
							</div>
							<div className="flex-1">
								<h3 className="text-sm md:text-base font-semibold text-primary group-hover:text-secondary-dark transition-colors duration-300">
									{feature.title}
								</h3>
								<p className="text-xs md:text-sm text-[#666] mt-1 leading-relaxed">
									{feature.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="max-w-4xl mx-auto">
				<h3 className="text-lg md:text-xl font-bold text-primary text-center mb-8">
					Our Partner Institutions
				</h3>

				<div className="gap-4 grid grid-cols-1 md:grid-cols-2 ">
					{partnersData.map((partner) => (
						<div
							key={partner.id}
							className="group bg-white rounded-xl shadow-sm border border-secondary-light overflow-hidden hover:shadow-md transition-all duration-300"
						>
							<button
								onClick={() => toggleExpand(partner.id)}
								className="w-full p-5 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
							>
								<div className="flex items-center gap-4 md:gap-6 flex-1 text-left">
									<div className="flex-shrink-0 bg-white rounded-lg p-2 border border-secondary-light">
										<div className="relative w-32 h-16 md:w-40 md:h-20">
											<Image
												src={partner.logo}
												alt={`${partner.name} logo`}
												fill
												className="object-contain"
											/>
										</div>
									</div>

									<div className="flex-1">
										<h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-secondary-dark transition-colors duration-300">
											{partner.name}
										</h3>
										<div className="flex items-center gap-2 mt-2">
											<div className="w-2 h-2 rounded-full bg-green-500" />
											<span className="text-xs md:text-sm text-green-600 font-medium">
												Verified Partner
											</span>
										</div>
									</div>
								</div>

								<div className="flex-shrink-0">
									<ChevronDown
										className={`h-5 w-5 text-primary transition-transform duration-300 ${
											expandedPartner === partner.id
												? "transform rotate-180"
												: ""
										}`}
									/>
								</div>
							</button>

							{expandedPartner === partner.id && (
								<div className="border-t border-secondary-light bg-gradient-to-br from-gray-50 to-white p-5 md:p-6 space-y-4">
									<div>
										<h4 className="text-sm font-semibold text-primary mb-2">
											About
										</h4>
										<p className="text-sm md:text-base text-[#555] leading-relaxed">
											{partner.description}
										</p>
									</div>

									<div className="bg-white rounded-lg p-4 border border-primary/10">
										<h4 className="text-sm font-semibold text-primary mb-3">
											Eligibility Requirements
										</h4>
										<ul className="space-y-2">
											{partner.eligibility.map((item, idx) => (
												<li
													key={idx}
													className="flex items-start gap-2 text-xs md:text-sm text-[#666]"
												>
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>

									<div className="bg-white rounded-lg p-4 border border-primary/10 space-y-3">
										<div>
											<p className="text-xs md:text-sm font-semibold text-primary mb-1">
												Payment
											</p>
											<p className="text-xs md:text-sm text-[#666]">
												{partner.payment}
											</p>
										</div>
										<div>
											<p className="text-xs md:text-sm font-semibold text-primary mb-1">
												Repayment
											</p>
											<p className="text-xs md:text-sm text-[#666]">
												{partner.repayment}
											</p>
										</div>
										<div>
											<p className="text-xs md:text-sm font-semibold text-primary mb-1">
												Fees & Interest
											</p>
											<p className="text-xs md:text-sm text-[#666]">
												{partner.feesInterest}
											</p>
										</div>
									</div>

									<div className="bg-white rounded-lg p-4 border border-primary/10">
										<div className="flex items-start gap-3">
											<AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
											<div className="text-xs md:text-sm text-[#666]">
												<p className="font-semibold text-primary mb-2">
													Important Terms & Conditions
												</p>
												<ul className="space-y-1.5">
													{partner.conditions.map((condition, idx) => (
														<li key={idx}>• {condition}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default InventoryPartners;
