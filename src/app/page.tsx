import Header from "@/domains/external/components/header";
import HeroSection from "@/domains/external/landing/components/hero-section";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div className="min-h-screen">
			<Header />
			<main>
				<HeroSection />
			</main>
		</div>
	);
};

export default Home;
