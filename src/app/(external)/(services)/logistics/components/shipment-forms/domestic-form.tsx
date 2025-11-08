/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import Button from "@/components/ui/button";
import PreviewComponent from "../preview";
import LogisticsPartners from "../logistics-partners";
import { z } from "zod";
import { toast } from "sonner";
import useCountries from "@/hooks/use-countries";
import useStates from "@/hooks/use-states";
import useCities from "@/hooks/use-cities";
import { termApi } from "@/app/api/(instances)/axiosInstance";
import { domesticFormSchema } from "@/schemas";
import logoImage from "@/app/assets/images/logos/obana-logo.svg";
import { X, Package, Truck, MapPin, Calendar, CheckCircle, Copy, ExternalLink } from "lucide-react";

type DomesticFormInputs = z.infer<typeof domesticFormSchema>;

interface DomesticFormProps {
  onBack: () => void;
  onComplete?: (shipmentData: any) => void;
  isSubmitting: boolean;
}

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, shipmentData }: any) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !shipmentData) return null;

  const data = shipmentData;
  const extras = data.extras || {};
  const parcel = data.metadata.selected_rate_parcel || {};
  const metadata = data.metadata || {};
  const selectedRate = metadata.selected_rate || {};
  const addressPayload = selectedRate.metadata?.address_payload || metadata.address_payload || {};

  const trackingUrl = extras.tracking_url;
  const trackingNumber = extras.tracking_number;
  const carrierName =
    selectedRate.carrier_name === "GIG Logistics"
      ? "Obana Express"
      : selectedRate.carrier_name || "Obana Express";
  const status = data.status || "confirmed";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Shipment Confirmed!
              </h2>
              <p className="text-xs text-gray-600">Successfully booked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Shipment ID */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Shipment ID
                </p>
                <p className="text-lg font-bold text-blue-600 break-all">
                  {data.shipment_id}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  ⚠️ Save this ID for tracking
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(data.shipment_id)}
                className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Tracking Info */}
          {trackingNumber && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-sm text-gray-900">
                  Tracking Number
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-mono text-gray-700">
                  {trackingNumber}
                </p>
                <button
                  onClick={() => copyToClipboard(trackingNumber)}
                  className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {trackingUrl && (
                <a
                  href={trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-blue-600 hover:text-blue-700 font-medium text-xs"
                >
                  Track your shipment
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Carrier & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-sm text-gray-900">Carrier</p>
              </div>
              <p className="text-sm text-gray-700">{carrierName}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-sm text-gray-900">Status</p>
              </div>
              <p className="text-sm text-green-600 font-medium capitalize">
                {status}
              </p>
            </div>
          </div>

          {/* Pickup Address */}
          {addressPayload.pickup_address && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-sm text-gray-900">
                  Pickup Address
                </p>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {addressPayload.pickup_address.city},{" "}
                {addressPayload.pickup_address.state}{" "}
                {addressPayload.pickup_address.zip}
              </p>
            </div>
          )}

          {/* Delivery Address */}
          {addressPayload.delivery_address && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-gray-600" />
                <p className="font-semibold text-sm text-gray-900">
                  Delivery Address
                </p>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                {addressPayload.delivery_address.city},{" "}
                {addressPayload.delivery_address.state}{" "}
                {addressPayload.delivery_address.zip}
              </p>
            </div>
          )}

          {/* Parcel Info */}
          {parcel && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-sm text-gray-900 mb-1.5">
                Parcel Details
              </p>
              <div className="space-y-0.5 text-xs text-gray-700">
                <p>
                  Weight: {parcel.total_weight || parcel.weight}{" "}
                  {parcel.weight_unit} 
                </p>
                {parcel.items && parcel.items.length > 0 && (
                  <>
                    <p>Item: {parcel.items[0].name}</p>
                    <p>
                      Value: {parcel.items[0].currency}{" "}
                      {parcel.items[0].value}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Events */}
          {data.events && data.events.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-sm text-gray-900 mb-2">
                Shipment Timeline
              </p>
              <div className="space-y-2">
                {data.events.map((event: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        {event.location} •{" "}
                        {new Date(event.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
            >
              Done
            </button>
            {trackingUrl && (
              <a
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center text-sm"
              >
                Track Shipment
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Modal Component
const ErrorModal = ({ isOpen, onClose, error }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Error</h2>
          </div>
          <p className="text-sm text-gray-700 mb-5">{error}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Overlay Component
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-900 font-medium">{message}</p>
    </div>
  </div>
);

const DomesticForm: React.FC<DomesticFormProps> = ({
  onBack,
  onComplete,
  isSubmitting,
}) => {
  const [currentStep, setCurrentStep] = useState<"form" | "logistics" | "preview">("form");
  const [formData, setFormData] = useState<DomesticFormInputs | null>(null);
  const [shipmentDraft, setShipmentDraft] = useState<any>(null);
  const [availableRates, setAvailableRates] = useState<any[]>([]);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [selectedRate, setSelectedRate] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  
  const logisticsRef = useRef<HTMLDivElement>(null);
  
  // Country, state, and city hooks for sender
  const { countries: allCountries, isLoading: countriesLoading } = useCountries();
  const [senderCountry, setSenderCountry] = useState<string>("NG");
  const [senderState, setSenderState] = useState<string>("");
  const { states: senderStates, isLoading: senderStatesLoading } = useStates(senderCountry);
  const { cities: senderCities, isLoading: senderCitiesLoading } = useCities(senderCountry, senderState);
  
  // Country, state, and city hooks for receiver
  const [receiverCountry, setReceiverCountry] = useState<string>("NG");
  const [receiverState, setReceiverState] = useState<string>("");
  const { states: receiverStates, isLoading: receiverStatesLoading } = useStates(receiverCountry);
  const { cities: receiverCities, isLoading: receiverCitiesLoading } = useCities(receiverCountry, receiverState);

  // Store state names for API submission
  const [senderStateName, setSenderStateName] = useState<string>("");
  const [receiverStateName, setReceiverStateName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DomesticFormInputs>({
    resolver: zodResolver(domesticFormSchema),
    defaultValues: {
      senderCountry: "NG",
      receiverCountry: "NG",
      itemCurrency: "NGN",
    },
  });

  // Watch for country and state changes to update dropdowns
  const watchSenderCountry = watch("senderCountry");
  const watchSenderState = watch("senderState");
  const watchReceiverCountry = watch("receiverCountry");
  const watchReceiverState = watch("receiverState");

  // Update local state when form values change
  useEffect(() => {
    if (watchSenderCountry) setSenderCountry(watchSenderCountry);
  }, [watchSenderCountry]);

  useEffect(() => {
    if (watchSenderState) {
      setSenderState(watchSenderState);
      const selectedState = senderStates.find(state => state.isoCode === watchSenderState);
      if (selectedState) {
        setSenderStateName(selectedState.name);
      }
    }
  }, [watchSenderState, senderStates]);

  useEffect(() => {
    if (watchReceiverCountry) setReceiverCountry(watchReceiverCountry);
  }, [watchReceiverCountry]);

  useEffect(() => {
    if (watchReceiverState) {
      setReceiverState(watchReceiverState);
      const selectedState = receiverStates.find(state => state.isoCode === watchReceiverState);
      if (selectedState) {
        setReceiverStateName(selectedState.name);
      }
    }
  }, [watchReceiverState, receiverStates]);

  // Scroll to top when step changes
  useEffect(() => {
    if (currentStep === "logistics" && logisticsRef.current) {
      logisticsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // Format phone number based on country
  const formatPhoneNumber = (phone: string, countryCode: string) => {
    if (phone.startsWith('+')) return phone;
    
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (countryCode === 'NG' && cleanPhone.startsWith('0')) {
      return `+234${cleanPhone.substring(1)}`;
    }
    
    return `+${cleanPhone}`;
  };

  // Create shipment draft with international support
  const createShipmentDraft = async (data: DomesticFormInputs) => {
    setLoadingMessage("Creating shipment draft...");
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
        toast.success("Shipment draft created successfully");
        return result.data;
      } else {
        throw new Error(result.message || "Invalid response from Terminal Africa");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to create shipment draft";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      return null;
    } finally {
      setIsLoadingRates(false);
      setLoadingMessage("");
    }
  };

  // Get rates for shipment using termApi
  const fetchRatesForShipment = async (shipmentId: string) => {
    setLoadingMessage("Fetching shipping rates...");
    setIsLoadingRates(true);
    try {
      const response = await termApi.get(
        `/rates/shipment/?shipment_id=${shipmentId}&cash_on_delivery=${true}`
      );

      const result = response.data;

      if (result.status && result.data) {
        const processedRates = result.data.map((rate: any) => ({
          ...rate,
          carrier_name: rate.carrier_name === "GIG Logistics" 
            ? "Obana Express" 
            : rate.carrier_name,
          carrier_logo: rate.carrier_name === "GIG Logistics" ? logoImage : rate.carrier_logo,
          amount: Math.round(rate.amount * 1.025),
          original_amount: rate.amount,
        }));

        setAvailableRates(processedRates);
        toast.success(`Found ${processedRates.length} shipping options`);
        return processedRates;
      } else {
        const errorMsg = result.message || "No rates available for this route";
        setErrorMessage(errorMsg);
        setShowErrorModal(true);
        return [];
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to fetch shipping rates";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      return [];
    } finally {
      setIsLoadingRates(false);
      setLoadingMessage("");
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: DomesticFormInputs) => {
    setFormData(data);
    
    const draft = await createShipmentDraft(data);
    
    if (draft && draft.shipment_id) {
      const rates = await fetchRatesForShipment(draft.shipment_id);
      
      if (rates && rates.length > 0) {
        setCurrentStep("logistics");
      }
    }
  };

  // Handle rate selection and arrange pickup
  const handleRateSelection = (rate: any) => {
    setSelectedRate(rate);
    setCurrentStep("preview");
  };

  const arrangePickup = async () => {
    if (!shipmentDraft || !selectedRate) {
      setErrorMessage("Missing shipment or rate information");
      setShowErrorModal(true);
      return;
    }

    setLoadingMessage("Arranging pickup...");
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
        setSuccessData(result.data);
        setShowSuccessModal(true);
      } else {
        throw new Error(result.message || "Invalid response from Terminal Africa");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to arrange pickup";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setLoadingMessage("");
    }
  };

  const handleEdit = () => {
    setCurrentStep("form");
  };

  const handleContactSupport = () => {
    console.log("Contact customer support");
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    if (typeof onComplete === 'function') {
      onComplete({
        shipment: successData,
        formData,
        selectedRate,
      });
    }
  };

  // Helper function to get state display name for preview
  const getStateDisplayName = (stateCode: string, statesList: any[]) => {
    const state = statesList.find(s => s.isoCode === stateCode);
    return state ? state.name : stateCode;
  };

  // Prepare dropdown options
  const countryOptions = allCountries.map(country => ({
    value: country.isoCode,
    label: `${country.flag} ${country.name}`,
  }));

  const senderStateOptions = senderStates.map(state => ({
    value: state.isoCode,
    label: state.name,
  }));

  const senderCityOptions = senderCities.map(city => ({
    value: city.name,
    label: city.name,
  }));

  const receiverStateOptions = receiverStates.map(state => ({
    value: state.isoCode,
    label: state.name,
  }));

  const receiverCityOptions = receiverCities.map(city => ({
    value: city.name,
    label: city.name,
  }));

  const previewSections = [
    {
      title: "Sender Details",
      fields: [
        {
          label: "Name",
          value: formData ? `${formData.senderFirstName} ${formData.senderLastName}` : "-",
        },
        {
          label: "Email",
          value: formData?.senderEmail || "-",
        },
        {
          label: "Phone",
          value: formData?.senderPhone || "-",
        },
        {
          label: "Address",
          value: formData?.senderAddress || "-",
        },
        {
          label: "City",
          value: formData?.senderCity || "-",
        },
        {
          label: "State",
          value: formData ? getStateDisplayName(formData.senderState, senderStates) : "-",
        },
        {
          label: "Country",
          value: formData?.senderCountry || "-",
        },
        {
          label: "ZIP Code",
          value: formData?.senderZip || "-",
        },
      ],
    },
    {
      title: "Receiver Details",
      fields: [
        {
          label: "Name",
          value: formData ? `${formData.receiverFirstName} ${formData.receiverLastName}` : "-",
        },
        {
          label: "Email",
          value: formData?.receiverEmail || "-",
        },
        {
          label: "Phone",
          value: formData?.receiverPhone || "-",
        },
        {
          label: "Address",
          value: formData?.receiverAddress || "-",
        },
        {
          label: "City",
          value: formData?.receiverCity || "-",
        },
        {
          label: "State",
          value: formData ? getStateDisplayName(formData.receiverState, receiverStates) : "-",
        },
        {
          label: "Country",
          value: formData?.receiverCountry || "-",
        },
        {
          label: "ZIP Code",
          value: formData?.receiverZip || "-",
        },
      ],
    },
    {
      title: "Shipment Details",
      fields: [
        {
          label: "Item Name",
          value: formData?.itemName || "-",
        },
        {
          label: "Description",
          value: formData?.itemDescription || "-",
        },
        {
          label: "Weight",
          value: formData?.itemWeight ? `${formData.itemWeight}kg` : "-",
        },
        {
          label: "Value",
          value: formData?.itemValue ? `${formData.itemCurrency} ${parseFloat(formData.itemValue).toLocaleString()}` : "-",
        },
        {
          label: "Carrier",
          value: selectedRate?.carrier_name || "-",
        },
        {
          label: "Shipping Cost",
          value: selectedRate?.amount ? `${selectedRate.currency} ${selectedRate.amount.toLocaleString()}` : "-",
        },
        {
          label: "Delivery Time",
          value: selectedRate?.delivery_time || "-",
        },
      ],
    },
  ];

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
        onClose={() => setShowErrorModal(false)}
        error={errorMessage}
      />
      
      <div className="space-y-6">
        {currentStep === "form" && (
          <>
            <h2 className="font-bold text-center text-primary text-2xl">
              Request For Shipment
            </h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Sender Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">Sender Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="senderFirstName"
                    label="First Name"
                    placeholder="Enter first name"
                    register={register("senderFirstName")}
                    error={errors.senderFirstName?.message}
                    required
                  />
                  <FormInput
                    id="senderLastName"
                    label="Last Name"
                    placeholder="Enter last name"
                    register={register("senderLastName")}
                    error={errors.senderLastName?.message}
                    required
                  />
                  <FormInput
                    id="senderEmail"
                    label="Email"
                    type="email"
                    placeholder="sender@example.com"
                    register={register("senderEmail")}
                    error={errors.senderEmail?.message}
                    required
                  />
                  <FormInput
                    id="senderPhone"
                    label="Phone"
                    type="tel"
                    placeholder="+1234567890"
                    register={register("senderPhone")}
                    error={errors.senderPhone?.message}
                    required
                  />
                  <FormInput
                    id="senderAddress"
                    label="Address"
                    placeholder="Enter full address"
                    register={register("senderAddress")}
                    error={errors.senderAddress?.message}
                    required
                  />
                  
                  <FormSelect
                    id="senderCountry"
                    label="Country"
                    options={countryOptions}
                    register={register("senderCountry")}
                    error={errors.senderCountry?.message}
                    required
                    searchable
                    isLoading={countriesLoading}
                    onChange={(value: string | React.ChangeEvent<HTMLSelectElement> | string[]) => {
                      const newValue = typeof value === 'string' ? value : 
                                     Array.isArray(value) ? value[0] : 
                                     value.target.value;
                      setValue("senderCountry", newValue);
                      setValue("senderState", "");
                      setValue("senderCity", "");
                      setSenderStateName("");
                    }}
                  />
                  
                  <FormSelect
                    id="senderState"
                    label="State/Province"
                    options={senderStateOptions}
                    register={register("senderState")}
                    error={errors.senderState?.message}
                    required
                    searchable
                    isLoading={senderStatesLoading}
                    disabled={!watchSenderCountry}
                    onChange={(value: string | React.ChangeEvent<HTMLSelectElement> | string[]) => {
                      const newValue = typeof value === 'string' ? value : 
                                     Array.isArray(value) ? value[0] : 
                                     value.target.value;
                      setValue("senderState", newValue);
                      setValue("senderCity", "");
                      const selectedState = senderStates.find(state => state.isoCode === newValue);
                      if (selectedState) {
                        setSenderStateName(selectedState.name);
                      }
                    }}
                  />
                  
                  <FormSelect
                    id="senderCity"
                    label="City"
                    options={senderCityOptions}
                    register={register("senderCity")}
                    error={errors.senderCity?.message}
                    required
                    searchable
                    isLoading={senderCitiesLoading}
                    disabled={!watchSenderState}
                  />
                  
                  <FormInput
                    id="senderZip"
                    label="ZIP/Postal Code"
                    placeholder="Enter ZIP code"
                    register={register("senderZip")}
                    error={errors.senderZip?.message}
                  />
                </div>
              </div>

              {/* Receiver Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">Receiver Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="receiverFirstName"
                    label="First Name"
                    placeholder="Enter first name"
                    register={register("receiverFirstName")}
                    error={errors.receiverFirstName?.message}
                    required
                  />
                  <FormInput
                    id="receiverLastName"
                    label="Last Name"
                    placeholder="Enter last name"
                    register={register("receiverLastName")}
                    error={errors.receiverLastName?.message}
                    required
                  />
                  <FormInput
                    id="receiverEmail"
                    label="Email"
                    type="email"
                    placeholder="receiver@example.com"
                    register={register("receiverEmail")}
                    error={errors.receiverEmail?.message}
                    required
                  />
                  <FormInput
                    id="receiverPhone"
                    label="Phone"
                    type="tel"
                    placeholder="+1234567890"
                    register={register("receiverPhone")}
                    error={errors.receiverPhone?.message}
                    required
                  />
                  <FormInput
                    id="receiverAddress"
                    label="Address"
                    placeholder="Enter full address"
                    register={register("receiverAddress")}
                    error={errors.receiverAddress?.message}
                    required
                  />
                  
                  <FormSelect
                    id="receiverCountry"
                    label="Country"
                    options={countryOptions}
                    register={register("receiverCountry")}
                    error={errors.receiverCountry?.message}
                    required
                    searchable
                    isLoading={countriesLoading}
                    onChange={(value: string | React.ChangeEvent<HTMLSelectElement> | string[]) => {
                      const newValue = typeof value === 'string' ? value : 
                                     Array.isArray(value) ? value[0] : 
                                     value.target.value;
                      setValue("receiverCountry", newValue);
                      setValue("receiverState", "");
                      setValue("receiverCity", "");
                      setReceiverStateName("");
                    }}
                  />
                  
                  <FormSelect
                    id="receiverState"
                    label="State/Province"
                    options={receiverStateOptions}
                    register={register("receiverState")}
                    error={errors.receiverState?.message}
                    required
                    searchable
                    isLoading={receiverStatesLoading}
                    disabled={!watchReceiverCountry}
                    onChange={(value: string | React.ChangeEvent<HTMLSelectElement> | string[]) => {
                      const newValue = typeof value === 'string' ? value :
                                       Array.isArray(value) ? value[0] :
                                       value.target.value;
                      setValue("receiverState", newValue);
                      setValue("receiverCity", "");
                      const selectedState = receiverStates.find(state => state.isoCode === newValue);
                      if (selectedState) {
                        setReceiverStateName(selectedState.name);
                      }
                    }}
                  />
                  
                  <FormSelect
                    id="receiverCity"
                    label="City"
                    options={receiverCityOptions}
                    register={register("receiverCity")}
                    error={errors.receiverCity?.message}
                    required
                    searchable
                    isLoading={receiverCitiesLoading}
                    disabled={!watchReceiverState}
                  />
                  
                  <FormInput
                    id="receiverZip"
                    label="ZIP/Postal Code"
                    placeholder="Enter ZIP code"
                    register={register("receiverZip")}
                    error={errors.receiverZip?.message}
                  />
                </div>
              </div>

              {/* Parcel Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">Parcel Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    id="itemName"
                    label="Item Name"
                    placeholder="e.g., Laptop, Shoes"
                    register={register("itemName")}
                    error={errors.itemName?.message}
                    required
                  />
                  <FormInput
                    id="itemDescription"
                    label="Item Description"
                    placeholder="Brief description"
                    register={register("itemDescription")}
                    error={errors.itemDescription?.message}
                    required
                  />
                  <FormInput
                    id="itemWeight"
                    label="Weight (kg)"
                    type="number"
                    step="1"
                    placeholder="Weight in kg"
                    register={register("itemWeight")}
                    error={errors.itemWeight?.message}
                    required
                  />
                  <FormInput
                    id="itemValue"
                    label="Item Value"
                    type="number"
                    step="1"
                    placeholder="Item value"
                    register={register("itemValue")}
                    error={errors.itemValue?.message}
                    required
                  />
                  <FormSelect
                    id="itemCurrency"
                    label="Currency"
                    options={[
                      { value: "NGN", label: "NGN - Nigerian Naira" },
                      { value: "USD", label: "USD - US Dollar" },
                      { value: "EUR", label: "EUR - Euro" },
                      { value: "GBP", label: "GBP - British Pound" },
                    ]}
                    register={register("itemCurrency")}
                    error={errors.itemCurrency?.message}
                  />
                </div>
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
          <div ref={logisticsRef}>
            <LogisticsPartners
              shipmentData={formData}
              availableRates={availableRates}
              isLoadingRates={isLoadingRates}
              onBack={() => setCurrentStep("form")}
              onSubmit={handleRateSelection}
              isSubmitting={false}
            />
          </div>
        )}

        {currentStep === "preview" && (
          <PreviewComponent
            title="Review Your Shipment"
            sections={previewSections}
            onEdit={handleEdit}
            onProceedToBook={arrangePickup}
            onContactSupport={handleContactSupport}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
};

export default DomesticForm;