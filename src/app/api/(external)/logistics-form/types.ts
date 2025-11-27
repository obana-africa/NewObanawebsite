export interface SenderInfo {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface ReceiverInfo {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface ShipmentData {
	shipmentRoute?: string;
	pickUp: string;
	destination: string;
	productCategory: string;
	productType: string;
	productWeight: string;
	dimension?: string;
	shipmentImage?: string;
	shipmentImageUrl?: string | null;
	formType: string;
	sender?: SenderInfo;
	receiver?: ReceiverInfo;
}

export interface LogisticsPartner {
	id?: string;
	name: string;
	price: number;
	estimatedDelivery: string;
}

export interface ContactInfo {
	fullName: string;
	email: string;
	phoneNumber: string;
}

export interface LogisticsFormData {
	shipmentRoute?: string;
	pickUp: string;
	destination: string;
	productCategory: string;
	productType: string;
	productWeight: string;
	dimension?: string;
	shipmentImage?: string;
	shipmentImageUrl?: string | null;
	formType: string;
	sender?: SenderInfo;
	receiver?: ReceiverInfo;
	logisticsPartner: LogisticsPartner;
	contactInfo: ContactInfo;
}
