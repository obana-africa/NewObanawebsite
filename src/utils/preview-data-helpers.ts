/* eslint-disable @typescript-eslint/no-explicit-any */
export const getStateDisplayName = (stateCode: string, statesList: any[]) => {
	const state = statesList.find((s) => s.isoCode === stateCode);
	return state ? state.name : stateCode;
};

export const buildPreviewSections = (
	formData: any,
	selectedRate: any,
	senderStates: any[],
	receiverStates: any[]
) => {
	return [
		{
			title: "Sender Details",
			fields: [
				{
					label: "Name",
					value: formData
						? `${formData.senderFirstName} ${formData.senderLastName}`
						: "-",
				},
				{ label: "Email", value: formData?.senderEmail || "-" },
				{ label: "Phone", value: formData?.senderPhone || "-" },
				{ label: "Address", value: formData?.senderAddress || "-" },
				{ label: "City", value: formData?.senderCity || "-" },
				{
					label: "State",
					value: formData
						? getStateDisplayName(formData.senderState, senderStates)
						: "-",
				},
				{ label: "Country", value: formData?.senderCountry || "-" },
				{ label: "ZIP Code", value: formData?.senderZip || "-" },
			],
		},
		{
			title: "Receiver Details",
			fields: [
				{
					label: "Name",
					value: formData
						? `${formData.receiverFirstName} ${formData.receiverLastName}`
						: "-",
				},
				{ label: "Email", value: formData?.receiverEmail || "-" },
				{ label: "Phone", value: formData?.receiverPhone || "-" },
				{ label: "Address", value: formData?.receiverAddress || "-" },
				{ label: "City", value: formData?.receiverCity || "-" },
				{
					label: "State",
					value: formData
						? getStateDisplayName(formData.receiverState, receiverStates)
						: "-",
				},
				{ label: "Country", value: formData?.receiverCountry || "-" },
				{ label: "ZIP Code", value: formData?.receiverZip || "-" },
			],
		},
		{
			title: "Shipment Details",
			fields: [
				{ label: "Item Name", value: formData?.itemName || "-" },
				{ label: "Description", value: formData?.itemDescription || "-" },
				{
					label: "Weight",
					value: formData?.itemWeight ? `${formData.itemWeight}kg` : "-",
				},
				{
					label: "Value",
					value: formData?.itemValue
						? `${formData.itemCurrency} ${parseFloat(
								formData.itemValue
						  ).toLocaleString()}`
						: "-",
				},
				{ label: "Carrier", value: selectedRate?.carrier_name || "-" },
				{
					label: "Shipping Cost",
					value: selectedRate?.amount
						? `${selectedRate.currency} ${selectedRate.amount.toLocaleString()}`
						: "-",
				},
				{ label: "Delivery Time", value: selectedRate?.delivery_time || "-" },
			],
		},
	];
};
