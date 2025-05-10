"use client";

import React, { useState } from "react";
import ProductionForm from "./quote-forms/production-form";
import LabelForm from "./quote-forms/label-form";
import FabricForm from "./quote-forms/fabric-form";
import RawMaterialForm from "./quote-forms/raw-material-form";
import SmeIncubationForm from "./quote-forms/sme-incubation-form";
import Button from "@/components/ui/button";
import Image from "next/image";
import below from "@/app/assets/images/rfq/below.png";
import { useRfqForm } from "@/hooks/use-rfq-form";
import { Info } from "lucide-react";
import { Tooltip } from "@/components/ui/form-tooltip";
import TrademarkForm from "./quote-forms/trademark-form";

const itemTypes = [
	{ id: "production", label: "Production (Shoe/ Apparel)", hasForm: true },
	{ id: "fabricSourcing", label: "Fabric Sourcing", hasForm: true },
	{ id: "brandLabel", label: "Brand Label", hasForm: true },
	{ id: "rawMaterial", label: "Raw Material Sourcing", hasForm: true },
	{ id: "brandTrademarking", label: "Brand Trademarking", hasForm: true },
	{ id: "smeIncubation", label: "SME Incubation", hasForm: true },
];

const formMapping = {
	production: "ProductionForm",
	fabricSourcing: "FabricForm",
	brandLabel: "LabelForm",
	rawMaterial: "RawMaterialForm",
	brandTrademarking: "TrademarkForm",
	smeIncubation: "SmeIncubationForm",
};

const QuoteRequestForm: React.FC = () => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const { submitRfqForm, isSubmitting } = useRfqForm();

	React.useEffect(() => {
		const handlePopState = (event: PopStateEvent) => {
			if (showForm) {
				setShowForm(false);
				event.preventDefault();
				window.history.pushState(null, "", window.location.href);
			}
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [showForm]);

	const handleItemSelect = (itemId: string) => {
		if (selectedItem === itemId) {
			setSelectedItem(null);
		} else {
			setSelectedItem(itemId);
		}
		setShowForm(false);
	};

	const handleContinue = () => {
		setShowForm(true);
	};

	const handleBack = () => {
		setShowForm(false);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (data: any) => {
		// console.log("Form submitted successfully:", data);
		const success = await submitRfqForm({ ...data }, selectedItem || "");

		if (success) {
			setShowForm(false);
			setSelectedItem(null);
		}
	};

	const renderForm = () => {
		if (!selectedItem) return null;

		const formType = formMapping[selectedItem as keyof typeof formMapping];

		switch (formType) {
			case "ProductionForm":
				return (
					<ProductionForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "FabricForm":
				return (
					<FabricForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "RawMaterialForm":
				return (
					<RawMaterialForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "TrademarkForm":
				return (
					<TrademarkForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "SmeIncubationForm":
				return (
					<SmeIncubationForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "LabelForm":
				return (
					<LabelForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			default:
				return (
					<>
						<div className="p-4  rounded text-center font-bold">
							Our {itemTypes.find((item) => item.id === selectedItem)?.label} is
							not Available yet.
						</div>
						<h2 className="font-['Bricolage_Grotesque'] font-bold text-primary  text-center mb-4">
							Coming Soon
						</h2>
						<div className=" text-center">
							<Button
								onClick={handleBack}
								variant="primary"
								animation="ripple"
								className="border border-primary "
							>
								Go Back
							</Button>
						</div>
					</>
				);
		}
	};

	const renderItemSelection = () => {
		return (
			<div className="space-y-6 p-6 mx-auto" id="rfqform">
				<h2 className="font-bold text-center text-primary">
					Request For Quote
				</h2>

				<div className="mt-4">
					<div className="text-center font-medium mb-4 text-2xl ">
						Item Type
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:place-items-center">
						{itemTypes.map((item) => (
							<div key={item.id} className="flex items-center">
								{item.hasForm ? (
									<>
										<input
											type="checkbox"
											id={item.id}
											checked={selectedItem === item.id}
											onChange={() => handleItemSelect(item.id)}
											className="mr-2 h-5 w-5 cursor-pointer"
										/>
										<label htmlFor={item.id} className="cursor-pointer">
											{item.label}
										</label>
									</>
								) : (
									<div className="flex items-center">
										<input
											type="checkbox"
											id={item.id}
											disabled
											className="mr-2 h-5 w-5 cursor-not-allowed opacity-50"
										/>
										<Tooltip content="Coming soon" side="top">
											<label
												htmlFor={item.id}
												className="cursor-not-allowed opacity-50 flex items-center"
											>
												{item.label}
												<Info className="w-4 h-4 ml-1 text-gray-500" />
											</label>
										</Tooltip>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{selectedItem && (
					<div className="flex justify-center mt-6">
						<Button
							onClick={handleContinue}
							variant="primary"
							animation="ripple"
							className="border border-primary "
						>
							Continue
						</Button>
					</div>
				)}
			</div>
		);
	};

	return (
		<section className="container mx-auto px-4  md:py-12 mb-4 relative">
			<div className="bg-secondary rounded-lg z-10 px-4 md:px-16 pt-10 pb-16 relative overflow-hidden 2xl:w-[70%] mx-auto">
				{showForm ? (
					<div className=" px-4 md:p-6  ">{renderForm()}</div>
				) : (
					renderItemSelection()
				)}
			</div>
			<div
				className="absolute -top-[80px] -right-16   bg-white/10 rounded-lg hidden sm:block"
				data-aos="zoom-in"
			>
				<Image src={below} alt="Decorative square" width={400} height={300} />
			</div>
		</section>
	);
};

export default QuoteRequestForm;
