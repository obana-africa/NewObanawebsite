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
				{/* <ContactInfo/> */}
				<ContactInfo
					whatsappNumber="+234 809 653 5511"
					email="contact@obana.africa"
					address="77 opebi road, ikeja lagos"
					iconBgColor="bg-primary"
				/>
				<ContactFormWithMap
					googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
					address="77 opebi road, ikeja, lagos"
					defaultLocation={{ lat: 6.601838, lng: 3.351486 }}
				/>
			</main>
		</div>
	);
};

export default Page;
