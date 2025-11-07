/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getStateDisplayName = (stateCode: string, statesList: any[]) => {
	const state = statesList.find((s) => s.isoCode === stateCode);
	return state ? state.name : stateCode;
};
