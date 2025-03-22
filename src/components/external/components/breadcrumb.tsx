"use client";

import React from "react";
import square from "@/app/assets/images/landing-page/square.svg";
import Image from "next/image";

interface BreadcrumbProps {
	heading: string;
	subheading: string;
	bgColor?: string;
	textColor?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
	heading,
	subheading,
	bgColor = "bg-primary",
	textColor = "text-white",
}) => {
	return (
		<section
			className={`${bgColor} ${textColor}  relative top-12 pt-20 pb-16  h-full overflow-hidden`}
		>
			<div
				className="absolute top-[50px] right-[800px] w-[150px] h-[50px] opacity-50 blur-[40px] bg-white rounded-full"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			></div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="w-full md:w-[60%]">
					<h2 className="mb-4 hidden md:block">{heading}</h2>
					<h1 className="mb-4  md:hidden">{heading}</h1>
					<p className="mb-0 text-md 2xl:text-lg md:w-[50ch]">{subheading}</p>
				</div>
			</div>

			<div className="absolute  w-32 h-32  opacity-20 blur-[50px] rounded-full"></div>
			<div className="absolute bottom-10 right-0 rotate-180 bg-white/10 rounded-lg">
				<Image src={square} alt="Decorative square" width={150} height={300} />
			</div>
		</section>
	);
};

export default Breadcrumb;
