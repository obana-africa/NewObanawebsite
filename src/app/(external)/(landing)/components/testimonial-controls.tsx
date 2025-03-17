import React from "react";

interface TestimonialControlsProps {
	onPrev: () => void;
	onNext: () => void;
	isAnimating: boolean;
}

const TestimonialControls: React.FC<TestimonialControlsProps> = ({
	onPrev,
	onNext,
	isAnimating,
}) => {
	return (
		<div className="flex justify-center mt-4">
			<button
				onClick={onPrev}
				disabled={isAnimating}
				className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				onClick={onNext}
				disabled={isAnimating}
				className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>
	);
};

export default TestimonialControls;
