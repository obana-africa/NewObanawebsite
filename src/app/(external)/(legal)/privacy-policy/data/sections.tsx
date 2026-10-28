import React from "react";
import Link from "next/link";
import { LegalSection } from "@/components/external/components/legal/legal-article";

export const LAST_UPDATED = "27 July 2026";

export const privacyIntro = (
	<>
		<p>
			Obana.Africa is a B2B marketplace operated by{" "}
			<strong>ICON Tech &amp; Ecom Services Ltd</strong> (&ldquo;Obana&rdquo;,
			&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). This policy
			explains what personal data we collect when you use{" "}
			<strong>obana.africa</strong> and our related services, why we collect it,
			who we share it with, and the rights you have over it.
		</p>
		<p>
			It applies to this website and the forms on it &mdash; contact, request
			for quote (RFQ), custom sourcing, logistics and shipment bookings, and our
			newsletter. Our separate platforms (shop.obana.africa,
			logistics.obana.africa, salesforce.obana.africa and vendor.obana.africa)
			may publish their own additional notices.
		</p>
		<p>
			Related documents:{" "}
			<Link href="/ndpa">NDPA compliance</Link>,{" "}
			<Link href="/gdpr">GDPR notice</Link>,{" "}
			<Link href="/cookie-policy">Cookie Policy</Link> and{" "}
			<Link href="/terms">Terms &amp; Conditions</Link>.
		</p>
	</>
);

export const privacySections: LegalSection[] = [
	{
		id: "who-we-are",
		title: "Who we are and how to reach us",
		content: (
			<>
				<p>
					ICON Tech &amp; Ecom Services Ltd is the data controller for personal
					data collected through this website. Obana.Africa is a trademark of
					ICON Tech &amp; Ecom Services Ltd.
				</p>
				<ul>
					<li>
						<strong>Email:</strong>{" "}
						<a href="mailto:contact@obana.africa">contact@obana.africa</a>
					</li>
					<li>
						<strong>Phone / WhatsApp:</strong>{" "}
						<a href="tel:+2348096535511">+234 809 653 5511</a>
					</li>
					<li>
						<strong>Address:</strong> 77 Opebi Road, Ikeja, Lagos, Nigeria
					</li>
				</ul>
				<p>
					For any privacy question, request or complaint, email{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a> with
					&ldquo;Privacy&rdquo; in the subject line.
				</p>
			</>
		),
	},
	{
		id: "information-we-collect",
		title: "Information we collect",
		content: (
			<>
				<p>
					<strong>Information you give us.</strong> We only ask for what a
					request actually needs:
				</p>
				<ul>
					<li>
						<strong>Contact enquiries:</strong> first and last name, email
						address, phone number and the content of your message.
					</li>
					<li>
						<strong>Quote and sourcing requests:</strong> name, email, phone
						number, business name and stage, product or fabric descriptions,
						brands, quantities and MOQs, size and specification ranges, target
						price or budget, intended use, design and trademark details, and any
						comments you add.
					</li>
					<li>
						<strong>Files you upload:</strong> sample product images, logos,
						business plans and similar attachments you choose to send with a
						request.
					</li>
					<li>
						<strong>Logistics and shipment bookings:</strong> sender and
						receiver names, email addresses, phone numbers, pickup and delivery
						addresses, city, state, country and postcode, plus item
						descriptions, weights, dimensions and declared values.
					</li>
					<li>
						<strong>Newsletter:</strong> your email address.
					</li>
					<li>
						<strong>Vendor, partner and seller applications:</strong> the
						business and contact details you submit when you apply to sell or
						partner with us.
					</li>
				</ul>
				<p>
					Where you give us details about someone else &mdash; a shipment
					receiver, for example, or a colleague we should contact &mdash; you
					confirm you are allowed to share their information with us and that
					they have been told about this policy.
				</p>
				<p>
					<strong>Information collected automatically.</strong> When you visit
					the site, our hosting and security infrastructure records technical
					data such as your IP address, browser and device type, referring page,
					pages viewed and the time of your visit. We use this to keep the site
					available, secure and working properly. Cookies and similar browser
					storage are covered separately in our{" "}
					<Link href="/cookie-policy">Cookie Policy</Link>.
				</p>
				<p>
					We do not deliberately collect special categories of personal data
					(such as health, religion or biometric data) through this website.
					Please do not include such information in free-text fields or
					attachments.
				</p>
			</>
		),
	},
	{
		id: "how-we-use-it",
		title: "How we use your information",
		content: (
			<>
				<p>We use personal data to:</p>
				<ul>
					<li>
						respond to your enquiry and prepare, send and follow up on quotes;
					</li>
					<li>
						source products, arrange production or trademark and incubation
						services, and manage the resulting orders;
					</li>
					<li>
						arrange, price, book and track domestic and international shipments;
					</li>
					<li>
						verify and onboard vendors, sellers and partners, including standard
						anti-fraud and due-diligence checks;
					</li>
					<li>
						send transactional messages such as confirmations and status
						updates;
					</li>
					<li>
						send marketing emails and newsletters where you have subscribed or
						where we are otherwise permitted to;
					</li>
					<li>
						protect the site against spam, abuse and fraudulent submissions
						&mdash; our contact form uses Google reCAPTCHA for this;
					</li>
					<li>
						understand which services are in demand so we can improve them; and
					</li>
					<li>
						meet our legal, tax, customs and regulatory obligations, and
						establish or defend legal claims.
					</li>
				</ul>
				<p>
					We do not sell your personal data, and we do not use it to make
					decisions about you by purely automated means that produce legal or
					similarly significant effects.
				</p>
			</>
		),
	},
	{
		id: "legal-basis",
		title: "Our legal basis for processing",
		content: (
			<>
				<p>
					We rely on the following lawful bases under the Nigeria Data
					Protection Act 2023 &mdash; and, where it applies to you, the UK/EU
					GDPR:
				</p>
				<ul>
					<li>
						<strong>Performance of a contract</strong> &mdash; or steps you ask
						us to take before entering one &mdash; when we quote, source,
						fulfil, ship or invoice.
					</li>
					<li>
						<strong>Consent</strong> &mdash; for newsletter subscriptions and
						non-essential marketing. You can withdraw consent at any time
						without affecting processing already carried out.
					</li>
					<li>
						<strong>Legitimate interests</strong> &mdash; to secure our site,
						prevent fraud, keep business records, and market comparable services
						to existing business contacts, balanced against your rights.
					</li>
					<li>
						<strong>Legal obligation</strong> &mdash; to meet tax, customs,
						accounting and regulatory requirements.
					</li>
				</ul>
				<p>
					Our specific obligations under each regime are set out in our{" "}
					<Link href="/ndpa">NDPA compliance statement</Link> and our{" "}
					<Link href="/gdpr">GDPR notice</Link>.
				</p>
			</>
		),
	},
	{
		id: "sharing",
		title: "Who we share your information with",
		content: (
			<>
				<p>
					We share personal data only where there is a reason to, and only with:
				</p>
				<ul>
					<li>
						<strong>Suppliers, manufacturers and sourcing partners</strong>
						&mdash; the details needed to price and produce what you have asked
						for.
					</li>
					<li>
						<strong>Logistics providers, carriers and customs agents</strong>
						&mdash; sender and receiver details and item information needed to
						collect, clear and deliver a shipment.
					</li>
					<li>
						<strong>Technology providers who process data on our behalf</strong>{" "}
						&mdash; including Zoho (CRM, business email and email campaigns),
						Google (Sheets, reCAPTCHA), Cloudinary (file and image storage) and
						our hosting provider.
					</li>
					<li>
						<strong>Payment and financial partners</strong> &mdash; where a
						transaction needs to be processed or financed.
					</li>
					<li>
						<strong>Professional advisers</strong> &mdash; auditors, insurers
						and lawyers, under duties of confidentiality.
					</li>
					<li>
						<strong>Authorities</strong> &mdash; where disclosure is required by
						law, court order or a valid regulatory request, or to protect our
						rights, safety or property.
					</li>
					<li>
						<strong>A buyer or successor</strong> &mdash; if the business or its
						assets are reorganised, merged or sold, subject to this policy.
					</li>
				</ul>
				<p>
					Our processors are bound by contract to use your data only on our
					instructions and to keep it secure.
				</p>
			</>
		),
	},
	{
		id: "international-transfers",
		title: "International transfers",
		content: (
			<>
				<p>
					Obana operates across Sub-Saharan Africa and works with suppliers and
					service providers outside Nigeria, so your data may be transferred to
					and stored in other countries &mdash; including where our technology
					providers host their infrastructure.
				</p>
				<p>
					Where we transfer personal data out of Nigeria, we do so on a basis
					permitted by the Nigeria Data Protection Act 2023: to a country with
					adequate protection, under contractual safeguards with the recipient,
					with your consent, or where the transfer is necessary to perform a
					contract with you. You can ask us for details of the safeguards used.
				</p>
			</>
		),
	},
	{
		id: "retention",
		title: "How long we keep it",
		content: (
			<>
				<p>
					We keep personal data only as long as we need it for the purpose it
					was collected for:
				</p>
				<ul>
					<li>
						<strong>Enquiries and quotes that do not convert</strong> &mdash;
						typically up to 24 months, so we can pick up the conversation if you
						come back to us.
					</li>
					<li>
						<strong>Customer, vendor and shipment records</strong> &mdash; for
						the life of the relationship and then as long as tax, customs and
						accounting law requires (generally at least six years).
					</li>
					<li>
						<strong>Newsletter subscriptions</strong> &mdash; until you
						unsubscribe, plus a short suppression record so we do not email you
						again by mistake.
					</li>
					<li>
						<strong>Uploaded files</strong> &mdash; for as long as needed to
						service the request, then deleted or anonymised.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "security",
		title: "How we protect your information",
		content: (
			<>
				<p>
					We use encryption in transit (HTTPS), access controls and role-based
					permissions, vetted service providers, and bot protection on public
					forms. Access to enquiry and customer records is limited to staff who
					need it to do their job.
				</p>
				<p>
					No method of transmission or storage is completely secure. If a breach
					occurs that is likely to put your rights at risk, we will notify the
					Nigeria Data Protection Commission and affected individuals as
					required by law.
				</p>
			</>
		),
	},
	{
		id: "your-rights",
		title: "Your rights",
		content: (
			<>
				<p>Subject to the conditions in applicable law, you may:</p>
				<ul>
					<li>ask for a copy of the personal data we hold about you;</li>
					<li>have inaccurate or incomplete data corrected;</li>
					<li>ask us to delete data we no longer have a good reason to keep;</li>
					<li>ask us to restrict how we use your data;</li>
					<li>
						object to processing based on our legitimate interests, and to
						direct marketing at any time;
					</li>
					<li>request your data in a portable, machine-readable format; and</li>
					<li>withdraw consent you have given.</li>
				</ul>
				<p>
					Email <a href="mailto:contact@obana.africa">contact@obana.africa</a>{" "}
					to exercise any of these. We will respond within 30 days and may ask
					you to verify your identity first. Every marketing email also carries
					an unsubscribe link.
				</p>
				<p>
					If you are not satisfied with our response, you can complain to the{" "}
					<a
						href="https://ndpc.gov.ng"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nigeria Data Protection Commission
					</a>{" "}
					or to the data protection authority where you live.
				</p>
			</>
		),
	},
	{
		id: "children",
		title: "Children",
		content: (
			<p>
				Obana is a business-to-business service and is not directed at children.
				We do not knowingly collect personal data from anyone under 18. If you
				believe a child has provided us with personal data, contact us and we
				will delete it.
			</p>
		),
	},
	{
		id: "third-party-sites",
		title: "Third-party sites and Obana platforms",
		content: (
			<p>
				This site links to other Obana platforms and to third-party sites we do
				not control, including our blog, shop, logistics and vendor portals, and
				social media pages. Once you leave obana.africa, this policy no longer
				applies &mdash; please read the privacy notice of the site you move to.
			</p>
		),
	},
	{
		id: "changes",
		title: "Changes to this policy",
		content: (
			<p>
				We may update this policy as our services, partners or legal obligations
				change. The revised version takes effect when posted here, and the
				&ldquo;last updated&rdquo; date at the top will tell you when that was.
				If a change materially affects how we use your data, we will give you
				clearer notice &mdash; by email or a notice on the site.
			</p>
		),
	},
	{
		id: "contact-us",
		title: "Contact us",
		content: (
			<p>
				Questions about this policy, or about how we handle your data? Reach us
				at <a href="mailto:contact@obana.africa">contact@obana.africa</a>, on{" "}
				<a href="tel:+2348096535511">+234 809 653 5511</a>, or through our{" "}
				<Link href="/contact">contact page</Link>.
			</p>
		),
	},
];
