"use client";

import React, { useState } from "react";
import ProductionForm from "./quote-forms/production-form";
import Button from "@/components/ui/button";
import Image from "next/image";
import below from "@/app/assets/images/rfq/below.png";
import { useRfqForm } from "@/hooks/use-rfq-form";

const ProductionOnlyForm: React.FC = () => {
	const [showForm, setShowForm] = useState(false);
	const { submitRfqForm, isSubmitting } = useRfqForm();

	const handleStartRequest = () => {
		setShowForm(true);
	};

	const handleBack = () => {
		setShowForm(false);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (data: any) => {
		const success = await submitRfqForm({ ...data }, "production");

		if (success) {
			setShowForm(false);
		}
	};

	const renderWelcomeScreen = () => {
		return (
			<div className="space-y-8 p-6 md:p-10 mx-auto" id="rfqform">
				<div className="text-center space-y-4">
					<h2 className="font-bold text-3xl md:text-4xl text-primary">
						Production Quote Request
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Get accurate pricing for your shoe and apparel production needs. 
						Our tailored solutions help fashion and beauty SMEs bring their 
						designs to life with quality manufacturing partners.
					</p>
				</div>

				<div className="bg-primary/5 rounded-xl p-8 max-w-3xl mx-auto">
					<h3 className="font-semibold text-xl mb-4 text-center">
						What we offer for Fashion & Beauty SMEs:
					</h3>
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Custom shoe manufacturing</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Apparel production</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Sample development</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Small to large batch runs</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Quality control assurance</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="text-primary text-xl">✓</span>
							<span>Sustainable production options</span>
						</li>
					</ul>
				</div>

				<div className="flex justify-center mt-8">
					<Button
						onClick={handleStartRequest}
						variant="primary"
						animation="ripple"
						className="border border-primary px-8 py-3 text-lg"
					>
						Start Production Quote Request
					</Button>
				</div>
			</div>
		);
	};

	return (
		<section className="container mx-auto px-4 md:py-12 mb-4 relative">
			<div className="bg-secondary rounded-lg z-10 px-4 md:px-16 pt-10 pb-16 relative overflow-hidden 2xl:w-[70%] mx-auto">
				{showForm ? (
					<div className="px-4 md:p-6">
						<ProductionForm
							onBack={handleBack}
							onSubmit={handleSubmit}
							isSubmitting={isSubmitting}
						/>
					</div>
				) : (
					renderWelcomeScreen()
				)}
			</div>
			<div
				className="absolute -top-[80px] -right-16 bg-white/10 rounded-lg hidden sm:block"
				data-aos="zoom-in"
			>
				<Image src={below} alt="Decorative square" width={400} height={300} />
			</div>
		</section>
	);
};

export default ProductionOnlyForm;
