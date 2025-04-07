import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { toast } from "sonner";

interface LabelFormProps {
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting: boolean;
}

const LabelForm: React.FC<LabelFormProps> = ({
	onBack,
	onSubmit,
	isSubmitting,
}) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(labelQuoteSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			labelType: "",
			materialType: "",
			size: "",
			moq: "",
			targetPrice: "",
			designRequirement: "",
			labelDesign: null,
		},
	});

	const labelTypes = [
		{ value: "woven", label: "Woven" },
		{ value: "printed", label: "Printed" },
		{ value: "leather", label: "Leather" },
	];

	const materialTypes = [
		{ value: "cotton", label: "Cotton" },
		{ value: "polyester", label: "Polyester" },
		{ value: "nylon", label: "Nylon" },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		console.log("Label form data:", data);
		toast.success("Form submitted successfully");
		onSubmit(data);
	};

	return (
		<div className="space-y-6">
			<h2 className="font-bold text-center text-primary">Request For Quote</h2>

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
						id="labelType"
						label="Label Type"
						options={labelTypes}
						register={register("labelType")}
						error={errors.labelType?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="materialType"
						label="Material Type"
						options={materialTypes}
						register={register("materialType")}
						error={errors.materialType?.message}
						required
					/>

					<FormInput
						id="size"
						label="Size"
						placeholder="Height X Width in cm or inches"
						register={register("size")}
						error={errors.size?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="moq"
						label="MOQ (Minimum order input)"
						placeholder="Number input"
						register={register("moq")}
						error={errors.moq?.message}
						type="number"
					/>

					<FormInput
						id="targetPrice"
						label="What is your target sourcing price point?"
						placeholder="Per unit"
						register={register("targetPrice")}
						error={errors.targetPrice?.message}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormFileUpload
						id="labelDesign"
						label="Label Image/ Design"
						register={register("labelDesign")}
					/>

					<FormInput
						id="designRequirement"
						label="Design Requirement"
						placeholder="Size: L x W x H"
						register={register("designRequirement")}
						error={errors.designRequirement?.message}
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

export default LabelForm;
