// domestic-form.tsx - Updated with termApi Axios client
import React, { useState, useEffect } from "react";
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
import { termApi } from "@/lib/axios"; // Adjust import path as needed

// Enhanced schema with international support
const domesticFormSchema = z.object({
  // Pickup (Sender)
  senderFirstName: z.string().min(1, "Sender first name is required"),
  senderLastName: z.string().min(1, "Sender last name is required"),
  senderEmail: z.string().email("Valid email required"),
  senderPhone: z.string().min(5, "Phone number required"),
  senderAddress: z.string().min(5, "Address required"),
  senderCity: z.string().min(1, "City required"),
  senderState: z.string().min(1, "State required"),
  senderCountry: z.string().min(2, "Country required"),
  senderZip: z.string().optional(),
  
  // Delivery (Receiver)
  receiverFirstName: z.string().min(1, "Receiver first name is required"),
  receiverLastName: z.string().min(1, "Receiver last name is required"),
  receiverEmail: z.string().email("Valid email required"),
  receiverPhone: z.string().min(5, "Phone number required"),
  receiverAddress: z.string().min(5, "Address required"),
  receiverCity: z.string().min(1, "City required"),
  receiverState: z.string().min(1, "State required"),
  receiverCountry: z.string().min(2, "Country required"),
  receiverZip: z.string().optional(),
  
  // Parcel
  itemName: z.string().min(1, "Item name required"),
  itemDescription: z.string().min(1, "Item description required"),
  itemValue: z.string().min(1, "Item value required"),
  itemWeight: z.string().min(1, "Item weight required"),
  itemCurrency: z.string().default("NGN"),
});

type DomesticFormInputs = z.infer<typeof domesticFormSchema>;

interface DomesticFormProps {
  onBack: () => void;
  onComplete?: (shipmentData: any) => void;
  isSubmitting: boolean;
}

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
      // Find and store the state name when state code is selected
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
      // Find and store the state name when state code is selected
      const selectedState = receiverStates.find(state => state.isoCode === watchReceiverState);
      if (selectedState) {
        setReceiverStateName(selectedState.name);
      }
    }
  }, [watchReceiverState, receiverStates]);

  // Format phone number based on country
  const formatPhoneNumber = (phone: string, countryCode: string) => {
    if (phone.startsWith('+')) return phone;
    
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // For Nigeria, ensure it starts with +234
    if (countryCode === 'NG' && cleanPhone.startsWith('0')) {
      return `+234${cleanPhone.substring(1)}`;
    }
    
    // For other countries, you might need different formatting logic
    // This is a basic implementation - you might want to enhance it
    return `+${cleanPhone}`;
  };

  // Create shipment draft with international support
  const createShipmentDraft = async (data: DomesticFormInputs) => {
    console.log("Creating shipment draft with data:", {
      senderState: data.senderState,
      senderStateName,
      receiverState: data.receiverState,
      receiverStateName
    });
    
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

      console.log("Final payload to Terminal Africa:", payload);

      // Use termApi Axios client instead of fetch
      const response = await termApi.post("/shipments/quick", payload);

      const result = response.data;
      console.log("Shipment draft created:", result);

      if (result.status && result.data) {
        setShipmentDraft(result.data);
        return result.data;
      } else {
        throw new Error(result.message || "Invalid response from Terminal Africa");
      }
    } catch (error: any) {
      console.error("Error creating shipment draft:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create shipment draft";
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Get rates for shipment using termApi
  const fetchRatesForShipment = async (shipmentId: string) => {
    setIsLoadingRates(true);
    try {
      // Use termApi Axios client instead of fetch
      const response = await termApi.get(
        `/rates/shipment/?shipment_id=${shipmentId}&cash_on_delivery=${true}`
      );

      const result = response.data;
      console.log("Rates fetched:", result);

      if (result.status && result.data) {
        const processedRates = result.data.map((rate: any) => ({
          ...rate,
          carrier_name: rate.carrier_name === "GIG Logistics" 
            ? "Obana Express" 
            : rate.carrier_name,
          amount: Math.round(rate.amount * 1.025),
          original_amount: rate.amount,
        }));

        setAvailableRates(processedRates);
        return processedRates;
      } else {
        toast.error(result.message || "No rates available for this route");
        return [];
      }
    } catch (error: any) {
      console.error("Error fetching rates:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch shipping rates";
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoadingRates(false);
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
      } else {
        toast.error("No shipping options available for this route");
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
      toast.error("Missing shipment or rate information");
      return;
    }

    try {
      const payload = {
        shipment_id: shipmentDraft.shipment_id,
        rate_id: selectedRate.rate_id,
        rate_amount: selectedRate.original_amount,
        rate_currency: selectedRate.currency,
      };

      // Use termApi Axios client instead of fetch
      const response = await termApi.post("/shipments/pickup/", payload);

      const result = response.data;
      console.log("Pickup arranged:", result);

      if (result.status && result.data) {
        toast.success("Shipment booked successfully!");
        
        // Add safety check for onComplete
        if (typeof onComplete === 'function') {
          onComplete({
            shipment: result.data,
            formData,
            selectedRate,
          });
        } else {
          console.error('onComplete is not a function', { onComplete });
          toast.error('Completion handler not available');
          // Fallback: go back to form
          setCurrentStep("form");
        }
      } else {
        throw new Error(result.message || "Invalid response from Terminal Africa");
      }
    } catch (error: any) {
      console.error("Error arranging pickup:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to arrange pickup";
      toast.error(errorMessage);
    }
  };

  const handleEdit = () => {
    setCurrentStep("form");
  };

  const handleContactSupport = () => {
    console.log("Contact customer support");
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
                
                {/* Country Dropdown */}
                <FormSelect
                  id="senderCountry"
                  label="Country"
                  options={countryOptions}
                  register={register("senderCountry")}
                  error={errors.senderCountry?.message}
                  required
                  searchable
                  isLoading={countriesLoading}
                  onChange={(e) => {
                    setValue("senderCountry", e.target.value);
                    setValue("senderState", "");
                    setValue("senderCity", "");
                    setSenderStateName("");
                  }}
                />
                
                {/* State Dropdown */}
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
                  onChange={(e) => {
                    setValue("senderState", e.target.value);
                    setValue("senderCity", "");
                    // Update state name when state is selected
                    const selectedState = senderStates.find(state => state.isoCode === e.target.value);
                    if (selectedState) {
                      setSenderStateName(selectedState.name);
                    }
                  }}
                />
                
                {/* City Dropdown */}
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
                
                {/* Country Dropdown */}
                <FormSelect
                  id="receiverCountry"
                  label="Country"
                  options={countryOptions}
                  register={register("receiverCountry")}
                  error={errors.receiverCountry?.message}
                  required
                  searchable
                  isLoading={countriesLoading}
                  onChange={(e) => {
                    setValue("receiverCountry", e.target.value);
                    setValue("receiverState", "");
                    setValue("receiverCity", "");
                    setReceiverStateName("");
                  }}
                />
                
                {/* State Dropdown */}
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
                  onChange={(e) => {
                    setValue("receiverState", e.target.value);
                    setValue("receiverCity", "");
                    // Update state name when state is selected
                    const selectedState = receiverStates.find(state => state.isoCode === e.target.value);
                    if (selectedState) {
                      setReceiverStateName(selectedState.name);
                    }
                  }}
                />
                
                {/* City Dropdown */}
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
                  step="0.01"
                  placeholder="Weight in kg"
                  register={register("itemWeight")}
                  error={errors.itemWeight?.message}
                  required
                />
                <FormInput
                  id="itemValue"
                  label="Item Value"
                  type="number"
                  step="0.01"
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
          onProceedToBook={arrangePickup}
          onContactSupport={handleContactSupport}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default DomesticForm;