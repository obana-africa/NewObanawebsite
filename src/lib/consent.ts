/**
 * Cookie consent, and the one thing it gates.
 *
 * Obana's site loads the Zoho SalesIQ chat widget, which sets cookies of its
 * own the moment it starts. Nothing here is needed to read the site, so it
 * stays off until somebody says otherwise — which is also what the cookie
 * policy already promises, and what the law expects of a site serving the EU
 * and the UK.
 */

export const CONSENT_KEY = "obana.africa.consent";
export const CONSENT_EVENT = "obana:consent";

export type Consent = "granted" | "denied" | "unset";

const SALESIQ_WIDGET_CODE =
	"siqf496fa49c70a3de67a85f0e3ceb80621fa911025996d633d43e5e232cada29ac";

/** 'unset' means nobody has been asked yet, which is when the banner shows. */
export function readConsent(): Consent {
	/* A private window and blocked site data throw rather than returning null,
	   so the read is guarded and an unreadable store counts as unasked. */
	try {
		const value = window.localStorage.getItem(CONSENT_KEY);
		return value === "granted" || value === "denied" ? value : "unset";
	} catch {
		return "unset";
	}
}

export function writeConsent(value: Consent) {
	try {
		window.localStorage.setItem(CONSENT_KEY, value);
	} catch {
		/* The choice still applies to this page view; it is just not remembered. */
	}
	window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
	if (value === "granted") startSalesIQ();
}

let started = false;

/** Start the chat widget. Idempotent, and safe to call before the DOM exists. */
export function startSalesIQ() {
	if (started) return;
	if (typeof window === "undefined" || typeof document === "undefined") return;
	if (document.getElementById("zsiqscript")) {
		started = true;
		return;
	}
	started = true;

	const config = document.createElement("script");
	config.type = "text/javascript";
	config.id = "zsiqchat";
	config.innerHTML = `
		var $zoho = $zoho || {};
		$zoho.salesiq = $zoho.salesiq || { widgetcode: "${SALESIQ_WIDGET_CODE}", values: {}, ready: function () {} };
	`;
	document.body.appendChild(config);

	const widget = document.createElement("script");
	widget.type = "text/javascript";
	widget.id = "zsiqscript";
	widget.defer = true;
	widget.src = "https://salesiq.zohopublic.com/widget";
	document.body.appendChild(widget);
}
