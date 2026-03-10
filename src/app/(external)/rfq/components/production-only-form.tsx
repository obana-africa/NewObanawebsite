"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productionQuoteSchema } from "@/schemas";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import Button from "@/components/ui/button";
import { CurrencyInputField } from "@/components/ui/currency-input";
import useBrandOptions from "@/hooks/use-active-brands";

interface ProductionFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const ProductionForm: React.FC<ProductionFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productionQuoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "",
      itemDescription: "",
      brandToSource: "",
      moq: "",
      sizeRange: "",
      targetPrice: {
        currency: "NGN",
        amount: 0
      },
      style: "",
      comment: "",
      sampleProduct: null,
      sampleProductUrl: "",
    },
  });
  const { brands: brandOptions, error: brandsError } = useBrandOptions();

  const productTypes = [
    { value: "Footwear", label: "Footwear (Shoes, Sandals, Boots)" },
    { value: "Apparel", label: "Apparel (Tops, Dresses, Pants)" },
    { value: "Accessories", label: "Accessories (Belts, Hats, Scarves)" },
    { value: "Bags", label: "Bags & Luggage" },
    { value: "Beauty", label: "Beauty & Cosmetics" },
    { value: "Jewelry", label: "Jewelry" },
    { value: "Other", label: "Other" },
  ];

  const itemStyles = [
    { value: "Casual", label: "Casual" },
    { value: "Formal", label: "Formal" },
    { value: "Streetwear", label: "Streetwear" },
    { value: "Athleisure", label: "Athleisure" },
    { value: "Traditional", label: "Traditional" },
    { value: "Minimalist", label: "Minimalist" },
    { value: "Luxury", label: "Luxury" },
    { value: "Sustainable", label: "Sustainable/Eco-friendly" },
  ];

  const handleFileUploadComplete = (url: string | null) => {
    setValue("sampleProductUrl", url || "");
  };

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      sampleProduct: data.sampleProductUrl || null,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          id="name"
          label="Full Name"
          placeholder="Enter your full name"
          register={register("name")}
          error={errors.name?.message as string | undefined}
          required
        />

        <FormInput
          id="email"
          label="Email Address"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email?.message as string | undefined}
          type="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhoneInput
          control={control}
          name="phone"
          label="Phone Number"
          error={errors.phone?.message as string | undefined}
          required
        />

        <FormSelect
          id="productType"
          label="Product Type"
          placeholder="Select product category"
          options={productTypes}
          register={register("productType")}
          error={errors.productType?.message as string | undefined}
        />
      </div>

      <FormTextarea
        id="itemDescription"
        label="Product Description"
        placeholder="Describe your product in detail: materials, colors, special features, target market, etc."
        register={register("itemDescription")}
        error={errors.itemDescription?.message as string | undefined}
        rows={3}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="brandToSource"
          label="Target Brand/Market"
          placeholder="Select or type brand"
          options={brandOptions}
          register={register("brandToSource")}
          error={errors.brandToSource?.message as string | undefined || brandsError}
          searchable
          allowCustom
        />

        <FormSelect
          id="style"
          label="Style/Aesthetic"
          options={itemStyles}
          register={register("style")}
          error={errors.style?.message as string | undefined}
          placeholder="Select style"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          id="moq"
          label="MOQ (units)"
          placeholder="Minimum order quantity"
          register={register("moq")}
          error={errors.moq?.message as string | undefined}
          type="number"
        />

        <FormInput
          id="sizeRange"
          label="Size Range"
          placeholder="e.g., XS-4XL, 35-45"
          register={register("sizeRange")}
          error={errors.sizeRange?.message as string | undefined}
          required
        />

        <CurrencyInputField
          name="targetPrice"
          // @ts-ignore - Ignoring complex type issues with react-hook-form
          control={control}
          label="Target Price/unit"
          placeholder="Per unit"
          defaultValue={{ currency: "NGN", amount: 0 }}
          required
          error={typeof errors.targetPrice?.message === "string" ? errors.targetPrice.message : undefined}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFileUpload
          id="sampleProduct"
          label="Reference Images (Optional)"
          onUploadComplete={handleFileUploadComplete}
          accept="image/*"
          fileTypes="PNG, JPG, JPEG"
        />

        <FormTextarea
          id="comment"
          label="Additional Requirements"
          placeholder="Timeline, certifications needed, special requests..."
          register={register("comment")}
          error={errors.comment?.message as string | undefined}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        animation="ripple"
        className="w-full py-3 text-base font-medium"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </Button>

      <p className="text-xs text-gray-400 text-center mt-2">
        By submitting, you agree to our Terms and Privacy Policy
      </p>
    </form>
  );
};

export default ProductionForm;
