export interface BaseFormData {
	name: string;
	email: string;
	phone: string;
	formType: string;
	comment?: string;
	sampleProduct?: string;
	sampleProductUrl?: string;
}

export interface ProductionFormData extends BaseFormData {
	productType: string;
	itemDescription: string;
	brandToSource?: string;
	moq?: string;
	sizeRange: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	style?: string;
}

export interface LabelFormData extends BaseFormData {
	labelType: string;
	materialType: string;
	size: string;
	moq?: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	designRequirement?: string;
}

export interface FabricFormData extends BaseFormData {
	fabricCategory: string;
	fabricDescription: string;
	preferredBrand?: string;
	moq?: string;
	sizeRange: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	intendedUsage?: string[];
	additionalComments?: string;
}

export interface RawMaterialFormData extends BaseFormData {
	rawMaterialType: string;
	materialDescription: string;
	preferredBrand?: string;
	moq?: string;
	sizeSpecRange: string;
	targetPrice?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	applicationUse?: string[];
	additionalComments?: string;
}

export interface TrademarkFormData extends BaseFormData {
	trademarkServiceType: string;
	industryCategory: string;
	brandName: string;
	brandDescription: string;
	registrationLocation: string;
	targetBudget?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	sampleLogo?: string;
	sampleLogoUrl?: string;
	additionalComments?: string;
}

export interface SmeIncubationFormData extends BaseFormData {
	businessName: string;
	businessDescription: string;
	businessStage: string;
	industryCategory: string;
	servicesRequired: string[];
	businessGoals: string;
	incubationDuration: string;
	targetBudget?: {
		amount: number;
		currency: string;
		symbol: string;
	};
	businessPlan?: string;
	businessPlanUrl?: string;
	additionalComments?: string;
}

export type FormData =
	| ProductionFormData
	| LabelFormData
	| FabricFormData
	| RawMaterialFormData
	| TrademarkFormData
	| SmeIncubationFormData;

export type PriceInfo = {
	amount: number;
	currency: string;
	symbol: string;
};
