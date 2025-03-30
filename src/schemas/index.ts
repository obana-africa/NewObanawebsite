import { z } from "zod";

export const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
});

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
	targetPrice: z.string().optional(),
	style: z.string().optional(),
	comment: z.string().optional(),
	sampleProduct: z.any().optional(),
});

export const labelQuoteSchema = baseQuoteSchema.extend({
	labelType: z.string().min(1, { message: "Label type is required" }),
	materialType: z.string().min(1, { message: "Material type is required" }),
	size: z.string().min(1, { message: "Size is required" }),
	moq: z.string().optional(),
	targetPrice: z.string().optional(),
	designRequirement: z.string().optional(),
	labelDesign: z.any().optional(),
});