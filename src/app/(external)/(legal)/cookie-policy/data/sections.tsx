import React from "react";
import Link from "next/link";
import { LegalSection } from "@/components/external/components/legal/legal-article";

export const LAST_UPDATED = "27 July 2026";

export const cookieIntro = (
	<>
		<p>
			This Cookie Policy explains how{" "}
			<strong>ICON Tech &amp; Ecom Services Ltd</strong>, operator of
			Obana.Africa, uses cookies and similar browser storage on{" "}
			<strong>obana.africa</strong> &mdash; what we set, why, and how you can
			control it.
		</p>
		<p>
			It sits alongside our{" "}
			<Link href="/privacy-policy">Privacy Policy</Link>, which explains how we
			handle personal data more generally.
		</p>
	</>
);

export const cookieSections: LegalSection[] = [
	{
		id: "what-are-cookies",
		title: "What are cookies?",
		content: (
			<>
				<p>
					Cookies are small text files a website stores on your device so it can
					recognise your browser on a later request. They are what keep you
					signed in as you move between pages, and what let a site remember a
					choice you have already made.
				</p>
				<p>
					We also use two related browser technologies:{" "}
					<strong>local storage</strong> and <strong>session storage</strong>.
					They work like cookies but are not sent to a server with every
					request. Everything in this policy applies to them too.
				</p>
				<p>
					<strong>Session cookies</strong> are deleted when you close your
					browser. <strong>Persistent cookies</strong> stay until they expire or
					you delete them. <strong>First-party</strong> cookies are set by
					obana.africa; <strong>third-party</strong> cookies are set by another
					service running on the page, such as Google reCAPTCHA.
				</p>
			</>
		),
	},
	{
		id: "how-we-use-cookies",
		title: "How we use cookies",
		content: (
			<>
				<p>
					We keep this deliberately minimal. We do not run advertising or
					cross-site tracking cookies on obana.africa, and we do not sell data
					collected through cookies. We use them for three things:
				</p>
				<h3>Strictly necessary</h3>
				<p>
					These keep the site working and your session secure. They cannot be
					switched off without breaking sign-in and form submission. They
					include the authentication and refresh tokens that keep you signed in
					across Obana services.
				</p>
				<h3>Functional</h3>
				<p>
					These remember choices you have made so you do not have to repeat
					them &mdash; for example, holding a registration or quote step you
					have already completed while you finish the rest of the flow.
				</p>
				<h3>Security and anti-abuse</h3>
				<p>
					Our contact form uses Google reCAPTCHA to tell real users from
					automated bots. reCAPTCHA sets its own cookies and collects device and
					interaction signals for that purpose. See{" "}
					<a
						href="https://policies.google.com/privacy"
						target="_blank"
						rel="noopener noreferrer"
					>
						Google&rsquo;s Privacy Policy
					</a>{" "}
					and{" "}
					<a
						href="https://policies.google.com/terms"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms of Service
					</a>
					.
				</p>
			</>
		),
	},
	{
		id: "cookies-we-set",
		title: "Cookies and storage we use",
		content: (
			<>
				<div className="overflow-x-auto">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Purpose</th>
								<th>Retention</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>token</td>
								<td>Strictly necessary (first-party)</td>
								<td>
									Holds your access token so you stay signed in across Obana
									services.
								</td>
								<td>Session / until sign-out</td>
							</tr>
							<tr>
								<td>refresh_token</td>
								<td>Strictly necessary (first-party)</td>
								<td>
									Renews an expired session without making you sign in again.
								</td>
								<td>Session / until sign-out</td>
							</tr>
							<tr>
								<td>pendingRegistration</td>
								<td>Functional (local storage)</td>
								<td>
									Temporarily holds details from a registration or financing
									request so the next step can be completed.
								</td>
								<td>Until the flow finishes or storage is cleared</td>
							</tr>
							<tr>
								<td>_GRECAPTCHA</td>
								<td>Security (third-party &mdash; Google)</td>
								<td>
									Used by reCAPTCHA to distinguish humans from bots on our
									contact form.
								</td>
								<td>Up to 6 months</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p>
					Names and lifetimes set by third parties can change without notice on
					their side. Our hosting and security infrastructure may also set
					short-lived operational cookies for load balancing and abuse
					prevention.
				</p>
			</>
		),
	},
	{
		id: "managing-cookies",
		title: "How to control cookies",
		content: (
			<>
				<p>
					You can accept, block or delete cookies in your browser settings, and
					most browsers let you clear stored site data for a single site:
				</p>
				<ul>
					<li>
						<a
							href="https://support.google.com/chrome/answer/95647"
							target="_blank"
							rel="noopener noreferrer"
						>
							Google Chrome
						</a>
					</li>
					<li>
						<a
							href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop"
							target="_blank"
							rel="noopener noreferrer"
						>
							Mozilla Firefox
						</a>
					</li>
					<li>
						<a
							href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
							target="_blank"
							rel="noopener noreferrer"
						>
							Safari
						</a>
					</li>
					<li>
						<a
							href="https://support.microsoft.com/microsoft-edge"
							target="_blank"
							rel="noopener noreferrer"
						>
							Microsoft Edge
						</a>
					</li>
				</ul>
				<p>
					Because the cookies we use are strictly necessary, functional or
					security-related, blocking them will affect the site: you may be
					unable to sign in, stay signed in, or submit a contact or quote form.
				</p>
				<p>
					Browser &ldquo;Do Not Track&rdquo; signals are not yet handled
					consistently across the web, and we do not currently respond to them.
					We do not run behavioural advertising, so there is no ad profile to
					opt out of.
				</p>
			</>
		),
	},
	{
		id: "changes",
		title: "Changes to this policy",
		content: (
			<p>
				If we add or remove cookies &mdash; for example, if we introduce
				analytics &mdash; we will update this page and, where the law requires
				consent, ask for it before setting anything non-essential. The date at
				the top shows when this version took effect.
			</p>
		),
	},
	{
		id: "contact-us",
		title: "Contact us",
		content: (
			<p>
				Questions about our use of cookies? Email{" "}
				<a href="mailto:contact@obana.africa">contact@obana.africa</a> or use
				our <Link href="/contact">contact page</Link>.
			</p>
		),
	},
];
