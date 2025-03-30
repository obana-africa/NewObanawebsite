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
import { toast } from "sonner";

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
			targetPrice: "",
			style: "",
			comment: "",
			sampleProduct: null,
		},
	});

	const productTypes = [
		{ value: "shoes", label: "Shoes" },
		{ value: "apparel", label: "Apparel" },
	];

	const itemDescriptions = [
		{ value: "casual", label: "Casual Wear" },
		{ value: "formal", label: "Formal Wear" },
		{ value: "sports", label: "Sports Wear" },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = (data: any) => {
		console.log("Production form data:", data);
		toast.success("Form submitted successfully");
		onSubmit(data);
	};

	return (
		<div className="space-y-6">
			<h2 className=" font-bold text-center text-primary">
				Request For Quote
			</h2>

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
						options={productTypes}
						register={register("productType")}
						error={errors.productType?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormSelect
						id="itemDescription"
						label="Item Description"
						options={itemDescriptions}
						register={register("itemDescription")}
						error={errors.itemDescription?.message}
						required
					/>

					<FormSelect
						id="brandToSource"
						label="What brand do you want to source"
						options={[
							{ value: "nike", label: "Nike" },
							{ value: "adidas", label: "Adidas" },
							{ value: "puma", label: "Puma" },
						]}
						register={register("brandToSource")}
						error={errors.brandToSource?.message}
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
						id="sizeRange"
						label="Suggested Size Range"
						placeholder="Height X Width in cm or inches"
						register={register("sizeRange")}
						error={errors.sizeRange?.message}
						required
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormInput
						id="targetPrice"
						label="What is your target sourcing price point"
						placeholder="Per unit"
						register={register("targetPrice")}
						error={errors.targetPrice?.message}
					/>

					<FormInput
						id="style"
						label="What style do you want"
						placeholder=""
						register={register("style")}
						error={errors.style?.message}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<FormFileUpload
						id="sampleProduct"
						label="Upload a sample product if you have"
						register={register("sampleProduct")}
					/>

					<div className="col-span-1 md:col-span-2">
						<FormTextarea
							id="comment"
							label="Extra Comment"
							placeholder=""
							register={register("comment")}
							error={errors.comment?.message}
							rows={4}
						/>
					</div>
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

export default ProductionForm;
