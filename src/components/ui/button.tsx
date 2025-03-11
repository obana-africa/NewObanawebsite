"use client";

import React, { useState, useRef } from "react";

type ButtonVariant = "primary" | "secondary" | "icon" | "text" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	fullWidth?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	children?: React.ReactNode;
	animation?: "none" | "ripple";
	href?: string; // Add href support
}

interface RippleState {
	x: number;
	y: number;
	size: number;
	active: boolean;
}

const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "md",
	isLoading = false,
	fullWidth = false,
	icon,
	iconPosition = "left",
	animation = "none",
	className = "",
	children,
	href,
	...props
}) => {
	const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
	const [ripple, setRipple] = useState<RippleState>({
		x: 0,
		y: 0,
		size: 0,
		active: false,
	});
	const [isHovering, setIsHovering] = useState(false);

	const baseClasses =
		"inline-flex items-center justify-center font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none rounded-md";

	const variantClasses: Record<ButtonVariant, string> = {
		primary: "bg-primary z-[1] relative overflow-hidden",
		secondary:
			"bg-[#404F681A] text-primary hover:bg-[#DCFBF9] hover:text-primary",
		icon: "bg-transparent p-2 rounded-full hover:bg-[#DCFBF9]",
		text: "bg-transparent text-primary hover:bg-[#DCFBF9]",
		outline:
			"border border-primary bg-transparent text-primary hover:bg-[#DCFBF9]",
	};

	const hoverTextColor =
		variant === "primary" && isHovering
			? "text-primary"
			: variant === "primary"
			? "text-white"
			: "";

	const sizeClasses: Record<ButtonSize, string> = {
		xs: "text-xs px-2 py-1 h-6",
		sm: "text-sm px-3 py-1 h-8",
		md: "text-base px-4 py-2 h-10",
		lg: "text-lg px-5 py-2 h-12",
		xl: "text-xl px-6 py-3 h-14",
	};

	const iconOnlyClasses = !children && icon ? "aspect-square p-0" : "";
	const widthClass = fullWidth ? "w-full" : "";
	const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${hoverTextColor}
    ${variant !== "icon" ? sizeClasses[size] : ""} 
    ${iconOnlyClasses}
    ${widthClass} 
    ${className}
  `;

	const iconSpacing = children ? "mr-2" : "";
	const rightIconSpacing = children ? "ml-2" : "";

	const handleMouseEnter = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		setIsHovering(true);
		if (animation !== "ripple" || variant !== "primary") return;

		const button = buttonRef.current;
		if (!button) return;

		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height) * 2;

		setRipple({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
			size,
			active: true,
		});
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
		setRipple((prev) => ({ ...prev, active: false }));
	};

	const content = (
		<>
			{animation === "ripple" && variant === "primary" && (
				<>
					<span
						className={`absolute block rounded-full bg-[#DCFBF9] text-primary transition-transform duration-700 ease-in-out ${
							ripple.active ? "scale-100" : "scale-0"
						}`}
						style={{
							top: ripple.y - ripple.size / 2,
							left: ripple.x - ripple.size / 2,
							width: ripple.size,
							height: ripple.size,
							opacity: ripple.active ? 1 : 0,
							pointerEvents: "none",
							zIndex: -1,
						}}
					/>

					<span
						className={`absolute inset-0 bg-[#DCFBF9] text-primary transition-opacity duration-500 ease-in-out ${
							isHovering ? "opacity-100" : "opacity-0"
						}`}
						style={{
							pointerEvents: "none",
							zIndex: -1,
						}}
					/>
				</>
			)}

			{isLoading && (
				<svg
					className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}

			{!isLoading && icon && iconPosition === "left" && (
				<span className={iconSpacing}>{icon}</span>
			)}
			{children}
			{!isLoading && icon && iconPosition === "right" && (
				<span className={rightIconSpacing}>{icon}</span>
			)}
		</>
	);

	if (href) {
		return (
			<a
				ref={buttonRef as React.Ref<HTMLAnchorElement>}
				href={href}
				className={buttonClasses}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{content}
			</a>
		);
	}

	return (
		<button
			ref={buttonRef}
			className={buttonClasses}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			{content}
		</button>
	);
};

export default Button;
