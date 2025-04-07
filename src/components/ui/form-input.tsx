import React from "react";

interface FormInputProps {
	id: string;
	label: string;
	placeholder: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	error?: string;
	required?: boolean;
	type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
	id,
	label,
	placeholder,
	register,
	error,
	required = false,
	type = "text",
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-error">*</span>}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register}
				className={`w-full p-3 border rounded-md ${
					error
						? "border-error"
						: "border-secondary-light focus:border-primary focus:outline-1"
				}`}
			/>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormInput;
