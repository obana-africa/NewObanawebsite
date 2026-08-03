"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from "react-phone-input-2";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useContactForm } from "@/hooks/use-contactform";
import { contactFormSchema } from "@/schemas";


const NAVY = "#1A324D";
const GOLD = "#F9C319";
const GOLD_TINT = "#FEF9E8";
const ERROR = "#EF4444";

type FormValues = z.infer<typeof contactFormSchema>;

const labelClasses = "block text-md font-semibold text-navy mb-2";

const fieldClasses = (hasError: boolean) =>
	`w-full rounded-md border px-4 py-3 text-navy bg-gold/10 placeholder:text-navy/50 focus:outline-none focus:ring-2 focus:ring-navy/30 transition-shadow ${
		hasError ? "border-error" : "border-gold"
	}`;

const ContactForm: React.FC = () => {
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
		<div>
			<h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
				Reach Out to Us Directly
			</h2>
			<p className="text-md text-navy/70 mb-8">
				Fill in the form with the appropriate fields to send us a message
				directly and we will get back to immediately.
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
					<div>
						<label htmlFor="firstName" className={labelClasses}>
							First Name
						</label>
						<input
							id="firstName"
							{...register("firstName")}
							placeholder="Enter your First Name"
							className={fieldClasses(!!errors.firstName)}
						/>
						{errors.firstName && (
							<p className="mt-1 text-sm text-error">
								{errors.firstName.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="lastName" className={labelClasses}>
							Last Name
						</label>
						<input
							id="lastName"
							{...register("lastName")}
							placeholder="Enter your Last Name"
							className={fieldClasses(!!errors.lastName)}
						/>
						{errors.lastName && (
							<p className="mt-1 text-sm text-error">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div className="mb-5">
					<label htmlFor="phone" className={labelClasses}>
						Phone Number <span className="text-gold">*</span>
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
									height: "50px",
									fontSize: "16px",
									color: NAVY,
									backgroundColor: GOLD_TINT,
									borderColor: errors.phone ? ERROR : GOLD,
									borderRadius: "0.375rem",
								}}
								buttonStyle={{
									backgroundColor: GOLD_TINT,
									borderColor: errors.phone ? ERROR : GOLD,
									borderTopLeftRadius: "0.375rem",
									borderBottomLeftRadius: "0.375rem",
								}}
								containerStyle={{ width: "100%" }}
								inputProps={{
									name: "phone",
									id: "phone",
									placeholder: "+234 *** *** ****",
								}}
							/>
						)}
					/>
					{errors.phone && (
						<p className="mt-1 text-sm text-error">{errors.phone.message}</p>
					)}
				</div>

				<div className="mb-5">
					<label htmlFor="email" className={labelClasses}>
						Email Address
					</label>
					<input
						id="email"
						type="email"
						{...register("email")}
						placeholder="Enter your email address"
						className={fieldClasses(!!errors.email)}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-error">{errors.email.message}</p>
					)}
				</div>

				<div className="mb-5">
					<label htmlFor="message" className={labelClasses}>
						Messages
					</label>
					<textarea
						id="message"
						{...register("message")}
						placeholder="Type in your messages"
						rows={6}
						className={fieldClasses(!!errors.message)}
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

				<button
					type="submit"
					disabled={isSubmitting}
					className="flex w-full items-center justify-center gap-2 rounded-md bg-navy px-4 py-4 text-md font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
				>
					{isSubmitting && (
						<svg
							className="animate-spin h-4 w-4 text-current"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					)}
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
