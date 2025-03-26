"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import Button from "@/components/ui/button";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactForm } from "@/hooks/use-contactform";
import { contactFormSchema } from "@/schemas";

const PhoneInput = dynamic(
	() => import("react-phone-input-2").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-12 border border-accent focus:border-primary focus:outline-1 rounded-md animate-pulse" />
		),
	}
);

type FormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
	primary: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactForm: React.FC<ContactFormProps> = ({ primary }) => {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const { submitForm, isSubmitting } = useContactForm();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		if (!recaptchaValue) {
			toast.error("Please complete the reCAPTCHA");
			return;
		}
		console.log("data:", data);

		try {
			const success = await submitForm({ ...data, recaptcha: recaptchaValue });
			if (success) {
				reset();
				setRecaptchaValue(null);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error("There was an error submitting the form");
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className=" font-bold text-primary mb-2">Reach Out to Us Directly</h3>
			<p className="text-gray-600 mb-6">
				Fill in the form with the appropriate fields to send us a message
				directly and we will get back to immediately.
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							First Name
						</label>
						<input
							id="firstName"
							{...register("firstName")}
							placeholder="Enter your First Name"
							className={`w-full p-3 border rounded-md ${
								errors.firstName
									? "border-error"
									: "border-accent focus:border-primary focus:outline-1"
							}`}
						/>
						{errors.firstName && (
							<p className="mt-1 text-sm text-error">
								{errors.firstName.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Last Name
						</label>
						<input
							id="lastName"
							{...register("lastName")}
							placeholder="Enter your Last name"
							className={`w-full p-3 border rounded-md ${
								errors.lastName
									? "border-error"
									: "border-accent focus:border-primary focus:outline-1"
							}`}
						/>
						{errors.lastName && (
							<p className="mt-1 text-sm text-error">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div className="mb-4">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Phone Number
					</label>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<PhoneInput
								country={"ng"}
								value={field.value}
								onChange={field.onChange}
								inputStyle={{
									width: "100%",
									height: "48px",
									fontSize: "16px",
									borderColor: errors.phone ? "#EF4444" : "#D1D5DB",
								}}
								containerStyle={{
									width: "100%",
								}}
								inputProps={{
									name: "phone",
									id: "phone",
									placeholder: "Enter your phone number",
								}}
							/>
						)}
					/>
					{errors.phone && (
						<p className="mt-1 text-sm text-error">{errors.phone.message}</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Email Address
					</label>
					<input
						id="email"
						type="email"
						{...register("email")}
						placeholder="Enter your email address"
						className={`w-full p-3 border rounded-md ${
							errors.email
								? "border-error"
								: "border-accent focus:border-primary focus:outline-1"
						}`}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-error">{errors.email.message}</p>
					)}
				</div>

				{/* Message */}
				<div className="mb-4">
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Messages
					</label>
					<textarea
						id="message"
						{...register("message")}
						placeholder="Type in your messages"
						rows={6}
						className={`w-full p-3 border rounded-md ${
							errors.message
								? "border-error"
								: "border-accent focus:border-primary focus:outline-1"
						}`}
					/>
					{errors.message && (
						<p className="mt-1 text-sm text-error">{errors.message.message}</p>
					)}
				</div>
				<div className="mb-6">
					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
						onChange={(value) => setRecaptchaValue(value)}
					/>
					{!recaptchaValue && (
						<p className="mt-1 text-sm text-error">
							Please complete the reCAPTCHA
						</p>
					)}
				</div>

				{isSubmitting ? (
					<Button variant="primary" fullWidth disabled isLoading>
						Submitting...
					</Button>
				) : (
					<Button
						type="submit"
						variant="primary"
						animation="ripple"
						className="border border-primary"
						fullWidth
					>
						Submit
					</Button>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
