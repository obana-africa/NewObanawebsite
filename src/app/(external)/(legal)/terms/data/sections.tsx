import React from "react";
import Link from "next/link";
import { LegalSection } from "@/components/external/components/legal/legal-article";

export const LAST_UPDATED = "27 July 2026";

export const termsIntro = (
	<>
		<p>
			These Terms &amp; Conditions govern your use of{" "}
			<strong>obana.africa</strong> and the services you request through it
			&mdash; sourcing, production, logistics, trademark and SME incubation.
			Obana.Africa is operated by{" "}
			<strong>ICON Tech &amp; Ecom Services Ltd</strong> (&ldquo;Obana&rdquo;,
			&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
		</p>
		<p>
			By using this website or submitting a request through it, you agree to
			these terms. If you do not agree with them, please do not use the site.
		</p>
	</>
);

export const termsSections: LegalSection[] = [
	{
		id: "about-these-terms",
		title: "About these terms",
		content: (
			<>
				<p>
					These terms apply to this website and to requests made through it.
					Where you go on to place an order or engage us for a service, that
					work is also governed by the quote, order confirmation or service
					agreement we issue. If there is a conflict, the signed agreement or
					order confirmation takes precedence over these terms for that
					transaction.
				</p>
				<p>
					Our separate platforms &mdash; shop.obana.africa,
					logistics.obana.africa, salesforce.obana.africa and
					vendor.obana.africa &mdash; may have their own terms that apply in
					addition to these.
				</p>
			</>
		),
	},
	{
		id: "who-can-use",
		title: "Who can use the site",
		content: (
			<>
				<p>
					Obana is a business-to-business marketplace. By using it you confirm
					that:
				</p>
				<ul>
					<li>you are at least 18 years old;</li>
					<li>
						you are acting for a business, and where you act for a company you
						have authority to bind it to these terms; and
					</li>
					<li>
						the information you give us is accurate, current and complete, and
						you will keep it up to date.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "our-role",
		title: "Our role",
		content: (
			<>
				<p>
					Obana connects businesses with vetted suppliers, manufacturers and
					logistics partners across Sub-Saharan Africa. Depending on the
					service, we act either as a party to the transaction or as an
					intermediary arranging it with a third party. The quote or order
					confirmation for each transaction sets out which applies.
				</p>
				<p>
					Where we act as an intermediary, the underlying goods or transport
					services are supplied by the third party, and we are not responsible
					for their acts or omissions beyond the duties we expressly accept.
				</p>
			</>
		),
	},
	{
		id: "accounts",
		title: "Accounts and security",
		content: (
			<p>
				Some Obana services require an account. You are responsible for keeping
				your login details confidential and for everything done under your
				account. Tell us immediately at{" "}
				<a href="mailto:contact@obana.africa">contact@obana.africa</a> if you
				suspect unauthorised access. We may suspend or close an account that is
				being misused or that poses a security or fraud risk.
			</p>
		),
	},
	{
		id: "acceptable-use",
		title: "Acceptable use",
		content: (
			<>
				<p>You agree not to:</p>
				<ul>
					<li>
						use the site for anything unlawful, fraudulent or misleading,
						including submitting false business or shipment details;
					</li>
					<li>
						upload content you do not have the rights to, or that infringes
						anyone&rsquo;s intellectual property;
					</li>
					<li>
						upload malware, or attempt to gain unauthorised access to the site,
						our systems or another user&rsquo;s data;
					</li>
					<li>
						scrape, harvest or systematically extract data from the site, or
						submit automated or bulk enquiries;
					</li>
					<li>
						interfere with the operation or security of the site, including
						circumventing bot protection; or
					</li>
					<li>
						use the site or our contact details to send unsolicited marketing.
					</li>
				</ul>
				<p>
					We may remove content, refuse a request or restrict access where we
					reasonably believe these terms have been breached.
				</p>
			</>
		),
	},
	{
		id: "quotes-and-orders",
		title: "Quotes, requests and orders",
		content: (
			<>
				<p>
					Requests you submit through our RFQ, custom sourcing or logistics
					forms are invitations for us to quote &mdash; they do not create a
					contract on their own.
				</p>
				<ul>
					<li>
						Prices, minimum order quantities and lead times shown on the site or
						in an indicative quote are estimates. They depend on supplier
						confirmation, material availability, quantity, specification and
						exchange rates.
					</li>
					<li>
						A binding contract is formed only when we issue a written quote or
						order confirmation and you accept it in line with its terms,
						including any payment condition.
					</li>
					<li>
						Quotes are valid for the period stated on them. Where no period is
						stated, they lapse after 14 days.
					</li>
					<li>
						Samples, images and specifications are indicative. Reasonable
						variation in colour, finish, weight and dimensions is normal in
						production and does not, on its own, make goods defective.
					</li>
					<li>
						You are responsible for the accuracy of the specifications, sizes,
						artwork and quantities you approve. Changes after approval may
						affect price and lead time.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "logistics",
		title: "Logistics and shipping",
		content: (
			<>
				<p>
					Where we arrange domestic or international shipping, the following
					apply in addition to the terms of the carrier handling the shipment:
				</p>
				<ul>
					<li>
						Transit times and delivery dates are estimates, not guarantees.
						Customs clearance, weather, carrier capacity and regulatory
						inspections can all cause delay.
					</li>
					<li>
						You must declare the contents, weight, dimensions and value of a
						shipment accurately. Under-declaring can lead to re-rating,
						penalties, seizure or refusal to carry, at your cost.
					</li>
					<li>
						You must not ship prohibited, restricted, hazardous or
						counterfeit goods, or anything that breaches applicable export,
						import or sanctions rules.
					</li>
					<li>
						Unless the quote says otherwise, duties, taxes, demurrage, storage
						and customs charges are yours to pay.
					</li>
					<li>
						Loss or damage claims are handled under the carrier&rsquo;s
						liability rules and any insurance you have taken. Insurance is not
						included unless expressly stated.
					</li>
				</ul>
			</>
		),
	},
	{
		id: "payments",
		title: "Payment, taxes and title",
		content: (
			<ul>
				<li>
					Payment terms, currency, deposits and instalments are those set out in
					the applicable quote, invoice or order confirmation.
				</li>
				<li>
					Prices exclude VAT, duties and other applicable taxes unless stated
					otherwise. You are responsible for taxes arising on your side of the
					transaction.
				</li>
				<li>
					Production or sourcing usually begins only once the required deposit
					has cleared. Delays in payment shift lead times accordingly.
				</li>
				<li>
					Bank charges, currency conversion costs and payment gateway fees are
					yours unless we agree otherwise in writing.
				</li>
				<li>
					Title to goods passes on full payment. Risk passes in line with the
					delivery terms stated in the order confirmation.
				</li>
				<li>
					We may charge interest on overdue amounts at the rate permitted by
					law, and may suspend work while an invoice is outstanding.
				</li>
			</ul>
		),
	},
	{
		id: "cancellations",
		title: "Changes, cancellations and returns",
		content: (
			<>
				<ul>
					<li>
						Custom-made, bespoke and made-to-order goods cannot generally be
						cancelled or returned once production has started, since they cannot
						be resold.
					</li>
					<li>
						If you cancel after we have committed to a supplier, you remain
						responsible for costs already incurred, including materials, work in
						progress and any deposit already paid to the supplier.
					</li>
					<li>
						If goods arrive damaged, short or materially different from the
						approved specification, tell us within 7 days of delivery with
						photographs and the order reference so we can investigate with the
						supplier or carrier.
					</li>
					<li>
						Where a claim is upheld, our remedy is, at our option, replacement,
						repair, re-supply or a refund of the affected portion of the price.
					</li>
					<li>
						We may cancel or refuse an order if a supplier fails, a price was
						manifestly wrong, or fulfilment would be unlawful. In that case we
						refund what you have paid for the cancelled part.
					</li>
				</ul>
				<p>
					Nothing here removes rights you have under Nigerian consumer or
					commercial law that cannot be excluded by agreement.
				</p>
			</>
		),
	},
	{
		id: "intellectual-property",
		title: "Intellectual property",
		content: (
			<>
				<p>
					The site, its content, branding, design and software are owned by us
					or our licensors and are protected by intellectual property law. The
					Obana name and logo are trademarks of ICON Tech &amp; Ecom Services
					Ltd. You may view and print pages for your own business use; you may
					not copy, republish or commercially exploit them without our written
					permission.
				</p>
				<p>
					<strong>Your content.</strong> You keep ownership of the designs,
					artwork, logos, specifications, business plans and other material you
					send us. You grant us a non-exclusive, royalty-free licence to use,
					store, reproduce and share that material with the suppliers,
					manufacturers and partners we need to involve, solely to quote for and
					deliver what you have asked for. You confirm you own or are licensed
					to use that material, and that our use of it will not infringe anyone
					else&rsquo;s rights.
				</p>
			</>
		),
	},
	{
		id: "third-party-links",
		title: "Third-party sites and content",
		content: (
			<p>
				The site links to third-party websites, platforms and partner brands we
				do not control. Links are provided for convenience and are not an
				endorsement. We are not responsible for the content, products, services
				or practices of those sites, and your use of them is governed by their
				own terms.
			</p>
		),
	},
	{
		id: "availability",
		title: "Site availability",
		content: (
			<p>
				We work to keep the site available, but we do not guarantee uninterrupted
				or error-free access. We may suspend, withdraw or change any part of the
				site &mdash; including any service or feature &mdash; for maintenance,
				security or business reasons, without liability to you.
			</p>
		),
	},
	{
		id: "disclaimers",
		title: "Disclaimers",
		content: (
			<p>
				Content on this website is provided for general information. While we
				take care to keep it accurate, we make no warranty that it is complete,
				current or fit for a particular purpose, and it is not commercial, legal,
				tax or regulatory advice. Except as expressly stated in these terms or a
				signed agreement, and to the fullest extent permitted by law, the site
				and its content are provided &ldquo;as is&rdquo; without warranties of
				any kind.
			</p>
		),
	},
	{
		id: "liability",
		title: "Limitation of liability",
		content: (
			<>
				<p>
					Nothing in these terms limits liability for death or personal injury
					caused by negligence, for fraud or fraudulent misrepresentation, or
					for anything else that cannot lawfully be limited.
				</p>
				<p>Subject to that, to the fullest extent permitted by law:</p>
				<ul>
					<li>
						we are not liable for loss of profit, revenue, business,
						anticipated savings, goodwill or data, or for any indirect or
						consequential loss, however arising; and
					</li>
					<li>
						our total liability arising out of or in connection with a
						transaction is limited to the amount you paid us for that
						transaction.
					</li>
				</ul>
				<p>
					We are not liable for failure or delay caused by events outside our
					reasonable control, including strikes, port congestion, customs
					action, supplier failure, civil unrest, epidemics, extreme weather,
					fire, power or network failure, or changes in law.
				</p>
			</>
		),
	},
	{
		id: "indemnity",
		title: "Indemnity",
		content: (
			<p>
				You agree to indemnify us against claims, losses, liabilities and
				reasonable costs arising from your breach of these terms, your misuse of
				the site, inaccurate shipment or product declarations you provide, or any
				claim that material you supplied to us infringes a third party&rsquo;s
				rights.
			</p>
		),
	},
	{
		id: "privacy",
		title: "Privacy",
		content: (
			<p>
				We handle personal data as described in our{" "}
				<Link href="/privacy-policy">Privacy Policy</Link>, which forms part of
				these terms. Please read it to understand what we collect, who we share
				it with and the rights you have. Our{" "}
				<Link href="/ndpa">NDPA compliance statement</Link>,{" "}
				<Link href="/gdpr">GDPR notice</Link> and{" "}
				<Link href="/cookie-policy">Cookie Policy</Link> set out the detail for
				each regime.
			</p>
		),
	},
	{
		id: "suspension",
		title: "Suspension and termination",
		content: (
			<p>
				We may suspend or end your access to the site or to a service, with
				notice where practicable, if you breach these terms, if we are required
				to by law, or if continuing would expose us or our partners to legal,
				financial or reputational risk. Terms that by their nature should survive
				termination &mdash; including payment obligations, intellectual property,
				liability and governing law &mdash; continue to apply.
			</p>
		),
	},
	{
		id: "governing-law",
		title: "Governing law and disputes",
		content: (
			<>
				<p>
					These terms and any dispute arising out of them are governed by the
					laws of the Federal Republic of Nigeria.
				</p>
				<p>
					If a dispute arises, please contact us first &mdash; most issues are
					resolved quickly that way. If we cannot resolve it within 30 days,
					the dispute will be submitted to the courts of Lagos State, Nigeria,
					which have exclusive jurisdiction, unless we agree in writing to
					mediation or arbitration in Lagos instead.
				</p>
			</>
		),
	},
	{
		id: "general",
		title: "General",
		content: (
			<ul>
				<li>
					We may update these terms as our services and legal obligations
					change. The current version is always the one posted here, with the
					date it took effect at the top. Continuing to use the site after a
					change means you accept it.
				</li>
				<li>
					You may not transfer your rights or obligations under these terms
					without our written consent. We may assign ours to a group company or
					to a buyer of the business.
				</li>
				<li>
					If a provision is found to be unenforceable, the rest of these terms
					continue to apply.
				</li>
				<li>
					A delay in enforcing a right is not a waiver of it.
				</li>
				<li>
					These terms, together with the applicable quote or order
					confirmation and our Privacy Policy, are the entire agreement between
					us on their subject matter.
				</li>
			</ul>
		),
	},
	{
		id: "contact-us",
		title: "Contact us",
		content: (
			<p>
				Questions about these terms? Email{" "}
				<a href="mailto:contact@obana.africa">contact@obana.africa</a>, call{" "}
				<a href="tel:+2348096535511">+234 809 653 5511</a>, write to us at 77
				Opebi Road, Ikeja, Lagos, Nigeria, or use our{" "}
				<Link href="/contact">contact page</Link>.
			</p>
		),
	},
];
