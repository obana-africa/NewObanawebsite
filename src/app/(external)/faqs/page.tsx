"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import FAQComponent from "./components/faq-component";

const Page = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<main>
				<Breadcrumb
					heading="FAQs"
					subheading="Find answers to common inquiries about our services, processes, and policies. We’re here to ensure a seamless experience for you!"
				/>
				<FAQComponent/>
			</main>
		</div>
	);
};

export default Page;
