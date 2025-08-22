"use client";
import React from "react";
import Slider from "react-slick";
import {
	TrendingUp,
	Home,
	Leaf,
	ShoppingBag,
	Network,
	BarChart2,
} from "lucide-react";
import Seperator from "@/components/external/components/seperator";
import { impactSlickSettings } from "@/lib/slick";

const impactData = [
	{
		id: 1,
		icon: Home,
		title: "Sales Partners",
		count: "900+",
		description: "individuals empowered to earn from home",
		subtitle:
			"We enable people to sell products and earn commissions within their communities — driving inclusive commerce.",
		color: "from-primary to-secondary",
		bgColor: "bg-primary",
	},
	{
		id: 2,
		icon: Leaf,
		title: "Reducing Carbon Footprint",
		count: "120,000+",
		description: "EOL products collected and repurposed",
		subtitle:
			"We extend product lifecycles and reduce landfill waste by turning discarded items into valuable goods.",
		color: "from-primary to-accent",
		bgColor: "bg-primary",
	},
	{
		id: 3,
		icon: ShoppingBag,
		title: "Units of Impact",
		count: "250,000+",
		description: "items sold across Sub-Saharan Africa",
		subtitle:
			"Revamped products are sold affordably, promoting access, sustainability, and economic growth.",
		color: "from-primary to-accent",
		bgColor: "bg-primary",
	},
	{
		id: 4,
		icon: Network,
		title: "Vendor Visibility",
		count: "100+",
		description: "vendors connected to new markets",
		subtitle:
			"We help brands and sellers showcase their products across borders, increasing reach and revenue.",
		color: "from-primary to-accent",
		bgColor: "bg-primary",
	},
	{
		id: 5,
		icon: BarChart2,
		title: "Customer Sourcing",
		count: "250+",
		description: "data points used to match products with demand",
		subtitle:
			"We leverage insights to connect the right products to the right people, improving sell-through and satisfaction.",
		color: "from-primary to-accent",
		bgColor: "bg-primary",
	},
];

const ImpactCarousel = () => {
	return (
		<div className="w-full py-10 px-2 bg-white relative overflow-hidden">
			<div className="absolute top-10 left-10 w-32 h-32 bg-blue-50 rounded-full blur-xl"></div>
			<div className="absolute bottom-10 right-10 w-40 h-40 bg-green-50 rounded-full blur-xl"></div>

			<div className="container mx-auto px-4 md:px-6 relative z-10">
				<div className="mb-12 flex items-center justify-center flex-col text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
						Transforming Commerce Across Africa
					</h2>
					<Seperator />
					<p className="text-lg text-gray-600 max-w-3xl mt-4">
						Discover how we&apos;re making a meaningful difference in
						communities, environment, and economic growth
					</p>
				</div>

				<div className="max-w-7xl mx-auto ">
					<Slider {...impactSlickSettings} className="impact-carousel">
						{impactData.map((impact) => {
							const IconComponent = impact.icon;
							return (
								<div
									key={impact.id}
									className="px-3 focus:outline-none h-full "
								>
									<div className="group md:min-h-[400px]  2xl:min-h-[350px] h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
										<div className="p-6 flex-1 flex flex-col">
											<div className="flex justify-end mb-4">
												<div
													className={`p-3 rounded-lg ${impact.bgColor}  transition-colors duration-300`}
												>
													<IconComponent
														className={`w-6 h-6 bg-gradient-to-r text-white `}
													/>
												</div>
											</div>

											<div className="flex-1 flex flex-col">
												<h3 className="text-xl font-bold text-gray-900 mb-3">
													{impact.title}
												</h3>

												<div className="flex items-baseline gap-2 mb-3">
													<span
														className={`text-3xl font-bold bg-gradient-to-r ${impact.color} bg-error bg-clip-text text-transparent`}
													>
														{impact.count}
													</span>
													<TrendingUp className="w-5 h-5 text-green-500" />
												</div>

												<p className="text-gray-600 font-medium mb-4">
													{impact.description}
												</p>

												<div className="mt-auto pt-4 border-t border-gray-100">
													<p className="text-gray-500 leading-relaxed">
														{impact.subtitle}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default ImpactCarousel;