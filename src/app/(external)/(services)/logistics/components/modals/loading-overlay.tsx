import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
	message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => (
	<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
		<div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center gap-4">
			<Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
			<p className="text-gray-900 font-medium">{message}</p>
		</div>
	</div>
);
