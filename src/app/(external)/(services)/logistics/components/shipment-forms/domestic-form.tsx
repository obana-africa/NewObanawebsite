/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Button from "@/components/ui/button";
import PreviewComponent from "../preview";
import LogisticsPartners from "../logistics-partners";
import { useLogistics } from "@/hooks/use-logistics";
import { useDomesticFormLogic } from "@/hooks/use-domestic-form-logic";
import { useLocationSelectors } from "@/hooks/use-location-selectors";
import { toast } from "sonner";
import { buildPreviewSections } from "@/utils/preview-data-helpers";
import { SenderInfoSection } from "../form/sender-info-section";
import { ReceiverInfoSection } from "../form/receiver-info-section";
import { ParcelInfoSection } from "../form/parcel-info-section";
import { SuccessModal } from "../modals/success-modal";
import { ErrorModal } from "../modals/error-modal";
import { LoadingOverlay } from "../modals/loading-overlay";

interface DomesticFormProps {
	onBack: () => void;
	onComplete?: (shipmentData: any) => void;
	isSubmitting: boolean;
}

const DomesticForm: React.FC<DomesticFormProps> = ({
	onBack,
	onComplete,
}) => {
	const { submitLogisticsForm } = useLogistics();

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [successData, setSuccessData] = useState<any>(null);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loadingMessage, setLoadingMessage] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const {
		currentStep,
		setCurrentStep,
		formData,
		setFormData,
		availableRates,
		isLoadingRates,
		selectedRate,
		setSelectedRate,
		formMethods,
		createShipmentDraft,
		fetchRatesForShipment,
		arrangePickup,
	} = useDomesticFormLogic();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = formMethods;

	const watchSenderCountry = watch("senderCountry");
	const watchSenderState = watch("senderState");
	const watchReceiverCountry = watch("receiverCountry");
	const watchReceiverState = watch("receiverState");

	const locationData = useLocationSelectors(
		watchSenderCountry,
		watchSenderState,
		watchReceiverCountry,
		watchReceiverState
	);

	const handleFormSubmit = async (data: any) => {
		setFormData(data);
		setLoadingMessage("Creating shipment draft...");

		const draftResult = await createShipmentDraft(
			data,
			locationData.senderStateName,
			locationData.receiverStateName
		);

		setLoadingMessage("");

		if (draftResult.success && draftResult.data?.shipment_id) {
			setLoadingMessage("Fetching shipping rates...");
			const ratesResult = await fetchRatesForShipment(
				draftResult.data.shipment_id
			);
			setLoadingMessage("");

			if (
				ratesResult.success &&
				ratesResult.data &&
				ratesResult.data.length > 0
			) {
				setCurrentStep("logistics");
			} else {
				toast.error(
					ratesResult.error || "No shipping options available for this route"
				);
			}
		} else {
			toast.error(draftResult.error || "Failed to create shipment");
		}
	};

	const handleRateSelection = (rate: any) => {
		setSelectedRate(rate);
		setCurrentStep("preview");
	};

	const handleEdit = () => {
		setCurrentStep("form");
	};

	const handleProceedToBook = async () => {
		setIsProcessing(true);
		setLoadingMessage("Arranging pickup and confirming shipment...");

		const result = await arrangePickup(submitLogisticsForm);

		setLoadingMessage("");
		setIsProcessing(false);

		if (result.success) {
			setSuccessData(result.data);
			setShowSuccessModal(true);
		} else {
			setErrorMessage(result.error || "Failed to book shipment");
			setShowErrorModal(true);
		}
	};

	const handleSuccessClose = () => {
		setShowSuccessModal(false);

		if (typeof onComplete === "function" && successData) {
			onComplete({
				shipment: successData,
				formData,
				selectedRate,
			});
		}

		setCurrentStep("form");
		setFormData(null);
		setSelectedRate(null);
		setSuccessData(null);
	};

	const handleErrorClose = () => {
		setShowErrorModal(false);
		setErrorMessage("");
	};

	const handleRetry = () => {
		setCurrentStep("preview");
	};

	const handleContactSupport = () => {
		console.log("Contact customer support");
	};

	const previewSections = buildPreviewSections(
		formData,
		selectedRate,
		locationData.senderStates,
		locationData.receiverStates
	);

	return (
		<>
			{loadingMessage && <LoadingOverlay message={loadingMessage} />}

			<SuccessModal
				isOpen={showSuccessModal}
				onClose={handleSuccessClose}
				shipmentData={successData}
			/>

			<ErrorModal
				isOpen={showErrorModal}
				onClose={handleErrorClose}
				error={errorMessage}
				onRetry={handleRetry}
			/>

			<div className="space-y-6">
				{currentStep === "form" && (
					<>
						<h2 className="font-bold text-center text-primary text-2xl">
							Request For Shipment
						</h2>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="space-y-6"
						>
							<SenderInfoSection
								register={register}
								errors={errors}
								setValue={setValue}
								watchSenderCountry={watchSenderCountry}
								watchSenderState={watchSenderState}
								countryOptions={locationData.countryOptions}
								senderStateOptions={locationData.senderStateOptions}
								senderCityOptions={locationData.senderCityOptions}
								countriesLoading={locationData.countriesLoading}
								senderStatesLoading={locationData.senderStatesLoading}
								senderCitiesLoading={locationData.senderCitiesLoading}
								senderStates={locationData.senderStates}
								setSenderStateName={locationData.setSenderStateName}
							/>

							<ReceiverInfoSection
								register={register}
								errors={errors}
								setValue={setValue}
								watchReceiverCountry={watchReceiverCountry}
								watchReceiverState={watchReceiverState}
								countryOptions={locationData.countryOptions}
								receiverStateOptions={locationData.receiverStateOptions}
								receiverCityOptions={locationData.receiverCityOptions}
								countriesLoading={locationData.countriesLoading}
								receiverStatesLoading={locationData.receiverStatesLoading}
								receiverCitiesLoading={locationData.receiverCitiesLoading}
								receiverStates={locationData.receiverStates}
								setReceiverStateName={locationData.setReceiverStateName}
							/>

							<ParcelInfoSection register={register} errors={errors} />

							<div className="flex justify-between mt-6">
								<Button
									onClick={onBack}
									variant="outline"
									className="border border-blue-900 text-blue-900"
								>
									Back
								</Button>
								<Button
									type="submit"
									variant="primary"
									animation="ripple"
									className="border border-primary"
									disabled={isLoadingRates}
								>
									{isLoadingRates ? "Processing..." : "Get Rates"}
								</Button>
							</div>
						</form>
					</>
				)}

				{currentStep === "logistics" && (
					<LogisticsPartners
						shipmentData={formData}
						availableRates={availableRates}
						isLoadingRates={isLoadingRates}
						onBack={() => setCurrentStep("form")}
						onSubmit={handleRateSelection}
						isSubmitting={false}
					/>
				)}

				{currentStep === "preview" && (
					<PreviewComponent
						title="Review Your Shipment"
						sections={previewSections}
						onEdit={handleEdit}
						onProceedToBook={handleProceedToBook}
						onContactSupport={handleContactSupport}
						isSubmitting={isProcessing}
					/>
				)}
			</div>
		</>
	);
};

export default DomesticForm;
