import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rawMaterialQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";
import useBrandOptions from "@/hooks/use-active-brands";

interface RawMaterialFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const RawMaterialForm: React.FC<RawMaterialFormProps> = ({
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
		resolver: zodResolver(rawMaterialQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			rawMaterialType: "",
			materialDescription: "",
			preferredBrand: "",
			moq: "",
			sizeSpecRange: "",
			targetPrice: {},
			applicationUse: [],
			sampleProduct: null,
			sampleProductUrl: "",
			additionalComments: "",
		},
	});

	const {  error: brandsError } = useBrandOptions();

	const materialTypes = [
		{ value: "Rubber Sole", label: "Rubber Sole" },
		{ value: "EVA Foam", label: "EVA Foam" },
		{ value: "PU Leather", label: "PU Leather" },
		{ value: "Zippers", label: "Zippers" },
		{ value: "Buttons", label: "Buttons" },
		{ value: "Threads", label: "Threads" },
		{ value: "Lining Fabric", label: "Lining Fabric" },
		{ value: "Insole Materials", label: "Insole Materials" },
		{ value: "Packaging", label: "Packaging" },
		{ value: "Others", label: "Others" },
	];

	const applicationTypes = [
		{ value: "Footwear", label: "Footwear" },
		{ value: "Clothing", label: "Clothing" },
		{ value: "Upholstery", label: "Upholstery" },
		{ value: "Industrial", label: "Industrial" },
		{ value: "Accessories", label: "Accessories" },
		{ value: "Others", label: "Others" },
	];

	const handleFileUploadComplete = (url: string | null) => {
		setValue("sampleProductUrl", url || "");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		// console.log(data);
		onSubmit({
			...data,
			sampleProduct: data.sampleProductUrl || null,
		});
	};

	return (
		<div className="space-y-6">
			<h2 className="font-bold text-center text-primary">Request For Quote</h2>

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="name"
						label="Full Name"
						placeholder="e.g. John Doe"
						register={register("name")}
						error={errors.name?.message}
						required
					/>

					<FormInput
						id="email"
						label="Email Address"
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
						label="WhatsApp or Phone Number"
						error={errors.phone?.message}
						required
					/>

					<FormSelect
						id="rawMaterialType"
						label="Raw Material Type"
						options={materialTypes}
						register={register("rawMaterialType")}
						error={errors.rawMaterialType?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="materialDescription"
						label="Material Description"
						placeholder="e.g. Black rubber sole for sneakers, anti-slip, 12mm thickness"
						register={register("materialDescription")}
						error={errors.materialDescription?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="preferredBrand"
						label="Preferred Brand (Optional)"
						register={register("preferredBrand")}
						placeholder="e.g. YKK, BASF"
						type="text"
					/>

					<FormInput
						id="moq"
						label="Minimum Order Quantity (MOQ)"
						placeholder="Number input"
						register={register("moq")}
						error={errors.moq?.message}
						type="number"
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="sizeSpecRange"
						label="Size or Specification Range"
						placeholder="e.g. 1.5mm - 3mm thick, 12cm zippers"
						register={register("sizeSpecRange")}
						error={errors.sizeSpecRange?.message}
						required
					/>

					<CurrencyInputField
						name="targetPrice"
						control={control}
						label="Target Price per Unit (NGN)"
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="applicationUse"
						label="Application Use"
						options={applicationTypes}
						register={register("applicationUse")}
						error={errors.applicationUse?.message}
						multiple
					/>

					<FormFileUpload
						id="sampleProduct"
						label="Upload Sample or Reference Image"
						onUploadComplete={handleFileUploadComplete}
						accept="image/*, application/pdf"
						fileTypes="image/*"
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="additionalComments"
						label="Additional Comments or Requirements"
						placeholder="Mention durability needs, packaging requirements, color preference, etc"
						register={register("additionalComments")}
						error={errors.additionalComments?.message}
						rows={4}
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
							Submit
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default RawMaterialForm;
