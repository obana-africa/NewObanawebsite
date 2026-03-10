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
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const ProductionForm: React.FC<ProductionFormProps> = ({
	onBack,
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
		{ value: "Footwear", label: "Footwear" },
		{ value: "Apparel", label: "Apparel" },
		{ value: "Accessories", label: "Accessories" },
		{ value: "Bags", label: "Bags" },
		{ value: "Headwear", label: "Headwear" },
		{ value: "Beauty Products", label: "Beauty Products" },
		{ value: "Jewelry", label: "Jewelry" },
		{ value: "Other", label: "Other" },
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
		{ value: "Traditional/Cultural", label: "Traditional/Cultural" },
		{ value: "Minimalist", label: "Minimalist" },
		{ value: "Avant-Garde", label: "Avant-Garde" },
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
		<div className="space-y-6">
			<div className="text-center mb-8">
				<h2 className="font-bold text-2xl text-primary">Production Quote Request</h2>
				<p className="text-gray-600 mt-2">
					Fill in your production requirements and we'll match you with the right manufacturers
				</p>
			</div>

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="name"
						label="Name"
						placeholder="Your Name"
						register={register("name")}
						error={errors.name?.message}
						required
					/>

					<FormInput
						id="email"
						label="Email"
						placeholder="Your Email"
						register={register("email")}
						error={errors.email?.message}
						type="email"
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<PhoneInput
						control={control}
						name="phone"
						label="Phone Number"
						error={errors.phone?.message}
						required
					/>

					<FormSelect
						id="productType"
						label="Type of Product"
						placeholder="Select product type"
						options={productTypes}
						register={register("productType")}
						error={errors.productType?.message}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormTextarea
						id="itemDescription"
						label="Item Description"
						placeholder="Describe your product in detail - materials, colors, special features, etc."
						register={register("itemDescription")}
						error={errors.itemDescription?.message}
						rows={3}
						required
					/>

					<FormSelect
						id="brandToSource"
						label="Target Brand/Market"
						placeholder="Select brand or enter your own"
						options={brandOptions}
						register={register("brandToSource")}
						error={errors.brandToSource?.message || brandsError || undefined}
						searchable
						allowCustom
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
					<FormInput
						id="moq"
						label="MOQ (Minimum Order Quantity)"
						placeholder="Number of units"
						register={register("moq")}
						error={errors.moq?.message}
						type="number"
					/>

					<FormInput
						id="sizeRange"
						label="Size Range"
						placeholder="e.g., XS-4XL, 35-45, etc."
						register={register("sizeRange")}
						error={errors.sizeRange?.message}
						required
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<CurrencyInputField
						name="targetPrice"
						control={control}
						label="Target Price Point"
						placeholder="Per unit"
						defaultValue={{ currency: "NGN", symbol: "₦" }}
						required
						className=""
						error={
							typeof errors.targetPrice?.message === "string"
								? errors.targetPrice?.message
								: undefined
						}
					/>

					<FormFileUpload
						id="sampleProduct"
						label="Upload Reference Images"
						onUploadComplete={handleFileUploadComplete}
						accept="image/*"
						fileTypes="Images (PNG, JPG, JPEG)"
						multiple
					/>
				</div>

				<div className="mb-4">
					<FormTextarea
						id="comment"
						label="Additional Requirements"
						placeholder="Any special requirements? Timeline expectations? Budget constraints? Specific materials or certifications needed?"
						register={register("comment")}
						error={errors.comment?.message}
						rows={4}
					/>
				</div>

				<div className="bg-blue-50 p-4 rounded-lg mb-6">
					<p className="text-sm text-blue-800">
						<strong>Note for Fashion & Beauty SMEs:</strong> We'll match you with vetted manufacturers 
						who specialize in your product category. All partners are verified for quality and reliability.
					</p>
				</div>

				<div className="flex justify-between mt-6">
					<Button
						type="button"
						onClick={onBack}
						variant="outline"
						className="border border-blue-900 text-blue-900"
					>
						Back
					</Button>
					{isSubmitting ? (
						<Button variant="primary" disabled isLoading>
							Submitting...
						</Button>
					) : (
						<Button
							type="submit"
							variant="primary"
							animation="ripple"
							className="border border-primary"
						>
							Submit Quote Request
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default ProductionForm;
