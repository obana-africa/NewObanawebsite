"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "../components/contact-form";

interface ContactFormWithMapProps {
	address?: string;
}


const mapUrlFor = (address: string) =>
	process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
	`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

const ContactFormWithMap: React.FC<ContactFormWithMapProps> = ({
	address = "77 Opebi Road, Ikeja Lagos",
}) => {
	useEffect(() => {
		AOS.init({ duration: 800, once: true });
	}, []);

	const mapUrl = mapUrlFor(address);

	return (
		<section className="container mx-auto px-4 md:px-8 lg:px-12 pb-16">
			<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
				<div data-aos="fade-right" data-aos-delay="100">
					<ContactForm />
				</div>

				<div data-aos="fade-left" data-aos-delay="200">
					<div className="overflow-hidden rounded-2xl shadow-lg">
						<iframe
							title={`Map showing ${address}`}
							src={mapUrl}
							className="block w-full h-64 md:h-96 lg:h-[600px] border-0"
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactFormWithMap;
