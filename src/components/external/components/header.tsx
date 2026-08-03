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
	const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
	const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

	const { openGetStartedModal } = useModal();
	const pathname = usePathname();

	const solutionsDropdownRef = useRef<HTMLDivElement>(null);
	const productsDropdownRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = (): void => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsOpen(false);
		setActiveDropdown(null);
		setActiveMobileDropdown(null);
		setActiveMobileSubmenu(null);
	}, [pathname]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target as Node)) {
				if (activeDropdown === "solutions") setActiveDropdown(null);
			}
			if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
				if (activeDropdown === "products") setActiveDropdown(null);
			}
			if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, activeDropdown]);

	const toggleMenu = (): void => {
		setIsOpen(!isOpen);
		if (isOpen) {
			setActiveMobileDropdown(null);
			setActiveMobileSubmenu(null);
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
		const next = activeMobileDropdown === dropdown ? null : dropdown;
		setActiveMobileDropdown(next);
		// Collapsing a section should also collapse whatever was open inside it.
		if (!next) setActiveMobileSubmenu(null);
	};

	const toggleMobileSubmenu = (submenu: string): void => {
		setActiveMobileSubmenu(activeMobileSubmenu === submenu ? null : submenu);
	};


	/* Marketplace offerings — shared by the desktop mega menu and the mobile
	   "Solutions › Marketplace" submodule so the two cannot drift apart. */
	const marketplaceItems = [
		{
		title: "Buy in Bulk",
				description: "Explore our Buy in Bulk deals and grow your hustle the easy way.",
				href: "https://shop.obana.africa/",
			},
					
			{
						title: "Custom Sourcing",
						description: "Can't find what you're looking for? Tell us — we'll source it for you.",
						href: "http://obana.africa/custom-sourcing",
			},
			{
				title: "Order Now, Pay Small Small (ONPSS)",
				description: "Now you can — thanks to Obana's Order Now, Pay Small Small feature.",
				href: "/obana-pss",
			},
			{
				title: "Sell on Obana.Africa",
				description: "You can now join us and start selling to thousands of verified SMEs across Africa",
				href: "https://vendor.obana.africa/",
			},
			
			{
				title: "Request Shipment",
				description: "From market to your doorstep — we'll make it happen",
				href: "/logistics",
			},
	];

	/* Second Solutions submodule — an external product, so it is a plain link
	   rather than a list of offerings. */
	const WEBSHOP_POS_URL = "https://thaja.africa";

	const megaMenuItems = {
		solutions: marketplaceItems,
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
					isScrolled ? "bg-white shadow-md" : "bg-white"
				}`}
			>
				<div className="container mx-auto px-6 md:px-10 py- md:py-">
					<div className="flex items-center justify-between py-2">
						<div className="shrink-0 pb-4">
							<Link href="/" className="flex items-center">
								<div className="relative h-12 w-30">
									<Image src={logoImage} alt="Obana Logo" width={140} height={60} priority />
								</div>
							</Link>
						</div>

						<nav className="hidden lg:flex items-center space-x-8">
							<Link href="/#our-impact" className="text-[#464545] font-semibold">
								Our Impact
							</Link>

							{/* Solutions Mega Menu (unchanged) */}
							<div className="relative" ref={solutionsDropdownRef}>
								<button
									className="flex items-center text-[#464545] font-semibold"
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
										<div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
											{megaMenuItems.solutions.map((item, idx) => (
  <Link
    key={idx}
    href={item.href || "#"}
    className="p-6 rounded-lg hover:bg-primary transition-colors group"
  >
    <h3 className="font-semibold text-primary mb-2 group-hover:text-white text-lg">
      {item.title}
    </h3>
    <p className="text-sm text-primary mb-3 group-hover:text-white">
      {item.description}
    </p>
    <span className="text-sm flex items-center font-medium text-primary group-hover:text-white">
      Click here <ArrowRight className="ml-1 h-3 w-3" />
    </span>
  </Link>
))}
										</div>
									</div>
								</div>
							</div>
							<Link href="/about" className="text-[#464545] font-semibold">
								About us
							</Link>

							{/* FAQ – standalone link */}
							<Link href="/faqs" className="text-[#464545] font-semibold">
								FAQs
							</Link>

							<Link href="http://blog.obana.africa" className="text-[#464545] font-semibold">
							     Blog
							</Link>
							
								
						</nav>

						<div className="hidden md:flex items-center space-x-4">
							<Button
								variant="primary"
								animation="ripple"
								className=" !text-[#1B3B5F] !bg-[#ECEDF0] font-bold"
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
								Explore Ecosystem
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
							<Image src={logoImage} alt="Obana Logo" width={100} height={40} priority />
						</div>
						<button className="text-gray-800 focus:outline-none" onClick={toggleMenu} aria-label="Close menu">
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

						{/* Mobile Solutions dropdown — two submodules: Marketplace
						    (expands to the offerings) and Webshop/POS (external). */}
						<div className="border-b border-primary-light">
							<button
								className="flex items-center justify-between w-full py-3 text-gray-800"
								onClick={() => toggleMobileDropdown("solutions")}
								type="button"
								aria-expanded={activeMobileDropdown === "solutions"}
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
										? "max-h-[800px] opacity-100"
										: "max-h-0 opacity-0 overflow-hidden"
								}`}
							>
								{/* Submodule 1 — Marketplace */}
								<button
									className="flex items-center justify-between w-full py-2 text-gray-800 font-medium"
									onClick={() => toggleMobileSubmenu("marketplace")}
									type="button"
									aria-expanded={activeMobileSubmenu === "marketplace"}
								>
									<span>Marketplace</span>
									{activeMobileSubmenu === "marketplace" ? (
										<ChevronUp className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</button>
								<div
									className={`ml-4 transition-all duration-300 ${
										activeMobileSubmenu === "marketplace"
											? "max-h-[600px] opacity-100"
											: "max-h-0 opacity-0 overflow-hidden"
									}`}
								>
									{marketplaceItems.map((item, idx) => (
										<Link
											key={idx}
											href={item.href || "#"}
											className="block py-2 text-gray-700 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
										>
											{item.title}
										</Link>
									))}
								</div>

								{/* Submodule 2 — Webshop/POS */}
								<Link
									href={WEBSHOP_POS_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="block py-2 text-gray-800 font-medium hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
								>
									Webshop/POS
								</Link>
							</div>
						</div>

						{/* Mobile FAQ link */}
						<Link
							href="/faqs"
							className="py-3 border-b border-primary-light text-gray-800 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
						>
							FAQ
						</Link>

						{/* Mobile blog link */}
						<Link
							href="http://blog.obana.africa"
							className="py-3 border-b border-primary-light text-gray-800 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
						>
							Blog
						</Link>
						<Link
							href="/#our-impact"
							className="py-3 border-b border-primary-light text-gray-800 hover:bg-primary hover:text-white hover:pl-2 transition-all duration-200"
						>
							Our Impact
						</Link>

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

