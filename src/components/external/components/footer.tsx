"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import {
	Facebook,
	Instagram,
	Twitter,
	Linkedin,
	Youtube,
	SendHorizonal,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/schemas";
import { EmailFormData } from "@/types";
import useNewsletter from "@/hooks/use-newsletter";

const Footer = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
	});

	const { subscribe } = useNewsletter();

	const onSubmit = (data: EmailFormData) => {
		subscribe(data.email);
		reset();
	};

	const serviceLinks = [
		{ title: "About Us", href: "/about" },
		{ title: "Blog", href: "https://blog.obana.africa" },
		{ title: "FAQs", href: "/faqs" },
		// { title: "Logistics Support", href: "/logistics" },
		// { title: "Inventory Financing", href: "/inventory" },
		// { title: "Logistics Support", href: "/logistics" },
		// { title: "Request for a quote", href: "/rfq" },
		// { title: "Sign up as a Vendor", href: "https://vendor.obana.africa/" },
		// { title: "Join our Sales Team", href: "https://salesforce.obana.africa/" },
	];
	const sourcingLinks = [
		{ title: "Circular Sourcing ", href: "#" },
		{ title: "African Inspired Sourcing", href: "#" },
		{ title: "Request for Sourcing", href: "#" },
	];

	const companyLinks = [
		{ title: "Request Shipment", href: "#" },
		{ title: "Order Now &Pay Small Small (ONPSS)", href: "#" },
		{ title: "Partner With Us", href: "#" },
	];
	const tradeLinks = [
		{ title: "Sell on Obana", href: "#" },
		{ title: "OrBuy in Bulk", href: "#" },
		{ title: "ParEarn as a Sales Partner", href: "#" },
	];

	const socialLinks = [
		{
			icon: <Facebook size={20} />,
			href: "https://web.facebook.com/obanaafrica",
		},
		{
			icon: <Instagram size={20} />,
			href: "https://www.instagram.com/obana.africa/",
		},
		{ icon: <Twitter size={20} />, href: "https://x.com/obana_africa" },
		{
			icon: <Linkedin size={20} />,
			href: "https://www.linkedin.com/company/obana-africa",
		},
		{
			icon: <Youtube size={20} />,
			href: "https://www.youtube.com/@Obana.africa",
		},
	];

	const policyLinks = [
		{ title: "Terms & Conditions", href: "" },
		{ title: "Privacy Policy", href: "" },
	];

	return (
		<footer className="bg-primary text-white pt-4 pb-4 md:pt-6 md:pb-6 relative overflow-hidden">
			<div
				className="absolute top-[151px] left-[804px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-white rounded-full hidden md:block"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			></div>

			<div className="container mx-auto px-4 md:px-6">
				<div className="px-4 py-10 max-w-7xl mx-auto">
					<div className="md:grid md:grid-cols-5 md:gap-8">
						<div className="flex flex-col items-center md:items-start">
							<div className="bg-white rounded-md p-2 mb-6 ">
								<Image
									src={logoImage}
									alt="Obana Logo"
									width={100}
									height={40}
								/>
							</div>
							<div className="flex gap-4">
								{socialLinks.map((social, index) => (
									<Link
										key={index}
										href={social.href}
										className="text-white hover:text-gray-300"
									>
										{social.icon}
									</Link>
								))}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4 mt-8 md:hidden">
							<div>
								<h3 className="text-lg font-medium mb-4">About Obana</h3>
								<ul className="space-y-2 ">
									{serviceLinks.map((link, index) => (
										<li key={index}>
											<Link href={link.href} className="hover:underline">
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-4">
									Partnership & Growth
								</h3>
								<ul className="space-y-2">
									{companyLinks.map((link, index) => (
										<li key={index}>
											<Link href={link.href} className=" hover:underline">
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">About Obana</h3>
							<ul className="space-y-2">
								{serviceLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className=" hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">Sourcing Solutions</h3>
							<ul className="space-y-2">
								{sourcingLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className=" hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">Partnership & Growth</h3>
							<ul className="space-y-2">
								{companyLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className=" hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">Start Trading</h3>
							<ul className="space-y-2">
								{tradeLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className=" hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-600 my-8"></div>

					<div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
						<div className="w-full md:w-[40%]">
							<p className=" mb-4 md:mb-0">
								Copyright © 2025 Obana.Africa (An ICON Tech & Ecom Services Ltd
								Trademark). All Rights Reserved.
							</p>
							<div className="flex gap-4 ">
								{policyLinks.map((link, index) => (
									<Link
										key={index}
										href={link.href}
										className="hover:underline"
									>
										{link.title}
									</Link>
								))}
							</div>
						</div>
						<div className=" md:mt-0 md:w-[30%]">
							<h3 className="text-lg font-medium mb-4">Stay Connected</h3>
							<p className="mb-4 ">
								Subscribe for updates on sourcing opportunities, vendor
								programs, and African market trends. 
							</p>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex bg-white rounded-2xl">
									<input
										type="email"
										placeholder="Enter your mail here..."
										className={`px-4 py-2 w-full rounded-s-full text-primary-dark focus:outline-none ${
											errors.email ? "border border-error" : ""
										}`}
										{...register("email")}
									/>
									<button
										type="submit"
										className="bg-primary cursor-pointer text-white px-3 py-2 rounded-r-full border border-white flex items-center justify-center"
									>
										<SendHorizonal className="h-5 w-5 transform -rotate-45" />
									</button>
								</div>
								{errors.email && (
									<p className="text-error text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
