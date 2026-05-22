"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logoWhite from "@/app/assets/images/logos/obana-logo-white.svg";
import Button from "@/components/ui/button";

interface Props {
	onSubmitDeal?: () => void;
}

const SourcingHeader: React.FC<Props> = ({ onSubmitDeal }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setIsOpen(false);
	};

	const handleSubmit = () => {
		onSubmitDeal?.();
		setIsOpen(false);
	};

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				isScrolled ? "shadow-lg" : ""
			}`}
			style={{ background: "#1B3B5F" }}
		>
			<div className="container mx-auto px-6 md:px-10">
				<div className="flex items-center justify-between py-4">
					<Link href="/" className="flex items-center">
						<div className="relative h-10 w-28">
							<Image
								src={logoWhite}
								alt="Obana Logo"
								width={120}
								height={50}
								priority
								className="object-contain"
							/>
						</div>
					</Link>

					<nav className="hidden md:flex items-center gap-10">
						<button
							onClick={() => scrollToSection("categories")}
							className="text-white/90 hover:text-white text-sm font-medium transition-colors"
						>
							Categories
						</button>
						<button
							onClick={() => scrollToSection("how-it-works")}
							className="text-white/90 hover:text-white text-sm font-medium transition-colors"
						>
							How it works
						</button>
						<Button
							onClick={handleSubmit}
							variant="primary"
							animation="ripple"
							className=" !text-[#1B3B5F] !bg-[#ECEDF0] font-bold !hover:bg-[#FFDE76]"
							// href="/contact"
						>
							Submit a Deal
						</Button>
					</nav>

					<button
						className="md:hidden text-white focus:outline-none"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
						type="button"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{isOpen && (
					<div className="md:hidden pb-6 space-y-3 border-t border-white/10 pt-4">
						<button
							onClick={() => scrollToSection("categories")}
							className="block w-full text-left text-white/90 hover:text-white py-2 font-medium"
						>
							Categories
						</button>
						<button
							onClick={() => scrollToSection("how-it-works")}
							className="block w-full text-left text-white/90 hover:text-white py-2 font-medium"
						>
							How it works
						</button>
						<button
							onClick={handleSubmit}
							className="w-full mt-2 px-5 py-2.5 bg-white text-[#1B3B5F] font-semibold rounded-lg"
						>
							Submit a Deal
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default SourcingHeader;
