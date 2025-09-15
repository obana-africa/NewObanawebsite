export interface FormDataType {
	// Personal Information
	salutation?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	dob?: string;
	gender?: string;

	// Business Information
	businessName: string;
	businessType?: string;
	tin: string;

	// Address Information
	address: string;
	country: string;
	state: string;
	city: string;

	// Bank Information
	bankName: string;
	accountNumber: string;
	bvn: string;

	// Additional Information
	categoryOfInterest?: string[];
	brandOfInterest?: string[];
	terms: boolean;
	businessRegistrationFile: string;
	proofOfAddressFile: string;
	statusReportFile: string;
	businessRegistrationBase64?: string;
	proofOfAddressBase64?: string;
	statusReportBase64?: string;
	businessRegistrationFileName: string; 
	proofOfAddressFileName: string; 
	statusReportFileName: string; 
}
