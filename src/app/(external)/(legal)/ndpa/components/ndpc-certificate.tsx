import React from "react";
import Image from "next/image";
import certificate from "@/app/assets/images/legal/ndpc-certificate.png";
import {
	NDPC_CERTIFICATE_PDF,
	NDPC_REGISTERED_NAME,
	NDPC_REGISTRATION_NUMBER,
	NDPC_VALID_FROM,
	NDPC_VALID_TO,
} from "../data/certificate";

const NdpcCertificate = () => {
	return (
		<figure className="mb-6 max-w-xl">
			<a
				href={NDPC_CERTIFICATE_PDF}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Open the NDPC certificate of registration as a PDF"
				className="block rounded-lg overflow-hidden border border-secondary shadow-sm transition-shadow duration-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				<Image
					src={certificate}
					alt={`NDPC certificate of registration issued to ${NDPC_REGISTERED_NAME}, registration ID ${NDPC_REGISTRATION_NUMBER}, valid from ${NDPC_VALID_FROM} to ${NDPC_VALID_TO}.`}
					placeholder="blur"
					sizes="(min-width: 440px) 476px, 80vw"
					className="w-full h-auto"
				/>
			</a>

			
		</figure>
	);
};

export default NdpcCertificate;
