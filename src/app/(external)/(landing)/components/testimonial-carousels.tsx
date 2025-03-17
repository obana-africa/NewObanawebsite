import React from "react";
import { getTestimonialPositions } from "../utils/testimonialUtils";
import TestimonialCard from "./testimonial-card";

interface DesktopCarouselProps {
	currentIndex: number;
}

export const DesktopCarousel: React.FC<DesktopCarouselProps> = ({
	currentIndex,
}) => {
	const positions = getTestimonialPositions(currentIndex, 5);

	return (
		<div className="relative w-full h-full select-none">
			{positions.map((pos) => (
				<div
					key={pos.index}
					className="absolute top-1/2 left-1/2 transition-all duration-500 ease-in-out"
					style={{
						transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${pos.scale}) rotate(${pos.rotation}deg)`,
						zIndex: pos.zIndex,
						opacity: pos.opacity,
					}}
				>
					<TestimonialCard index={pos.index} isCurrent={pos.isCurrent} />
				</div>
			))}
		</div>
	);
};

interface MobileCarouselProps {
	currentIndex: number;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
	currentIndex,
}) => {
	return (
		<div className="mx-auto flex items-center justify-center relative">
			<TestimonialCard index={currentIndex} isCurrent={true} />
		</div>
	);
};

export default MobileCarousel;
