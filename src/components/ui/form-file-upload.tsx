import React, { useState, useRef, useEffect } from "react";
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload";
import { FileIcon, ImageIcon, FileTextIcon } from "lucide-react";

interface FormFileUploadProps {
	id: string;
	label: string;
	onUploadComplete: (url: string | null) => void;
	error?: string;
	required?: boolean;
	accept?: string;
	disabled?: boolean;
	fileTypes?: string;
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
	id,
	label,
	onUploadComplete,
	error,
	required = false,
	accept = "image/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
	disabled = false,
	fileTypes = "Images, Documents, PDFs",
}) => {
	const [fileName, setFileName] = useState<string | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [fileType, setFileType] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { uploadFile, isUploading } = useCloudinaryUpload();

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name);
		setFileType(file.type);

		// Create preview URL for images only
		if (file.type.startsWith('image/')) {
			const preview = URL.createObjectURL(file);
			setPreviewUrl(preview);
		} else {
			setPreviewUrl(null);
		}

		const url = await uploadFile(file);
		onUploadComplete(url);
	};

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const getFileIcon = () => {
		if (!fileName) return null;
		
		if (fileType?.startsWith('image/')) {
			return <ImageIcon className="w-4 h-4 mr-2 text-gray-500" />;
		} else if (fileType === 'application/pdf') {
			return <FileIcon className="w-4 h-4 mr-2 text-gray-500" />;
		} else {
			return <FileTextIcon className="w-4 h-4 mr-2 text-gray-500" />;
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
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
						accept={accept}
						disabled={disabled || isUploading}
					/>
					<label
						htmlFor={id}
						className={`bg-secondary-dark text-white px-4 py-1 rounded cursor-pointer inline-block ${
							disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						{isUploading ? "Uploading..." : "Choose File"}
					</label>
					<span className="ml-3 text-sm text-gray-600 truncate max-w-xs flex items-center">
						{fileName ? (
							<>
								{getFileIcon()}
								{fileName}
							</>
						) : (
							`No file chosen (${fileTypes})`
						)}
					</span>
				</div>
			</div>
			{/* {previewUrl && (
				<div className="mt-2">
					<Image
						src={previewUrl}
						alt="Preview"
						className="w-32 h-32 object-contain border rounded"
						width={128}
						height={128}
						loading="lazy"
					/>
				</div>
			)} */}
			{error && <p className="mt-1 text-sm text-error">{error}</p>}
		</div>
	);
};

export default FormFileUpload;
