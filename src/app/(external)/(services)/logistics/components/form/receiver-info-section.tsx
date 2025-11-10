import React from "react";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";

interface ReceiverInfoSectionProps {
	register: any;
	errors: any;
	setValue: any;
	watchReceiverCountry: string;
	watchReceiverState: string;
	countryOptions: any[];
	receiverStateOptions: any[];
	receiverCityOptions: any[];
	countriesLoading: boolean;
	receiverStatesLoading: boolean;
	receiverCitiesLoading: boolean;
	receiverStates: any[];
	setReceiverStateName: (name: string) => void;
}

export const ReceiverInfoSection: React.FC<ReceiverInfoSectionProps> = ({
	register,
	errors,
	setValue,
	watchReceiverCountry,
	watchReceiverState,
	countryOptions,
	receiverStateOptions,
	receiverCityOptions,
	countriesLoading,
	receiverStatesLoading,
	receiverCitiesLoading,
	receiverStates,
	setReceiverStateName,
}) => {
	return (
		<div className="border border-accent rounded-lg p-4">
			<h3 className="font-semibold text-lg mb-4">Receiver Information</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					id="receiverFirstName"
					label="First Name"
					placeholder="Enter first name"
					register={register("receiverFirstName")}
					error={errors.receiverFirstName?.message}
					required
				/>
				<FormInput
					id="receiverLastName"
					label="Last Name"
					placeholder="Enter last name"
					register={register("receiverLastName")}
					error={errors.receiverLastName?.message}
					required
				/>
				<FormInput
					id="receiverEmail"
					label="Email"
					type="email"
					placeholder="receiver@example.com"
					register={register("receiverEmail")}
					error={errors.receiverEmail?.message}
					required
				/>
				<FormInput
					id="receiverPhone"
					label="Phone"
					type="tel"
					placeholder="+1234567890"
					register={register("receiverPhone")}
					error={errors.receiverPhone?.message}
					required
				/>
				<FormInput
					id="receiverAddress"
					label="Address"
					placeholder="Enter full address"
					register={register("receiverAddress")}
					error={errors.receiverAddress?.message}
					required
				/>
				<FormSelect
					id="receiverCountry"
					label="Country"
					options={countryOptions}
					register={register("receiverCountry")}
					error={errors.receiverCountry?.message}
					required
					searchable
					isLoading={countriesLoading}
					onChange={(
						value: string | React.ChangeEvent<HTMLSelectElement> | string[]
					) => {
						const newValue =
							typeof value === "string"
								? value
								: Array.isArray(value)
								? value[0]
								: value.target.value;
						setValue("receiverCountry", newValue);
						setValue("receiverState", "");
						setValue("receiverCity", "");
						setReceiverStateName("");
					}}
				/>
				<FormSelect
					id="receiverState"
					label="State/Province"
					options={receiverStateOptions}
					register={register("receiverState")}
					error={errors.receiverState?.message}
					required
					searchable
					isLoading={receiverStatesLoading}
					disabled={!watchReceiverCountry}
					onChange={(
						value: string | React.ChangeEvent<HTMLSelectElement> | string[]
					) => {
						const newValue =
							typeof value === "string"
								? value
								: Array.isArray(value)
								? value[0]
								: value.target.value;
						setValue("receiverState", newValue);
						setValue("receiverCity", "");
						const selectedState = receiverStates.find(
							(state) => state.isoCode === newValue
						);
						if (selectedState) {
							setReceiverStateName(selectedState.name);
						}
					}}
				/>
				<FormSelect
					id="receiverCity"
					label="City"
					options={receiverCityOptions}
					register={register("receiverCity")}
					error={errors.receiverCity?.message}
					required
					searchable
					isLoading={receiverCitiesLoading}
					disabled={!watchReceiverState}
				/>
				<FormInput
					id="receiverZip"
					label="ZIP/Postal Code"
					placeholder="Enter ZIP code"
					register={register("receiverZip")}
					error={errors.receiverZip?.message}
				/>
			</div>
		</div>
	);
};
