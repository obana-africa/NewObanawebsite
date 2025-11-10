/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";

interface SenderInfoSectionProps {
	register: any;
	errors: any;
	setValue: any;
	watchSenderCountry: string;
	watchSenderState: string;
	countryOptions: any[];
	senderStateOptions: any[];
	senderCityOptions: any[];
	countriesLoading: boolean;
	senderStatesLoading: boolean;
	senderCitiesLoading: boolean;
	senderStates: any[];
	setSenderStateName: (name: string) => void;
}

export const SenderInfoSection: React.FC<SenderInfoSectionProps> = ({
	register,
	errors,
	setValue,
	watchSenderCountry,
	watchSenderState,
	countryOptions,
	senderStateOptions,
	senderCityOptions,
	countriesLoading,
	senderStatesLoading,
	senderCitiesLoading,
	senderStates,
	setSenderStateName,
}) => {
	return (
		<div className="border border-accent rounded-lg p-4">
			<h3 className="font-semibold text-lg mb-4">Sender Information</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormInput
					id="senderFirstName"
					label="First Name"
					placeholder="Enter first name"
					register={register("senderFirstName")}
					error={errors.senderFirstName?.message}
					required
				/>
				<FormInput
					id="senderLastName"
					label="Last Name"
					placeholder="Enter last name"
					register={register("senderLastName")}
					error={errors.senderLastName?.message}
					required
				/>
				<FormInput
					id="senderEmail"
					label="Email"
					type="email"
					placeholder="sender@example.com"
					register={register("senderEmail")}
					error={errors.senderEmail?.message}
					required
				/>
				<FormInput
					id="senderPhone"
					label="Phone"
					type="tel"
					placeholder="+1234567890"
					register={register("senderPhone")}
					error={errors.senderPhone?.message}
					required
				/>
				<FormInput
					id="senderAddress"
					label="Address"
					placeholder="Enter full address"
					register={register("senderAddress")}
					error={errors.senderAddress?.message}
					required
				/>
				<FormSelect
					id="senderCountry"
					label="Country"
					options={countryOptions}
					register={register("senderCountry")}
					error={errors.senderCountry?.message}
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
						setValue("senderCountry", newValue);
						setValue("senderState", "");
						setValue("senderCity", "");
						setSenderStateName("");
					}}
				/>
				<FormSelect
					id="senderState"
					label="State/Province"
					options={senderStateOptions}
					register={register("senderState")}
					error={errors.senderState?.message}
					required
					searchable
					isLoading={senderStatesLoading}
					disabled={!watchSenderCountry}
					onChange={(
						value: string | React.ChangeEvent<HTMLSelectElement> | string[]
					) => {
						const newValue =
							typeof value === "string"
								? value
								: Array.isArray(value)
								? value[0]
								: value.target.value;
						setValue("senderState", newValue);
						setValue("senderCity", "");
						const selectedState = senderStates.find(
							(state) => state.isoCode === newValue
						);
						if (selectedState) {
							setSenderStateName(selectedState.name);
						}
					}}
				/>
				<FormSelect
					id="senderCity"
					label="City"
					options={senderCityOptions}
					register={register("senderCity")}
					error={errors.senderCity?.message}
					required
					searchable
					isLoading={senderCitiesLoading}
					disabled={!watchSenderState}
				/>
				<FormInput
					id="senderZip"
					label="ZIP/Postal Code"
					placeholder="Enter ZIP code"
					register={register("senderZip")}
					error={errors.senderZip?.message}
				/>
			</div>
		</div>
	);
};
