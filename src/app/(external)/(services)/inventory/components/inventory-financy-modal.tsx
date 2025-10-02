import React, { useState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { X, CheckCircle, AlertCircle, ChevronsRight } from "lucide-react";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
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
import FormFileUpload from "@/app/(external)/(services)/inventory/components/inventory-file-upload";

interface InventoryFinancingModalProps {
	isOpen: boolean;
	onClose: () => void;
	environment?: "production" | "development";
}

interface UploadedFiles {
	businessRegistrationFile: {
		url?: string;
		base64?: string;
		fileName?: string;
	} | null;
	proofOfAddressFile: {
		url?: string;
		base64?: string;
		fileName?: string;
	} | null;
	statusReportFile: { url?: string; base64?: string; fileName?: string } | null;
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
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
		businessRegistrationFile: null,
		proofOfAddressFile: null,
		statusReportFile: null,
	});

	const { data: countries } = useGetCountries();
	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const { data: states } = useGetStatesByCountryId(selectedCountry);
	const { data: cities } = useGetCitiesByStateId(
		selectedState,
		selectedCountry
	);

	const methods = useForm<FormDataType>({
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
			businessRegistrationFile: "",
			proofOfAddressFile: "",
			statusReportFile: "",
			businessRegistrationBase64: undefined,
			proofOfAddressBase64: undefined,
			statusReportBase64: undefined,
			businessRegistrationFileName: "",
			proofOfAddressFileName: "",
			statusReportFileName: "",
			inventoryFinancingType: "",
		},
	});

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isValid },
		reset,
		trigger,
	} = methods;

	useEffect(() => {
		if (watch("country")) {
			setSelectedCountry(watch("country"));
			setValue("state", "");
			setValue("city", "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("country"), setValue]);

	useEffect(() => {
		if (watch("state")) {
			setSelectedState(watch("state"));
			setValue("city", "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("state"), setValue]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
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

	const handleFileUploadComplete = (
		data: { url?: string; base64?: string; fileName?: string } | null,
		fileType: keyof UploadedFiles
	) => {
		setUploadedFiles((prev) => ({
			...prev,
			[fileType]: data,
		}));
		setValue(fileType as keyof FormDataType, data?.url || data?.base64 || "", {
			shouldValidate: true,
		});
		setValue(`${fileType}Name` as keyof FormDataType, data?.fileName || "", {
			shouldValidate: true,
		});
		const base64Field = `${fileType.replace(
			"File",
			""
		)}Base64` as keyof FormDataType;
		if (data?.base64) {
			setValue(base64Field, data.base64, { shouldValidate: true });
		} else {
			setValue(base64Field, undefined, { shouldValidate: true });
		}
	};

	const onSubmit = handleSubmit(async (data: FormDataType) => {
		try {
			setIsLoading(true);
			setErrorMessage("");

			// Trigger validation to ensure all required fields are valid
			const isValidForm = await trigger();
			if (!isValidForm) {
				throw new Error("Please fill out all required fields correctly");
			}

			const googleSheetsApiUrl = "/api/shop/users/google-sheet-submit";
			const googleSheetsData: FormDataType = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				password: data.password,
				address: data.address,
				bvn: data.bvn,
				tin: data.tin,
				gender: data.gender || "",
				accountNumber: data.accountNumber,
				bankName: data.bankName,
				businessName: data.businessName,
				salutation: data.salutation || "",
				dob: data.dob || "",
				businessType: data.businessType || "",
				country: data.country,
				state: data.state,
				city: data.city,
				categoryOfInterest: data.categoryOfInterest || [],
				brandOfInterest: data.brandOfInterest || [],
				terms: data.terms,
				businessRegistrationFile: data.businessRegistrationFile,
				proofOfAddressFile: data.proofOfAddressFile,
				statusReportFile: data.statusReportFile,
				businessRegistrationBase64:
					uploadedFiles.businessRegistrationFile?.base64,
				proofOfAddressBase64: uploadedFiles.proofOfAddressFile?.base64,
				statusReportBase64: uploadedFiles.statusReportFile?.base64,
				businessRegistrationFileName: data.businessRegistrationFileName,
				proofOfAddressFileName: data.proofOfAddressFileName,
				statusReportFileName: data.statusReportFileName,
				inventoryFinancingType: data.inventoryFinancingType,
			};

			const googleSheetsResponse = await fetch(googleSheetsApiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(googleSheetsData),
			});

			const googleSheetsResult = await googleSheetsResponse.json();

			if (!googleSheetsResponse.ok || !googleSheetsResult.success) {
				throw new Error(
					googleSheetsResult.message || "Failed to submit to Google Sheets"
				);
			}

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
					business_registration_file:
						uploadedFiles.businessRegistrationFile?.url,
					inventory_financing_type: data.inventoryFinancingType,
				},
			};

			const obanaResponse = await fetch("/api/shop/users/obana-sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(obanaRegistrationData),
			});

			const obanaResult = await obanaResponse.json();

			if (!obanaResponse.ok) {
				if (
					obanaResult.message === "Email or Phone number already registered" ||
					obanaResult.error?.message ===
						"Email or Phone number already registered"
				) {
					setCurrentStep("success");
					setErrorMessage(
						"You are already a registered customer! Your submission has been received, and you can continue shopping."
					);
					setTimeout(() => {
						const shopUrl =
							environment === "production"
								? "https://shop.obana.africa"
								: "https://staging.shop.obana.africa";
						window.open(shopUrl, "_blank");
						onClose();
					}, 2000);
					return;
				}
				throw new Error(
					obanaResult.message || `Registration failed: ${obanaResponse.status}`
				);
			}

			const registrationData = {
				requestId: obanaResult.data?.request_id || obanaResult.requestId,
				email: data.email,
				isInventoryFinancing: true,
			};

			if (typeof window !== "undefined") {
				localStorage.setItem(
					"pendingRegistration",
					JSON.stringify(registrationData)
				);
			}

			setCurrentStep("success");

			const shopOtpUrl =
				environment === "production"
					? `https://shop.obana.africa/verify-otp?source=inventory-financing&email=${encodeURIComponent(
							data.email
					  )}&requestId=${registrationData.requestId}&isRegister=true`
					: `https://staging.shop.obana.africa/verify-otp?source=inventory-financing&email=${encodeURIComponent(
							data.email
					  )}&requestId=${registrationData.requestId}&isRegister=true`;

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
	});

	const resetModal = () => {
		setCurrentStep("main");
		setErrorMessage("");
		setUploadedFiles({
			businessRegistrationFile: null,
			proofOfAddressFile: null,
			statusReportFile: null,
		});
		reset();
	};

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
		{ value: "Women", label: "Women" },
		{ value: "Beauty", label: "Beauty" },
		{ value: "Men", label: "Men" },
		{ value: "Kids", label: "Kids" },
	];

	const brandOptions = [
		{ value: "Addidas", label: "ADIDAS" },
		{ value: "BOOHOOMAN", label: "BOOHOOMAN" },
		{ value: "Nike", label: "Nike" },
		{ value: "Zara", label: "Zara" },
	];

	// New inventory financing type options
	const inventoryFinancingTypeOptions = [
		{
			value: "salad_africa",
			label: "Salad Africa (50/50 Split Financing)",
			description: "Pay 50% upfront, 50% later with flexible terms",
		},
		{
			value: "cabon_finance",
			label: "Cabon Finance (Pay in 3 Months)",
			description: "Get inventory now, pay the full amount in 3 months",
		},
		{
			value: "stellar_bank",
			label: "Stellar Bank (Flexible Financing)",
			description:
				"Access flexible financing options tailored to your business needs",
		},
	];

	const renderMainView = () => (
		<div className="flex-1 p-6 flex flex-col items-center space-y-8">
			<div className="flex flex-col items-center justify-center gap-4">
				<Image src={logoImage} alt="Logo" width={120} height={40} />
				<h2 className="text-2xl font-bold text-center text-primary">
					Access Inventory Financing
				</h2>
				<p className="text-center text-gray-600">
					Get pre-qualified to access the stock you need without immediate
					financial strain.
				</p>
			</div>

			<div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 my-auto max-w-sm mx-auto">
				<div className="flex flex-col items-center gap-2">
					<p className="text-center text-gray-700 font-medium">
						Are you an existing user?
					</p>
					<Button
						onClick={() => {
							const loginUrl =
								environment === "production"
									? "https://shop.obana.africa/login?source=inventory-financing&redirect=inventory-financing"
									: "https://staging.shop.obana.africa/login?source=inventory-financing&redirect=inventory-financing";
							window.open(loginUrl, "_blank");
							onClose();
						}}
						variant="primary"
						animation="ripple"
						icon={<ChevronsRight />}
						iconPosition="right"
						className="rounded-sm w-full py-3 border-primary text-primary"
					>
						Login
					</Button>
				</div>

				<div className="flex flex-col items-center gap-2">
					<p className="text-center text-gray-700 font-medium">New here?</p>
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
		</div>
	);

	const renderFormView = () => (
		<div className="flex-1 p-6 overflow-y-auto max-h-[80vh]">
			<div className="flex flex-col items-center justify-center gap-4 mb-6">
				<h2 className="text-2xl font-bold text-center text-primary">
					Register for Inventory Financing
				</h2>
				{Object.keys(errors).length > 0 && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4">
						<p className="text-sm text-red-700">
							Please correct the following errors:
						</p>
						<ul className="list-disc list-inside text-sm text-red-700">
							{Object.entries(errors).map(([field, error]) => (
								<li key={field}>{error?.message}</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<FormProvider {...methods}>
				<form onSubmit={onSubmit} className="space-y-6">
					{/* Inventory Financing Type Selection - First Section */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-primary">
							Financing Option
						</h3>
						<div className="bg-secondary border border-secondary-dark rounded-lg p-3 mb-4">
							<p className="text-sm text-primary">
								<strong>Choose Your Financing Partner:</strong> Select the
								inventory financing option that best suits your business needs.
							</p>
						</div>
						<FormSelect
							id="inventoryFinancingType"
							label="Select Inventory Financing Type"
							options={inventoryFinancingTypeOptions}
							register={register("inventoryFinancingType")}
							error={errors.inventoryFinancingType?.message}
							required
							searchable
						/>
						{watch("inventoryFinancingType") && (
							<div className="bg-green-50 border border-success rounded-lg p-2">
								<p className="text-sm text-success">
									<strong>Selected:</strong>{" "}
									{
										inventoryFinancingTypeOptions.find(
											(opt) => opt.value === watch("inventoryFinancingType")
										)?.description
									}
								</p>
							</div>
						)}
					</div>

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
								required
							/>
							<FormSelect
								id="state"
								label="State/Province"
								options={states || []}
								register={register("state")}
								error={errors.state?.message}
								disabled={!watch("country")}
								searchable
								required
							/>
							<FormSelect
								id="city"
								label="City"
								options={cities || []}
								register={register("city")}
								error={errors.city?.message}
								disabled={!watch("state")}
								searchable
								required
							/>
						</div>
						<FormInput
							id="address"
							placeholder="Enter your address"
							label="Address"
							register={register("address")}
							error={errors.address?.message}
						/>
					</div>
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
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-primary">
							Required Documents
						</h3>
						<div className="bg-secondary border border-secondary-dark rounded-lg p-3 mb-4">
							<p className="text-sm text-primary">
								<strong>📎 Important:</strong> Please upload all required
								documents.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormFileUpload
								required
								id="businessRegistrationFile"
								label="Business Registration Certificate"
								onUploadComplete={(data) =>
									handleFileUploadComplete(data, "businessRegistrationFile")
								}
								accept=".pdf,.jpg,.jpeg,.png"
								fileTypes="PDF, JPG, PNG"
								error={errors.businessRegistrationFile?.message}
							/>
							<FormFileUpload
								required
								id="proofOfAddressFile"
								label="Proof of Address"
								onUploadComplete={(data) =>
									handleFileUploadComplete(data, "proofOfAddressFile")
								}
								accept=".pdf,.jpg,.jpeg,.png"
								fileTypes="PDF, JPG, PNG"
								error={errors.proofOfAddressFile?.message}
							/>
						</div>
						<FormFileUpload
							required
							id="statusReportFile"
							label="Business Status Report"
							onUploadComplete={(data) =>
								handleFileUploadComplete(data, "statusReportFile")
							}
							accept=".pdf,.jpg,.jpeg,.png"
							fileTypes="PDF, JPG, PNG"
							error={errors.statusReportFile?.message}
						/>
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-primary">
							Authorization
						</h3>
						<div className="flex items-start space-x-3">
							<input
								type="checkbox"
								id="terms"
								{...register("terms")}
								className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
							/>
							<label htmlFor="terms" className="text-sm text-gray-700">
								I authorize Obana to share my information with the selected
								financing partner for loan pre-qualification and underwriting
								purposes, and I confirm that all uploaded documents are
								authentic and accurate.
							</label>
						</div>
						{errors.terms && (
							<p className="text-sm text-error">{errors.terms.message}</p>
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
							disabled={isLoading || !isValid}
						>
							{isLoading
								? "Submitting Application..."
								: "Submit Application with Documents"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);

	const renderSuccessView = () => (
		<div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
			<CheckCircle className="w-16 h-16 text-green-500" />
			<div className="text-center space-y-2">
				<h2 className="text-2xl font-bold text-primary">
					{errorMessage
						? "Submission Received!"
						: "Application Submitted Successfully!"}
				</h2>
				<p className="text-gray-600">
					{errorMessage ||
						"Your inventory financing application and all documents have been submitted successfully. Confirmation emails have been sent to all relevant parties. You will be redirected to verify your OTP."}
				</p>
				<div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
					<p className="text-sm text-green-700">
						📧 Emails sent with your documents attached to Obana team and your
						selected financing partner for review.
					</p>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
				<Button
					onClick={() => {
						const shopUrl =
							environment === "production"
								? "https://shop.obana.africa"
								: "https://staging.shop.obana.africa";
						window.open(shopUrl, "_blank");
						onClose();
					}}
					variant="primary"
					animation="ripple"
					className="flex-1"
				>
					Continue Shopping
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
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
					<p className="text-sm text-red-700">
						Please check your internet connection and try again. If the problem
						persists, contact support.
					</p>
				</div>
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
