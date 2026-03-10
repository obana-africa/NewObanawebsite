"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import HowRfqWorks from "./components/how-rfq-works";
import ProductionOnlyForm from "./components/production-only-form";

const Page = () => {
	return (
		<div className="min-h-screen overflow-x-hidden" id="rfq-page">
			<main>
				<Breadcrumb
					heading="RFQ (Request for quote)"
					subheading="Get accurate pricing tailored to your production needs with our seamless quote request process for Fashion & Beauty SMEs."
				/>
				<HowRfqWorks />
				<ProductionOnlyForm />
			</main>
		</div>
	);
};

export default Page;
