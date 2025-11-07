export const formatPhoneNumber = (phone: string, countryCode: string) => {
	if (phone.startsWith("+")) return phone;

	// Remove any non-digit characters
	const cleanPhone = phone.replace(/\D/g, "");

	// For Nigeria, ensure it starts with +234
	if (countryCode === "NG" && cleanPhone.startsWith("0")) {
		return `+234${cleanPhone.substring(1)}`;
	}

	// For other countries, you might need different formatting logic
	return `+${cleanPhone}`;
};
