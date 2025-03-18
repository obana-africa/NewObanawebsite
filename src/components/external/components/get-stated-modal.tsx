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

	const descriptions = {
		vendor:
			"Do you create fashion, beauty, or lifestyle products and sell in bulk to wholesalers, retailers, or businesses, we've got the perfect logistics solution for you!",
		customer:
			"Do you own or run a business selling fashion, beauty, or lifestyle products—whether in small or large quantities—we've got you covered!",
		partner:
			"Do you facilitate transactions by connecting buyers with sellers—whether through referrals, networking, or direct sales—we make it easier for you to succeed!",
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
					<Image src={logoImage} alt="Logo" width={120} height={40} />

					<div className="w-full flex flex-col items-center space-y-6">
						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 ${
									activeDescription === "vendor"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: ""
								}`}
							>
								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										activeDescription === "vendor"
											? "max-h-40 opacity-100 mb-4"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="bg-blue-100 text-sm rounded-lg transform transition-transform duration-500 ease-in-out text-start">
										{descriptions.vendor}
									</div>
								</div>
								<Button
									onClick={() => handleDescriptionToggle("vendor")}
									href="https://vendor.obana.africa/"
									variant="primary"
									animation="ripple"
									icon={<ChevronsRight />}
									iconPosition="right"
									className={`rounded-sm w-[350px] transition-all duration-300 ${
										activeDescription === "vendor"
											? "border-blue-500 !bg-[#3D6188] shadow-lg py-3"
											: "border-primary py-2"
									}`}
								>
									Continue As A Vendor
								</Button>
							</div>
						</div>

						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 ${
									activeDescription === "customer"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: ""
								}`}
							>
								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										activeDescription === "customer"
											? "max-h-40 opacity-100 mb-4"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="bg-blue-100 text-sm rounded-lg transform transition-transform duration-500 ease-in-out text-start">
										{descriptions.customer}
									</div>
								</div>
								<Button
									onClick={() => handleDescriptionToggle("customer")}
									href="https://shop.obana.africa/"
									variant="primary"
									animation="ripple"
									icon={<ChevronsRight />}
									iconPosition="right"
									className={`rounded-sm w-[350px] transition-all duration-300 ${
										activeDescription === "customer"
											? "border-blue-500 !bg-[#3D6188] shadow-lg py-3"
											: "border-primary py-2"
									}`}
								>
									Continue As A Customer
								</Button>
							</div>
						</div>

						<div className="w-full flex flex-col items-center">
							<div
								className={`text-center mb-4 ${
									activeDescription === "partner"
										? "p-6 rounded-md bg-primary max-w-[400px] text-white"
										: ""
								}`}
							>
								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										activeDescription === "partner"
											? "max-h-40 opacity-100 mb-4"
											: "max-h-0 opacity-0"
									}`}
								>
									<div className="bg-blue-100 text-sm rounded-lg transform transition-transform duration-500 ease-in-out text-start">
										{descriptions.partner}
									</div>
								</div>
								<Button
									onClick={() => handleDescriptionToggle("partner")}
									href="https://salesforce.obana.africa/"
									variant="primary"
									animation="ripple"
									icon={<ChevronsRight />}
									iconPosition="right"
									className={`rounded-sm w-[350px] transition-all duration-300 ${
										activeDescription === "partner"
											? "border-blue-500 !bg-[#3D6188] shadow-lg py-3"
											: "border-primary py-2"
									}`}
								>
									Continue As A Sales Partner
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStartedModal;
