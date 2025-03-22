import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import FoundersJourney from "./sections/founders-journey";
import Vision from "./sections/vision-mission";
import CoreValues from "./sections/core-values";
import { coreValues } from "./data/core-values";
import SellingPoint from "./sections/selling-point";

const Page = () => {
	return (
		<div className=" min-h-screen">
			<main>
				<Breadcrumb
					heading="About Us"
					subheading="We are an technology infrastructure enabling SMEs in the fashion, beauty and lifestyle industries across sub saharan africa scale their business."
				/>
				<FoundersJourney />
				<Vision />
				<CoreValues coreValues={coreValues}/>
				<SellingPoint/>
			</main>
		</div>
	);
};

export default Page;
