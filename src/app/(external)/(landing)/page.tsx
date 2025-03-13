import type { NextPage } from "next";
import HeroSection from "./components/hero-section";
import GlobalBrands from "./components/global-brands";
import ServiceSection from "./components/services-section";
import shipbox from "@/app/assets/images/landing-page/shipping-boxes-globe.svg";
import productSorce from "@/app/assets/images/landing-page/product-sorcing.svg";
import inventory from "@/app/assets/images/landing-page/inventory.svg";
import sales from "@/app/assets/images/landing-page/sales-part.svg";
import logistics from "@/app/assets/images/landing-page/logistics.svg";

const Home: NextPage = () => {
	const serviceFeatures = [
		{
			icon: productSorce,
			title: "Product Sourcing",
			description:
				"Via our curated marketplace, Obana will scout the world looking for and onboarding vendors that have what our SMEs need, work with them to price and set MOQs that are relatable to our target customer",
			buttonText: "Get Started",
		},
		{
			icon: logistics,
			title: "Logistics",
			description:
				"We work with tech enabled logistics partners for inter national and intra country pick up and delivery of goods, with track trace and costing visibility to enable our SMEs make clear decision on total landed cost of their goods and delivery timeline to ensure proper planning.",
			buttonText: "Get Started",
		},
		{
			icon: inventory,
			title: "Inventory Financing",
			description:
				"Work with 3rd party partners to review and qualify SMEs that require financing for their inventory purchase to ensure they have the right assortment to grow their business and cash flow to ensure required working capital",
			buttonText: "Get Started",
		},
		{
			icon: sales,
			title: "Sales Partners",
			description:
				"Onboard sales partners from across Nigeria and Sub Saharan African to help connect SMEs to the right vendors ensuring the curation of sourcing to suit the need of the sme. Our sales partners are also helpful in our virtual distribution push and help provide insight into market entry opportunities",
			buttonText: "Get Started",
		},
	];
	return (
		<div className=" min-h-screen">
			<main>
				<HeroSection />
				<GlobalBrands />
				<ServiceSection features={serviceFeatures} imageSrc={shipbox} />
			</main>
		</div>
	);
};

export default Home;
