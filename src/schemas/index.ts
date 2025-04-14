import {  z } from "zod";

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
	productType: z.string().min(1, { message: "Product type is required" }),
	itemDescription: z
		.string()
		.min(1, { message: "Item description is required" }),
	brandToSource: z.string().optional(),
	moq: z.string().optional(),
	sizeRange: z.string().min(1, { message: "Size range is required" }),
	// targetPrice: z.any().optional(),
	targetPrice: z.object({
		amount: z.number().min(0, "Amount must be positive"),
		currency: z.any(),
		symbol: z.any(),
	}),
	style: z.string().optional(),
	comment: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
});

export const labelQuoteSchema = baseQuoteSchema.extend({
	labelType: z.string().min(1, { message: "Label type is required" }),
	materialType: z.string().min(1, { message: "Material type is required" }),
	size: z.string().min(1, { message: "Size is required" }),
	moq: z.string().optional(),
	targetPrice: z.object({
		amount: z.number().min(0, "Amount must be positive"),
		currency: z.any(),
		symbol: z.any(),
	}),
	designRequirement: z.string().optional(),
	sampleProduct: z.any().optional(),
	sampleProductUrl: z.string().optional(),
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

		// shipmentImage: fileSchema
		// 	.refine((file) => {
		// 		if (!file) return true;
		// 		if (typeof file === "string") return true;
		// 		return file.size <= 5 * 1024 * 1024;
		// 	}, "File size must be less than 5MB")
		// 	.refine((file) => {
		// 		if (!file) return true;
		// 		if (typeof file === "string") return true;
		// 		return [
		// 			"image/jpeg",
		// 			"image/png",
		// 			"image/webp",
		// 			"application/pdf",
		// 		].includes(file.type);
		// 	}, "Only JPEG, PNG, WEBP, or PDF files are accepted")
		// 	.optional(),
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
