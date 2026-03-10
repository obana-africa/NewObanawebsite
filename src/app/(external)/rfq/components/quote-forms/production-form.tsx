"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productionQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";
import useBrandOptions from "@/hooks/use-active-brands";

interface ProductionFormProps {
	// Remove onBack since it's not needed
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const ProductionForm: React.FC<ProductionFormProps> = ({
	onSubmit,
	isSubmitting,
}) => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productionQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			productType: "",
			itemDescription: "",
			brandToSource: "",
			moq: "",
			sizeRange: "",
			targetPrice: {},
			style: "",
			comment: "",
			sampleProduct: null,
			sampleProductUrl: "",
		},
	});
	const { brands: brandOptions, error: brandsError } = useBrandOptions();

	// Enhanced product types for fashion/beauty SMEs
	const productTypes = [
		{ value: "Footwear", label: "👟 Footwear" },
		{ value: "Apparel", label: "👕 Apparel" },
		{ value: "Accessories", label: "📿 Accessories" },
		{ value: "Bags", label: "👜 Bags & Luggage" },
		{ value: "Headwear", label: "🧢 Headwear" },
		{ value: "Beauty Products", label: "💄 Beauty & Cosmetics" },
		{ value: "Jewelry", label: "💍 Jewelry" },
		{ value: "Other", label: "✨ Other" },
	];

	const itemStyles = [
		{ value: "Casual", label: "Casual" },
		{ value: "Formal", label: "Formal" },
		{ value: "Streetwear", label: "Streetwear" },
		{ value: "Athleisure", label: "Athleisure" },
		{ value: "Business Casual", label: "Business Casual" },
		{ value: "Bohemian", label: "Bohemian" },
		{ value: "Vintage", label: "Vintage" },
		{ value: "Urban", label: "Urban" },
		{ value: "Sportswear", label: "Sportswear" },
		{ value: "Traditional", label: "Traditional/Cultural" },
		{ value: "Minimalist", label: "Minimalist" },
		{ value: "Luxury", label: "Luxury" },
	];

	const handleFileUploadComplete = (url: string | null) => {
		setValue("sampleProductUrl", url || "");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		onSubmit({
			...data,
			sampleProduct: data.sampleProductUrl || null,
		});
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			<div className="text-center mb-6">
				<h2 className="font-bold text-2xl text-primary">Request Production Quote</h2>
				<p className="text-sm text-gray-600 mt-1">Fill in your requirements below</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					id="name"
					label="Name"
					placeholder="Your full name"
					register={register("name")}
					error={errors.name?.message}
					required
				/>

				<FormInput
					id="email"
					label="Email"
					placeholder="your@email.com"
					register={register("email")}
					error={errors.email?.message}
					type="email"
					required
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<PhoneInput
					control={control}
					name="phone"
					label="Phone Number"
					error={errors.phone?.message}
					required
				/>

				<FormSelect
					id="productType"
					label="Product Type"
					placeholder="Select product type"
					options={productTypes}
					register={register("productType")}
					error={errors.productType?.message}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormTextarea
					id="itemDescription"
					label="Product Description"
					placeholder="Describe your product: materials, colors, special features, etc."
					register={register("itemDescription")}
					error={errors.itemDescription?.message}
					rows={3}
					required
				/>

				<div className="space-y-4">
					<FormSelect
						id="brandToSource"
						label="Target Brand/Market"
						placeholder="Select or type brand"
						options={brandOptions}
						register={register("brandToSource")}
						error={errors.brandToSource?.message || brandsError || undefined}
						searchable
						allowCustom
					/>

					<FormSelect
						id="style"
						label="Style/Aesthetic"
						options={itemStyles}
						register={register("style")}
						error={errors.style?.message}
						placeholder="Select style"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<FormInput
					id="moq"
					label="MOQ (units)"
					placeholder="e.g., 500"
					register={register("moq")}
					error={errors.moq?.message}
					type="number"
				/>

				<FormInput
					id="sizeRange"
					label="Size Range"
					placeholder="XS-4XL, 35-45"
					register={register("sizeRange")}
					error={errors.sizeRange?.message}
					required
				/>

				<CurrencyInputField
					name="targetPrice"
					control={control}
					label="Target Price/unit"
					placeholder="Price per unit"
					defaultValue={{ currency: "NGN", symbol: "₦" }}
					required
					error={
						typeof errors.targetPrice?.message === "string"
							? errors.targetPrice?.message
							: undefined
					}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormFileUpload
					id="sampleProduct"
					label="Reference Images"
					onUploadComplete={handleFileUploadComplete}
					accept="image/*"
					fileTypes="Images (PNG, JPG, JPEG)"
					multiple
				/>

				<FormTextarea
					id="comment"
					label="Additional Requirements"
					placeholder="Timeline, special materials, certifications needed, etc."
					register={register("comment")}
					error={errors.comment?.message}
					rows={3}
				/>
			</div>

			<div className="pt-4">
				<Button
					type="submit"
					variant="primary"
					animation="ripple"
					className="w-full border border-primary py-3"
					disabled={isSubmitting}
					isLoading={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit Quote Request"}
				</Button>
			</div>
		</form>
	);
};

export default ProductionForm;
