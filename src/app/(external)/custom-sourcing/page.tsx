"use client";

import React, { useState } from "react";
import SourcingHeader from "@/components/external/components/sourcing-header";
import CustomSourcingHero from "./sections/CustomSourcingHero";
import CategorySections from "./sections/CategorySections";
import DealSubmissionModal from "./components/DealSubmissionModal";
import type { SourcingCategory } from "@/types";
// import HowItWorks from "./sections/HowItWorks";
import WhySourceWithObana from "./sections/WhySourceWithObana";

export default function CustomSourcingPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [initialCategory, setInitialCategory] =
		useState<SourcingCategory | null>(null);

	const handleCategoryClick = (cat: SourcingCategory) => {
		setInitialCategory(cat);
		setIsModalOpen(true);
	};

	const handleSubmitDeal = () => {
		setInitialCategory(null);
		setIsModalOpen(true);
	};

	const handleBrowseCategories = () => {
		document
			.getElementById("categories")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-white">
			<SourcingHeader onSubmitDeal={handleSubmitDeal} />

			<CustomSourcingHero
				onSubmitDeal={handleSubmitDeal}
				onBrowseCategories={handleBrowseCategories}
			/>
			{/* <HowItWorks /> */}

			<CategorySections onCategoryClick={handleCategoryClick} />
			<WhySourceWithObana />
			<DealSubmissionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				initialCategory={initialCategory}
			/>
		</div>
	);
}
