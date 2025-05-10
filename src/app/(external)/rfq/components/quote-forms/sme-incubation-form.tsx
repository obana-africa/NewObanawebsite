import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { smeIncubationQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";

interface SmeIncubationFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const SmeIncubationForm: React.FC<SmeIncubationFormProps> = ({
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
		resolver: zodResolver(smeIncubationQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			businessName: "",
			businessDescription: "",
			businessStage: "",
			industryCategory: "",
			servicesRequired: [],
			businessGoals: "",
			incubationDuration: "",
			targetBudget: {},
			businessPlan: null,
			businessPlanUrl: "",
			additionalComments: "",
		},
	});

	const businessStages = [
		{ value: "Idea Stage", label: "Idea Stage" },
		{ value: "Startup (Pre-revenue)", label: "Startup (Pre-revenue)" },
		{ value: "Early Growth", label: "Early Growth" },
		{ value: "Scale-up", label: "Scale-up" },
		{ value: "Established Business", label: "Established Business" },
	];

	const industryCategories = [
		{ value: "Apparel & Fashion", label: "Apparel & Fashion" },
		{ value: "Technology & Software", label: "Technology & Software" },
		{ value: "Food & Beverage", label: "Food & Beverage" },
		{ value: "Health & Wellness", label: "Health & Wellness" },
		{ value: "Education & Training", label: "Education & Training" },
		{ value: "Financial Services", label: "Financial Services" },
		{ value: "E-commerce", label: "E-commerce" },
		{ value: "Manufacturing", label: "Manufacturing" },
		{ value: "Others", label: "Others" },
	];

	const incubationServices = [
		{
			value: "Business Strategy Development",
			label: "Business Strategy Development",
		},
		{
			value: "Financial Planning & Management",
			label: "Financial Planning & Management",
		},
		{
			value: "Product Development Support",
			label: "Product Development Support",
		},
		{ value: "Marketing & Branding", label: "Marketing & Branding" },
		{ value: "Networking & Partnerships", label: "Networking & Partnerships" },
		{
			value: "Legal Support & Compliance",
			label: "Legal Support & Compliance",
		},
		{
			value: "Funding/Investment Opportunities",
			label: "Funding/Investment Opportunities",
		},
		{ value: "Mentorship & Coaching", label: "Mentorship & Coaching" },
		{
			value: "Market Research & Analysis",
			label: "Market Research & Analysis",
		},
		{ value: "Technology & IT Support", label: "Technology & IT Support" },
	];

	const incubationDurations = [
		{ value: "3 Months", label: "3 Months" },
		{ value: "6 Months", label: "6 Months" },
		{ value: "12 Months", label: "12 Months" },
		{ value: "Custom", label: "Custom" },
	];

	const handleFileUploadComplete = (url: string | null) => {
		setValue("businessPlanUrl", url || "");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		// console.log("Form Data:", data);
		onSubmit({
			...data,
			businessPlan: data.businessPlanUrl || null,
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

					<FormInput
						id="businessName"
						label="Business Name"
						placeholder="e.g. ABC Clothing Solutions"
						register={register("businessName")}
						error={errors.businessName?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="businessDescription"
						label="Business Description"
						placeholder="e.g. A clothing line specializing in sustainable fashion for women"
						register={register("businessDescription")}
						error={errors.businessDescription?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="businessStage"
						label="Business Stage"
						options={businessStages}
						register={register("businessStage")}
						error={errors.businessStage?.message}
						required
					/>

					<FormSelect
						id="industryCategory"
						label="Industry Category / Business Sector"
						options={industryCategories}
						register={register("industryCategory")}
						error={errors.industryCategory?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="servicesRequired"
						label="Services Required for Incubation"
						options={incubationServices}
						register={register("servicesRequired")}
						error={errors.servicesRequired?.message}
						multiple
						required
					/>

					<FormSelect
						id="incubationDuration"
						label="Duration of Incubation Support"
						options={incubationDurations}
						register={register("incubationDuration")}
						error={errors.incubationDuration?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="businessGoals"
						label="Business Goals for Incubation"
						placeholder="e.g. Expand market presence, secure funding, streamline operations"
						register={register("businessGoals")}
						error={errors.businessGoals?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<CurrencyInputField
						name="targetBudget"
						control={control}
						label="Budget for Incubation Services"
						placeholder="Enter amount"
						defaultValue={{ currency: "NGN", symbol: "₦" }}
						className=""
						error={
							typeof errors.targetBudget?.message === "string"
								? errors.targetBudget?.message
								: undefined
						}
					/>

					<FormFileUpload
						id="businessPlan"
						label="Upload Business Plan"
						onUploadComplete={handleFileUploadComplete}
						accept=".pdf,.doc,.docx"
						fileTypes=".pdf,.doc,.docx"
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4">
					<FormTextarea
						id="additionalComments"
						label="Additional Comments or Requirements"
						placeholder="e.g. Any specific industry partnerships, resources needed, etc."
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

export default SmeIncubationForm;
