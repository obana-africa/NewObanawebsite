import React from "react";
import Breadcrumb from "@/components/external/components/breadcrumb";
import clock from "@/app/assets/images/contact-page/clock.svg";
import ContactInfo from "./sections/contact-info";

const Page = () => {
	return (
		<div className=" min-h-screen">
			<main>
				<Breadcrumb
					heading="About Us"
					icon={clock}
					iconSubheading="Available 24/7 for emergency road service"
				/>
				{/* <ContactInfo/> */}
				<ContactInfo
					whatsappNumber="+234 809 653 5511"
					email="contact@obana.africa"
					address="77 oebi road, ikeja lagos"
					iconBgColor="bg-primary"
				/>
			</main>
		</div>
	);
};

export default Page;
