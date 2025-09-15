import { z } from "zod";

export const inventoryFinancingSchema = z.object({
	salutation: z.string().optional(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	phone: z.string().min(1, "Phone number is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	dob: z.string().optional(),
	gender: z.string().optional(),
	businessName: z.string().min(1, "Business name is required"),
	businessType: z.string().optional(),
	tin: z.string().min(1, "TIN is required"),
	address: z.string().min(1, "Address is required"),
	country: z.string().min(1, "Country is required"),
	state: z.string().min(1, "State is required"),
	city: z.string().min(1, "City is required"),
	bankName: z.string().min(1, "Bank name is required"),
	accountNumber: z.string().min(1, "Account number is required"),
	bvn: z.string().min(1, "BVN is required"),
	categoryOfInterest: z.array(z.string()).optional(),
	brandOfInterest: z.array(z.string()).optional(),
	terms: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms and conditions",
	}),
	businessRegistrationFile: z
		.string()
		.min(1, "Business registration certificate is required"),
	proofOfAddressFile: z.string().min(1, "Proof of address is required"),
	statusReportFile: z.string().min(1, "Business status report is required"),
	businessRegistrationBase64: z.string().optional(),
	proofOfAddressBase64: z.string().optional(),
	statusReportBase64: z.string().optional(),
	businessRegistrationFileName: z
		.string()
		.min(1, "Business registration file name is required"),
	proofOfAddressFileName: z
		.string()
		.min(1, "Proof of address file name is required"),
	statusReportFileName: z
		.string()
		.min(1, "Business status report file name is required"),
});
