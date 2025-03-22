import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import FoundersJourney from "./sections/founders-journey";

const Page = () => {
	return (
		<div className=" min-h-screen">
			<main>
				<Breadcrumb
					heading="About Us"
					subheading="We are an technology infrastructure enabling SMEs in the fashion, beauty and lifestyle industries across sub saharan africa scale their business."
				/>
				<FoundersJourney />
			</main>
		</div>
	);
};

export default Page;
