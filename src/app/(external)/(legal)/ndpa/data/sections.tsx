import React from "react";
import Link from "next/link";
import { LegalSection } from "@/components/external/components/legal/legal-article";
import NdpcCertificate from "../components/ndpc-certificate";
import {
	NDPC_REGISTERED_NAME,
	NDPC_REGISTRATION_NUMBER,
	NDPC_REGISTRATION_SECTION,
	NDPC_VALID_FROM,
	NDPC_VALID_TO,
} from "./certificate";

export const LAST_UPDATED = "27 July 2026";

export const ndpaIntro = (
	<>
		<p>
			<strong>ICON Tech &amp; Ecom Services Ltd</strong>, operator of
			Obana.Africa, processes personal data in Nigeria and is subject to the{" "}
			<strong>Nigeria Data Protection Act 2023 (NDPA)</strong> and the
			directives of the{" "}
			<a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">
				Nigeria Data Protection Commission (NDPC)
			</a>
			.
		</p>
		<p>
			This statement sets out how we meet those obligations. It supplements our{" "}
			<Link href="/privacy-policy">Privacy Policy</Link>, which describes what
			we collect and why in practical terms.
		</p>
	</>
);

export const ndpaSections: LegalSection[] = [
	{
		id: "our-status",
		title: "Our status and registration",
		content: (
			<>
				<p>
					We act as a <strong>data controller</strong> for the personal data we
					collect through obana.africa and our related services, and as a{" "}
					<strong>data processor</strong> where we handle data on behalf of a
					vendor, supplier or partner under contract.
				</p>
				<p>
					Our registration with the Commission is valid from{" "}
					<strong>{NDPC_VALID_FROM}</strong> to{" "}
					<strong>{NDPC_VALID_TO}</strong>, and we renew it before it lapses.
				</p>
				<p>
					As a data controller of major importance, we file the annual
					compliance audit return required by the NDPA within the timeframe set
					by the Commission.
				</p>
			</>
		),
	},
	{
		id: "principles",
		title: "The principles we apply",
		content: (
			<>
				<p>
					Section 24 of the NDPA requires that personal data be handled to a set
					of standards. In practice that means we:
				</p>
				<ul>
					<li>
						process data <strong>fairly, lawfully and transparently</strong>,
						and tell you at the point of collection what we are doing;
					</li>
					<li>
						collect it for <strong>specified, legitimate purposes</strong> and
						do not reuse it for something incompatible with those purposes;
					</li>
					<li>
						keep it <strong>adequate, relevant and limited</strong> to what the
						purpose needs &mdash; our forms ask only for what a quote, booking
						or enquiry actually requires;
					</li>
					<li>
						keep it <strong>accurate and up to date</strong>, and correct it
						when you tell us it is wrong;
					</li>
					<li>
						<strong>retain it no longer than necessary</strong>, subject to tax,
						customs and accounting obligations; and
					</li>
					<li>
						apply <strong>appropriate security</strong> against loss,
						destruction and unauthorised access.
					</li>
				</ul>
				<p>
					We also apply <strong>data protection by design and default</strong>:
					new forms and integrations are reviewed for what they collect, who
					receives it and how long it is kept before they go live.
				</p>
			</>
		),
	},
	{
		id: "lawful-basis",
		title: "Lawful bases under the NDPA",
		content: (
			<>
				<p>
					Under section 25 of the NDPA we process personal data only where one
					of the following applies:
				</p>
				<ul>
					<li>
						<strong>Consent</strong> &mdash; freely given, specific, informed
						and unambiguous, and withdrawable at any time;
					</li>
					<li>
						<strong>Contract</strong> &mdash; processing necessary to perform a
						contract with you or take pre-contract steps you have requested;
					</li>
					<li>
						<strong>Legal obligation</strong> &mdash; tax, customs, accounting
						and regulatory requirements;
					</li>
					<li>
						<strong>Vital interests</strong> &mdash; to protect life, in the
						rare cases that arises;
					</li>
					<li>
						<strong>Public interest or official authority</strong> &mdash; where
						a lawful request requires it; or
					</li>
					<li>
						<strong>Legitimate interests</strong> &mdash; where these are not
						overridden by your rights and freedoms, such as fraud prevention and
						securing our platform.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "consent",
		title: "How we handle consent",
		content: (
			<>
				<p>
					Where we rely on consent &mdash; newsletters and marketing, chiefly
					&mdash; we ask for it separately from other terms, we do not use
					pre-ticked boxes, and we do not make a service conditional on consent
					you do not need to give.
				</p>
				<p>
					You can withdraw consent at any time using the unsubscribe link in any
					marketing email or by writing to{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a>.
					Withdrawal does not affect processing carried out before you withdrew.
				</p>
			</>
		),
	},
	{
		id: "your-rights",
		title: "Your rights as a data subject",
		content: (
			<>
				<p>
					Sections 34 to 37 of the NDPA give you rights over your personal data.
					You may:
				</p>
				<ul>
					<li>
						<strong>Be informed</strong> &mdash; know who is processing your
						data, why, and who receives it;
					</li>
					<li>
						<strong>Access</strong> &mdash; obtain confirmation and a copy of
						the data we hold about you;
					</li>
					<li>
						<strong>Rectify</strong> &mdash; have inaccurate or incomplete data
						corrected;
					</li>
					<li>
						<strong>Erase</strong> &mdash; have data deleted where we no longer
						have a lawful reason to keep it;
					</li>
					<li>
						<strong>Restrict</strong> &mdash; limit how we use your data while a
						dispute or accuracy question is resolved;
					</li>
					<li>
						<strong>Object</strong> &mdash; to processing based on legitimate
						interests, and to direct marketing at any time;
					</li>
					<li>
						<strong>Port</strong> &mdash; receive your data in a structured,
						commonly used, machine-readable format; and
					</li>
					<li>
						<strong>Not be subject to</strong> a decision based solely on
						automated processing that significantly affects you.
					</li>
				</ul>
				<p>
					To exercise any of these, email{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a> with
					&ldquo;NDPA request&rdquo; in the subject line. We acknowledge
					requests promptly and respond within <strong>30 days</strong>. We may
					ask you to verify your identity before we act, and we will tell you if
					an exemption means we cannot fully comply.
				</p>
				<p>Exercising your rights is free unless a request is manifestly excessive or repetitive.</p>
			</>
		),
	},
	{
		id: "dpo",
		title: "Data Protection Officer",
		content: (
			<>
				<p>
					We have designated a Data Protection Officer responsible for
					monitoring compliance with the NDPA, advising on data protection
					impact assessments, and acting as the contact point for data subjects
					and the NDPC.
				</p>
				<ul>
					<li>
						<strong>Email:</strong>{" "}
						<a href="mailto:contact@obana.africa">contact@obana.africa</a> (mark
						it for the attention of the Data Protection Officer)
					</li>
					<li>
						<strong>Address:</strong> 77 Opebi Road, Ikeja, Lagos, Nigeria
					</li>
				</ul>
			</>
		),
	},
	{
		id: "processors",
		title: "Processors and third parties",
		content: (
			<>
				<p>
					Where we engage a processor &mdash; our CRM, email, file storage and
					hosting providers, and the suppliers and carriers who fulfil orders
					&mdash; the NDPA requires a written contract. Ours require the
					processor to:
				</p>
				<ul>
					<li>process personal data only on our documented instructions;</li>
					<li>apply appropriate technical and organisational security;</li>
					<li>
						impose confidentiality obligations on staff with access to the data;
					</li>
					<li>
						not engage a sub-processor without our authorisation, and pass these
						obligations down;
					</li>
					<li>assist us with data subject requests and breach notification; and</li>
					<li>
						delete or return the data when the engagement ends, unless the law
						requires retention.
					</li>
				</ul>
				<p>
					We assess a provider&rsquo;s security and data protection posture
					before onboarding them and review it periodically.
				</p>
			</>
		),
	},
	{
		id: "transfers",
		title: "Cross-border transfers",
		content: (
			<>
				<p>
					Sections 41 to 43 of the NDPA govern transfers of personal data out of
					Nigeria. We transfer data only where one of the permitted grounds
					applies:
				</p>
				<ul>
					<li>
						the destination country provides an <strong>adequate level</strong>{" "}
						of protection as recognised by the Commission;
					</li>
					<li>
						the recipient is bound by{" "}
						<strong>legally enforceable contractual terms</strong>, binding
						corporate rules or an approved code of conduct;
					</li>
					<li>
						you have given <strong>explicit consent</strong> after being
						informed of the risks; or
					</li>
					<li>
						the transfer is <strong>necessary to perform a contract</strong>{" "}
						with you, or a contract concluded in your interest.
					</li>
				</ul>
				<p>
					Before transferring, we satisfy ourselves that the recipient is
					subject to a regime affording adequate protection. You can request
					details of the safeguards applied to a specific transfer.
				</p>
			</>
		),
	},
	{
		id: "security-and-breach",
		title: "Security and breach notification",
		content: (
			<>
				<p>
					We apply technical and organisational measures proportionate to the
					risk, including encryption in transit, role-based access control, bot
					protection on public forms, and vetted infrastructure providers.
				</p>
				<p>
					If a personal data breach occurs that is likely to result in a risk to
					your rights and freedoms, we will notify the Nigeria Data Protection
					Commission <strong>within 72 hours</strong> of becoming aware of it,
					and inform affected data subjects without undue delay where the risk
					is high. We maintain an internal record of breaches and the remedial
					action taken.
				</p>
			</>
		),
	},
	{
		id: "certificate",
		title: "Our NDPC Certificate",
		content: (
			<>
				<NdpcCertificate />
				<p>
					<strong>{NDPC_REGISTERED_NAME}</strong> is registered with the Nigeria
					Data Protection Commission as a{" "}
					<strong>data controller / processor of major importance</strong>{" "}
					pursuant to {NDPC_REGISTRATION_SECTION} of the Nigeria Data Protection
					Act 2023, under registration ID{" "}
					<strong>{NDPC_REGISTRATION_NUMBER}</strong>.
				</p>
			</>
		),
	},
	{
		id: "complaints",
		title: "Complaints",
		content: (
			<>
				<p>
					If you believe we have handled your personal data in breach of the
					NDPA, please raise it with us first at{" "}
					<a href="mailto:contact@obana.africa">contact@obana.africa</a>. We
					take complaints seriously and will investigate and respond.
				</p>
				<p>
					You also have the right to lodge a complaint directly with the{" "}
					<a
						href="https://ndpc.gov.ng"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nigeria Data Protection Commission
					</a>
					, and to seek a judicial remedy, at any time.
				</p>
			</>
		),
	},
];
