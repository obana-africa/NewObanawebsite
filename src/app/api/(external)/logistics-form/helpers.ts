export const formatFormType = (formType: string) => {
	switch (formType) {
		case "domestic":
			return "Within Nigeria Shipment";
		case "import":
			return "Import Shipment";
		case "export":
			return "Export Shipment";
		default:
			return formType.charAt(0).toUpperCase() + formType.slice(1);
	}
};
