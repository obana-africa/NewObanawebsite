import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fabricQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";
import useBrandOptions from "@/hooks/use-active-brands";

interface FabricFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const FabricForm: React.FC<FabricFormProps> = ({
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
		resolver: zodResolver(fabricQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			fabricCategory: "",
			fabricDescription: "",
			preferredBrand: "",
			moq: "",
			sizeRange: "",
			targetPrice: {},
			intendedUsage: [],
			sampleProduct: null,
			sampleProductUrl: "",
			additionalComments: "",
		},
	});

	const { error: brandsError } = useBrandOptions();

	const fabricCategories = [
		{ value: "Cotton", label: "Cotton" },
		{ value: "Silk", label: "Silk" },
		{ value: "Ankara", label: "Ankara" },
		{ value: "Jersey", label: "Jersey" },
		{ value: "Linen", label: "Linen" },
		{ value: "Denim", label: "Denim" },
		{ value: "Lace", label: "Lace" },
		{ value: "Others", label: "Others" },
	];

	const usageOptions = [
		{ value: "Dresses", label: "Dresses" },
		{ value: "Suits", label: "Suits" },
		{ value: "Uniforms", label: "Uniforms" },
		{ value: "Home Decor", label: "Home Decor" },
		{ value: "Casualwear", label: "Casualwear" },
		{ value: "Formalwear", label: "Formalwear" },
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
						id="fabricCategory"
						label="Fabric Category"
						options={fabricCategories}
						register={register("fabricCategory")}
						error={errors.fabricCategory?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="fabricDescription"
						label="Fabric Description"
						placeholder="e.g. Plain cotton, soft texture, medium weight, 60 inches wide"
						register={register("fabricDescription")}
						error={errors.fabricDescription?.message}
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
						id="sizeRange"
						label="Size Range"
						// placeholder="e.g. 60" width, 150–200 GSM
						placeholder="e.g. 60 inches wide, 150–200 GSM"
						register={register("sizeRange")}
						error={errors.sizeRange?.message}
						required
					/>

					<CurrencyInputField
						name="targetPrice"
						control={control}
						label="Target Price per Yard or Meter (NGN)"
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
						id="intendedUsage"
						label="Intended Usage or Application"
						options={usageOptions}
						register={register("intendedUsage")}
						error={errors.intendedUsage?.message}
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
						placeholder="Mention color preferences, delivery timelines, or certifications required"
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

export default FabricForm;
