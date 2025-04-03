"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/button";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import { useModal } from "@/contexts/modal-context";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [serviceDropdownOpen, setServiceDropdownOpen] =
		useState<boolean>(false);
	const { openGetStartedModal } = useModal();
	const pathname = usePathname();

	// References for click outside detection
	const serviceDropdownRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = (): void => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsOpen(false);
		setServiceDropdownOpen(false);
	}, [pathname]);

	// Handler for clicks outside dropdown and mobile menu
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			// Close service dropdown if clicked outside
			if (
				serviceDropdownRef.current &&
				!serviceDropdownRef.current.contains(event.target as Node)
			) {
				setServiceDropdownOpen(false);
			}

			// Close mobile menu if clicked outside
			if (
				isOpen &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// const toggleMenu = (): void => {
	// 	setIsOpen(!isOpen);
	// };

	const toggleMenu = (): void => {
		setIsOpen(!isOpen);
		if (isOpen) {
			setServiceDropdownOpen(false);
		}
	};

	const toggleServiceDropdown = (): void => {
		setServiceDropdownOpen(!serviceDropdownOpen);
	};

	const handleGetStarted = (): void => {
		console.log("OPEN MODAL");
		openGetStartedModal();
		setIsOpen(false);
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
					isScrolled ? "bg-white shadow-md" : "bg-white"
				}`}
			>
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex items-center justify-between py-4 ">
						<div className="flex-shrink-0 ">
							<Link href="/" className="flex items-center ">
								<div className="relative h-10 w-28 ">
									<Image
										src={logoImage}
										alt="Obana Logo"
										width={100}
										height={40}
										priority
									/>
								</div>
							</Link>
						</div>

						<nav className="hidden lg:flex items-center space-x-12  ">
							<Link
								href="/"
								className="text-gray-800 hover:text-blue-900 font-medium"
							>
								Home
							</Link>
							<Link
								href="/about"
								className="text-gray-800 hover:text-blue-900 font-medium"
							>
								About Us
							</Link>

							<div className="relative" ref={serviceDropdownRef}>
								<button
									className="flex items-center text-gray-800 hover:text-blue-900 font-medium"
									onClick={toggleServiceDropdown}
									type="button"
									aria-expanded={serviceDropdownOpen}
									aria-haspopup="true"
								>
									Our Services
									{serviceDropdownOpen ? (
										<ChevronUp className="ml-1 h-4 w-4" />
									) : (
										<ChevronDown className="ml-1 h-4 w-4" />
									)}
								</button>

								<div
									className={`absolute top-[200%] -left-12 mt-2 bg-white shadow-lg rounded-md py-2 w-64 px-2 transform transition-all duration-300 origin-top ${
										serviceDropdownOpen
											? "opacity-100 scale-y-100"
											: "opacity-0 scale-y-0 pointer-events-none"
									}`}
								>
									<Link
										href="https://shop.obana.africa"
										className="block px-4 py-2 text-gray-800 hover:bg-blue-50 font-light hover:bg-primary hover:text-white hover:font-semibold"
									>
										Product Sourcing
									</Link>
									<Link
										href="#"
										className="block px-4 py-2 text-gray-800 hover:bg-blue-50 font-light hover:bg-primary hover:text-white hover:font-semibold"
									>
										Logistics
									</Link>
									<Link
										href="/inventory"
										className="block px-4 py-2 text-gray-800 hover:bg-blue-50 font-light hover:bg-primary hover:text-white hover:font-semibold"
									>
										Inventory Financing
									</Link>
									<Link
										href="https://salesforce.obana.africa/"
										className="block px-4 py-2 text-gray-800 hover:bg-blue-50 font-light hover:bg-primary hover:text-white hover:font-semibold"
									>
										Sales Partners
									</Link>
								</div>
							</div>
							<Link
								href="/rfq"
								className="text-gray-800 hover:text-blue-900 font-medium"
							>
								RFQ
							</Link>

							<Link
								href="https://blog.obana.africa"
								className="text-gray-800 hover:text-blue-900 font-medium"
							>
								Blog
							</Link>
							<Link
								href="/faqs"
								className="text-gray-800 hover:text-blue-900 font-medium"
							>
								FAQ
							</Link>
						</nav>

						<div className="hidden md:flex items-center space-x-4">
							<Button
								variant="primary"
								animation="ripple"
								className="bg-secondary !text-primary "
								href="/contact"
							>
								Contact Us
							</Button>
							<Button
								onClick={handleGetStarted}
								variant="primary"
								animation="ripple"
								className="border border-primary "
							>
								Get Started
							</Button>
						</div>

						<button
							className="lg:hidden text-gray-800 focus:outline-none"
							onClick={toggleMenu}
							aria-label="Toggle menu"
							type="button"
						>
							<Menu className="h-6 w-6" />
						</button>
					</div>
				</div>

				<div
					ref={menuRef}
					className={`fixed top-0 -left-1 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
					aria-hidden={!isOpen}
				>
					<div className="p-4 flex justify-between items-center ">
						<div className="relative h-8 w-24">
							<Image
								src={logoImage}
								alt="Obana Logo"
								width={100}
								height={40}
								priority
							/>
						</div>
						<button
							className="text-gray-800 focus:outline-none"
							onClick={toggleMenu}
							aria-label="Close menu"
						>
							<X className="h-6 w-6" />
						</button>
					</div>

					<nav className="flex flex-col p-4 ">
						{[
							{ href: "/", label: "Home", delay: "delay-[100ms]" },
							{ href: "/about", label: "About Us", delay: "delay-[100ms]" },
							{ isDropdown: true, delay: "delay-[100ms]" },
							{
								href: "https://blog.obana.africa",
								label: "Blog",
								delay: "delay-[100ms]",
							},
							{ href: "/faqs", label: "FAQ", delay: "delay-[100ms]" },
							{ href: "/rfq", label: "RFQ", delay: "delay-[100ms]" },
							{ href: "/contact", label: "Contact Us", delay: "delay-[100ms]" },
						].map((item, index) =>
							item.isDropdown ? (
								<div
									key={`dropdown-${index}`}
									className={`${isOpen ? "animate-fadeIn " + item.delay : ""}`}
								>
									<button
										className="flex items-center justify-between w-full py-3 text-gray-800 border-b border-primary-light "
										onClick={toggleServiceDropdown}
										type="button"
										aria-expanded={serviceDropdownOpen}
									>
										<span>Our Services</span>
										{serviceDropdownOpen ? (
											<ChevronUp className="h-4 w-4" />
										) : (
											<ChevronDown className="h-4 w-4" />
										)}
									</button>

									<div
										className={`ml-4 mt-1 mb-2 transition-all duration-300  border-b border-primary-light ${
											serviceDropdownOpen
												? "max-h-40 opacity-100"
												: "max-h-0 opacity-0 overflow-hidden"
										}`}
									>
										{[
											{
												href: "https://shop.obana.africa",
												label: "Product Sourcing",
											},
											{ href: "#", label: "Logistics" },
											{
												href: "/inventory",
												label: "Inventory Financing",
											},
											{
												href: "https://salesforce.obana.africa/",
												label: "Sales Partners",
											},
										].map((service, idx) => (
											<Link
												key={`service-${idx}`}
												href={service.href}
												className="block py-2 text-gray-700 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
											>
												{service.label}
											</Link>
										))}
									</div>
								</div>
							) : (
								<Link
									key={`link-${index}`}
									href={item.href || "#"}
									className={`py-3 border-b border-primary-light text-gray-800 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200 ${
										isOpen ? "animate-fadeIn " + item.delay : ""
									}`}
								>
									{item.label}
								</Link>
							)
						)}

						<Button
							onClick={handleGetStarted}
							className={`mt-4 bg-blue-900 text-white px-4 py-2 rounded-md text-center transform transition-all duration-300 ${
								isOpen ? "animate-fadeIn delay-[700ms]" : "opacity-0"
							}`}
						>
							Get Started
						</Button>
					</nav>
				</div>

				{isOpen && (
					<div
						className="fixed inset-0 bg-primary/80 bg-opacity-10 md:hidden z-40"
						onClick={toggleMenu}
						aria-hidden="true"
					></div>
				)}
			</header>
			{/* <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} /> */}
		</>
	);
};

export default Header;
