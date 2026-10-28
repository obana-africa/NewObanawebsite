"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, startSalesIQ, writeConsent, type Consent } from "@/lib/consent";

/**
 * The cookie banner.
 *
 * Visitors had no way of knowing the site sets any cookies at all, and no way
 * to say no — the chat widget simply started. This asks, once, and remembers
 * the answer.
 *
 * It renders nothing until the browser has been read, so somebody who already
 * answered never sees it flash on the way past. Accept and Decline are the
 * same size and weight: a banner where refusing is the harder path is not
 * really asking.
 */
export default function CookieConsent() {
	const [consent, setConsent] = useState<Consent | null>(null);

	const [bar, setBar] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		const stored = readConsent();
		setConsent(stored);
		/* Already accepted on an earlier visit — start the widget without
		   asking again. */
		if (stored === "granted") startSalesIQ();
	}, []);

	/* Push the page up by exactly the bar's height while it is showing.
	
	   A fixed bar sits over whatever is at the bottom of the page, and the
	   only link inside this one is the cookie policy — so every click down
	   there opened the policy instead of the thing that was clicked, over and
	   over. Reserving the space means nothing is underneath it to begin with.
	
	   Measured rather than assumed: the bar is one line on a wide screen and
	   several on a phone, and a guessed height is wrong on one of them. */
	useEffect(() => {
		if (!bar) return;
		const apply = () => {
			document.body.style.paddingBottom = `${bar.offsetHeight}px`;
		};
		apply();
		const observer = new ResizeObserver(apply);
		observer.observe(bar);
		window.addEventListener("resize", apply);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", apply);
			document.body.style.paddingBottom = "";
		};
	}, [bar]);

	if (consent !== "unset") return null;

	const choose = (value: Consent) => {
		writeConsent(value);
		setConsent(value);
	};

	return (
		<div
			ref={setBar}
			role="dialog"
			aria-labelledby="cookie-title"
			aria-describedby="cookie-body"
			className="fixed inset-x-0 bottom-0 z-[1400] border-t border-slate-200 bg-white shadow-[0_-8px_32px_rgba(14,30,48,0.10)]"
			/* Clears the home indicator on a phone. */
			style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
		>
			<div className="mx-auto flex max-w-6xl flex-col gap-3.5 px-4 pt-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:pt-4.5">
				<div className="min-w-0">
					{/* Bricolage for the title and Inter for the body, which is
					    what every other block on this site does. */}
					<p
						id="cookie-title"
						className="text-[0.9375rem] font-extrabold text-[#0E1E30]"
						style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
					>
						Cookies on Obana
					</p>
					<p id="cookie-body" className="mt-1 text-sm leading-relaxed text-[#4C5B6B]">
						We use one optional cookie, for the live chat that lets you reach us. It stays off until
						you turn it on, and the rest of the site works either way.{" "}
						<Link
							href="/cookie-policy"
							className="font-bold text-[#1b3b5f] underline underline-offset-2"
						>
							Read our cookie policy
						</Link>
					</p>
				</div>

				{/* Same size and weight on both: declining is not the harder path. */}
				<div className="flex shrink-0 gap-2.5">
					<button
						type="button"
						onClick={() => choose("denied")}
						className="h-11 flex-1 rounded-[0.625rem] border border-slate-200 px-5 text-sm font-bold text-[#0E1E30] transition-colors hover:bg-slate-50 md:flex-none"
					>
						Decline
					</button>
					<button
						type="button"
						onClick={() => choose("granted")}
						className="h-11 flex-1 rounded-[0.625rem] bg-[#1b3b5f] px-5 text-sm font-bold text-white transition-opacity hover:opacity-90 md:flex-none"
					>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
}
