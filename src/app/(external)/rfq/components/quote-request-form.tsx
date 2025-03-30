"use client";

import React, { useState } from "react";
import ProductionForm from "./quote-forms/production-form";
import LabelForm from "./quote-forms/label-form";
import Button from "@/components/ui/button";
import Image from "next/image";
import below from "@/app/assets/images/rfq/below.png";

const itemTypes = [
	{ id: "production", label: "Production (Shoe/ Apparel)" },
	{ id: "fabricSourcing", label: "Fabric Sourcing" },
	{ id: "brandLabel", label: "Brand Label" },
	{ id: "rawMaterial", label: "Raw Material Sourcing" },
	{ id: "brandTrademarking", label: "Brand Trademarking" },
	{ id: "smeIncubation", label: "SME Incubation" },
];

const formMapping = {
	production: "ProductionForm",
	fabricSourcing: "ProductionForm",
	brandLabel: "LabelForm",
	rawMaterial: "LabelForm",
	brandTrademarking: "LabelForm",
	smeIncubation: "ProductionForm",
};

const QuoteRequestForm: React.FC = () => {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
	const handleSubmit = (data: any) => {
		setIsSubmitting(true);
		setTimeout(() => {
			console.log("Form submitted successfully:", data);
			setIsSubmitting(false);
			// Reset the form
			setShowForm(false);
			setSelectedItem(null);
		}, 1500);
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
					<div className="p-4 bg-yellow-100 rounded">
						Form for {itemTypes.find((item) => item.id === selectedItem)?.label}{" "}
						is not implemented yet.
					</div>
				);
		}
	};

	const renderItemSelection = () => {
		return (
			<div className="space-y-6 p-6 mx-auto">
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
