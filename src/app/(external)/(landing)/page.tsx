import type { NextPage } from "next";
import HeroSection from "./components/hero-section";
import GlobalBrands from "./components/global-brands";
import ServiceSection from "./components/services-section";
import shipbox from "@/app/assets/images/landing-page/shipping-boxes-globe.svg";
import StakeholderSection from "./components/stake-holder-section";
import { serviceFeatures } from "./data/services";
import { stakeholders } from "./data/stakeholders";

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
			</main>
		</div>
	);
};

export default Home;
