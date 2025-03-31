import React from "react";
import Button from "@/components/ui/button";

interface PreviewComponentProps {
	title: string;
	sections: {
		title: string;
		fields: {
			label: string;
			value: string | React.ReactNode;
		}[];
	}[];
	onEdit: () => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	submitText?: string;
	editText?: string;
}

const PreviewComponent: React.FC<PreviewComponentProps> = ({
	title,
	sections,
	onEdit,
	onSubmit,
	isSubmitting,
	submitText = "Confirm & Submit",
	editText = "Edit",
}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow">
			<h3 className="text-xl font-semibold mb-4">{title}</h3>

			{sections.map((section, sectionIndex) => (
				<div key={sectionIndex} className="mb-6">
					<h4 className="font-medium text-lg mb-2">{section.title}</h4>
					<div className="space-y-2">
						{section.fields.map((field, fieldIndex) => (
							<p key={fieldIndex}>
								<span className="font-medium">{field.label}:</span>{" "}
								{field.value}
							</p>
						))}
					</div>
				</div>
			))}

			<div className="flex justify-between mt-6">
				<Button
					onClick={onEdit}
					variant="outline"
					className="border border-blue-900 text-blue-900"
				>
					{editText}
				</Button>
				{isSubmitting ? (
					<Button variant="primary" disabled isLoading>
						Submitting...
					</Button>
				) : (
					<Button
						onClick={onSubmit}
						variant="primary"
						animation="ripple"
						className="border border-primary"
					>
						{submitText}
					</Button>
				)}
			</div>
		</div>
	);
};

export default PreviewComponent;
