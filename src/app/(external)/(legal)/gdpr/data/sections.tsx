import React from "react";
import Link from "next/link";
import { LegalSection } from "@/components/external/components/legal/legal-article";

export const LAST_UPDATED = "27 July 2026";


export const EU_REPRESENTATIVE = "";

export const gdprIntro = (
	<>
		<p>
			Obana.Africa is operated from Nigeria by{" "}
			<strong>ICON Tech &amp; Ecom Services Ltd</strong> and is governed
			primarily by the Nigeria Data Protection Act 2023. Where we offer goods or
			services to people in the European Economic Area or the United Kingdom, or
			monitor their behaviour there, the{" "}
			<strong>EU General Data Protection Regulation</strong> and the{" "}
			<strong>UK GDPR</strong> also apply. This notice explains how we meet
			them.
		</p>
		<p>
			Read it alongside our{" "}
			<Link href="/privacy-policy">Privacy Policy</Link>, our{" "}
			<Link href="/ndpa">NDPA compliance statement</Link> and our{" "}
			<Link href="/cookie-policy">Cookie Policy</Link>.
		</p>
	</>
);

export const gdprSections: LegalSection[] = [
	{
		id: "when-this-applies",
		title: "When the GDPR applies to you",
		content: (
			<>
				<p>
					The GDPR applies to our processing of your personal data if you are in
					the EEA or the UK and you:
				</p>
				<ul>
					<li>
						submit a contact enquiry, quote request or shipment booking to us;
					</li>
					<li>subscribe to our newsletter;</li>
					<li>
						apply to sell, supply or partner with us through one of our
						platforms; or
					</li>
					<li>
						are named on a shipment we arrange &mdash; as a sender or receiver
						&mdash; where that shipment touches the EEA or UK.
					</li>
				</ul>
				<p>
					Where the GDPR and the NDPA both apply, we meet the higher standard
					rather than treating them as alternatives.
				</p>
			</>
		),
	},
	{
		id: "roles",
		title: "Our role: controller and processor",
		content: (
			<p>
				For data collected through obana.africa we are the{" "}
				<strong>controller</strong> &mdash; we decide why and how it is
				processed. Where we handle personal data on the documented instructions
				of a vendor, supplier or partner, we act as a{" "}
				<strong>processor</strong> for them under a written agreement meeting
				Article 28.
			</p>
		),
	},
	{
		id: "legal-bases",
		title: "Legal bases (Article 6)",
		content: (
			<>
				<ul>
					<li>
						<strong>Article 6(1)(b) &mdash; contract:</strong> quoting,
						sourcing, arranging shipment, invoicing and supporting an order.
					</li>
					<li>
						<strong>Article 6(1)(a) &mdash; consent:</strong> newsletters and
						marketing to people who are not existing business contacts.
						Withdrawable at any time.
					</li>
					<li>
						<strong>Article 6(1)(f) &mdash; legitimate interests:</strong>{" "}
						securing our platform, preventing fraud, maintaining business
						records, and B2B relationship management. We balance these against
						your rights and can share our assessment on request.
					</li>
					<li>
						<strong>Article 6(1)(c) &mdash; legal obligation:</strong> tax,
						customs, export control and accounting requirements.
					</li>
				</ul>
				<p>
					We do not process special category data (Article 9) through this
					website, and we carry out no automated decision-making producing legal
					or similarly significant effects (Article 22).
				</p>
			</>
		),
	},
	{
		id: "your-rights",
		title: "Your rights (Articles 15–22)",
		content: (
			<>
				<ul>
					<li>
						<strong>Access (Art. 15)</strong> &mdash; confirmation of whether we
						process your data, and a copy of it.
					</li>
					<li>
						<strong>Rectification (Art. 16)</strong> &mdash; correction of
						inaccurate or incomplete data.
					</li>
					<li>
						<strong>Erasure (Art. 17)</strong> &mdash; deletion where we no
						longer have a lawful basis to keep it.
					</li>
					<li>
						<strong>Restriction (Art. 18)</strong> &mdash; limiting processing
						while accuracy or an objection is resolved.
					</li>
					<li>
						<strong>Portability (Art. 20)</strong> &mdash; data you gave us, in
						a structured, commonly used, machine-readable format, where
						processing is based on consent or contract and is automated.
					</li>
					<li>
						<strong>Objection (Art. 21)</strong> &mdash; to processing based on
						legitimate interests, and an absolute right to object to direct
						marketing.
					</li>
					<li>
						<strong>Withdraw consent (Art. 7(3))</strong> &mdash; at any time,
						without affecting prior processing.
					</li>
				</ul>
				<p>
					Send requests to{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a> with
					&ldquo;GDPR request&rdquo; in the subject line. We respond within{" "}
					<strong>one month</strong>, extendable by up to two further months for
					complex requests &mdash; we will tell you within the first month if we
					need that extension. Requests are free unless manifestly unfounded or
					excessive.
				</p>
			</>
		),
	},
	{
		id: "transfers",
		title: "International transfers (Chapter V)",
		content: (
			<>
				<p>
					Personal data you send us is processed in Nigeria and in the countries
					where our service providers and supply chain partners operate. Nigeria
					is not currently the subject of an EU or UK adequacy decision.
				</p>
				<p>
					Where we receive personal data from the EEA or UK, we rely on
					appropriate safeguards under Article 46 &mdash; principally the{" "}
					<strong>Standard Contractual Clauses</strong> (with the UK Addendum or
					IDTA where relevant) &mdash; supported by a transfer risk assessment
					and supplementary measures such as encryption in transit and access
					control. In limited cases we rely on the Article 49 derogation for
					transfers necessary to perform a contract with you.
				</p>
				<p>
					You can request a copy of the safeguards applying to a specific
					transfer from{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a>.
				</p>
			</>
		),
	},
	{
		id: "processors",
		title: "Processors and sub-processors (Article 28)",
		content: (
			<>
				<p>
					We engage processors to run our services, including Zoho (CRM,
					business email and campaigns), Google (Sheets, reCAPTCHA), Cloudinary
					(file and image storage) and our hosting provider. Each is bound by a
					written agreement requiring them to:
				</p>
				<ul>
					<li>process only on our documented instructions;</li>
					<li>
						ensure staff with access are under a duty of confidentiality;
					</li>
					<li>
						implement Article 32 security measures appropriate to the risk;
					</li>
					<li>
						obtain our authorisation before appointing a sub-processor, and flow
						these terms down;
					</li>
					<li>
						assist with data subject requests, breach notification and impact
						assessments; and
					</li>
					<li>
						delete or return personal data at the end of the engagement, subject
						to legal retention.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "retention",
		title: "Retention and minimisation",
		content: (
			<p>
				We keep personal data only as long as the purpose requires it. Enquiries
				and quotes that do not convert are typically kept for up to 24 months;
				transaction, customs and accounting records are kept for the period
				required by law. The detail is set out in our{" "}
				<Link href="/privacy-policy">Privacy Policy</Link>.
			</p>
		),
	},
	{
		id: "security-and-breach",
		title: "Security and breach notification",
		content: (
			<p>
				We apply technical and organisational measures under Article 32,
				including encryption in transit, role-based access control and bot
				protection on public forms. Where a personal data breach is likely to
				result in a risk to your rights and freedoms, we notify the competent
				supervisory authority <strong>within 72 hours</strong> of becoming aware
				of it (Article 33), and notify affected individuals without undue delay
				where the risk is high (Article 34).
			</p>
		),
	},
	{
		id: "representative",
		title: "EU/UK representative and Data Protection Officer",
		content: (
			<>
				{EU_REPRESENTATIVE ? (
					<p>
						Our representative in the EU/UK for the purposes of Article 27 is{" "}
						<strong>{EU_REPRESENTATIVE}</strong>.
					</p>
				) : (
					<p>
						Where Article 27 requires us to designate a representative in the
						EU or UK, details are available on request from{" "}
						<a href="mailto:contact@obana.africa">contact@obana.africa</a>. Until
						then, please direct all data protection enquiries to our Data
						Protection Officer below.
					</p>
				)}
				<p>
					<strong>Data Protection Officer</strong> &mdash;{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a>, ICON
					Tech &amp; Ecom Services Ltd, 77 Opebi Road, Ikeja, Lagos, Nigeria.
				</p>
			</>
		),
	},
	{
		id: "complaints",
		title: "Complaints",
		content: (
			<p>
				Please raise any concern with us first at{" "}
				<a href="mailto:contact@obana.africa">contact@obana.africa</a>. You also
				have the right to lodge a complaint with the supervisory authority in
				your country of residence, place of work or the place of the alleged
				infringement &mdash; in the UK, the{" "}
				<a
					href="https://ico.org.uk"
					target="_blank"
					rel="noopener noreferrer"
				>
					Information Commissioner&rsquo;s Office
				</a>{" "}
				&mdash; or with the{" "}
				<a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">
					Nigeria Data Protection Commission
				</a>
				.
			</p>
		),
	},
];
