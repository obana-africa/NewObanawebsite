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
import { CheckCircle, Clock, Shield, Truck, Package, Users, Factory, Award, Sparkles, Building2, Globe2 } from "lucide-react";

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
    { value: "Bags", label: "👜 Bags & Luggage" },
    { value: "Beauty", label: "💄 Beauty & Cosmetics" },
    { value: "Jewelry", label: "💍 Jewelry" },
    { value: "Home Textiles", label: "🏠 Home Textiles" },
    { value: "Technical Wear", label: "⚡ Technical Wear" },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Manufacturer & Supplier Matching</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Source Your Products with{" "}
            <span className="text-primary">Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us what you need, and we&apos;ll connect you with verified manufacturers and suppliers 
            who match your exact requirements.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-2">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Active SMEs</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Factory className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Vetted Manufacturers</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Globe2 className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">
                Quote request submitted successfully! We&apos;ll contact you within 24-48 hours.
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
                How Sourcing Works
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Submit Requirements", desc: "Tell us about your product and quantities" },
                  { step: 2, title: "Get Matched", desc: "We connect you with vetted manufacturers" },
                  { step: 3, title: "Receive Quotes", desc: "Compare proposals and choose your partner" },
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
                Why Partner With Us
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Vetted Manufacturers", sub: "100% verified" },
                  { icon: Clock, text: "48hr Response", sub: "Guaranteed" },
                  { icon: Truck, text: "End-to-End Support", sub: "Sample to delivery" },
                  { icon: Package, text: "Flexible MOQs", sub: "Small batches welcome" },
                  { icon: Building2, text: "Quality Control", sub: "Strict checks" },
                  { icon: Award, text: "Best Match", sub: "98% satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-gray-900 text-sm">{item.text}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Products We Source */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Product Categories
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {productTypes.map((type) => (
                  <div key={type.value} className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-100 text-sm">
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 lg:sticky lg:top-24">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request a Quote</h2>
              <p className="text-gray-600 text-sm">Fill in your requirements and we&apos;ll match you with the right suppliers</p>
            </div>
            
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
                  placeholder="john@company.com"
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
                  label="Product Category"
                  options={productTypes}
                  register={register("productType")}
                  error={errors.productType?.message}
                  placeholder="Select category"
                />
              </div>

              {/* Description */}
              <FormTextarea
                id="itemDescription"
                label="Product Description"
                placeholder="Describe your product: materials, colors, special features, target market, etc."
                register={register("itemDescription")}
                error={errors.itemDescription?.message}
                rows={3}
                required
              />

              {/* Brand & MOQ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  id="brandToSource"
                  label="Target Brand (Optional)"
                  options={brandOptions}
                  register={register("brandToSource")}
                  error={errors.brandToSource?.message}
                  placeholder="Select or type brand"
                  searchable
                />
                <FormInput
                  id="moq"
                  label="Target MOQ (units)"
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
                  placeholder="e.g., XS-4XL, 35-45"
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
                  label="Style/Aesthetic"
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
                  fileTypes="PNG, JPG, PDF"
                />
              </div>

              {/* Additional Comments */}
              <FormTextarea
                id="comment"
                label="Additional Requirements"
                placeholder="Timeline, certifications, special requests..."
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
                {isSubmitting ? "Submitting..." : "Find Manufacturers →"}
              </Button>

              <p className="text-xs text-gray-400 text-center mt-2">
                By submitting, you agree to our Terms and Privacy Policy
              </p>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 text-sm text-gray-500 bg-white px-6 py-3 rounded-full shadow-sm">
            <span>✓ Secure & Confidential</span>
            <span>✓ No Obligation</span>
            <span>✓ Free Matching Service</span>
            <span>✓ Vetted Suppliers Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
