"use client";

import React from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";

interface ContactInfoProps {
	whatsappNumber?: string;
	email?: string;
	address?: string;
	bgColor?: string;
	textColor?: string;
	iconBgColor?: string;
	iconColor?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
	whatsappNumber = "+2348096535511",
	email = "contact@obana.africa",
	address = "77 oebi road, ikeja lagos",
	bgColor = "bg-secondary",
	textColor = "text-primary",
	iconBgColor = "bg-primary",
	iconColor = "text-white",
}) => {
	const handleWhatsAppClick = () => {
		window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`, "_blank");
	};

	const handleEmailClick = () => {
		window.open(`mailto:${email}`, "_blank");
	};

	const handleAddressClick = () => {
		window.open(
			`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
				address
			)}`,
			"_blank"
		);
	};

	return (
		<section className="container mx-auto mt-10 md:py-12">
			<div className={`${bgColor} py-4 md:py-12 md:px-4 w-[70%] md:w-[85%] mx-auto mt-20 md:mt-12`}>
				<div className="container mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8 md:mx-24 md:mt-16">
						<div
							className="flex flex-col items-center text-center md:-mt-40 "
							data-aos="fade-up"
							data-aos-delay="100"
						>
							<div
								className={`${iconBgColor} p-4 rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform`}
								onClick={handleWhatsAppClick}
							>
								<MessageCircle className={`size-8 ${iconColor}`} />
							</div>
							<h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
								WhatsApp No.
							</h3>
							<p className={`text-primary-dark`}>{whatsappNumber}</p>
						</div>

						<div
							className="flex flex-col items-center text-center md:-mt-40 "
							data-aos="fade-up"
							data-aos-delay="200"
						>
							<div
								className={`${iconBgColor} p-4 rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform`}
								onClick={handleEmailClick}
							>
								<Mail className={`size-8 ${iconColor}`} />
							</div>
							<h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
								Email Support
							</h3>
							<p className={`text-primary-dark`}>{email}</p>
						</div>

						<div
							className="flex flex-col items-center text-center md:-mt-40 "
							data-aos="fade-up"
							data-aos-delay="300"
						>
							<div
								className={`${iconBgColor} p-4 rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform`}
								onClick={handleAddressClick}
							>
								<MapPin className={`size-8 ${iconColor}`} />
							</div>
							<h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
								Office Address
							</h3>
							<p className={`text-primary-dark`}>{address}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactInfo;
