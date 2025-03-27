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
				<ContactFormWithMap />
			</main>
		</div>
	);
};

export default Page;

{
	/* <iframe
	src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15853.89503380595!2d3.352339207490718!3d6.587882111058755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b926a7242ffff%3A0xe642357dcd25af85!2sICON%20WHOLESALE%20-%20BUY%20FASHION%20WHOLESALE!5e0!3m2!1sen!2sng!4v1743088549210!5m2!1sen!2sng"
	width="600"
	height="450"
	style="border:0;"
	allowfullscreen=""
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
></iframe>; */
}
