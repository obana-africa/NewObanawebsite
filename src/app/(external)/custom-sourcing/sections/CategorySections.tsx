"use client";

import React, { useState, useEffect } from "react";
import { SourcingCategory, SourcingSection } from "@/types";
import { useSourcingCategories } from "@/hooks/use-sourcing";

interface SectionProps {
  section: SourcingSection;
  onCategoryClick: (cat: SourcingCategory) => void;
}

const Section: React.FC<SectionProps> = ({ section, onCategoryClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const visibleCount = isDesktop ? 6 : 4;
  const hasMore = section.items.length > visibleCount;
  const visibleItems = expanded
    ? section.items
    : section.items.slice(0, visibleCount);

  return (
    <div className="mb-6 rounded-2xl overflow-hidden">
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
        {visibleItems.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat)}
            className="group relative h-[100px] sm:h-36 md:h-[150px] rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
            style={{
              backgroundColor: "#1B3B5F",
              backgroundImage: cat.image_url ? `url(${cat.image_url})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-[#1B3B5F]/55 group-hover:bg-[#1B3B5F]/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-white text-base sm:text-lg md:text-xl font-bold"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {cat.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pb-4 bg-white">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-[#1B3B5F] font-semibold text-sm md:text-base hover:underline flex items-center gap-1"
          >
            {expanded
              ? "Show less ▲"
              : `Show ${section.items.length - visibleCount} more ▼`}
          </button>
        </div>
      )}
    </div>
  );
};
interface Props {
	onCategoryClick: (category: SourcingCategory) => void;
}

const CategorySections: React.FC<Props> = ({ onCategoryClick }) => {
	const { data, isLoading, isError } = useSourcingCategories();

	return (
		<section
			className="px-4 sm:px-6 md:px-10 bg-white"
			id="categories"
		>
			<div className="container mx-auto w-[1450px]">
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
 				 <Section
    				key={section.section}
    				section={section}
   					 onCategoryClick={onCategoryClick}
  						/>
					))}

				{/* {data?.grouped?.map((section) => (
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
				))} */}
			</div>
		</section>
	);
};

export default CategorySections;
