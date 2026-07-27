"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { legalLinks } from "./legal-links";


const LegalNav = () => {
	const pathname = usePathname();

	return (
		<nav aria-label="Legal documents">
			<ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
				{legalLinks.map((link) => {
					const isActive = pathname === link.href;

					return (
						<li key={link.href} className="shrink-0">
							<Link
								href={link.href}
								aria-current={isActive ? "page" : undefined}
								className={`block whitespace-nowrap rounded-full px-4 py-2 text-md transition-colors duration-200 ${
									isActive
										? "bg-secondary border border-legal/30 text-legal font-semibold"
										: "border border-transparent text-legal/70 hover:text-legal hover:bg-secondary/60"
								}`}
							>
								{link.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default LegalNav;
