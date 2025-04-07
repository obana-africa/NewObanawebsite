"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import HowRfqWorks from "./components/how-rfq-works";
import QuoteRequestForm from "./components/quote-request-form";

const Page = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<main>
				<Breadcrumb
					heading="RFQ (Request for quote)"
					subheading="Get accurate pricing tailored to your needs with our seamless quote request process, ensuring cost-effective and efficient solutions for you."
				/>
				<HowRfqWorks />
				<QuoteRequestForm/>
			</main>
		</div>
	);
};

export default Page;
