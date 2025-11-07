import { z } from "zod";

export const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
});
// const fileSchema = z.instanceof(File).optional().or(z.string().optional());

export const contactFormSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	phone: z.string().min(6, "Valid phone number is required"),
	email: z.string().email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

export const baseQuoteSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email({ message: "Invalid email address" }),
	phone: z.string().min(1, { message: "Phone number is required" }),
});

export const productionQuoteSchema = baseQuoteSchema.extend({
	productType: z.string().optional(),
	itemDescription: z
		.string()
		.min(1, { message: "Item description is required" }),
	brandToSource: z.string().optional(),
	moq: z.string().optional(),
	sizeRange: z.string().min(1, { message: "Size range is required" }),
	// targetPrice: z.any().optional(),
	targetPrice: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	style: z.string().optional(),
	comment: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
});

export const labelQuoteSchema = baseQuoteSchema.extend({
	labelType: z.string().optional(),
	materialType: z.string().min(1, { message: "Material type is required" }),
	size: z.string().min(1, { message: "Size is required" }),
	moq: z.string().optional(),
	targetPrice: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	designRequirement: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
});

export const domesticShipmentSchema = z
	.object({
		// shipmentRoute: z
		// 	.string({
		// 		required_error: "Shipment route is required",
		// 	})
		// 	.min(1, "Please select a shipment route"),

		pickUp: z
			.string({
				required_error: "Pickup location is required",
			})
			.min(1, "Please select a pickup location"),

		destination: z
			.string({
				required_error: "Destination is required",
			})
			.min(1, "Please select a destination"),

		productCategory: z
			.string({
				required_error: "Product category is required",
			})
			.min(1, "Please select a product category"),

		productType: z
			.string({
				required_error: "Product type is required",
			})
			.min(1, "Product type is required")
			.max(100, "Product type must be less than 100 characters"),

		productWeight: z
			.string({
				required_error: "Product weight is required",
			})
			.min(1, "Product weight is required")
			.regex(/^\d*\.?\d*$/, "Must be a valid number"),

		dimension: z
			.string()
			.max(50, "Dimension must be less than 50 characters")
			.optional(),
		shipmentImage: z.any().optional(),
	})
	.refine(
		(data) => {
			if (data.pickUp && data.destination) {
				return data.pickUp !== data.destination;
			}
			return true;
		},
		{
			message: "Pickup and destination cannot be the same",
			path: ["destination"],
		}
	);

export const domesticFormSchema = z.object({
	senderFirstName: z.string().min(1, "Sender first name is required"),
	senderLastName: z.string().min(1, "Sender last name is required"),
	senderEmail: z.string().email("Valid email required"),
	senderPhone: z.string().min(5, "Phone number required"),
	senderAddress: z.string().min(5, "Address required"),
	senderCity: z.string().min(1, "City required"),
	senderState: z.string().min(1, "State required"),
	senderCountry: z.string().min(2, "Country required"),
	senderZip: z.string().optional(),

	receiverFirstName: z.string().min(1, "Receiver first name is required"),
	receiverLastName: z.string().min(1, "Receiver last name is required"),
	receiverEmail: z.string().email("Valid email required"),
	receiverPhone: z.string().min(5, "Phone number required"),
	receiverAddress: z.string().min(5, "Address required"),
	receiverCity: z.string().min(1, "City required"),
	receiverState: z.string().min(1, "State required"),
	receiverCountry: z.string().min(2, "Country required"),
	receiverZip: z.string().optional(),

	itemName: z.string().min(1, "Item name required"),
	itemDescription: z.string().min(1, "Item description required"),
	itemValue: z.string().min(1, "Item value required"),
	itemWeight: z.string().min(1, "Item weight required"),
	itemCurrency: z.string().default("NGN"),
});

export const senderReceiverSchema = z.object({
	sender: z.object({
		name: z
			.string({
				required_error: "Sender name is required",
			})
			.min(1, "Sender name is required")
			.max(100, "Sender name must be less than 100 characters"),

		email: z
			.string({
				required_error: "Sender email is required",
			})
			.email("Please enter a valid email address"),

		phone: z.string().min(6, "Valid phone number is required"),

		address: z
			.string({
				required_error: "Sender address is required",
			})
			.min(5, "Address must be at least 5 characters")
			.max(200, "Address must be less than 200 characters"),
	}),

	receiver: z.object({
		name: z
			.string({
				required_error: "Receiver name is required",
			})
			.min(1, "Receiver name is required")
			.max(100, "Receiver name must be less than 100 characters"),

		email: z
			.string({
				required_error: "Receiver email is required",
			})
			.email("Please enter a valid email address"),

		phone: z.string().min(6, "Valid phone number is required"),

		address: z
			.string({
				required_error: "Receiver address is required",
			})
			.min(5, "Address must be at least 5 characters")
			.max(200, "Address must be less than 200 characters"),
	}),
});

export const importShipmentSchema = z
	.object({
		shipmentRoute: z
			.string({
				required_error: "Shipment route is required",
			})
			.min(1, "Please select a shipment route"),

		pickUp: z
			.string({
				required_error: "Pickup location is required",
			})
			.min(1, "Please select a pickup location"),

		destination: z
			.string({
				required_error: "Destination is required",
			})
			.min(1, "Please select a destination"),

		productCategory: z
			.string({
				required_error: "Product category is required",
			})
			.min(1, "Please select a product category"),

		productType: z
			.string({
				required_error: "Product type is required",
			})
			.min(1, "Product type is required")
			.max(100, "Product type must be less than 100 characters"),

		productWeight: z
			.string({
				required_error: "Product weight is required",
			})
			.min(1, "Product weight is required")
			.regex(/^\d*\.?\d*$/, "Must be a valid number"),

		dimension: z
			.string()
			.max(50, "Dimension must be less than 50 characters")
			.optional(),
		shipmentImage: z.any().optional(),
	})
	.refine(
		(data) => {
			if (data.pickUp && data.destination) {
				return data.pickUp !== data.destination;
			}
			return true;
		},
		{
			message: "Pickup and destination cannot be the same",
			path: ["destination"],
		}
	);

export const fabricQuoteSchema = baseQuoteSchema.extend({
	fabricCategory: z.string().min(1, { message: "Fabric category is required" }),
	fabricDescription: z
		.string()
		.min(1, { message: "Fabric description is required" }),
	preferredBrand: z.string().optional(),
	moq: z.string().optional(),
	sizeRange: z.string().min(1, { message: "Size range is required" }),
	targetPrice: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	intendedUsage: z.array(z.string()).optional(),
	additionalComments: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
});

export const rawMaterialQuoteSchema = baseQuoteSchema.extend({
	rawMaterialType: z
		.string()
		.min(1, { message: "Raw material type is required" }),
	materialDescription: z
		.string()
		.min(1, { message: "Material description is required" }),
	preferredBrand: z.string().optional(),
	moq: z.string().optional(),
	sizeSpecRange: z
		.string()
		.min(1, { message: "Size/Specification range is required" }),
	targetPrice: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	applicationUse: z.array(z.string()).optional(),
	additionalComments: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
});

export const trademarkQuoteSchema = baseQuoteSchema.extend({
	trademarkServiceType: z
		.string()
		.min(1, { message: "Service type is required" }),
	industryCategory: z
		.string()
		.min(1, { message: "Industry category is required" }),
	brandName: z.string().min(1, { message: "Brand name is required" }),
	brandDescription: z
		.string()
		.min(1, { message: "Brand description is required" }),
	registrationLocation: z
		.string()
		.min(1, { message: "Registration location is required" }),
	targetBudget: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	additionalComments: z.string().optional(),
	sampleLogo: z.any().optional(),
	sampleLogoUrl: z.string().optional(),
});

export const smeIncubationQuoteSchema = baseQuoteSchema.extend({
	businessName: z.string().min(1, { message: "Business name is required" }),
	businessDescription: z
		.string()
		.min(1, { message: "Business description is required" }),
	businessStage: z.string().min(1, { message: "Business stage is required" }),
	industryCategory: z
		.string()
		.min(1, { message: "Industry category is required" }),
	servicesRequired: z
		.array(z.string())
		.min(1, { message: "At least one service is required" }),
	businessGoals: z.string().min(1, { message: "Business goals are required" }),
	incubationDuration: z
		.string()
		.min(1, { message: "Incubation duration is required" }),
	targetBudget: z.object({
		amount: z.number().min(0, { message: "Amount must be positive" }),
		currency: z.any(),
		symbol: z.any(),
	}),
	businessPlan: z.any().optional(),
	businessPlanUrl: z.string().optional(),
	additionalComments: z.string().optional(),
});
