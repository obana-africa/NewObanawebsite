import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormFileUpload from "@/components/ui/form-file-upload";
import Button from "@/components/ui/button";
import PreviewComponent from "../preview";
import LogisticsPartners from "../logistics-partners";
import Image from "next/image";
import useNigerianStates from "@/hooks/use-nigerian-states";
import { domesticShipmentSchema } from "@/schemas";
import SenderReceiverForm from "./sender-receiver-form";

export interface FormDataType {
	shipmentRoute: string;
	pickUp: string;
	destination: string;
	productCategory: string;
	productType: string;
	productWeight: string;
	dimension?: string;
	shipmentImage?: File;
	shipmentImageUrl?: string;
	sender: {
		name: string;
		email: string;
		phone: string;
		address: string;
	};
	receiver: {
		name: string;
		email: string;
		phone: string;
		address: string;
	};
}

interface DomesticFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const DomesticForm: React.FC<DomesticFormProps> = ({
	onBack,
	onSubmit,
	isSubmitting,
}) => {
	const [currentStep, setCurrentStep] = useState<
		"form" | "senderReceiver" | "preview" | "logistics"
	>("form");
	const [formData, setFormData] = useState<FormDataType | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const {
		data: nigerianStates,
		isLoading: statesLoading,
		error,
	} = useNigerianStates();

	const defaultLocations = [
		{ value: "lagos", label: "Lagos" },
		{ value: "abuja", label: "Abuja" },
		{ value: "kano", label: "Kano" },
	];

	const locations =
		statesLoading || error ? defaultLocations : nigerianStates || [];

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(domesticShipmentSchema),
		defaultValues: {
			pickUp: "",
			destination: "",
			productCategory: "",
			productType: "",
			productWeight: "",
			dimension: "",
			shipmentImage: "",
		},
	});

	const productCategories = [
		{ value: "electronics", label: "Electronics" },
		{ value: "fashion", label: "Fashion" },
		{ value: "food", label: "Food Items" },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePreview = (data: any) => {
		// console.log("GO TO NEXT", data);
		const formDataWithImage = {
			...data,
			shipmentImage: data.shipmentImage,
			shipmentImageUrl: imageUrl,
		};
		setFormData(formDataWithImage);
		// setFormData(data);
		setCurrentStep("senderReceiver");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSenderReceiverSubmit = (senderReceiverData: any) => {
		const mergedData = {
			...formData,
			...senderReceiverData,
			shipmentImageUrl: imageUrl,
		};
		// console.log("GO TO NEXT", mergedData);

		setFormData(mergedData);
		setCurrentStep("preview");
	};

	const handleEdit = () => {
		setCurrentStep("form");
	};

	const handleProceedToBook = () => {
		setCurrentStep("logistics");
	};

	const handleFileUploadComplete = (url: string | null) => {
		setImageUrl(url);
		setValue("shipmentImage", url || "");
	};

	const handleContactSupport = () => {
		// Implement your customer support logic here
		console.log("Contact customer support");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFinalSubmit = (finalData: any) => {
		onSubmit(finalData);
	};

	const getLabelFromValue = (
		value: string,
		options: Array<{ value: string; label: string }>
	) => {
		return options.find((option) => option.value === value)?.label || value;
	};

	const previewSections = [
		{
			title: "Shipment Information",
			fields: [
				// {
				// 	label: "Shipment route",
				// 	value: formData?.shipmentRoute
				// 		? getLabelFromValue(formData.shipmentRoute, shipmentRoutes)
				// 		: "-",
				// },
				{
					label: "From",
					value: formData?.pickUp
						? getLabelFromValue(formData.pickUp, locations)
						: "-",
				},
				{
					label: "To",
					value: formData?.destination
						? getLabelFromValue(formData.destination, locations)
						: "-",
				},
				{
					label: "Product category",
					value: formData?.productCategory
						? getLabelFromValue(formData.productCategory, productCategories)
						: "-",
				},
				{
					label: "Product type",
					value: formData?.productType || "-",
				},
				{
					label: "Product weight",
					value: formData?.productWeight ? `${formData.productWeight}kg` : "-",
				},
				{
					label: "Dimension",
					value: formData?.dimension || "-",
				},
				{
					label: "Shipment image",
					value: formData?.shipmentImageUrl ? (
						<div className="w-32 h-32 relative">
							<Image
								src={formData.shipmentImageUrl}
								alt="Shipment preview"
								fill
								className="object-contain"
								sizes="(max-width: 128px) 100vw, 128px"
							/>
						</div>
					) : (
						"None"
					),
				},
			],
		},
		{
			title: "Sender Details",
			fields: [
				{
					label: "Name",
					value: formData?.sender?.name || "-",
				},
				{
					label: "Email",
					value: formData?.sender?.email || "-",
				},
				{
					label: "Phone number",
					value: formData?.sender?.phone || "-",
				},
				{
					label: "Address",
					value: formData?.sender?.address || "-",
				},
			],
		},
		{
			title: "Receiver Details",
			fields: [
				{
					label: "Name",
					value: formData?.receiver?.name || "-",
				},
				{
					label: "Email",
					value: formData?.receiver?.email || "-",
				},
				{
					label: "Phone number",
					value: formData?.receiver?.phone || "-",
				},
				{
					label: "Address",
					value: formData?.receiver?.address || "-",
				},
			],
		},
	];

	// Render different content based on the current step
	// console.log(errors);
	return (
		<div className="space-y-6">
			{currentStep === "form" && (
				<>
					<h2 className="font-bold text-center text-primary">
						Request For Shipment
					</h2>
					<form onSubmit={handleSubmit(handlePreview)}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							{/* <FormSelect
								id="shipmentRoute"
								label="Shipment route "
								options={shipmentRoutes}
								register={register("shipmentRoute")}
								error={errors.shipmentRoute?.message}
								required
							/> */}

							<FormSelect
								id="pickUp"
								label="Pick Up "
								options={locations}
								register={register("pickUp")}
								error={errors.pickUp?.message}
								required
								searchable
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormSelect
								id="productCategory"
								label="Product category "
								options={productCategories}
								register={register("productCategory")}
								error={errors.productCategory?.message}
								required
							/>

							<FormInput
								id="productWeight"
								label="Product weight "
								placeholder="In Kg"
								register={register("productWeight")}
								error={errors.productWeight?.message}
								type="number"
								required
							/>
						</div>

						<div className="mb-4">
							<FormFileUpload
								id="shipmentImage"
								label="Upload shipment Image"
								onUploadComplete={handleFileUploadComplete}
								accept="image/*"
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormSelect
								id="destination"
								label="Destination "
								options={locations}
								register={register("destination")}
								error={errors.destination?.message}
								required
								searchable={true}
							/>

							<FormInput
								id="productType"
								label="Product type "
								placeholder="Eg, Headset, Shirt"
								register={register("productType")}
								error={errors.productType?.message}
								required
							/>
						</div>

						<div className="mb-4">
							<FormInput
								id="dimension"
								label="Dimension"
								placeholder="Height X Width in cm or inches"
								register={register("dimension")}
								error={errors.dimension?.message}
							/>
						</div>

						<div className="flex justify-between mt-6">
							<Button
								onClick={onBack}
								variant="outline"
								className="border border-blue-900 text-blue-900"
							>
								Back
							</Button>
							<Button
								type="submit"
								variant="primary"
								animation="ripple"
								className="border border-primary"
							>
								Next
							</Button>
						</div>
					</form>
				</>
			)}

			{currentStep === "senderReceiver" && (
				<SenderReceiverForm
					defaultValues={{
						sender: formData?.sender,
						receiver: formData?.receiver,
					}}
					onBack={() => setCurrentStep("form")}
					onSubmit={handleSenderReceiverSubmit}
				/>
			)}

			{currentStep === "preview" && (
				<PreviewComponent
					title="Preview"
					sections={previewSections}
					onEdit={handleEdit}
					onProceedToBook={handleProceedToBook}
					onContactSupport={handleContactSupport}
					isSubmitting={isSubmitting}
				/>
			)}

			{currentStep === "logistics" && formData && (
				<LogisticsPartners
					shipmentData={formData}
					onBack={() => setCurrentStep("preview")}
					onSubmit={handleFinalSubmit}
					isSubmitting={isSubmitting}
				/>
			)}
		</div>
	);
};

export default DomesticForm;
