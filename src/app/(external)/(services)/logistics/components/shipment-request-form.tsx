"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import Image from "next/image";
import below from "@/app/assets/images/rfq/below.png";
import ImportForm from "./shipment-forms/import-form";

const shipmentTypes = [
	{ id: "import", label: "Import" },
	{ id: "export", label: "Export" },
	{ id: "domestic", label: "Within Nigeria" },
];

const formMapping = {
	import: "ImportForm",
	export: "ExportForm",
	domestic: "DomesticForm",
};

const ShipmentRequestForm: React.FC = () => {
	const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleShipmentSelect = (shipmentId: string) => {
		if (selectedShipment === shipmentId) {
			setSelectedShipment(null);
		} else {
			setSelectedShipment(shipmentId);
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
			setSelectedShipment(null);
		}, 1500);
	};

	const renderForm = () => {
		if (!selectedShipment) return null;

		const formType = formMapping[selectedShipment as keyof typeof formMapping];

		switch (formType) {
			case "ImportForm":
				return (
					<ImportForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "ExportForm":
				return (
					<ImportForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			case "DomesticForm":
				return (
					<ImportForm
						onBack={handleBack}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
					/>
				);
			default:
				return (
					<div className="p-4 bg-yellow-100 rounded">
						Form for{" "}
						{shipmentTypes.find((item) => item.id === selectedShipment)?.label}{" "}
						is not implemented yet.
					</div>
				);
		}
	};

	const renderShipmentSelection = () => {
		return (
			<div className="space-y-6 p-6 mx-auto">
				<h2 className="font-bold text-center text-primary">
					Request For Shipment
				</h2>

				<div className="mt-4">
					<div className="text-center font-medium mb-4 text-2xl ">
						Shipment Type
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:place-items-center">
						{shipmentTypes.map((shipment) => (
							<div key={shipment.id} className="flex items-center">
								<input
									type="checkbox"
									id={shipment.id}
									checked={selectedShipment === shipment.id}
									onChange={() => handleShipmentSelect(shipment.id)}
									className="mr-2 h-5 w-5 cursor-pointer"
								/>
								<label htmlFor={shipment.id} className="cursor-pointer">
									{shipment.label}
								</label>
							</div>
						))}
					</div>
				</div>

				{selectedShipment && (
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
		<section className="container mx-auto px-4 md:py-12 mb-4 relative">
			<div className="bg-secondary rounded-lg z-10 px-4 md:px-16 pt-10 pb-16 relative overflow-hidden 2xl:w-[70%] mx-auto">
				{showForm ? (
					<div className="px-4 md:p-6">{renderForm()}</div>
				) : (
					renderShipmentSelection()
				)}
			</div>
			<div
				className="absolute -top-[80px] -right-16 bg-white/10 rounded-lg hidden sm:block"
				data-aos="zoom-in"
			>
				<Image src={below} alt="Decorative square" width={400} height={300} />
			</div>
		</section>
	);
};

export default ShipmentRequestForm;
