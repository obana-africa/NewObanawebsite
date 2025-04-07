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
				question: "How do I become a seller on Obana Shop?",
				answer:
					"You can register on the vendor app, submit your product details, and await approval. Once approved, your products will be listed for buyers.",
			},
			{
				question: "What kind of products can be sold on Obana Shop?",
				answer:
					"Obana supports a wide range of products, including fashion, beauty, and lifestyle",
			},
			{
				question: "Can I integrate my existing store with Obana?",
				answer:
					"Yes, vendors can sync their inventory with Obana’s shop platform for seamless order management.",
			},
		],
	},
	{
		title: "Obana Sales Force App",
		items: [
			{
				question: "What is the Obana Salesforce App?",
				answer:
					"The Salesforce app is designed for independent agents who promote and sell products from the Obana platform. They earn commissions on successful sales.",
			},
			{
				question: "How do I join as a Salesforce agent?",
				answer:
					"You can sign up through the Salesforce app, get approved, and start selling products while tracking your earnings.",
			},
			{
				question: "How do commissions work?",
				answer:
					"Each product has a set commission rate, which is credited to your account once a sale is completed.",
			},
		],
	},
	{
		title: "Obana Vendor App",
		items: [
			{
				question: "What is the Obana Vendor App?",
				answer:
					"The vendor app allows suppliers to list and manage their products, track sales, and manage orders.",
			},
			{
				question: "How do I upload products?",
				answer:
					"Vendors can add product details, including images, descriptions, pricing, and stock levels, through the vendor dashboard.",
			},
			{
				question: "Is there a subscription fee for vendors?",
				answer:
					"Pricing models may vary. Some services may be free, while others require a commission or subscription",
			},
		],
	},
	{
		title: "Obana Logistics Platform",
		items: [
			{
				question: "What is the Obana Logistics Platform?",
				answer:
					"This platform connects sellers and logistics providers to ensure seamless order fulfillment.",
			},
			{
				question: "Can I partner with Obana as a logistics provider?",
				answer:
					"Yes, logistics companies can register to offer delivery services within the Obana ecosystem.",
			},
			{
				question: "How are delivery fees calculated?",
				answer:
					"Delivery fees are based on distance, package size, and selected courier service.",
			},
		],
	},
	{
		title: "Obana RPG (Request for Quotation) System",
		items: [
			{
				question: "What is the RFQ System?",
				answer:
					"The RFQ system allows buyers to request bulk quotes from multiple vendors for better pricing.",
			},
			{
				question: "Who can use the RFQ feature?",
				answer:
					"Businesses looking to purchase in bulk can request quotes from verified vendors.",
			},
			{
				question: "How long does it take to receive a quote?",
				answer:
					"Response times depend on vendor availability, but most quotes are processed within 24-48 hours.",
			},
		],
	},
	{
		title: "Obana Inventory Financing",
		items: [
			{
				question: "What is Obana Inventory Financing?",
				answer:
					"Obana partners with inventory financing providers to offer businesses funding to stock up on products.",
			},
			{
				question: "Who is eligible for financing?",
				answer:
					"Eligibility depends on business history, transaction volume, and approval from Obana’s finance team and inventory financing partners.",
			},
			{
				question: "How do repayments work?",
				answer: "Repayments are structured based on agreed terms.",
			},
		],
	},
	{
		title: "Other Questions",
		items: [
			{
				question: "Is Obana available in multiple countries?",
				answer:
					"Currently, Obana operates in select regions within Sub-Saharan Africa, with plans for expansion.",
			},
			{
				question: "How do I get support?",
				answer:
					"Users can reach out through Obana’s help center, in-app support, or email customer service.",
			},
			{
				question: "How do I track my orders?",
				answer:
					"Buyers can track orders via the shop platform, and vendors can manage shipments through the vendor app.",
			},
			{
				question: "Have more questions?",
				answer: "Contact our support team for additional assistance.",
			},
		],
	},
];
