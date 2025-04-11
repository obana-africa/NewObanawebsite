import { useState } from "react";

export const useCloudinaryUpload = () => {
	const [isUploading, setIsUploading] = useState(false);

	const uploadImage = async (file: File) => {
		if (!file) return null;

		setIsUploading(true);

		try {
			const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
			const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

			if (!cloudName || !uploadPreset) {
				throw new Error("Cloudinary configuration is missing");
			}

			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", uploadPreset || "");

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const data = await response.json();
			return data.secure_url;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Upload error:", error);
			return null;
		} finally {
			setIsUploading(false);
		}
	};

	return { uploadImage, isUploading };
};
