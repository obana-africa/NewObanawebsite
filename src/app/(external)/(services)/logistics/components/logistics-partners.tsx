import React, { useState } from "react";
import Button from "@/components/ui/button";
import box from "@/app/assets/images/services-page/boxxx.png";
import FormInput from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import Image from "next/image";
import PhoneInput from "@/components/ui/phone-input";

interface LogisticsPartner {
	id: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	logo: any;
	price: number;
	estimatedDelivery: string;
	rating: number;
	serviceType: string;
	timeEstimate: string;
}

interface ContactInfo {
	fullName: string;
	email: string;
	phoneNumber: string;
}

interface FormDataType {
	shipmentRoute: string;
	pickUp: string;
	destination: string;
	productCategory: string;
	productType: string;
	productWeight: string;
	dimension?: string;
	shipmentImage?: File;
}

interface LogisticsPartnersProps {
	shipmentData: FormDataType;
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
	isSubmitting?: boolean;
}

const LogisticsPartners: React.FC<LogisticsPartnersProps> = ({
	shipmentData,
	onBack,
	onSubmit,
	isSubmitting = false,
}) => {
	const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
		null
	);
	const [showContactForm, setShowContactForm] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ContactInfo>();

	const partners: LogisticsPartner[] = [
		{
			id: "partner1",
			name: "FastShip Logistics",
			logo: box,
			price: 500000,
			estimatedDelivery: "7 working days",
			rating: 4.8,
			serviceType: "Express",
			timeEstimate: "7 working days",
		},
		{
			id: "partner2",
			name: "GreenFreight",
			logo: box,
			price: 450000,
			estimatedDelivery: "5 working days",
			rating: 4.5,
			serviceType: "Standard",
			timeEstimate: "5 working days",
		},
		{
			id: "partner3",
			name: "Swift Cargo",
			logo: box,
			price: 600000,
			estimatedDelivery: "3 working days",
			rating: 4.9,
			serviceType: "Express",
			timeEstimate: "3 working days",
		},
		{
			id: "partner3",
			name: "Swift Cargo",
			logo: box,
			price: 600000,
			estimatedDelivery: "3 working days",
			rating: 4.9,
			serviceType: "Express",
			timeEstimate: "3 working days",
		},
		{
			id: "partner3",
			name: "Swift Cargo",
			logo: box,
			price: 600000,
			estimatedDelivery: "3 working days",
			rating: 4.9,
			serviceType: "Express",
			timeEstimate: "3 working days",
		},
		{
			id: "partner3",
			name: "Swift Cargo",
			logo: box,
			price: 600000,
			estimatedDelivery: "3 working days",
			rating: 4.9,
			serviceType: "Express",
			timeEstimate: "3 working days",
		},
	];

	// const handleSelectPartner = (partner: LogisticsPartner) => {
	// 	setSelectedPartnerId(partner.id);
	// };

	const handleBookNow = (partner: LogisticsPartner) => {
		setSelectedPartnerId(partner.id);
		setShowContactForm(true);
	};

	const handleSubmitContactInfo = (data: ContactInfo) => {
		const selectedPartner = partners.find((p) => p.id === selectedPartnerId);

		const finalData = {
			...shipmentData,
			logisticsPartner: {
				id: selectedPartner?.id,
				name: selectedPartner?.name,
				price: selectedPartner?.price,
				estimatedDelivery: selectedPartner?.estimatedDelivery,
			},
			contactInfo: data,
		};

		onSubmit(finalData);
	};

	if (showContactForm) {
		return (
			<div className="space-y-6">
				<h2 className="font-bold text-primary text-center mb-6">
					Lets Keep In touch with You
				</h2>

				<div className="bg-blue-50 p-4 rounded-lg mb-6">
					<p className="font-medium">
						Your Selected Logistics Partner:{" "}
						{partners.find((p) => p.id === selectedPartnerId)?.name}
					</p>
				</div>

				<form
					onSubmit={handleSubmit(handleSubmitContactInfo)}
					className="space-y-4"
				>
					<div className="grid grid-cols-1 gap-4">
						<FormInput
							id="fullName"
							label="Full Name"
							placeholder="Your full name"
							register={register("fullName", {
								required: "Full name is required",
							})}
							error={errors.fullName?.message}
							required
						/>

						<FormInput
							id="email"
							label="Email Address"
							placeholder="Your email"
							type="email"
							register={register("email", {
								required: "Email is required",
								pattern: {
									value: /\S+@\S+\.\S+/,
									message: "Please enter a valid email address",
								},
							})}
							error={errors.email?.message}
							required
						/>

						<PhoneInput
							control={control}
							name="phoneNumber"
							label="Phone Number"
							error={errors.phoneNumber?.message}
							required
						/>
					</div>

					<div className="flex justify-between mt-6">
						<Button
							onClick={() => setShowContactForm(false)}
							variant="outline"
							className="border border-blue-900 text-blue-900"
						>
							Back
						</Button>

						{isSubmitting ? (
							<Button variant="primary" disabled isLoading>
								Processing...
							</Button>
						) : (
							<Button
								type="submit"
								variant="primary"
								animation="ripple"
								className="border border-primary"
							>
								Book Shipment
							</Button>
						)}
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="font-bold text-center text-primary mb-6">
				Select Logistics Partner
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-auto">
				{partners.map((partner) => (
					<div
						key={partner.id}
						className={`p-4 bg-white rounded-lg transition-all ${
							selectedPartnerId === partner.id
								? "border-blue-600 bg-blue-50"
								: "border-gray-200"
						}`}
					>
						<div className="flex gap-4">
							<div className="flex-shrink-0  bg-gray-100 rounded-md flex items-center justify-center w-[40%]">
								{partner.logo ? (
									<Image
										src={partner.logo}
										alt={`${partner.name} logo`}
										width={150}
										height={150}
										className="object-contain"
										// Add placeholder if needed
										placeholder="empty"
										// Add blurDataURL if you want blur-up effect
										// blurDataURL="data:image/png;base64,..."
									/>
								) : (
									<div className="text-xl font-bold text-gray-500">
										{partner.name.substring(0, 2).toUpperCase()}
									</div>
								)}
							</div>

							<div className="flex flex-col flex-grow">
								<h3 className="font-bold text-lg mb-2">{partner.name}</h3>

								<div className="space-y-1 flex-grow">
									<div className="flex gap-2">
										<p className="text-sm text-gray-500 font-bold">
											Time estimate:
										</p>
										<p className="font-medium text-sm">
											{partner.timeEstimate}
										</p>
									</div>

									<div className="flex gap-2">
										<p className="text-sm text-gray-500 font-bold">
											Estimated Price:
										</p>
										<p className="font-bold text-primary text-sm">
											₦{partner.price.toLocaleString()}
										</p>
									</div>

									<div className="flex gap-2">
										<p className="text-sm text-gray-500 font-bold">
											Service Type:
										</p>
										<p className="font-medium text-sm">{partner.serviceType}</p>
									</div>
								</div>

								<div className="mt-4">
									<Button
										onClick={() => handleBookNow(partner)}
										variant="primary"
										animation="ripple"
										className="border border-primary "
									>
										Book Now
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-between mt-6">
				<Button
					onClick={onBack}
					variant="outline"
					className="border border-blue-900 text-blue-900"
				>
					Back
				</Button>
			</div>
		</div>
	);
};

export default LogisticsPartners;
