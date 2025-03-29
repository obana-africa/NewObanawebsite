import NormalList from "@/components/external/components/lists";

interface FAQSection {
	title: string;
	items: FAQItem[];
}
interface FAQItem {
	question: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	answer: any;
}

export const faqSections: FAQSection[] = [
	{
		title: "General Question",
		items: [
			{
				question: "What is Obana?",
				answer:
					"Obana is a comprehensive digital commerce ecosystem streamlining trade and logistics across Sub-Saharan Africa. It provides businesses with essential tools for efficiently selling, sourcing, and managing inventory.",
			},
			{
				question: "Who can use Obana?",
				answer: (
					<>
						<p className="text-gray-600 mb-2">Obana serves:</p>
						<NormalList
							items={[
								"Vendors: Sellers who want to list their products on the Obana platform.",
								"Salesforce Agents: Individuals or businesses that earn commissions by selling products through our Salesforce app or anyone with the zeal to sell.",
								"Buyers: Retailers and wholesalers who purchase goods via the Obana shop.",
								"Third-Party Partners: Companies handling deliveries, payments, and inventory financing within the ecosystem.",
							]}
							bulletColor="#1B3B5F"
							bulletSize="7px"
							aosAnimation="fade-up"
						/>
					</>
				),
			},
			{
				question: "What are the key components of Obana?",
				answer: (
					<>
						<p className="text-gray-600 mb-2">Obana consists of:</p>
						<NormalList
							items={[
								"Obana Shop Platform – A dynamic ecosystem that connects businesses, vendors, and customers, enabling seamless buying, selling, and product discovery.",
								"Obana Salesforce App – A tool that enables sales agents to sell products and earn commissions.",
								" Obana Vendor App – A platform for suppliers to list and manage their products.",
								"Obana Logistics Platform – A service that ensures efficient product delivery.",
								"Obana RFQ (Request for Quotation) System – A tool allowing businesses to request bulk pricing from vendors.",
								"Obana Inventory Financing – A partnered financial service that helps businesses access funds for stocking inventory (available upon approval).",
							]}
							bulletColor="#1B3B5F"
							bulletSize="7px"
							aosAnimation="fade-up"
						/>
					</>
				),
			},
		],
	},

	{
		title: "Obana Shop Platform",
		items: [
			{
				question: "How does the Obana Shop Platform work?",
				answer:
					"The Obana Shop Platform provides a comprehensive solution for managing online sales and vendor interactions.",
			},
		],
	},
	{
		title: "Obana Sales Partners",
		items: [
			{
				question: "Who are Obana Sales Partners?",
				answer:
					"Obana Sales Partners are authorized businesses that collaborate with Obana to expand sales channels.",
			},
		],
	},
	{
		title: "Obana Vendor App",
		items: [
			{
				question: "What is the Obana Vendor App?",
				answer:
					"The Obana Vendor App is a mobile application for vendors to manage their sales and inventory.",
			},
		],
	},
	{
		title: "Obana Logistics Platform",
		items: [
			{
				question: "How does the Logistics Platform work?",
				answer:
					"The Obana Logistics Platform helps businesses manage shipping, tracking, and delivery processes.",
			},
		],
	},
	{
		title: "Obana RPG (Request for Quotation) System",
		items: [
			{
				question: "What is the RFQ System?",
				answer:
					"The Request for Quotation (RFQ) System helps businesses streamline their procurement process.",
			},
		],
	},
	{
		title: "Obana Inventory Financing",
		items: [
			{
				question: "What is Inventory Financing?",
				answer:
					"Obana's Inventory Financing helps businesses manage their inventory costs and cash flow.",
			},
		],
	},
	{
		title: "Other Questions",
		items: [
			{
				question: "Have more questions?",
				answer: "Contact our support team for additional assistance.",
			},
		],
	},
];
