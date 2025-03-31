"use client";

import Breadcrumb from "@/components/external/components/breadcrumb";
import React from "react";
import HowLogisticsWork from "./components/how-logistics-works";
import ShipmentRequestForm from "./components/shipment-request-form";

const Page = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<main>
				<Breadcrumb
					heading="Logistics"
					subheading="We aggregate end to end logistics solution to ensure timely and cost effective services, helping our customers minimize logistic cost."
				/>
				<HowLogisticsWork />
				<ShipmentRequestForm />
			</main>
		</div>
	);
};

export default Page;
