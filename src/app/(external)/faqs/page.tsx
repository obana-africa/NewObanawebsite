"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import CtaSection from "@/components/external/components/cta-section";

const Page = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<main>
				<Breadcrumb
					heading="FAQs"
					subheading="Find answers to common inquiries about our services, processes, and policies. We’re here to ensure a seamless experience for you!"
				/>
				<CtaSection
					topTitle="Who is eligible? "
					title="All customers duly registered on obana.africa and assigned to a sales partner is eligible, this is subject to concluding the kyc requirement of our partner banks/agencies. Ready to scale your business with inventory financing?"
					onButtonClick={() => console.log("Custom click handler")}
					containerClassName="container mx-auto px-4 pt-10 md:py-12 mb-6"
				/>
			</main>
		</div>
	);
};

export default Page;
