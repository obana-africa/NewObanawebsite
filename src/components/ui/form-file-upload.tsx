import React, { useState } from "react";

interface FormFileUploadProps {
	id: string;
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: any;
	error?: string;
	required?: boolean;
	accept?: string;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	id,
	label,
	register,
	error,
	required = false,
	accept,
}) => {
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			// Call the register's onChange if it exists
			if (register.onChange) {
				register.onChange(e);
			}
		} else {
			setFileName(null);
		}
	};

	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700 mb-1"
			>
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<div className="flex items-center gap-2">
				<div className="border border-secondary-light rounded-md p-2 flex-1 flex items-center">
					<input
						type="file"
						id={id}
						className="hidden"
						{...register}
						onChange={handleFileChange}
						accept={accept}
					/>
					<label
						htmlFor={id}
						className="bg-secondary-dark text-white px-4 py-1 rounded cursor-pointer inline-block"
					>
						Choose File
					</label>
					<span className="ml-3 text-sm text-gray-600 truncate max-w-xs">
						{fileName || "No file chosen"}
					</span>
				</div>
			</div>
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormFileUpload;
