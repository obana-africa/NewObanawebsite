import axios from "axios";

const CLOUDINARY_CLOUD = "tajiri";
const CLOUDINARY_PRESET = "o5dxfulx";

export const uploadToCloudinary = async (file: File): Promise<string> => {
	const fd = new FormData();
	fd.append("file", file);
	fd.append("upload_preset", CLOUDINARY_PRESET);
	const res = await axios.post(
		`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
		fd
	);
	return res.data.secure_url || res.data.url;
};
