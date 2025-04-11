import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
	content: string;
	children?: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
}

export const Tooltip: React.FC<TooltipProps> = ({
	content,
	children,
	side = "right",
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node)
			) {
				setIsVisible(false);
			}
		};

		if (isVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isVisible]);

	const positionClasses = {
		top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
		right: "left-full top-[-20%] transform -translate-y-1/2 ml-2",
		bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
		left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
	};

	return (
		<div className="relative inline-flex">
			<div
				ref={triggerRef}
				className="inline-flex items-center"
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onClick={() => setIsVisible(!isVisible)}
			>
				{children || <Info className="w-4 h-4 text-gray-400 cursor-pointer" />}
			</div>

			{isVisible && (
				<div
					ref={tooltipRef}
					className={`absolute z-50 min-w-24 max-w-full p-2 text-sm text-white bg-primary-dark/90 rounded-md shadow-lg ${positionClasses[side]}`}
				>
					{content}
					<div
						className={`absolute w-2 h-2 bg-primary-dark transform rotate-45 ${
							side === "top"
								? "bottom-[-2px] left-1/2 -translate-x-1/2"
								: side === "right"
								? "left-[-2px] top-1/2 -translate-y-1/2"
								: side === "bottom"
								? "top-[-2px] left-1/2 -translate-x-1/2"
								: "right-[-2px] top-1/2 -translate-y-1/2"
						}`}
					/>
				</div>
			)}
		</div>
	);
};
