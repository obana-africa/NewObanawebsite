"use client";

import React from "react";
import ProductionForm from "./quote-forms/production-form";
import Image from "next/image";
import below from "@/app/assets/images/rfq/below.png";
import { useRfqForm } from "@/hooks/use-rfq-form";
import { CheckCircle, Clock, Shield, Truck, Palette, Ruler } from "lucide-react";

const ProductionOnlyForm: React.FC = () => {
	const { submitRfqForm, isSubmitting } = useRfqForm();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (data: any) => {
		const success = await submitRfqForm({ ...data }, "production");
		// You can add a success message/toast here if needed
		if (success) {
			// Optionally reset form or show success message
			console.log("Form submitted successfully");
		}
	};

	return (
		<section className="container mx-auto px-4 py-8 md:py-12 relative">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
				{/* Left Column - Form */}
				<div className="bg-secondary rounded-lg p-6 md:p-8 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
					<ProductionForm 
						onSubmit={handleSubmit} 
						isSubmitting={isSubmitting} 
					/>
				</div>

				{/* Right Column - Information & Benefits */}
				<div className="space-y-6">
					<div className="bg-gradient-to-br from-primary/10 to-secondary p-6 rounded-lg">
						<h2 className="text-2xl font-bold text-primary mb-4">
							Production Quote Request
						</h2>
						<p className="text-gray-700 mb-4">
							Get matched with vetted manufacturers for your fashion and beauty products. 
							Complete the form and we'll connect you with the right production partners.
						</p>
						<div className="flex items-center gap-2 text-sm text-gray-600">
							<Clock className="w-4 h-4" />
							<span>Response within 24-48 hours</span>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm">
						<h3 className="font-semibold text-lg mb-4">Why choose our production service?</h3>
						<div className="space-y-4">
							<div className="flex gap-3">
								<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium">Vetted Manufacturers</p>
									<p className="text-sm text-gray-600">All partners are verified for quality and reliability</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Palette className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium">Custom Development</p>
									<p className="text-sm text-gray-600">Sample making and product development support</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Ruler className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium">Flexible MOQs</p>
									<p className="text-sm text-gray-600">Small batch to mass production options</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium">Quality Assurance</p>
									<p className="text-sm text-gray-600">Strict quality control at every stage</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
								<div>
									<p className="font-medium">Logistics Support</p>
									<p className="text-sm text-gray-600">Shipping and delivery coordination</p>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 p-6 rounded-lg">
						<h3 className="font-semibold text-lg mb-3">Products we produce:</h3>
						<div className="grid grid-cols-2 gap-2">
							<span className="text-sm bg-white px-3 py-2 rounded">👟 Footwear</span>
							<span className="text-sm bg-white px-3 py-2 rounded">👕 Apparel</span>
							<span className="text-sm bg-white px-3 py-2 rounded">👜 Bags</span>
							<span className="text-sm bg-white px-3 py-2 rounded">🧢 Headwear</span>
							<span className="text-sm bg-white px-3 py-2 rounded">💄 Beauty</span>
							<span className="text-sm bg-white px-3 py-2 rounded">📿 Accessories</span>
						</div>
					</div>

					<div className="text-sm text-gray-500 italic">
						<p>* All fields marked with asterisk are required</p>
					</div>
				</div>
			</div>
			
			{/* Decorative element */}
			<div className="absolute -top-[80px] -right-16 bg-white/10 rounded-lg hidden lg:block" data-aos="zoom-in">
				<Image src={below} alt="Decorative square" width={400} height={300} />
			</div>
		</section>
	);
};

export default ProductionOnlyForm;
