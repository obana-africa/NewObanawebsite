// src/components/shipment/sender-receiver-form.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/form-input";
import Button from "@/components/ui/button";
import { senderReceiverSchema } from "@/schemas";

interface SenderReceiverFormProps {
	defaultValues?: {
		sender?: {
			name: string;
			email: string;
			phone: string;
			address: string;
		};
		receiver?: {
			name: string;
			email: string;
			phone: string;
			address: string;
		};
	};
	onBack: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (data: any) => void;
}

const SenderReceiverForm: React.FC<SenderReceiverFormProps> = ({
	defaultValues,
	onBack,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(senderReceiverSchema),
		defaultValues: {
			sender: {
				name: defaultValues?.sender?.name || "",
				email: defaultValues?.sender?.email || "",
				phone: defaultValues?.sender?.phone || "",
				address: defaultValues?.sender?.address || "",
			},
			receiver: {
				name: defaultValues?.receiver?.name || "",
				email: defaultValues?.receiver?.email || "",
				phone: defaultValues?.receiver?.phone || "",
				address: defaultValues?.receiver?.address || "",
			},
		},
	});

	return (
		<>
			<h2 className="font-bold text-center text-primary">
				Sender & Receiver Details
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-6">
					<div className="border p-4 rounded-lg">
						<h3 className="font-medium mb-4">Sender Details</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormInput
								id="sender.name"
								label="Name"
								placeholder="Enter your name"
								register={register("sender.name")}
								error={errors.sender?.name?.message}
								required
							/>
							<FormInput
								id="sender.email"
								label="Email"
								type="email"
								placeholder="Enter your email"
								register={register("sender.email")}
								error={errors.sender?.email?.message}
								required
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormInput
								id="sender.phone"
								label="Phone Number"
								placeholder="Enter your phone number"
								register={register("sender.phone")}
								error={errors.sender?.phone?.message}
								required
							/>
							<FormInput
								id="sender.address"
								label="Address"
								placeholder="Enter your address"
								register={register("sender.address")}
								error={errors.sender?.address?.message}
								required
							/>
						</div>
					</div>

					<div className="border p-4 rounded-lg">
						<h3 className="font-medium mb-4">Receiver Details</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormInput
								id="receiver.name"
								label="Name"
								placeholder="Enter receiver name"
								register={register("receiver.name")}
								error={errors.receiver?.name?.message}
								required
							/>
							<FormInput
								id="receiver.email"
								label="Email"
								type="email"
								placeholder="Enter receiver email"
								register={register("receiver.email")}
								error={errors.receiver?.email?.message}
								required
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<FormInput
								id="receiver.phone"
								label="Phone Number"
								placeholder="Enter receiver phone number"
								register={register("receiver.phone")}
								error={errors.receiver?.phone?.message}
								required
							/>
							<FormInput
								id="receiver.address"
								label="Address"
								placeholder="Enter receiver address"
								register={register("receiver.address")}
								error={errors.receiver?.address?.message}
								required
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-between mt-6">
					<Button
						onClick={onBack}
						variant="outline"
						className="border border-blue-900 text-blue-900"
					>
						Back
					</Button>
					<Button
						type="submit"
						variant="primary"
						animation="ripple"
						className="border border-primary"
					>
						Next
					</Button>
				</div>
			</form>
		</>
	);
};

export default SenderReceiverForm;
