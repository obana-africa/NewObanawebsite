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

const Footer = () => {
	const serviceLinks = [
		{ title: "Inventory Financing", href: "/inventory-financing" },
		{ title: "Logistics Support", href: "/logistics-support" },
		{ title: "Request for a quote", href: "/request-quote" },
		{ title: "Sign up as a Vendor", href: "/vendor-signup" },
		{ title: "Join our Sales Team", href: "/join-sales" },
	];

	const companyLinks = [
		{ title: "About Us", href: "/about" },
		{ title: "Contact Us", href: "/contact" },
		{ title: "FAQs", href: "/faqs" },
	];

	const socialLinks = [
		{ icon: <Facebook size={20} />, href: "https://facebook.com" },
		{ icon: <Instagram size={20} />, href: "https://instagram.com" },
		{ icon: <Twitter size={20} />, href: "https://twitter.com" },
		{ icon: <Linkedin size={20} />, href: "https://linkedin.com" },
		{ icon: <Youtube size={20} />, href: "https://youtube.com" },
	];

	const policyLinks = [
		{ title: "Terms & Conditions", href: "/terms" },
		{ title: "Privacy Policy", href: "/privacy" },
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
					<div className="md:grid md:grid-cols-4 md:gap-8">
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
								<h3 className="text-lg font-medium mb-4">Our Services</h3>
								<ul className="space-y-2 text-sm">
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
								<h3 className="text-lg font-medium mb-4">Company</h3>
								<ul className="space-y-2">
									{companyLinks.map((link, index) => (
										<li key={index}>
											<Link
												href={link.href}
												className="text-sm hover:underline"
											>
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">Our Services</h3>
							<ul className="space-y-2">
								{serviceLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className="text-sm hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="hidden md:block">
							<h3 className="text-lg font-medium mb-4">Company</h3>
							<ul className="space-y-2">
								{companyLinks.map((link, index) => (
									<li key={index}>
										<Link href={link.href} className="text-sm hover:underline">
											{link.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="mt-8 md:mt-0">
							<h3 className="text-lg font-medium mb-4">Newsletter</h3>
							<p className="mb-4 text-sm">
								Subscribe to our weekly Newsletter and receive updates via
								email.
							</p>
							<div className="flex bg-white rounded-2xl">
								<input
									type="email"
									placeholder="Enter your mail here..."
									className="px-4 py-2 w-full rounded-l-full text-primary-dark focus:outline-none text-sm"
								/>
								<button
									type="submit"
									className="bg-primary cursor-pointer text-white px-3 py-2 rounded-r-full border border-white flex items-center justify-center"
								>
									<SendHorizonal className="h-5 w-5 transform -rotate-45" />
								</button>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-600 my-8"></div>

					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm mb-4 md:mb-0">
							Copyright ©ObanaAfrica. All Right Reserved.
						</p>
						<div className="flex gap-4 text-sm">
							{policyLinks.map((link, index) => (
								<Link key={index} href={link.href} className="hover:underline">
									{link.title}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
