"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRfqForm } from "@/hooks/use-rfq-form";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import FormTextarea from "@/components/ui/form-textarea";
import FormFileUpload from "@/components/ui/form-file-upload";
import PhoneInput from "@/components/ui/phone-input";
import { CurrencyInputField } from "@/components/ui/currency-input";
import useBrandOptions from "@/hooks/use-active-brands";
import { CheckCircle, Clock, Shield, Truck, Package } from "lucide-react";

// Define the schema (matching your existing one)
const productionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  productType: z.string().min(1, "Product type is required"),
  itemDescription: z.string().min(1, "Description is required"),
  brandToSource: z.string().optional(),
  moq: z.string().optional(),
  sizeRange: z.string().min(1, "Size range is required"),
  targetPrice: z.object({
    amount: z.number(),
    currency: z.string(),
  }),
  style: z.string().optional(),
  comment: z.string().optional(),
  sampleProductUrl: z.string().optional(),
});

type FormData = z.infer<typeof productionSchema>;

export default function SinglePageRFQ() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { submitRfqForm } = useRfqForm();
  const { brands: brandOptions } = useBrandOptions();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(productionSchema),
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
        amount: 0,
        currency: "NGN",
      },
      style: "",
      comment: "",
      sampleProductUrl: "",
    },
  });

  const productTypes = [
    { value: "Footwear", label: "👟 Footwear" },
    { value: "Apparel", label: "👕 Apparel" },
    { value: "Accessories", label: "📿 Accessories" },
    { value: "Bags", label: "👜 Bags" },
    { value: "Beauty", label: "💄 Beauty" },
  ];

  const itemStyles = [
    { value: "Casual", label: "Casual" },
    { value: "Formal", label: "Formal" },
    { value: "Streetwear", label: "Streetwear" },
    { value: "Traditional", label: "Traditional" },
  ];

  const handleFileUpload = (url: string | null) => {
    setValue("sampleProductUrl", url || "");
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const success = await submitRfqForm(data, "production");
      if (success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Request for Quote
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get accurate pricing for your fashion and beauty production needs
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">
                Quote request submitted successfully! We'll contact you within 24-48 hours.
              </p>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Information */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How It Works
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Submit Requirements", desc: "Fill in your production details" },
                  { step: 2, title: "Get Matched", desc: "We connect you with vetted manufacturers" },
                  { step: 3, title: "Receive Quotes", desc: "Compare and choose the best option" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Vetted Manufacturers" },
                  { icon: Clock, text: "48hr Response" },
                  { icon: Truck, text: "End-to-End Support" },
                  { icon: Package, text: "Flexible MOQs" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products We Make */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Products We Produce
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {productTypes.map((type) => (
                  <div key={type.value} className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100">
                    {type.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-around text-sm text-gray-600 pt-4">
              <span>✓ 500+ SMEs</span>
              <span>✓ 4.8/5 Rating</span>
              <span>✓ 98% Match Rate</span>
            </div>
          </div>

          {/* RIGHT COLUMN - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Production Quote Form
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  label="Full Name"
                  placeholder="John Doe"
                  register={register("name")}
                  error={errors.name?.message}
                  required
                />
                <FormInput
                  id="email"
                  label="Email"
                  placeholder="john@example.com"
                  register={register("email")}
                  error={errors.email?.message}
                  type="email"
                  required
                />
              </div>

              {/* Phone & Product Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneInput
                  control={control}
                  name="phone"
                  label="Phone Number"
                  error={errors.phone?.message}
                  required
                />
                <FormSelect
                  id="productType"
                  label="Product Type"
                  options={productTypes}
                  register={register("productType")}
                  error={errors.productType?.message}
                  placeholder="Select product type"
                />
              </div>

              {/* Description */}
              <FormTextarea
                id="itemDescription"
                label="Product Description"
                placeholder="Describe your product in detail..."
                register={register("itemDescription")}
                error={errors.itemDescription?.message}
                rows={3}
                required
              />

              {/* Brand & MOQ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  id="brandToSource"
                  label="Target Brand"
                  options={brandOptions}
                  register={register("brandToSource")}
                  error={errors.brandToSource?.message}
                  placeholder="Select or type brand"
                  searchable
                  allowCustom
                />
                <FormInput
                  id="moq"
                  label="MOQ (units)"
                  placeholder="Minimum order quantity"
                  register={register("moq")}
                  error={errors.moq?.message}
                  type="number"
                />
              </div>

              {/* Size Range & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="sizeRange"
                  label="Size Range"
                  placeholder="e.g., XS-4XL"
                  register={register("sizeRange")}
                  error={errors.sizeRange?.message}
                  required
                />
                <CurrencyInputField
                  name="targetPrice"
                  control={control}
                  label="Target Price/unit"
                  placeholder="Price per unit"
                  defaultValue={{ currency: "NGN", amount: 0 }}
                  required
                  error={errors.targetPrice?.message}
                />
              </div>

              {/* Style & File Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  id="style"
                  label="Style"
                  options={itemStyles}
                  register={register("style")}
                  error={errors.style?.message}
                  placeholder="Select style"
                />
                <FormFileUpload
                  id="sampleProduct"
                  label="Reference Images"
                  onUploadComplete={handleFileUpload}
                  accept="image/*"
                  fileTypes="PNG, JPG"
                />
              </div>

              {/* Additional Comments */}
              <FormTextarea
                id="comment"
                label="Additional Requirements"
                placeholder="Timeline, special requests, etc."
                register={register("comment")}
                error={errors.comment?.message}
                rows={2}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-lg"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>

              <p className="text-xs text-gray-400 text-center mt-2">
                By submitting, you agree to our Terms and Privacy Policy
              </p>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p>✓ Secure & Confidential ✓ No Obligation ✓ Free Matching Service</p>
        </div>
      </div>
    </div>
  );
}
