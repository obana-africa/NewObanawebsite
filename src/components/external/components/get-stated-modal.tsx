"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsRight, X } from "lucide-react";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import Button from "@/components/ui/button";

interface GetStartedModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({
	isOpen,
	onClose,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [activeDescription, setActiveDescription] = useState<string | null>(
		null
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleDescriptionToggle = (description: string) => {
		setActiveDescription((prevDesc) =>
			prevDesc === description ? null : description
		);
	};

	const navigateTo = (url: string) => {
		window.open(url, "_blank");
		onClose();
	};

	const descriptions = {
		vendor:
			"Do you create fashion, beauty, or lifestyle products and sell in bulk to wholesalers, retailers, or businesses, we've got the perfect logistics solution for you!",
		customer:
			"Do you own or run a business selling fashion, beauty, or lifestyle products—whether in small or large quantities—we've got you covered!",
		partner:
			"Do you facilitate transactions by connecting buyers with sellers—whether through referrals, networking, or direct sales—we make it easier for you to succeed!",
	};

	const urls = {
		vendor: "https://vendor.obana.africa/",
		customer: "https://shop.obana.africa/login",
		partner: "https://salesforce.obana.africa/",
	};

	return (
		<div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white w-full max-w-[700px] mx-4 rounded-lg shadow-lg overflow-hidden h-[600px]"
			>
				<div className="flex justify-end p-4">
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>

				<div className="flex-1 p-6 flex flex-col items-center space-y-8">
					<div className="flex flex-col items-center justify-center gap-4">
						<Image src={logoImage} alt="Logo" width={120} height={40} />
						<p>
							Obana | Sub-Sahara Africa&apos;s Sourcing Marketplace Platform.
						</p>
					</div>

					<div className="w-full flex flex-col items-center space-y-6">
						{/* Vendor Option */}
						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 w-full transition-all duration-300 ${
									activeDescription === "vendor"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: "max-w-[350px]"
								}`}
							>
								{activeDescription === "vendor" ? (
									<>
										<div className="bg-blue-100 text-sm rounded-lg text-start p-3 mb-4 text-gray-800">
											{descriptions.vendor}
										</div>
										<Button
											onClick={() => navigateTo(urls.vendor)}
											variant="primary"
											animation="ripple"
											icon={<ChevronsRight />}
											iconPosition="right"
											className="rounded-sm w-full !bg-[#3D6188] py-2"
										>
											Continue As A Vendor
										</Button>
									</>
								) : (
									<Button
										onClick={() => handleDescriptionToggle("vendor")}
										variant="primary"
										animation="ripple"
										icon={<ChevronsRight />}
										iconPosition="right"
										className="rounded-sm w-full transition-all duration-300 border-primary py-2"
									>
										Continue As A Vendor
									</Button>
								)}
							</div>
						</div>

						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 w-full transition-all duration-300 ${
									activeDescription === "customer"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: "max-w-[350px]"
								}`}
							>
								{activeDescription === "customer" ? (
									<>
										<div className="bg-blue-100 text-sm rounded-lg text-start p-3 mb-4 text-gray-800">
											{descriptions.customer}
										</div>
										<Button
											onClick={() => navigateTo(urls.customer)}
											variant="primary"
											animation="ripple"
											icon={<ChevronsRight />}
											iconPosition="right"
											className="rounded-sm w-full !bg-[#3D6188] py-2"
										>
											Continue As A Customer
										</Button>
									</>
								) : (
									<Button
										onClick={() => handleDescriptionToggle("customer")}
										variant="primary"
										animation="ripple"
										icon={<ChevronsRight />}
										iconPosition="right"
										className="rounded-sm w-full transition-all duration-300 border-primary py-2"
									>
										Continue As A Customer
									</Button>
								)}
							</div>
						</div>

						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 w-full transition-all duration-300 ${
									activeDescription === "partner"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: "max-w-[350px]"
								}`}
							>
								{activeDescription === "partner" ? (
									<>
										<div className="bg-blue-100 text-sm rounded-lg text-start p-3 mb-4 text-gray-800">
											{descriptions.partner}
										</div>
										<Button
											onClick={() => navigateTo(urls.partner)}
											variant="primary"
											animation="ripple"
											icon={<ChevronsRight />}
											iconPosition="right"
											className="rounded-sm w-full !bg-[#3D6188] py-2"
										>
											Continue As A Sales Partner
										</Button>
									</>
								) : (
									<Button
										onClick={() => handleDescriptionToggle("partner")}
										variant="primary"
										animation="ripple"
										icon={<ChevronsRight />}
										iconPosition="right"
										className="rounded-sm w-full transition-all duration-300 border-primary py-2"
									>
										Continue As A Sales Partner
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStartedModal;
