import React, { useState } from "react";
import {
	CheckCircle,
	X,
	Copy,
	Package,
	Truck,
	Calendar,
	MapPin,
	ExternalLink,
} from "lucide-react";

interface SuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	shipmentData: any;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
	isOpen,
	onClose,
	shipmentData,
}) => {
	const [copied, setCopied] = useState(false);

	if (!isOpen || !shipmentData) return null;

	const data = shipmentData;
	const extras = data.extras || {};
	const parcel = data.metadata?.selected_rate_parcel || {};
	const metadata = data.metadata || {};
	const selectedRate = metadata.selected_rate || {};
	const addressPayload =
		selectedRate.metadata?.address_payload || metadata.address_payload || {};

	const trackingUrl = extras.tracking_url;
	const trackingNumber = extras.tracking_number;
	const carrierName =
		selectedRate.carrier_name === "GIG Logistics"
			? "Obana Express"
			: selectedRate.carrier_name || "Obana Express";
	const status = data.status || "confirmed";

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
							<CheckCircle className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<h2 className="text-lg font-bold text-gray-900">
								Shipment Confirmed!
							</h2>
							<p className="text-xs text-gray-600">Successfully booked</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div className="p-4 space-y-4">
					<div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
						<div className="flex items-start justify-between gap-3">
							<div className="flex-1">
								<p className="text-xs font-medium text-blue-900 mb-1">
									Shipment ID
								</p>
								<p className="text-lg font-bold text-blue-600 break-all">
									{data.shipment_id}
								</p>
								<p className="text-xs text-blue-700 mt-1">
									⚠️ Save this ID for tracking
								</p>
							</div>
							<button
								onClick={() => copyToClipboard(data.shipment_id)}
								className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								{copied ? (
									<CheckCircle className="w-4 h-4" />
								) : (
									<Copy className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>

					{/* Tracking Info */}
					{trackingNumber && (
						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-2">
								<Package className="w-4 h-4 text-gray-600" />
								<p className="font-semibold text-sm text-gray-900">
									Tracking Number
								</p>
							</div>
							<div className="flex items-center justify-between gap-3">
								<p className="text-sm font-mono text-gray-700">
									{trackingNumber}
								</p>
								<button
									onClick={() => copyToClipboard(trackingNumber)}
									className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
								>
									<Copy className="w-3.5 h-3.5" />
								</button>
							</div>
							{trackingUrl && (
								<a
									href={trackingUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 mt-2 text-blue-600 hover:text-blue-700 font-medium text-xs"
								>
									Track your shipment
									<ExternalLink className="w-3 h-3" />
								</a>
							)}
						</div>
					)}

					{/* Carrier & Status */}
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1">
								<Truck className="w-4 h-4 text-gray-600" />
								<p className="font-semibold text-sm text-gray-900">Carrier</p>
							</div>
							<p className="text-sm text-gray-700">{carrierName}</p>
						</div>

						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1">
								<Calendar className="w-4 h-4 text-gray-600" />
								<p className="font-semibold text-sm text-gray-900">Status</p>
							</div>
							<p className="text-sm text-green-600 font-medium capitalize">
								{status}
							</p>
						</div>
					</div>

					{/* Pickup Address */}
					{addressPayload.pickup_address && (
						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1.5">
								<MapPin className="w-4 h-4 text-gray-600" />
								<p className="font-semibold text-sm text-gray-900">
									Pickup Address
								</p>
							</div>
							<p className="text-xs text-gray-700 leading-relaxed">
								{addressPayload.pickup_address.city},{" "}
								{addressPayload.pickup_address.state}{" "}
								{addressPayload.pickup_address.zip}
							</p>
						</div>
					)}

					{/* Delivery Address */}
					{addressPayload.delivery_address && (
						<div className="bg-gray-50 rounded-lg p-3">
							<div className="flex items-center gap-2 mb-1.5">
								<MapPin className="w-4 h-4 text-gray-600" />
								<p className="font-semibold text-sm text-gray-900">
									Delivery Address
								</p>
							</div>
							<p className="text-xs text-gray-700 leading-relaxed">
								{addressPayload.delivery_address.city},{" "}
								{addressPayload.delivery_address.state}{" "}
								{addressPayload.delivery_address.zip}
							</p>
						</div>
					)}

					{/* Parcel Info */}
					{parcel && (
						<div className="bg-gray-50 rounded-lg p-3">
							<p className="font-semibold text-sm text-gray-900 mb-1.5">
								Parcel Details
							</p>
							<div className="space-y-0.5 text-xs text-gray-700">
								<p>
									Weight: {parcel.total_weight || parcel.weight}{" "}
									{parcel.weight_unit}
								</p>
								{parcel.items && parcel.items.length > 0 && (
									<>
										<p>Item: {parcel.items[0].name}</p>
										<p>
											Value: {parcel.items[0].currency} {parcel.items[0].value}
										</p>
									</>
								)}
							</div>
						</div>
					)}

					{/* Events */}
					{data.events && data.events.length > 0 && (
						<div className="bg-gray-50 rounded-lg p-3">
							<p className="font-semibold text-sm text-gray-900 mb-2">
								Shipment Timeline
							</p>
							<div className="space-y-2">
								{data.events.map((event: any, i: number) => (
									<div key={i} className="flex gap-2">
										<div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
										<div className="flex-1">
											<p className="text-xs font-medium text-gray-900">
												{event.description}
											</p>
											<p className="text-xs text-gray-600">
												{event.location} •{" "}
												{new Date(event.created_at).toLocaleString()}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-2 pt-2">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
						>
							Done
						</button>
						{trackingUrl && (
							<a
								href={trackingUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center text-sm"
							>
								Track Shipment
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
