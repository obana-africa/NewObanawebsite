import salad from "@/app/assets/images/logos/salad-africa.svg";
import carbon from "@/app/assets/images/logos/carbon.png";


interface InventoryPartner {
	id: string;
	name: string;
	logo: string;
	description: string;
}

export const inventoryPartners: InventoryPartner[] = [
	{
		id: "salad-africa",
		name: "Salad Africa",
		logo: salad,
		description:
			"Salad Africa provides flexible inventory financing solutions tailored for SMEs across Africa. With competitive rates and quick approval processes, they help businesses maintain optimal stock levels without straining cash flow. Their digital-first approach ensures seamless integration with your procurement processes.",
	},
	{
		id: "carbon",
		name: "Carbon",
		logo: carbon,
		description:
			"Carbon offers innovative inventory financing with transparent terms and rapid disbursement. Their platform enables businesses to access working capital for inventory purchases with minimal documentation. With flexible repayment options and dedicated support, Carbon empowers businesses to scale efficiently.",
	},
];
