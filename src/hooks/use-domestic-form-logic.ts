/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { termApi } from "@/app/api/(instances)/axiosInstance";
import { formatPhoneNumber } from "@/utils/phone-number-format";
import { domesticFormSchema } from "@/schemas";
import { z } from "zod";

type DomesticFormInputs = z.infer<typeof domesticFormSchema>;

export const useDomesticFormLogic = () => {
	const [currentStep, setCurrentStep] = useState<
		"form" | "logistics" | "preview"
	>("form");
	const [formData, setFormData] = useState<DomesticFormInputs | null>(null);
	const [shipmentDraft, setShipmentDraft] = useState<any>(null);
	const [availableRates, setAvailableRates] = useState<any[]>([]);
	const [isLoadingRates, setIsLoadingRates] = useState(false);
	const [selectedRate, setSelectedRate] = useState<any>(null);

	const formMethods = useForm<DomesticFormInputs>({
		resolver: zodResolver(domesticFormSchema),
		defaultValues: {
			senderCountry: "NG",
			receiverCountry: "NG",
			itemCurrency: "NGN",
		},
	});

	const createShipmentDraft = async (
		data: DomesticFormInputs,
		senderStateName: string,
		receiverStateName: string
	) => {
		setIsLoadingRates(true);
		try {
			const payload = {
				pickup_address: {
					first_name: data.senderFirstName,
					last_name: data.senderLastName,
					email: data.senderEmail,
					phone: formatPhoneNumber(data.senderPhone, data.senderCountry),
					line1: data.senderAddress,
					line2: "",
					city: data.senderCity,
					state: senderStateName,
					country: data.senderCountry,
					zip: data.senderZip || "",
				},
				delivery_address: {
					first_name: data.receiverFirstName,
					last_name: data.receiverLastName,
					email: data.receiverEmail,
					phone: formatPhoneNumber(data.receiverPhone, data.receiverCountry),
					line1: data.receiverAddress,
					line2: "",
					city: data.receiverCity,
					state: receiverStateName || data.receiverState,
					country: data.receiverCountry,
					zip: data.receiverZip || "",
				},
				parcel: {
					description: data.itemDescription,
					weight_unit: "kg",
					items: [
						{
							name: data.itemName,
							description: data.itemDescription,
							currency: data.itemCurrency,
							value: parseFloat(data.itemValue),
							weight: parseFloat(data.itemWeight),
							quantity: 1,
						},
					],
				},
				metadata: {
					source: "web_platform",
				},
			};

			const response = await termApi.post("/shipments/quick", payload);
			const result = response.data;

			if (result.status && result.data) {
				setShipmentDraft(result.data);
				return { success: true, data: result.data };
			} else {
				throw new Error(
					result.message || "Invalid response from Terminal Africa"
				);
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Failed to create shipment draft";
			return { success: false, error: errorMessage };
		} finally {
			setIsLoadingRates(false);
		}
	};

	const fetchRatesForShipment = async (shipmentId: string) => {
		setIsLoadingRates(true);
		try {
			const response = await termApi.get(
				`/rates/shipment/?shipment_id=${shipmentId}&cash_on_delivery=${true}`
			);

			const result = response.data;

			if (result.status && result.data) {
				const processedRates = result.data.map((rate: any) => ({
					...rate,
					carrier_name:
           rate.carrier_name === "GIG Logistics"
          ? "Obana Express (Domestic)"
          : rate.carrier_name === "DHL Express"
          ? "Obana Express (International)"
          : rate.carrier_name,
					amount: Math.round(rate.amount * 1.025),
					original_amount: rate.amount,
				}));

				setAvailableRates(processedRates);
				return { success: true, data: processedRates };
			} else {
				return {
					success: false,
					error: result.message || "No rates available for this route",
				};
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Failed to fetch shipping rates";
			return { success: false, error: errorMessage };
		} finally {
			setIsLoadingRates(false);
		}
	};

	const arrangePickup = async (submitLogisticsForm: any) => {
		if (!shipmentDraft || !selectedRate || !formData) {
			return {
				success: false,
				error: "Missing shipment, rate, or form information",
			};
		}

		try {
			const payload = {
				shipment_id: shipmentDraft.shipment_id,
				rate_id: selectedRate.rate_id,
				rate_amount: selectedRate.original_amount,
				rate_currency: selectedRate.currency,
			};

			const response = await termApi.post("/shipments/pickup/", payload);
			const result = response.data;

			if (result.status && result.data) {
				submitLogisticsForm(formData, "domestic").catch((err: any) => {
					console.warn("Email submission failed:", err);
				});

				return {
					success: true,
					data: result.data,
					formData,
					selectedRate,
				};
			} else {
				throw new Error(
					result.message || "Invalid response from Terminal Africa"
				);
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Failed to arrange pickup";
			return { success: false, error: errorMessage };
		}
	};

	return {
		currentStep,
		setCurrentStep,
		formData,
		setFormData,
		shipmentDraft,
		availableRates,
		isLoadingRates,
		selectedRate,
		setSelectedRate,
		formMethods,
		createShipmentDraft,
		fetchRatesForShipment,
		arrangePickup,
	};
};
