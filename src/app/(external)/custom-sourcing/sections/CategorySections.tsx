"use client";

import React from "react";
import { SourcingCategory } from "@/types";
import { useSourcingCategories } from "@/hooks/use-sourcing";

interface Props {
	onCategoryClick: (category: SourcingCategory) => void;
}

const CategorySections: React.FC<Props> = ({ onCategoryClick }) => {
	const { data, isLoading, isError } = useSourcingCategories();

	return (
		<section
			className="pt-0 pb-6 md:pt-0 md:pb-16 px-4 sm:px-6 md:px-10 bg-white"
			id="categories"
		>
			<div className="container mx-auto max-w-7xl">
				{/* <div className="text-center mb-8 md:mb-10">
					
				</div> */}

				{isLoading && (
					<div className="space-y-6">
						{[1, 2].map((i) => (
							<div key={i} className="animate-pulse">
								<div className="h-10 bg-gray-100 rounded-t-xl" />
								<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 bg-gray-50 rounded-b-xl">
									{[1, 2, 3, 4].map((j) => (
										<div key={j} className="h-32 bg-gray-200 rounded-lg" />
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{isError && (
					<div className="text-center py-10 text-red-600">
						Failed to load categories. Please refresh.
					</div>
				)}

				{data?.grouped?.map((section) => (
					<div
						key={section.section}
						className="mb-6 rounded-2xl overflow-hidden"
					>
						<div
							className="text-center py-3 font-bold text-[#1B3B5F] text-lg md:text-2xl"
							style={{
								background: section.section_color || "#DCF8F9",
								fontFamily: "'Bricolage Grotesque', sans-serif",
							}}
						>
							{section.section}
						</div>
						<div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 p-3 md:p-4 bg-white">
							{section.items.map((cat) => (
								<button
									key={cat.id}
									onClick={() => onCategoryClick(cat)}
									className="group relative h-[100px] sm:h-36 md:h-[150px] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
									style={{
										backgroundColor: "#1B3B5F",
										backgroundImage: cat.image_url
											? `url(${cat.image_url})`
											: undefined,
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
									}}
								>
									<div className="absolute inset-0 bg-[#1B3B5F]/55 group-hover:bg-[#1B3B5F]/40 transition-colors" />
									<div className="absolute inset-0 flex items-center justify-center">
										<span
											className="text-white text-base sm:text-lg md:text-xl font-bold"
											style={{
												fontFamily: "'Bricolage Grotesque', sans-serif",
											}}
										>
											{cat.name}
										</span>
									</div>
								</button>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default CategorySections;
