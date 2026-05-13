import type { NextPage } from "next";
import HeroSection from "./sections/hero-section";
import GlobalBrands from "./sections/brands-section";
import EcosystemSection from "./sections/ecosystemSection";
import HowObanaWorks from "./sections/HowObanaWorks";
import ServiceSection from "./sections/services-section";
import shipbox from "@/app/assets/images/landing-page/shipping-boxes-globe.svg";
import StakeholderSection from "./sections/stakeholder-section";
import EcosystemSectionTwo from "./sections/EcosystemSectionTwo";
import { serviceFeatures } from "./data/services";
import { stakeholders } from "./data/stakeholders";
import ImpactSection from "./sections/impact-section";
import { impactData } from "./data/impact";
import TestimonialSection from "./sections/testimonials-section";
import { testimonials } from "./data/testimonials";

const Home: NextPage = () => {
	return (
		<div className="min-h-screen">
			<main>
				<HeroSection />
				<GlobalBrands />
				<EcosystemSection />
				{/* <HowObanaWorks /> */}
				{/* <ServiceSection features={serviceFeatures} imageSrc={shipbox} /> */}
				<StakeholderSection
					title="Built for Businesses Across Commerce"
					stakeholders={stakeholders}
				/>
				<EcosystemSectionTwo/>
				{/* <WhyObanaSection /> */}
				{/* <ImpactSection
					title={impactData.title}
					description={impactData.description}
					impactItems={impactData.impactItems}
					backgroundImage={shipbox}
				/> */}
				{/* <ImpactCarousel /> */}
				{/* <CtaSection /> */}
				{/* <Testimonials title="What Our Eco System Partners Says" /> */}
				<TestimonialSection
					title="Testimonials"
					testimonials={testimonials}
					autoPlayInterval={2000} 
				/>
			</main>
		</div>
	);
};

export default Home;
