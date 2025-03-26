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
