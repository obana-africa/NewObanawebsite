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
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Truck, 
  Package, 
  Users,
  Factory,
  Sparkles,
  ArrowRight,
  Building2,
  Globe2,
  Award
} from "lucide-react";

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
    { value: "Sustainable", label: "🌱 Sustainable/Eco-friendly" },
    { value: "Other", label: "✨ Other" },
  ];

  const itemStyles = [
    { value: "Casual", label: "Casual" },
    { value: "Formal", label: "Formal" },
    { value: "Streetwear", label: "Streetwear" },
    { value: "Athleisure", label: "Athleisure" },
    { value: "Traditional", label: "Traditional" },
    { value: "Minimalist", label: "Minimalist" },
    { value: "Luxury", label: "Luxury" },
    { value: "Avant-Garde", label: "Avant-Garde" },
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
        {/* Header Section - More Professional */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Manufacturer & Supplier Matching</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Source Your Products with{" "}
            <span className="text-primary relative">
              Confidence
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C43.5 2 120.5 1 199 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tell us what you need, and we&apos;ll connect you with verified manufacturers and suppliers 
            who match your exact requirements. From prototypes to mass production.
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
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-lg">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
              <p className="text-green-800 text-lg mb-2">
                We&apos;re matching you with the right manufacturers.
              </p>
              <p className="text-gray-600">
                You&apos;ll receive quotes within <span className="font-semibold">24-48 hours</span>
              </p>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Information */}
          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                How Sourcing Works
              </h2>
              <div className="space-y-6">
                {[
                  { 
                    step: 1, 
                    title: "Submit Your Requirements", 
                    desc: "Tell us about your product, quantities, and specifications",
                    icon: "📋"
                  },
                  { 
                    step: 2, 
                    title: "We Match You", 
                    desc: "Our team connects you with pre-vetted manufacturers that fit your needs",
                    icon: "🤝"
                  },
                  { 
                    step: 3, 
                    title: "Receive Quotes", 
                    desc: "Compare proposals, samples, and choose your partner",
                    icon: "📊"
                  },
                  { 
                    step: 4, 
                    title: "Production Begins", 
                    desc: "We support you through sampling, production, and delivery",
                    icon: "🏭"
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-2xl group-hover:bg-primary/10 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary">Step {item.step}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Partner With Us */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                Why Partner With Us
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Vetted Manufacturers", sub: "100% verified partners" },
                  { icon: Clock, text: "48hr Response", sub: "Guaranteed quick replies" },
                  { icon: Truck, text: "End-to-End Support", sub: "From sample to delivery" },
                  { icon: Package, text: "Flexible MOQs", sub: "Small batches welcome" },
                  { icon: Building2, text: "Quality Control", sub: "Strict quality checks" },
                  { icon: Globe2, text: "Global Network", sub: "15+ countries" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-gray-900 text-sm">{item.text}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories We Source */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {productTypes.slice(0, 8).map((type) => (
                  <div key={type.value} className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2 hover:bg-white transition-colors">
                    <span className="text-xl">{type.label.split(' ')[0]}</span>
                    <span className="text-sm font-medium text-gray-700">{type.label.replace(/[👟👕📿👜💄💍🏠⚡🌱✨]\s/, '')}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
                  View all categories <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Testimonial/Trust Badge */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                        {['JD','MA','SK','RT'][i-1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Trusted by 500+ businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-24">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h2>
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
                placeholder="Describe your product in detail: materials, colors, special features, target market, etc."
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
                placeholder="Timeline, certifications needed, special requests, budget constraints..."
                register={register("comment")}
                error={errors.comment?.message}
                rows={2}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Find Manufacturers →"}
              </Button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By submitting, you agree to our Terms of Service and Privacy Policy. 
                We'll match you with verified manufacturers only.
              </p>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-gray-500 bg-white px-8 py-4 rounded-full shadow-sm">
            <span>✓ Secure & Confidential</span>
            <span>✓ No Obligation</span>
            <span>✓ Free Matching Service</span>
            <span>✓ Vetted Suppliers Only</span>
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
