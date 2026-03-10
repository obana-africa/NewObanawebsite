/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";

// Define a type for the form data
interface LogisticsFormData {
  [key: string]: unknown; // This allows for dynamic form fields while being type-safe
}

export const useLogistics = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogisticsForm = async (data: LogisticsFormData, formType: string) => {
    setIsSubmitting(true);
    let toastId: string | number | undefined;

    try {
      toastId = toast.loading(
        "Please wait, Submitting your Logistics Request..."
      );

      try {
        const crmPayload = {
          ...data,
          formType,
        };

        const crmResponse = await fetch("/api/crm/logistics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crmPayload),
        });

        if (crmResponse.ok) {
          const result = await crmResponse.json();
          console.log("✅ CRM submission successful:", result);
        } else {
          const errorData = await crmResponse.json();
          console.warn("⚠️ CRM submission failed:", errorData);
          // Continue with email submission even if CRM fails
        }
      } catch (crmError: unknown) {
        const errorMessage = crmError instanceof Error ? crmError.message : "Unknown error";
        console.error("⚠️ Failed to send to CRM:", errorMessage);
        // Continue with email submission even if CRM fails
      }

      // Then, send the logistics form (emails)
      const response = await fetch("/api/logistics-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, formType }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit logistics form");
      }

      toast.success("Your logistics request has been submitted successfully!", {
        id: toastId,
      });
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "There was an error submitting your request. Please try again.";
      toast.error(errorMessage, { id: toastId });
      console.error("Logistics submission error:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitLogisticsForm, isSubmitting };
};
