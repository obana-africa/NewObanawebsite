"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { X, CheckCircle, AlertCircle, ChevronsRight } from "lucide-react";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormFileUpload from "@/components/ui/form-file-upload";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import Button from "@/components/ui/button";
import {
	useGetCountries,
	useGetStatesByCountryId,
	useGetCitiesByStateId,
} from "@/hooks/use-locations";
import { inventoryFinancingSchema } from "../schemas";
import PhoneInput from "@/components/ui/phone-input";
import { FormDataType } from "../types";

interface InventoryFinancingModalProps {
	isOpen: boolean;
	onClose: () => void;
	environment?: "production" | "development";
}

const InventoryFinancingModal: React.FC<InventoryFinancingModalProps> = ({
	isOpen,
	onClose,
	environment = "development",
}) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [currentStep, setCurrentStep] = useState<
		"main" | "form" | "success" | "error"
	>("main");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [uploadedFile, setUploadedFile] = useState<string | null>(null);

	// Location hooks
	const { data: countries } = useGetCountries();
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const { data: states } = useGetStatesByCountryId(selectedCountry);
	const { data: cities } = useGetCitiesByStateId(
		selectedState,
		selectedCountry
	);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FormDataType>({
		resolver: zodResolver(inventoryFinancingSchema),
		defaultValues: {
			salutation: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			password: "",
			dob: "",
			gender: "",
			businessName: "",
			businessType: "",
			tin: "",
			address: "",
			country: "",
			state: "",
			city: "",
			bankName: "",
			accountNumber: "",
			bvn: "",
			categoryOfInterest: [],
			brandOfInterest: [],
			terms: false,
		},
	});

	// Watch country and state to update dependent fields
	const watchedCountry = watch("country");
	const watchedState = watch("state");

	useEffect(() => {
		if (watchedCountry) {
			setSelectedCountry(watchedCountry);
			setValue("state", "");
			setValue("city", "");
		}
	}, [watchedCountry, setValue]);

	useEffect(() => {
		if (watchedState) {
			setSelectedState(watchedState);
			setValue("city", "");
		}
	}, [watchedState, setValue]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "auto";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleLogin = () => {
		const loginUrl =
			environment === "production"
				? "https://shop.obana.africa/login"
				: "https://staging.shop.obana.africa/login";
		window.open(loginUrl, "_blank");
		onClose();
	};

	const handleFileUploadComplete = (file: string | null) => {
		setUploadedFile(file);
		console.log("File uploaded:", file);
	};

	const onSubmit = async (data: FormDataType) => {
		console.log("Form submitted with data:", data);

		try {
			setIsLoading(true);
			setErrorMessage("");

			// Validate required fields before submission
			if (!data.email || !data.password || !data.phone) {
				throw new Error("Email, password, and phone are required");
			}

			if (!data.terms) {
				throw new Error("You must accept the terms and conditions");
			}

			console.log("Submitting to Google Form via API endpoint...");
			const googleFormApiUrl = "/api/shop/users/google-form-submit"; 
			const googleFormData = {
				firstName: data.firstName || "",
				lastName: data.lastName || "",
				email: data.email || "",
				phone: data.phone || "",
				address: data.address || "",
				bvn: data.bvn || "",
				tin: data.tin || "",
				gender: data.gender || "",
				accountNumber: data.accountNumber || "",
				bankName: data.bankName || "",
				businessName: data.businessName || "",
			};

			const googleFormResponse = await fetch(googleFormApiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(googleFormData),
			});

			const googleFormResult = await googleFormResponse.json();
			console.log("Google Form API response:", googleFormResult);

			if (!googleFormResponse.ok || !googleFormResult.success) {
				console.error("Google Form submission failed:", googleFormResult);
				throw new Error(
					googleFormResult.message || "Failed to submit to Google Form"
				);
			}

			console.log("Google Form submitted successfully ✅");

			const obanaRegistrationData = {	
				email: data.email,
				password: data.password,
				phone: data.phone,
				attributes: {
					first_name: data.firstName,
					last_name: data.lastName,
					contact_type: "customer",
					customer_sub_type: "individual",
					billing_address: data.address,
					billing_city: data.city,
					billing_state: data.state,
					billing_country: data.country,
					address: data.address,
					city: data.city,
					state: data.state,
					country: data.country,
					language_code: "en",
					account_types: "individual",
					category_of_interest: data.categoryOfInterest,
					brand_of_interest: data.brandOfInterest,
					businessName: data.businessName,
					salutation: data.salutation,
					gender: data.gender,
					dob: data.dob,
					terms: data.terms,
					business_type: data.businessType,
					tin: data.tin,
					bank_name: data.bankName,
					account_number: data.accountNumber,
					bvn: data.bvn,
					business_registration_file: uploadedFile,
				},
			};

			console.log("Submitting to Obana API:", obanaRegistrationData);

			const obanaResponse = await fetch("/api/shop/users/obana-sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(obanaRegistrationData),
			});

			const obanaResult = await obanaResponse.json();
			console.log("Obana API response:", obanaResult);

			if (!obanaResponse.ok) {
				console.error("Obana API Error:", obanaResult);
				throw new Error(
					obanaResult.message ||
						`Registration failed: ${obanaResponse.status} ${obanaResponse.statusText}`
				);
			}

			// Store registration data
			const registrationData = {
				requestId: obanaResult.data?.request_id || obanaResult.requestId,
				email: data.email,
				isInventoryFinancing: true,
			};

			console.log("Storing registration data:", registrationData);

			if (typeof window !== "undefined") {
				localStorage.setItem(
					"pendingRegistration",
					JSON.stringify(registrationData)
				);
			}

			setCurrentStep("success");

			const shopOtpUrl =
				environment === "development"
					? `https://shop.obana.africa/verify-otp?source=inventory-financing&email=${encodeURIComponent(
							data.email
					  )}&requestId=${registrationData.requestId}&isRegister=true`
					: `https://staging.shop.obana.africa/verify-otp?source=inventory-financing&email=${encodeURIComponent(
							data.email
					  )}&requestId=${registrationData.requestId}&isRegister=true`;

			console.log("OTP URL prepared:", shopOtpUrl);

			setTimeout(() => {
				window.open(shopOtpUrl, "_blank");
				onClose();
			}, 2000);
		} catch (error) {
			console.error("Form submission error:", error);
			const errorMsg =
				error instanceof Error ? error.message : "An unknown error occurred";
			setErrorMessage(errorMsg);
			setCurrentStep("error");
		} finally {
			setIsLoading(false);
		}
	};

	// const handleContinueShopping = () => {
	// 	const shopUrl =
	// 		environment === "production"
	// 			? "https://shop.obana.africa"
	// 			: "https://staging.shop.obana.africa";
	// 	window.open(shopUrl, "_blank");
	// 	onClose();
	// };

	const resetModal = () => {
		setCurrentStep("main");
		setErrorMessage("");
		setUploadedFile(null);
		reset();
	};

	// Options for form fields
	const salutationOptions = [
		{ value: "Mr.", label: "Mr." },
		{ value: "Mrs.", label: "Mrs." },
		{ value: "Ms.", label: "Ms." },
		{ value: "Dr.", label: "Dr." },
	];

	const genderOptions = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
	];

	const businessTypeOptions = [
		{ value: "sole_proprietorship", label: "Sole Proprietorship" },
		{ value: "partnership", label: "Partnership" },
		{ value: "corporation", label: "Corporation" },
		{ value: "llc", label: "Limited Liability Company" },
	];

	const bankOptions = [
		{ value: "Access Bank", label: "Access Bank" },
		{ value: "GTBank", label: "GTBank" },
		{ value: "First Bank", label: "First Bank" },
		{ value: "UBA", label: "UBA" },
		{ value: "Zenith Bank", label: "Zenith Bank" },
		{ value: "Fidelity Bank", label: "Fidelity Bank" },
		{ value: "Sterling Bank", label: "Sterling Bank" },
	];

	const categoryOptions = [
		{ value: "6519617000000134005", label: "Women" },
		{ value: "6519617000000134017", label: "Beauty" },
		{ value: "6519617000000134029", label: "Haberdashery" },
		{ value: "6519617000000134041", label: "Men" },
		{ value: "6519617000000134053", label: "Kids" },
	];

	const brandOptions = [
		{ value: "6519617000000112133", label: "Wrangler" },
		{ value: "6519617000000112201", label: "ADIDAS" },
		{ value: "6519617000000112255", label: "BOOHOOMAN" },
		{ value: "6519617000000112267", label: "Nike" },
		{ value: "6519617000000112279", label: "Zara" },
	];

	const renderMainView = () => (
		<div className="flex-1 p-6 flex flex-col items-center space-y-8">
			<div className="flex flex-col items-center justify-center gap-4">
				<Image src={logoImage} alt="Logo" width={120} height={40} />
				<h2 className="text-2xl font-bold text-center text-primary">
					Login or Register to Access Inventory Financing
				</h2>
				<p className="text-center text-gray-600">
					Get pre-qualified for inventory financing to access the stock you need
					without immediate financial strain.
				</p>
			</div>

			<div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 my-auto max-w-sm mx-auto">
				<Button
					onClick={handleLogin}
					variant="primary"
					animation="ripple"
					icon={<ChevronsRight />}
					iconPosition="right"
					className="rounded-sm w-full py-3 border-primary text-primary"
				>
					Login
				</Button>
				<Button
					onClick={() => setCurrentStep("form")}
					variant="primary"
					animation="ripple"
					icon={<ChevronsRight />}
					iconPosition="right"
					className="rounded-sm w-full py-3 border-primary text-primary"
				>
					Register
				</Button>
			</div>
		</div>
	);

	const renderFormView = () => (
		<div className="flex-1 p-6 overflow-y-auto max-h-[80vh]">
			<div className="flex flex-col items-center justify-center gap-4 mb-6">
				<h2 className="text-2xl font-bold text-center text-primary">
					Register for Inventory Financing
				</h2>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Personal Information */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">
						Personal Information
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormSelect
							id="salutation"
							label="Salutation"
							options={salutationOptions}
							register={register("salutation")}
							error={errors.salutation?.message}
						/>

						<FormSelect
							id="gender"
							label="Gender"
							options={genderOptions}
							register={register("gender")}
							error={errors.gender?.message}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormInput
							id="firstName"
							placeholder="First name"
							label="Enter your first Name"
							register={register("firstName")}
							error={errors.firstName?.message}
							required
						/>

						<FormInput
							id="lastName"
							placeholder="Last name"
							label="Enter your last Name"
							register={register("lastName")}
							error={errors.lastName?.message}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormInput
							id="email"
							placeholder="Enter your email"
							label="Email"
							type="email"
							register={register("email")}
							error={errors.email?.message}
							required
						/>

						<PhoneInput
							control={control}
							name="phone"
							label="Phone Number"
							error={errors.phone?.message}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormInput
							id="password"
							placeholder="Enter your password"
							label="Password"
							type="password"
							register={register("password")}
							error={errors.password?.message}
							required
						/>

						<FormInput
							id="dob"
							placeholder="Enter your date of birth"
							label="Date of Birth"
							type="date"
							register={register("dob")}
							error={errors.dob?.message}
						/>
					</div>
				</div>

				{/* Business Information */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">
						Business Information
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormInput
							id="businessName"
							placeholder="Enter your business name"
							label="Business Name"
							register={register("businessName")}
							error={errors.businessName?.message}
							required
						/>

						<FormSelect
							id="businessType"
							label="Business Type"
							options={businessTypeOptions}
							register={register("businessType")}
							error={errors.businessType?.message}
						/>
					</div>

					<FormInput
						id="tin"
						placeholder="Enter your TIN"
						label="TIN (Tax Identification Number)"
						register={register("tin")}
						error={errors.tin?.message}
						required
					/>
				</div>

				{/* Address Information */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">
						Address Information
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormSelect
							id="country"
							label="Country"
							options={countries || []}
							register={register("country")}
							error={errors.country?.message}
							searchable
							// isLoading={countriesLoading}
							required
						/>

						<FormSelect
							id="state"
							label="State/Province"
							options={states || []}
							register={register("state")}
							error={errors.state?.message}
							// isLoading={statesLoading}
							disabled={!watchedCountry}
							searchable
							required
						/>

						<FormSelect
							id="city"
							label="City"
							options={cities || []}
							register={register("city")}
							error={errors.city?.message}
							// isLoading={citiesLoading}
							disabled={!watchedState}
							searchable
							required
						/>
					</div>{" "}
					<FormInput
						id="address"
						placeholder="Enter your address"
						label="Home Address"
						register={register("address")}
						error={errors.address?.message}
					/>
				</div>

				{/* Bank Information */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">
						Bank Information
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormSelect
							id="bankName"
							label="Bank Name"
							options={bankOptions}
							register={register("bankName")}
							error={errors.bankName?.message}
							searchable
							required
						/>

						<FormInput
							id="accountNumber"
							placeholder="Enter your account number"
							label="Bank Account Number"
							register={register("accountNumber")}
							error={errors.accountNumber?.message}
							required
						/>
					</div>

					<FormInput
						id="bvn"
						placeholder="Enter your BVN"
						label="BVN (Bank Verification Number)"
						register={register("bvn")}
						error={errors.bvn?.message}
						required
					/>
				</div>

				{/* Business Interests */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">
						Business Interests
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormSelect
							id="categoryOfInterest"
							label="Category of Interest"
							options={categoryOptions}
							register={register("categoryOfInterest")}
							error={errors.categoryOfInterest?.message}
							multiple
							searchable
						/>

						<FormSelect
							id="brandOfInterest"
							label="Brand of Interest"
							options={brandOptions}
							register={register("brandOfInterest")}
							error={errors.brandOfInterest?.message}
							multiple
							searchable
						/>
					</div>
				</div>

				{/* Document Upload */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">Documents</h3>

					<FormFileUpload
						id="businessRegistrationFile"
						label="Business Registration Certificate"
						onUploadComplete={handleFileUploadComplete}
						accept=".pdf,.jpg,.jpeg,.png"
						fileTypes="PDF, JPG, PNG"
					/>
				</div>

				{/* Terms and Conditions */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-primary">Authorization</h3>

					<div className="flex items-start space-x-3">
						<input
							type="checkbox"
							id="terms"
							{...register("terms")}
							className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
						/>
						<label htmlFor="terms" className="text-sm text-gray-700">
							I authorize Obana to share my information with Salad Africa for
							loan pre-qualification and underwriting purposes.
						</label>
					</div>
					{errors.terms && (
						<p className="text-sm text-red-600">{errors.terms.message}</p>
					)}
				</div>

				<div className="flex flex-col sm:flex-row gap-4 pt-6">
					<Button
						onClick={() => setCurrentStep("main")}
						variant="outline"
						className="flex-1"
						disabled={isLoading}
					>
						Back
					</Button>
					<Button
						type="submit"
						variant="primary"
						animation="ripple"
						className="flex-1"
						disabled={isLoading}
					>
						{isLoading ? "Submitting..." : "Submit Application"}
					</Button>
				</div>
			</form>
		</div>
	);

	const renderSuccessView = () => (
		<div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
			<CheckCircle className="w-16 h-16 text-green-500" />
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-primary">
					Application Submitted Successfully!
				</h2>
				<p className="text-gray-600">
					Your inventory financing application has been submitted. You will
					receive a confirmation email shortly. You will be redirected to verify
					your OTP.
				</p>
			</div>
			<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
				<Button
					onClick={() => {
						// Get the stored request ID
						const storedData = localStorage.getItem("pendingRegistration");

						const requestId = storedData
							? JSON.parse(storedData).requestId
							: null;
						const email = storedData ? JSON.parse(storedData).email : null;

						console.log("REQUEST ID", requestId);
						console.log("EMAIL", email);

						const shopOtpUrl =
							environment === "development"
								? `https://shop.obana.africa/verify-otp?source=inventory-financing&requestId=${requestId}&isRegister=true`
								: `https://staging.shop.obana.africa/verify-otp?source=inventory-financing&email=${encodeURIComponent(
										email
								  )}&requestId=${requestId}&isRegister=true`;
						window.open(shopOtpUrl, "_blank");
						onClose();
					}}
					variant="primary"
					animation="ripple"
					className="flex-1"
				>
					Verify OTP & Continue Shopping
				</Button>
				<Button onClick={onClose} variant="outline" className="flex-1">
					Close
				</Button>
			</div>
		</div>
	);

	const renderErrorView = () => (
		<div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
			<AlertCircle className="w-16 h-16 text-red-500" />
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-red-600">Application Failed</h2>
				<p className="text-gray-600">{errorMessage}</p>
			</div>
			<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
				<Button
					onClick={resetModal}
					variant="primary"
					animation="ripple"
					className="flex-1"
				>
					Try Again
				</Button>
				<Button onClick={onClose} variant="outline" className="flex-1">
					Close
				</Button>
			</div>
		</div>
	);

	return (
		<div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center overflow-auto">
			<div
				ref={modalRef}
				className="bg-white w-full max-w-[800px] mx-4 rounded-lg shadow-lg overflow-hidden"
			>
				<div className="flex justify-end p-4">
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>

				{currentStep === "main" && renderMainView()}
				{currentStep === "form" && renderFormView()}
				{currentStep === "success" && renderSuccessView()}
				{currentStep === "error" && renderErrorView()}
			</div>
		</div>
	);
};

export default InventoryFinancingModal;
