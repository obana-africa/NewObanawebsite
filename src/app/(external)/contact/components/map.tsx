"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

interface MapSectionProps {
	googleMapsApiKey: string;
	defaultLocation: { lat: number; lng: number };
	defaultZoom: number;
	address: string;
}

const containerStyle = {
	width: "100%",
	height: "100%",
};

const MapSection: React.FC<MapSectionProps> = ({
	googleMapsApiKey,
	defaultLocation,
	defaultZoom,
	address,
}) => {
	return (
		<div className="h-64 md:h-96 lg:h-full relative rounded-lg overflow-hidden shadow-md">
			<LoadScript
				googleMapsApiKey={googleMapsApiKey}
				loadingElement={
					<div className="h-full w-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
						<p>Loading map...</p>
					</div>
				}
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={defaultLocation}
					zoom={defaultZoom}
				>
					<Marker position={defaultLocation} />
				</GoogleMap>
			</LoadScript>

			<div className="absolute top-4 left-4 bg-white p-4 rounded-md shadow-md max-w-xs">
				<div className="flex items-start">
					<MapPin className="text-error mr-2 min-w-4 mt-1" size={16} />
					<div>
						<p className="font-semibold text-primary">{address}</p>
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
								address
							)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-secondary-dark text-sm hover:underline mt-1 inline-block"
						>
							View Large Map
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MapSection;
