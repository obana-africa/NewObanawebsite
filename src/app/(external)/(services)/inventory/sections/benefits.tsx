import React from "react";
import Seperator from "@/components/external/components/seperator";
import { CoreValuesProps } from "@/app/(external)/(landing)/types";
import InventoryBox from "@/components/external/components/inventory-box";

const InventoryBenefits: React.FC<CoreValuesProps> = ({
	title = "Benefits of Our Inventory Financing",
	inventoryBenefits = [],
}) => {
	return (
		<div className="w-full relative py-4 px-2 overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<div
					className="mb-8 flex items-start mx-auto justify-center flex-col max-w-full sm:w-full z-20"
					data-aos="fade-up"
					data-aos-delay="100"
				>
					<h2 className="text-primary hidden sm:block">{title}</h2>
					<h1 className="text-primary block sm:hidden">{title}</h1>
					<Seperator />
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-10 place-content-center">
					{inventoryBenefits.map((value, index) => (
						<InventoryBox
							key={index}
							title={value.title}
							description={value.description}
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

export default InventoryBenefits;
