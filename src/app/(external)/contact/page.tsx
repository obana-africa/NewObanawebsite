import React from "react";
import ContactHero from "./sections/contact-hero";
import ContactInfo from "./sections/contact-info";
import ContactFormWithMap from "./sections/contact-form-and-map";

const OFFICE_ADDRESS = "77 Opebi Road, Ikeja Lagos";

const Page = () => {
	return (
		<div className="min-h-screen bg-white">
			<main>
				<ContactHero />
				<ContactFormWithMap address={OFFICE_ADDRESS} />
				<ContactInfo
					whatsappNumber="+234 809 653 5511"
					email="contact@obana.africa"
					address={OFFICE_ADDRESS}
				/>
			</main>
		</div>
	);
};

export default Page;
