"use client";

import React from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";

interface ContactInfoProps {
	whatsappNumber?: string;
	email?: string;
	address?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
	whatsappNumber = "+2348096535511",
	email = "contact@obana.africa",
	address = "77 Opebi Road, Ikeja Lagos",
}) => {
	const items = [
		{
			icon: MessageCircle,
			title: "Whatsapp No",
			value: whatsappNumber,
			href: `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
			external: true,
		},
		{
			icon: Mail,
			title: "Email Support",
			value: email,
			href: `mailto:${email}`,
			external: false,
		},
		{
			icon: MapPin,
			title: "Office Address",
			value: address,
			href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
				address
			)}`,
			external: true,
		},
	];

	return (
		<section className="bg-surface">
			<div className="container mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
				<div className="grid gap-10 md:grid-cols-3">
					{items.map((item, idx) => {
						const Icon = item.icon;

						return (
							<a
								key={item.title}
								href={item.href}
								target={item.external ? "_blank" : undefined}
								rel={item.external ? "noopener noreferrer" : undefined}
								className="group flex flex-col items-center text-center"
								data-aos="fade-up"
								data-aos-delay={(idx + 1) * 100}
							>
								<span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white transition-transform duration-200 group-hover:scale-105">
									<Icon className="h-6 w-6" />
								</span>
								<h3 className="text-lg font-bold text-navy mb-1">
									{item.title}
								</h3>
								<p className="text-md text-navy/80 group-hover:underline">
									{item.value}
								</p>
							</a>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ContactInfo;
