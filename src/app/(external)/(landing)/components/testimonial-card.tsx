import Image from "next/image";
import React from "react";
import { testimonials } from "../data/testimonials";

interface TestimonialCardProps {
	index: number;
	isCurrent: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
	index,
	isCurrent,
}) => {
	const testimonial = testimonials[index];

	return (
		<div className="flex flex-col items-center gap-2">
			<div
				className={`overflow-hidden rounded-lg shadow-lg ${
					isCurrent
						? "w-32 h-32 border-4 border-blue-500"
						: "w-24 h-24 border-2 border-gray-300"
				}`}
			>
				<Image
					src={testimonial.image}
					alt={testimonial.name}
					width={isCurrent ? 128 : 96}
					height={isCurrent ? 128 : 96}
					className="object-cover"
				/>
			</div>
			{isCurrent && (
				<div className="mt-4 text-center max-w-full md:max-w-[55ch] p-4">
					<h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
						{testimonial.name}
					</h3>
					<p className="text-gray-600 font-bold mb-4">{testimonial.role}</p>
					<p className="text-center text-sm text-gray-700 italic w-full">
						{testimonial.message}
					</p>
				</div>
			)}
		</div>
	);
};

export default TestimonialCard;
