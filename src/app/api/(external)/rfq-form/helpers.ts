import {
	FormData,
	ProductionFormData,
	LabelFormData,
	FabricFormData,
	RawMaterialFormData,
	TrademarkFormData,
	SmeIncubationFormData,
	PriceInfo,
} from "./types";

export const formatPrice = (price?: PriceInfo) => {
	if (!price) return { currency: "", amount: "" };
	return {
		currency: price.currency,
		amount: `${price.symbol}${price.amount.toLocaleString()}`,
	};
};

export const formatFormType = (formType: string) => {
	switch (formType) {
		case "production":
			return "Production";
		case "brandLabel":
			return "Brand Label";
		case "fabricSourcing":
			return "Fabric Sourcing";
		case "rawMaterial":
			return "Raw Material";
		case "brandTrademarking":
			return "Brand Trademarking";
		case "smeIncubation":
			return "SME Incubation";
		default:
			return formType;
	}
};

export function isProductionForm(data: FormData): data is ProductionFormData {
	return data.formType === "production";
}

export function isLabelForm(data: FormData): data is LabelFormData {
	return data.formType === "brandLabel";
}

export function isFabricForm(data: FormData): data is FabricFormData {
	return data.formType === "fabricSourcing";
}

export function isRawMaterialForm(data: FormData): data is RawMaterialFormData {
	return data.formType === "rawMaterial";
}

export function isTrademarkForm(data: FormData): data is TrademarkFormData {
	return data.formType === "brandTrademarking";
}

export function isSmeIncubationForm(
	data: FormData
): data is SmeIncubationFormData {
	return data.formType === "smeIncubation";
}
