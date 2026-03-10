"use client";

import React from "react";
import ProductionForm from "./quote-forms/production-form";
import { useRfqForm } from "@/hooks/use-rfq-form";
import { 
  Clock, 
  Shield, 
  Truck, 
  Palette, 
  Ruler,
  Star,
  TrendingUp,
  Users
} from "lucide-react";

// Define proper types
interface FormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
  itemDescription: string;
  brandToSource: string;
  moq: string;
  sizeRange: string;
  targetPrice: {
    currency: string;
    amount: number;
  };
  style: string;
  comment: string;
  sampleProduct: string | null;
  sampleProductUrl: string;
}

const ProductionOnlyForm: React.FC = () => {
  const { submitRfqForm, isSubmitting } = useRfqForm();

  const handleSubmit = async (data: FormData) => {
    try {
      const success = await submitRfqForm({ ...data }, "production");
      if (success) {
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      {/* Breadcrumb replacement - subtle context */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Request for Quote</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Get accurate pricing tailored to your production needs. 
          Complete the form and we&apos;ll connect you with the right manufacturing partners.
        </p>
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Context & Benefits (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* How It Works Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Submit Requirements", desc: "Fill in your production needs and upload references" },
                { step: "2", title: "Get Matched", desc: "We connect you with vetted manufacturers in 24-48h" },
                { step: "3", title: "Receive Quotes", desc: "Compare options and choose the best partner" }
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Fashion SMEs Choose Us</h2>
            <div className="space-y-3">
              {[
                { Icon: Shield, text: "Vetted & verified manufacturers" },
                { Icon: Clock, text: "48-hour response guarantee" },
                { Icon: Ruler, text: "Flexible MOQs (as low as 50 units)" },
                { Icon: Palette, text: "Sample development support" },
                { Icon: Truck, text: "End-to-end logistics" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What We Produce Card */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Products We Produce</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "👟 Footwear", "👕 Apparel", "👜 Bags", 
                "🧢 Headwear", "💄 Beauty", "📿 Accessories",
                "👗 Dresses", "🧥 Outerwear"
              ].map((item) => (
                <span key={item} className="text-sm bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-100">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-sm text-gray-600 pt-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>500+ SMEs</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>98% Match Rate</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form (7 columns) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 lg:sticky lg:top-24">
            <ProductionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>

      {/* Bottom Trust Banner */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
        <p>✓ All information is secure and confidential ✓ No obligation to proceed ✓ Free matching service</p>
      </div>
    </section>
  );
};

export default ProductionOnlyForm;
