import React from "react";
import { X, AlertCircle } from "lucide-react";

interface ErrorModalProps {
	isOpen: boolean;
	onClose: () => void;
	error: string;
	onRetry?: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
	isOpen,
	onClose,
	error,
	onRetry,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
				<div className="p-5">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
							<AlertCircle className="w-5 h-5 text-red-600" />
						</div>
						<h2 className="text-lg font-bold text-gray-900">Booking Failed</h2>
					</div>
					<p className="text-sm text-gray-700 mb-5">{error}</p>
					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
						>
							Close
						</button>
						{onRetry && (
							<button
								onClick={() => {
									onClose();
									onRetry();
								}}
								className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
							>
								Try Again
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}