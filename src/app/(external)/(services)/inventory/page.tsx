"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import InventoryOverview from "./sections/invetory-overview";
import InventoryWorks from "./sections/how-inventory-works";
import { inventoryBenefits } from "./data/inventory-steps";
import InventoryBenefits from "./sections/benefits";
import CtaSection from "@/components/external/components/cta-section";
import InventoryPartners from "./sections/inventory-partners";

const Page = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<main>
				{/* <Breadcrumb
					heading="Order Now & Pay Small Small (ONPSS)"
					subheading="Buy products for your business without paying upfront at very minimal or nothing."
				/> */}
				<InventoryOverview />
				<InventoryPartners />
				<InventoryWorks />
				<InventoryBenefits inventoryBenefits={inventoryBenefits} />
				<CtaSection
					topTitle="Who is eligible? "
					title="All customers duly registered on obana.africa and assigned to a sales partner is eligible, this is subject to concluding the kyc requirement of our partner banks/agencies. Ready to scale your business with inventory financing?"
					onButtonClick={() => console.log("Custom click handler")}
					containerClassName="container mx-auto px-4 pt-10 md:py-12 mb-6"
				/>
			</main>
		</div>
	);
};

export default Page;
