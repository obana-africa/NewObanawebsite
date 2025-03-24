import React from "react";
import Seperator from "@/components/external/components/seperator";
import { CoreValuesProps } from "../../(landing)/types";
import ValueBox from "@/components/external/components/value-box";

const CoreValues: React.FC<CoreValuesProps> = ({
	title = "Our Core Values",
	coreValues = [],
}) => {
	return (
		<div className="w-full relative py-4 px-2 overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<div
					className="mb-12 flex items-center mx-auto justify-center flex-col w-[33ch] max-w-full sm:w-full z-20"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					<h2 className="text-primary hidden sm:block">{title}</h2>
					<h1 className="text-primary block sm:hidden">{title}</h1>
					<Seperator />
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-2 md:gap-y-10">
					{coreValues.map((feature, index) => (
						<ValueBox
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							buttonText={feature.buttonText}
							href={feature.href}
							data-aos={index % 2 === 0 ? "fade-up" : "fade-up"}
							data-aos-delay={100 + index * 100}
							data-aos-duration="800"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoreValues;
