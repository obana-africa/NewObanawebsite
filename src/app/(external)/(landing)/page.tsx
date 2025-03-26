import type { NextPage } from "next";
import HeroSection from "./sections/hero-section";
import GlobalBrands from "./sections/brands-section";
import ServiceSection from "./sections/services-section";
import shipbox from "@/app/assets/images/landing-page/shipping-boxes-globe.svg";
import StakeholderSection from "./sections/stakeholder-section";
import { serviceFeatures } from "./data/services";
import { stakeholders } from "./data/stakeholders";
import WhyObanaSection from "./sections/why-obana";
import CtaSection from "../../../components/external/components/cta-section";
import Testimonials from "./sections/testimonials-section";

const Home: NextPage = () => {
	return (
		<div className=" min-h-screen">
			<main>
				<HeroSection />
				<GlobalBrands />
				<ServiceSection features={serviceFeatures} imageSrc={shipbox} />
				<StakeholderSection
					title="Who We Serve & How You Benefit"
					stakeholders={stakeholders}
					globeImage={shipbox}
				/>
				<WhyObanaSection />
				<CtaSection />
				<Testimonials title="What Our Eco System Partners Says" />
			</main>
		</div>
	);
};

export default Home;
