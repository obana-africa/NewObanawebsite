import React from "react";
import rightIcon from "@/app/assets/images/landing-page/right-tag.svg";

export const stakeholders = [
	{
		label: "SMEs",
		rightIcon: rightIcon,
		description: (
			<p>
				Small businesses in the fashion, beauty and lifestyle sectors generating
				revenues of between 1m NGN to 50m NGN monthly, that need help with
				sourcing products both raw and finished materials required for their
				businesses, paying vendors and logistics.
			</p>
		),
	},
	{
		label: "Vendors",
		rightIcon: rightIcon,
		description: (
			<p>
				Brands, stocklots owners, raw materials required in the fashion and
				lifestyle business industry that are willing to sell to millions of smes
				in the sub Saharan Africa market that meet the criteria required by our
				customers - moqs, price point and flexibility in assortment selection
			</p>
		),
	},
	{
		label: "Sales partners",
		rightIcon: rightIcon,
		description: (
			<p>
				Millions of young people across Nigeria and subs Saharan African
				countries that want to make money while going about their normal day to
				day live, connecting smes to products and services they require to grow
				their business within their locality.
			</p>
		),
	},
	{
		label: "Ecosystem partners",
		rightIcon: rightIcon,
		description: (
			<>
				<p className="mb-3">
					<strong>1. Logistics partners:</strong> to ensure the product sourced
					by our customers have the right logistics, local know how, best price
					and transparency, are delivered to their door step to allow them focus
					on their core business]
				</p>
				<p className="mb-3">
					<strong>2. Payment gateway:</strong> allowing payment in local
					currency and settling vendor in their home currency real item to
					remove the hassle of exchange rates
				</p>
				<p>
					<strong>3. Inventory financing:</strong> ability to provide loans to
					pre-qualified customers to enable them purchase the right assortment
					for their business
				</p>
			</>
		),
	},
];
