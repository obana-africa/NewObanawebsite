"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

// Dynamically import our components to avoid SSR issues
const ContactForm = dynamic(() => import("../components/contact-form"), {
	ssr: false,
});

interface ContactFormWithMapProps {
	defaultZoom?: number;
	address?: string;
	primary?: string;
	secondary?: string;
}

const SPECIFIC_MAP_URL = process.env.GOOGLE_MAPS_URL;

const ContactFormWithMap: React.FC<ContactFormWithMapProps> = ({
	primary = "bg-primary",
}) => {
	// Initialize AOS
	useEffect(() => {
		AOS.init({
			duration: 800,
			once: true,
		});
	}, []);

	return (
		<div className="container mx-auto px-4 py-12 overflow-hidden">
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-1/2" data-aos="fade-right" data-aos-delay="100">
					<ContactForm primary={primary} />
				</div>

				<div className="lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
					<div className="w-full px-4 md:px-6 lg:px-8 py-4 shadow-md rounded-lg h-full md:h-96 lg:h-full ">
						<div className="relative rounded-2xl overflow-hidden shadow-lg">
							<div className="md:hidden">
								<iframe
									title="Mobile Contact Map"
									width="100%"
									height="300"
									className="block"
									style={{ border: 0 }}
									src={SPECIFIC_MAP_URL}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>

							<div className="hidden md:block">
								<iframe
									title="Desktop Contact Map"
									width="100%"
									height="690px"
									className="block"
									style={{ border: 0 }}
									src={SPECIFIC_MAP_URL}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactFormWithMap;
