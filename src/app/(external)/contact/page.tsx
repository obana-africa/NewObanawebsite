import React from "react";
import Breadcrumb from "@/components/external/components/breadcrumb";
import clock from "@/app/assets/images/contact-page/clock.svg";
import ContactInfo from "./sections/contact-info";
import ContactFormWithMap from "./sections/contact-form-and-map";

const Page = () => {
	return (
		<div className=" min-h-screen ">
			<main>
				<Breadcrumb
					heading="Contact Us"
					icon={clock}
					iconSubheading="Available 24/7 for emergency road service"
				/>
				<ContactInfo
					whatsappNumber="+234 809 653 5511"
					email="contact@obana.africa"
					address="77 opebi road, ikeja lagos"
					iconBgColor="bg-primary"
				/>
				<ContactFormWithMap />
			</main>
		</div>
	);
};

export default Page;