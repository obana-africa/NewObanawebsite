"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import { useModal } from "@/contexts/modal-context";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [activeMobileDropdown, setActiveMobileDropdown] = useState<
		string | null
	>(null);
	const [activeMobileSubDropdown, setActiveMobileSubDropdown] = useState<
		string | null
	>(null);

	const { openGetStartedModal } = useModal();
	const pathname = usePathname();

	const sourcingDropdownRef = useRef<HTMLDivElement>(null);
	const solutionsDropdownRef = useRef<HTMLDivElement>(null);
	const resourcesDropdownRef = useRef<HTMLDivElement>(null);
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
		setActiveDropdown(null);
		setActiveMobileDropdown(null);
		setActiveMobileSubDropdown(null);
	}, [pathname]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				sourcingDropdownRef.current &&
				!sourcingDropdownRef.current.contains(event.target as Node)
			) {
				if (activeDropdown === "sourcing") setActiveDropdown(null);
			}

			if (
				solutionsDropdownRef.current &&
				!solutionsDropdownRef.current.contains(event.target as Node)
			) {
				if (activeDropdown === "solutions") setActiveDropdown(null);
			}

			if (
				resourcesDropdownRef.current &&
				!resourcesDropdownRef.current.contains(event.target as Node)
			) {
				if (activeDropdown === "resources") setActiveDropdown(null);
			}

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
	}, [isOpen, activeDropdown]);

	const toggleMenu = (): void => {
		setIsOpen(!isOpen);
		if (isOpen) {
			setActiveMobileDropdown(null);
			setActiveMobileSubDropdown(null);
		}
	};

	const handleGetStarted = (): void => {
		openGetStartedModal();
		setIsOpen(false);
	};

	const toggleDesktopDropdown = (dropdown: string): void => {
		setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
	};

	const toggleMobileDropdown = (dropdown: string): void => {
		setActiveMobileDropdown(
			activeMobileDropdown === dropdown ? null : dropdown
		);
		if (activeMobileDropdown !== dropdown) {
			setActiveMobileSubDropdown(null);
		}
	};

	const toggleMobileSubDropdown = (subDropdown: string): void => {
		setActiveMobileSubDropdown(
			activeMobileSubDropdown === subDropdown ? null : subDropdown
		);
	};

	const megaMenuItems = {
		sourcing: [
			{
				title: "Circular Sourcing",
				description: "Want to see how sustainable trade works at Obana?",
				href: "https://shop.obana.africa/categories/Men",
			},
			{
				title: "African Inspired Sourcing",
				description:
					"See how Obana.Africa connects culture and commerce through African-inspired Sourcing, made by local hands.",
				href: "https://shop.obana.africa/categories/Beauty",
			},
		],
		solutions: [
			{
				title: "Buy in Bulk",
				description:
					"Explore our Buy in Bulk deals and grow your hustle the easy way.",
				hasSubMenu: true,
				subItems: [
					{
						title: "Browse Products",
						description:
							"Explore our Buy in Bulk deals and grow your hustle the easy way.",
						href: "https://shop.obana.africa/",
					},
					{
						title: "Custom Sourcing",
						description:
							"Can't find what you're looking for? Tell us — we'll source it for you.",
						href: "/rfq",
					},
				],
			},
			{
				title: "Order Now, Pay Small Small (ONPSS)",
				description:
					"Now you can — thanks to Obana's Order Now, Pay Small Small feature.",
				href: "/inventory",
			},
			{
				title: "Sell on Obana.Africa",
				description:
					"You can now join us and start selling to thousands of verified SMEs across Africa",
				href: "https://vendor.obana.africa/",
			},
			{
				title: "Earn as a Salespartner",
				description:
					"Your next side hustle might just start here — ready to earn as an Obana.Africa Sales Partner?",
				href: "https://salesforce.obana.africa/",
			},
			{
				title: "Request Shipment",
				description: "From market to your doorstep — we'll make it happen",
				href: "/logistics",
			},
		],
		resources: [
			{
				title: "Blog",
				description: "Read our latest articles and insights",
				href: "https://blog.obana.africa",
			},
			{
				title: "FAQ",
				description: "Find answers to commonly asked questions",
				href: "/faqs",
			},
		],
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
					isScrolled ? "bg-white shadow-md" : "bg-white"
				}`}
			>
				<div className="container mx-auto px-4 md:px-6">
					<div className="flex items-center justify-between py-4">
						<div className="flex-shrink-0">
							<Link href="/" className="flex items-center">
								<div className="relative h-10 w-28">
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

						<nav className="hidden lg:flex items-center space-x-8">
							<Link href="/" className="text-primary font-medium">
								Home
							</Link>

							<div className="relative" ref={sourcingDropdownRef}>
								<button
									className="flex items-center text-primary font-medium"
									onClick={() => toggleDesktopDropdown("sourcing")}
									onMouseEnter={() => setActiveDropdown("sourcing")}
									type="button"
									aria-expanded={activeDropdown === "sourcing"}
									aria-haspopup="true"
								>
									Sourcing
									<ChevronDown className="ml-1 h-4 w-4" />
								</button>

								<div
									className={`fixed top-[72px] left-0 right-0 bg-white shadow-xl border-t border-secondary-light transform transition-all duration-300 origin-top ${
										activeDropdown === "sourcing"
											? "opacity-100 scale-y-100 visible"
											: "opacity-0 scale-y-95 invisible"
									}`}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<div className="container mx-auto px-4 md:px-6 py-8">
										<div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
											{megaMenuItems.sourcing.map((item, idx) => (
												<Link
													key={idx}
													href={item.href}
													className="p-6 rounded-lg hover:bg-primary transition-colors group 	"
												>
													<h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-900 text-lg  text-primary group-hover:text-primary-light">
														{item.title}
													</h3>
													<p className="text-sm text-gray-600 mb-3  text-primary group-hover:text-primary-light">
														{item.description}
													</p>
													<span className="text-sm text-blue-900 flex items-center font-medium  text-primary group-hover:text-primary-light">
														Click here <ArrowRight className="ml-1 h-3 w-3" />
													</span>
												</Link>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Solutions Mega Menu */}
							<div className="relative" ref={solutionsDropdownRef}>
								<button
									className="flex items-center text-primary  font-medium"
									onClick={() => toggleDesktopDropdown("solutions")}
									onMouseEnter={() => setActiveDropdown("solutions")}
									type="button"
									aria-expanded={activeDropdown === "solutions"}
									aria-haspopup="true"
								>
									Solutions
									<ChevronDown className="ml-1 h-4 w-4" />
								</button>

								<div
									className={`fixed top-[72px] left-0 right-0 bg-white shadow-xl border-t border-secondary-light transform transition-all duration-300 origin-top ${
										activeDropdown === "solutions"
											? "opacity-100 scale-y-100 visible"
											: "opacity-0 scale-y-95 invisible"
									}`}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<div className="container mx-auto px-4 md:px-6 py-8">
										<div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
											{megaMenuItems.solutions.map((item, idx) => (
												<div key={idx}>
													{item.hasSubMenu && item.subItems ? (
														<div className="p-6 rounded-lg hover:bg-primary transition-colors group">
															<h3 className="font-semibold text-primary group-hover:text-primary-light mb-4 text-lg">
																{item.title}
															</h3>
															<div className="space-y-4">
																{item.subItems.map((subItem, subIdx) => (
																	<Link
																		key={subIdx}
																		href={subItem.href}
																		className="block pl-4 border-l-2 border-transparent hover:border-primary-light"
																	>
																		<h4 className="font-medium text-primary group-hover:text-primary-light text-sm mb-1">
																			{subItem.title}
																		</h4>
																		<p className="text-xs text-primary group-hover:text-primary-light">
																			{subItem.description}
																		</p>
																		<span className="text-sm flex items-center font-medium text-primary group-hover:text-primary-light ">
																			Click here
																			<ArrowRight className="ml-1 h-3 w-3" />
																		</span>
																	</Link>
																))}
															</div>
														</div>
													) : (
														<Link
															href={item.href || "#"}
															className="p-6 rounded-lg hover:bg-gray-50 transition-colors group hover:bg-primary block"
														>
															<h3 className="font-semibold text-primary mb-2 group-hover:text-primary-light text-lg">
																{item.title}
															</h3>
															<p className="text-sm  text-primary mb-3 group-hover:text-primary-light">
																{item.description}
															</p>
															<span className="text-sm flex items-center font-medium text-primary group-hover:text-primary-light">
																Click here{" "}
																<ArrowRight className="ml-1 h-3 w-3" />
															</span>
														</Link>
													)}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Resources Mega Menu */}
							<div className="relative" ref={resourcesDropdownRef}>
								<button
									className="flex items-center  text-primary  font-medium"
									onClick={() => toggleDesktopDropdown("resources")}
									onMouseEnter={() => setActiveDropdown("resources")}
									type="button"
									aria-expanded={activeDropdown === "resources"}
									aria-haspopup="true"
								>
									Resources
									<ChevronDown className="ml-1 h-4 w-4" />
								</button>

								<div
									className={`fixed top-[72px] left-0 right-0 bg-white shadow-xl border-t border-secondary-light transform transition-all duration-300 origin-top ${
										activeDropdown === "resources"
											? "opacity-100 scale-y-100 visible"
											: "opacity-0 scale-y-95 invisible"
									}`}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<div className="container mx-auto px-4 md:px-6 py-8">
										<div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
											{megaMenuItems.resources.map((item, idx) => (
												<Link
													key={idx}
													href={item.href}
													className="p-6 rounded-lg hover:bg-gray-50 transition-colors group  text-primary group-hover:text-primary-light hover:bg-primary"
												>
													<h3 className="font-semibold text-primary mb-2 group-hover:text-primary-light text-lg">
														{item.title}
													</h3>
													<p className="text-sm  text-primary mb-3 group-hover:text-primary-light	">
														{item.description}
													</p>
													<span className="text-sm  text-primary group-hover:text-primary-light flex items-center font-medium">
														Click here <ArrowRight className="ml-1 h-3 w-3" />
													</span>
												</Link>
											))}
										</div>
									</div>
								</div>
							</div>
						</nav>

						<div className="hidden md:flex items-center space-x-4">
							<Button
								variant="primary"
								animation="ripple"
								className="bg-secondary !text-primary"
								href="/contact"
							>
								Contact Us
							</Button>
							<Button
								onClick={handleGetStarted}
								variant="primary"
								animation="ripple"
								className="border border-primary"
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

				{/* Mobile Menu */}
				<div
					ref={menuRef}
					className={`fixed top-0 -left-1 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
					aria-hidden={!isOpen}
				>
					<div className="p-4 flex justify-between items-center">
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

					<nav className="flex flex-col p-4">
						<Link
							href="/"
							className="py-3 border-b border-primary-light text-gray-800 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
						>
							Home
						</Link>

						{/* Mobile Sourcing Dropdown */}
						<div className="border-b border-primary-light">
							<button
								className="flex items-center justify-between w-full py-3 text-gray-800"
								onClick={() => toggleMobileDropdown("sourcing")}
								type="button"
							>
								<span>Sourcing</span>
								{activeMobileDropdown === "sourcing" ? (
									<ChevronUp className="h-4 w-4" />
								) : (
									<ChevronDown className="h-4 w-4" />
								)}
							</button>
							<div
								className={`ml-4 mb-2 transition-all duration-300 ${
									activeMobileDropdown === "sourcing"
										? "max-h-96 opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}
							>
								{megaMenuItems.sourcing.map((item, idx) => (
									<Link
										key={idx}
										href={item.href}
										className="block py-2 text-gray-700 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
									>
										{item.title}
									</Link>
								))}
							</div>
						</div>

						{/* Mobile Solutions Dropdown */}
						<div className="border-b border-primary-light">
							<button
								className="flex items-center justify-between w-full py-3 text-gray-800"
								onClick={() => toggleMobileDropdown("solutions")}
								type="button"
							>
								<span>Solutions</span>
								{activeMobileDropdown === "solutions" ? (
									<ChevronUp className="h-4 w-4" />
								) : (
									<ChevronDown className="h-4 w-4" />
								)}
							</button>
							<div
								className={`ml-4 mb-2 transition-all duration-300 ${
									activeMobileDropdown === "solutions"
										? "max-h-[600px] opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}
							>
								{megaMenuItems.solutions.map((item, idx) => (
									<div key={idx}>
										{item.hasSubMenu && item.subItems ? (
											<div className="border-b border-gray-200 last:border-b-0">
												<button
													className="flex items-center justify-between w-full py-2 text-gray-700"
													onClick={() => toggleMobileSubDropdown("buyInBulk")}
													type="button"
												>
													<span>{item.title}</span>
													{activeMobileSubDropdown === "buyInBulk" ? (
														<ChevronUp className="h-3 w-3" />
													) : (
														<ChevronDown className="h-3 w-3" />
													)}
												</button>
												<div
													className={`ml-4 transition-all duration-300 ${
														activeMobileSubDropdown === "buyInBulk"
															? "max-h-96 opacity-100 mb-2"
															: "max-h-0 opacity-0 overflow-hidden"
													}`}
												>
													{item.subItems.map((subItem, subIdx) => (
														<Link
															key={subIdx}
															href={subItem.href}
															className="block py-2 text-sm text-gray-600 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
														>
															{subItem.title}
														</Link>
													))}
												</div>
											</div>
										) : (
											<Link
												href={item.href || "#"}
												className="block py-2 text-gray-700 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
											>
												{item.title}
											</Link>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Mobile Resources Dropdown */}
						<div className="border-b border-primary-light">
							<button
								className="flex items-center justify-between w-full py-3 text-gray-800"
								onClick={() => toggleMobileDropdown("resources")}
								type="button"
							>
								<span>Resources</span>
								{activeMobileDropdown === "resources" ? (
									<ChevronUp className="h-4 w-4" />
								) : (
									<ChevronDown className="h-4 w-4" />
								)}
							</button>
							<div
								className={`ml-4 mb-2 transition-all duration-300 ${
									activeMobileDropdown === "resources"
										? "max-h-96 opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}
							>
								{megaMenuItems.resources.map((item, idx) => (
									<Link
										key={idx}
										href={item.href}
										className="block py-2 text-gray-700 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
									>
										{item.title}
									</Link>
								))}
							</div>
						</div>

						<Button
							onClick={handleGetStarted}
							className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-md text-center"
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
		</>
	);
};

export default Header;