import React from "react";

import Image from "next/image";
import globeImage from "@/app/assets/images/landing-page/globe.svg";

const RotatingGlobe = () => {
	return (
		<div>
			<Image
				src={globeImage}
				alt="Globe"
				fill
				style={{ objectFit: "contain" }}
				priority
				className="globe-shadow"
			/>
		</div>
	);
};

export default RotatingGlobe;
