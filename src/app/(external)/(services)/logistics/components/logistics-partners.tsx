/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "@/components/ui/button";
import Image from "next/image";
import { Circle, CircleDot } from "lucide-react";

interface CarrierRate {
	rate_id: string;
	carrier_name: string;
	carrier_logo?: string;
	amount: number;
	original_amount?: number;
	delivery_time: string;
	delivery_eta: number;
	carrier_rate_description: string;
	currency: string;
	carrier_reference: string;
	pickup_time?: string;
}

interface LogisticsPartnersProps {
	shipmentData: any;
	availableRates?: CarrierRate[];
	isLoadingRates?: boolean;
	onBack: () => void;
	onSubmit: (selectedRate: CarrierRate) => void;
	isSubmitting?: boolean;
}

const LogisticsPartners: React.FC<LogisticsPartnersProps> = ({
	availableRates,
	isLoadingRates,
	onBack,
	onSubmit,
	isSubmitting = false,
}) => {
	const [selectedRateId, setSelectedRateId] = useState<string | null>(null);

	const handleContinue = () => {
		const selectedRate = availableRates?.find(
			(r) => r.rate_id === selectedRateId
		);

		if (selectedRate) {
			onSubmit(selectedRate);
		}
	};

	const handleRateSelect = (rateId: string) => {
		setSelectedRateId(rateId);
	};

	if (isLoadingRates) {
		return (
			<div className="space-y-6">
				<h2 className="font-bold text-center text-primary mb-6 text-2xl">
					Fetching Available Carriers...
				</h2>
				<div className="flex flex-col items-center justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					<p className="mt-4 text-gray-600">
						Please wait while we find the best rates for you
					</p>
				</div>
			</div>
		);
	}

	if (!availableRates || availableRates.length === 0) {
		return (
			<div className="space-y-6">
				<h2 className="font-bold text-center text-primary mb-6 text-2xl">
					No Carriers Available
				</h2>
				<div className="flex flex-col items-center justify-center py-12">
					<p className="text-gray-600 text-center mb-6">
						We couldn&apos;t find any carriers for this route. Please try a
						different route or contact support.
					</p>
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
	}

	return (
		<div className="space-y-6">
			<h2 className="font-bold text-center text-primary mb-6 text-2xl">
				Select Logistics Partner
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-auto">
				{availableRates.map((rate) => (
					<div
						key={rate.rate_id}
						onClick={() => handleRateSelect(rate.rate_id)}
						className={`p-4 bg-white rounded-lg transition-all border-2 cursor-pointer ${
							selectedRateId === rate.rate_id
								? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
								: "border-gray-200 hover:border-blue-300"
						}`}
					>
						<div className="flex gap-4">
							{/* Carrier Logo */}
							<div className="flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center w-[40%] p-2">
								{rate.carrier_logo ? (
									<Image
										src={rate.carrier_logo}
										alt={`${rate.carrier_name} logo`}
										width={150}
										height={150}
										className="object-contain"
										placeholder="empty"
									/>
								) : (
									<div className="text-xl font-bold text-gray-500">
										{rate.carrier_name.substring(0, 2).toUpperCase()}
									</div>
								)}
							</div>

							{/* Carrier Details */}
							<div className="flex flex-col flex-grow">
								<div className="flex items-center gap-2 mb-2">
									{selectedRateId === rate.rate_id ? (
										<CircleDot className="text-blue-600 size-5 flex-shrink-0" />
									) : (
										<Circle className="text-gray-400 size-5 flex-shrink-0" />
									)}
									<h3 className="font-bold text-lg">{rate.carrier_name}</h3>
								</div>

								<div className="space-y-1 flex-grow">
									<div className="flex justify-between">
										<p className="text-sm text-gray-500 font-bold">Price:</p>
										<p className="font-bold text-primary text-sm">
											₦{rate.amount.toLocaleString()}
										</p>
									</div>

									<div className="flex justify-between">
										<p className="text-sm text-gray-500 font-bold">Delivery:</p>
										<p className="font-medium text-sm">{rate.delivery_time}</p>
									</div>

									{rate.pickup_time && (
										<div className="flex justify-between">
											<p className="text-sm text-gray-500 font-bold">Pickup:</p>
											<p className="font-medium text-sm">{rate.pickup_time}</p>
										</div>
									)}

									<div className="flex justify-between">
										<p className="text-sm text-gray-500 font-bold">Service:</p>
										<p className="font-medium text-sm">
											{rate.carrier_rate_description}
										</p>
									</div>
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

				<Button
					onClick={handleContinue}
					variant="primary"
					animation="ripple"
					className="border border-primary"
					disabled={!selectedRateId || isSubmitting}
				>
					{isSubmitting ? "Processing..." : "Continue"}
				</Button>
			</div>
		</div>
	);
};

export default LogisticsPartners;
