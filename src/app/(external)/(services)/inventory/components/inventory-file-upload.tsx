import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Upload } from "lucide-react";
import { FormDataType } from "@/app/(external)/(services)/inventory/types";

type FileFieldId =
	| "businessRegistrationFile"
	| "proofOfAddressFile"
	| "statusReportFile";

interface FormFileUploadProps {
	id: FileFieldId;
	label: string;
	accept?: string;
	fileTypes?: string;
	error?: string;
	onUploadComplete?: (
		data: { url?: string; base64?: string; fileName?: string } | null
	) => void;
	required?: boolean;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	id,
	label,
	accept = ".pdf,.jpg,.jpeg,.png",
	fileTypes = "PDF, JPG, PNG",
	error,
	onUploadComplete,
	required,
}) => {
	const { setValue, setError, clearErrors } = useFormContext<FormDataType>();
	const [isUploading, setIsUploading] = useState(false);
	const [fileName, setFileName] = useState<string | null>(null);

	// Map file field IDs to their name and base64 field counterparts
	const fieldMap: Record<
		FileFieldId,
		{ nameField: keyof FormDataType; base64Field: keyof FormDataType }
	> = {
		businessRegistrationFile: {
			nameField: "businessRegistrationFileName",
			base64Field: "businessRegistrationBase64",
		},
		proofOfAddressFile: {
			nameField: "proofOfAddressFileName",
			base64Field: "proofOfAddressBase64",
		},
		statusReportFile: {
			nameField: "statusReportFileName",
			base64Field: "statusReportBase64",
		},
	};

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) {
				setValue(id, "", { shouldValidate: true });
				setValue(fieldMap[id].nameField, "", { shouldValidate: true });
				setValue(fieldMap[id].base64Field, undefined, { shouldValidate: true });
				setFileName(null);
				onUploadComplete?.(null);
				return;
			}

			setIsUploading(true);
			setFileName(file.name);

			try {
				if (file.size > 20 * 1024 * 1024) {
					throw new Error("File size exceeds 20MB limit");
				}

				const extension = file.name.toLowerCase().split(".").pop();
				let result: {
					url?: string;
					base64?: string;
					fileName?: string;
				} | null = null;

				if (
					extension === "jpg" ||
					extension === "jpeg" ||
					extension === "png"
				) {
					// Upload images to Cloudinary
					const formData = new FormData();
					formData.append("file", file);
					formData.append(
						"upload_preset",
						process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
					);

					const response = await fetch(
						`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
						{
							method: "POST",
							body: formData,
						}
					);

					const data = await response.json();
					if (!response.ok) {
						throw new Error(data.error?.message || "Failed to upload image");
					}

					result = {
						url: data.secure_url,
						fileName: file.name,
					};
				} else if (extension === "pdf") {
					const reader = new FileReader();
					const base64Promise = new Promise<string>((resolve) => {
						reader.onload = () => resolve(reader.result as string);
						reader.readAsDataURL(file);
					});
					const base64 = await base64Promise;

					result = {
						base64: base64.split(",")[1],
						fileName: file.name,
					};
				} else {
					throw new Error(`Unsupported file type: ${extension}`);
				}

				// Update form fields
				setValue(id, result.url || result.base64 || "", {
					shouldValidate: true,
				});
				setValue(fieldMap[id].nameField, result.fileName || "", {
					shouldValidate: true,
				});
				if (result.base64) {
					setValue(fieldMap[id].base64Field, result.base64, {
						shouldValidate: true,
					});
				} else {
					setValue(fieldMap[id].base64Field, undefined, {
						shouldValidate: true,
					});
				}
				clearErrors([id, fieldMap[id].nameField, fieldMap[id].base64Field]);
				onUploadComplete?.(result);
			} catch (error) {
				console.error("File upload error:", error);
				setError(id, {
					message:
						error instanceof Error ? error.message : "Failed to upload file",
				});
				setValue(id, "", { shouldValidate: true });
				setValue(fieldMap[id].nameField, "", { shouldValidate: true });
				setValue(fieldMap[id].base64Field, undefined, { shouldValidate: true });
				setFileName(null);
				onUploadComplete?.(null);
			} finally {
				setIsUploading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[id, setValue, setError, clearErrors, onUploadComplete]
	);

	return (
		<div className="space-y-2">
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label} {required && <span className="text-error">*</span>}
			</label>
			<div className="relative">
				<input
					id={id}
					type="file"
					accept={accept}
					onChange={handleFileChange}
					disabled={isUploading}
					className="hidden border-info"
				/>
				<label
					htmlFor={id}
					className={`flex items-center justify-center w-full h-12 px-4 py-2 border border-secondary-light rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
						isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
					}`}
				>
					<Upload className="w-5 h-5 mr-2" />
					{isUploading ? "Uploading..." : fileName || `Upload ${fileTypes}`}
				</label>
			</div>
			{error && <p className="text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormFileUpload;
