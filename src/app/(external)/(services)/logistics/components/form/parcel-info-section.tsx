import React from "react";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";

interface ParcelInfoSectionProps {
	register: any;
	errors: any;
}

export const ParcelInfoSection: React.FC<ParcelInfoSectionProps> = ({
	register,
	errors,
}) => {
	return (
		<div className="border border-accent rounded-lg p-4">
			<h3 className="font-semibold text-lg mb-4">Parcel Information</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					id="itemName"
					label="Item Name"
					placeholder="e.g., Laptop, Shoes"
					register={register("itemName")}
					error={errors.itemName?.message}
					required
				/>
				<FormInput
					id="itemDescription"
					label="Item Description"
					placeholder="Brief description"
					register={register("itemDescription")}
					error={errors.itemDescription?.message}
					required
				/>
				<FormInput
					id="itemWeight"
					label="Weight (kg)"
					type="number"
					step="0.01"
					placeholder="Weight in kg"
					register={register("itemWeight")}
					error={errors.itemWeight?.message}
					required
				/>
				<FormInput
					id="itemValue"
					label="Item Value"
					type="number"
					step="0.01"
					placeholder="Item value"
					register={register("itemValue")}
					error={errors.itemValue?.message}
					required
				/>
				<FormSelect
					id="itemCurrency"
					label="Currency"
					options={[
						{ value: "NGN", label: "NGN - Nigerian Naira" },
						{ value: "USD", label: "USD - US Dollar" },
						{ value: "EUR", label: "EUR - Euro" },
						{ value: "GBP", label: "GBP - British Pound" },
					]}
					register={register("itemCurrency")}
					error={errors.itemCurrency?.message}
				/>
			</div>
		</div>
	);
};
