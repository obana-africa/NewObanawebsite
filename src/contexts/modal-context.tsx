"use client";
import GetStartedModal from "@/components/external/components/get-stated-modal";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
	openGetStartedModal: () => void;
	closeGetStartedModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);

	const openGetStartedModal = () => {
		setIsGetStartedModalOpen(true);
	};

	const closeGetStartedModal = () => {
		setIsGetStartedModalOpen(false);
	};

	return (
		<ModalContext.Provider
			value={{
				openGetStartedModal,
				closeGetStartedModal,
			}}
		>
			{children}
			<GetStartedModal
				isOpen={isGetStartedModalOpen}
				onClose={closeGetStartedModal}
			/>
		</ModalContext.Provider>
	);
};
