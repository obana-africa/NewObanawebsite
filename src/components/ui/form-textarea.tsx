import React from "react";

interface FormTextareaProps {
	id: string;
	label: string;
	placeholder: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	error?: string;
	required?: boolean;
	rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
	id,
	label,
	placeholder,
	register,
	error,
	required = false,
	rows = 4,
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-error">*</span>}
			</label>
			<textarea
				id={id}
				placeholder={placeholder}
				rows={rows}
				{...register}
				className={`w-full p-3 border rounded-md ${
					error
						? "border-error"
						: "border-accent focus:border-primary focus:outline-1"
				}`}
			/>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormTextarea;
