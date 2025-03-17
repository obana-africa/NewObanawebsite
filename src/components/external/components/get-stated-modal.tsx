"use client";
import React, { useEffect, useRef } from "react";
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

	return (
		<div className="fixed inset-0 bg-primary/80   z-50 flex items-center justify-center">
			<div
				ref={modalRef}
				className="bg-white w-full max-w-[700px] mx-4 rounded-lg shadow-lg overflow-hidden h-[600px]"
			>
				<div className="p-6 flex flex-col items-center relative">
					<button
						className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={onClose}
						aria-label="Close modal"
					>
						<X className="h-6 w-6" />
					</button>

					<div className="mb-8 mt-4">
						<Image
							src={logoImage}
							alt="Obana Logo"
							width={120}
							height={48}
							priority
						/>
					</div>

					<div className="w-full space-y-4 flex flex-col items-center justify-center gap-4 mt-16">
						<Button
							onClick={() => console.log("Vendor signup clicked")}
							variant="primary"
							animation="ripple"
							icon={<ChevronsRight />}
							iconPosition="right"
							className="rounded-sm w-[350px] border border-primary "
						>
							Continue As A Vendor
						</Button>
						<Button
							onClick={() => console.log("Customer signup clicked")}
							variant="primary"
							animation="ripple"
							icon={<ChevronsRight />}
							iconPosition="right"
							className="rounded-sm w-[350px] border border-primary"
						>
							Continue As A Customer
						</Button>
						<Button
							onClick={() => console.log("Partner signup clicked")}
							variant="primary"
							animation="ripple"
							icon={<ChevronsRight />}
							iconPosition="right"
							className="rounded-sm w-[350px] border border-primary"
						>
							Continue As A Sales Partner
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetStartedModal;
