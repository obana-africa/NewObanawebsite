import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trademarkQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";

interface TrademarkFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const TrademarkForm: React.FC<TrademarkFormProps> = ({
	onBack,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		resolver: zodResolver(trademarkQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			trademarkServiceType: "",
			industryCategory: "",
			brandName: "",
			brandDescription: "",
			registrationLocation: "",
			targetBudget: {},
			sampleLogo: null,
			sampleLogoUrl: "",
			additionalComments: "",
		},
	});

	const serviceTypes = [
		{ value: "brand_name", label: "Brand Name Only" },
		{ value: "logo", label: "Logo Only" },
		{ value: "brand_logo", label: "Brand Name + Logo" },
		{ value: "slogan", label: "Slogan" },
		{ value: "others", label: "Others" },
	];

	const industryCategories = [
		{ value: "apparel", label: "Apparel & Fashion" },
		{ value: "cosmetics", label: "Cosmetics & Personal Care" },
		{ value: "technology", label: "Technology & Software" },
		{ value: "food", label: "Food & Beverage" },
		{ value: "healthcare", label: "Healthcare & Pharmaceuticals" },
		{ value: "education", label: "Education & Training" },
		{ value: "manufacturing", label: "Manufacturing & Industrial" },
		{ value: "retail", label: "Retail & E-commerce" },
		{ value: "entertainment", label: "Entertainment & Media" },
		{ value: "financial", label: "Financial Services" },
		{ value: "real_estate", label: "Real Estate" },
		{ value: "others", label: "Others" },
	];

	const registrationLocations = [
		{ value: "nigeria", label: "Nigeria (Local Registration)" },
		{ value: "africa", label: "Africa (ARIPO/OAPI Registration)" },
		{ value: "usa", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "eu", label: "European Union" },
		{ value: "global", label: "Global (WIPO)" },
	];

	const handleFileUploadComplete = (url: string | null) => {
		setValue("sampleLogoUrl", url || "");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		console.log("Form Data:", data);
		// onSubmit({
		//     ...data,
		//     sampleLogo: data.sampleLogoUrl || null,
		// });
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
						id="trademarkServiceType"
						label="Type of Trademark Service"
						options={serviceTypes}
						register={register("trademarkServiceType")}
						error={errors.trademarkServiceType?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="industryCategory"
						label="Industry Category / Business Sector"
						options={industryCategories}
						register={register("industryCategory")}
						error={errors.industryCategory?.message}
						required
					/>

					<FormInput
						id="brandName"
						label="Brand Name to Trademark"
						placeholder="e.g. Icon Luxe"
						register={register("brandName")}
						error={errors.brandName?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="brandDescription"
						label="Brand Use / Description"
						placeholder="e.g. Used for fashion retail business dealing in clothing, shoes, and accessories"
						register={register("brandDescription")}
						error={errors.brandDescription?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="registrationLocation"
						label="Trademark Registration Location"
						options={registrationLocations}
						register={register("registrationLocation")}
						error={errors.registrationLocation?.message}
						required
					/>

					<CurrencyInputField
						name="targetBudget"
						control={control}
						label="Target Budget for Trademarking"
						placeholder="Enter amount"
						defaultValue={{ currency: "NGN", symbol: "₦" }}
						className=""
						error={
							typeof errors.targetBudget?.message === "string"
								? errors.targetBudget?.message
								: undefined
						}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormFileUpload
						id="sampleLogo"
						label="Upload Logo or Sample"
						onUploadComplete={handleFileUploadComplete}
						accept="image/*, application/pdf"
					/>

					<FormTextarea
						id="additionalComments"
						label="Additional Comments or Requirements"
						placeholder="Mention urgency, previous filings, or legal concerns if any"
						register={register("additionalComments")}
						error={errors.additionalComments?.message}
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

export default TrademarkForm;
