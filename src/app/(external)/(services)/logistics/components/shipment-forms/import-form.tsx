import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { importShipmentSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormFileUpload from "@/components/ui/form-file-upload";
import Button from "@/components/ui/button";
import PreviewComponent from "../preview";

interface ImportFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const ImportForm: React.FC<ImportFormProps> = ({
	onBack,
	onSubmit,
	isSubmitting,
}) => {
	const [showPreview, setShowPreview] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [formData, setFormData] = useState<any>(null);

	const {
		register,
		handleSubmit,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		control,
		formState: { errors },
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getValues,
	} = useForm({
		resolver: zodResolver(importShipmentSchema),
		defaultValues: {
			shipmentRoute: "",
			pickUp: "",
			destination: "",
			productCategory: "",
			productType: "",
			productWeight: "",
			dimension: "",
			shipmentImage: undefined,
		},
	});

	const shipmentRoutes = [
		{ value: "air", label: "Air Freight" },
		{ value: "sea", label: "Sea Freight" },
		{ value: "land", label: "Land Freight" },
	];

	const locations = [
		{ value: "lagos", label: "Lagos" },
		{ value: "abuja", label: "Abuja" },
		{ value: "kano", label: "Kano" },
	];

	const productCategories = [
		{ value: "electronics", label: "Electronics" },
		{ value: "fashion", label: "Fashion" },
		{ value: "food", label: "Food Items" },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlePreview = (data: any) => {
		setFormData(data);
		setShowPreview(true);
	};

	const handleEdit = () => {
		setShowPreview(false);
	};

	const handleFinalSubmit = () => {
		onSubmit(formData);
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
				{
					label: "Shipment route",
					value: getLabelFromValue(formData?.shipmentRoute, shipmentRoutes),
				},
				{
					label: "From",
					value: getLabelFromValue(formData?.pickUp, locations),
				},
				{
					label: "To",
					value: getLabelFromValue(formData?.destination, locations),
				},
				{
					label: "Product category",
					value: getLabelFromValue(
						formData?.productCategory,
						productCategories
					),
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
					value: formData?.shipmentImage ? "Uploaded" : "None",
				},
			],
		},
	];

	return (
		<div className="space-y-6">
			<h2 className="font-bold text-center text-primary">
				Request For Shipment
			</h2>

			{showPreview ? (
				<PreviewComponent
					title="Preview"
					sections={previewSections}
					onEdit={handleEdit}
					onSubmit={handleFinalSubmit}
					isSubmitting={isSubmitting}
				/>
			) : (
				<form onSubmit={handleSubmit(handlePreview)}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<FormSelect
							id="shipmentRoute"
							label="Shipment route *"
							options={shipmentRoutes}
							register={register("shipmentRoute")}
							error={errors.shipmentRoute?.message}
							required
						/>

						<FormSelect
							id="pickUp"
							label="Pick Up *"
							options={locations}
							register={register("pickUp")}
							error={errors.pickUp?.message}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<FormSelect
							id="productCategory"
							label="Product category *"
							options={productCategories}
							register={register("productCategory")}
							error={errors.productCategory?.message}
							required
						/>

						<FormInput
							id="productWeight"
							label="Product weight *"
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
							register={register("shipmentImage")}
							error={typeof errors.shipmentImage?.message === "string" ? errors.shipmentImage.message : undefined}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<FormSelect
							id="destination"
							label="Destination *"
							options={locations}
							register={register("destination")}
							error={errors.destination?.message}
							required
						/>

						<FormInput
							id="productType"
							label="Product type *"
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
			)}
		</div>
	);
};

export default ImportForm;
