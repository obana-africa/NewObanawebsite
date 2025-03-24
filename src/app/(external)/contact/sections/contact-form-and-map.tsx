"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

// Dynamically import our components to avoid SSR issues
const ContactForm = dynamic(() => import("../components/contact-form"), {
	ssr: false,
});

const MapSection = dynamic(() => import("../components/map"), {
	ssr: false,
});

interface ContactFormWithMapProps {
	googleMapsApiKey: string;
	defaultLocation?: { lat: number; lng: number };
	defaultZoom?: number;
	address?: string;
	primary?: string;
	secondary?: string;
}

const ContactFormWithMap: React.FC<ContactFormWithMapProps> = ({
	googleMapsApiKey, 
	defaultLocation = { lat: 6.601838, lng: 3.351486 }, 
	defaultZoom = 16,
	address = "77 oebi road, ikeja, lagos",
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
					<MapSection
						googleMapsApiKey={googleMapsApiKey}
						defaultLocation={defaultLocation}
						defaultZoom={defaultZoom}
						address={address}
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactFormWithMap;
