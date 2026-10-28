import React from "react";
import LegalNav from "@/components/external/components/legal/legal-nav";


export default function LegalLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="min-h-screen pt-[88px] md:pt-[104px] pb-16 md:pb-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
					<aside className="lg:w-[240px] lg:shrink-0">
						<div className="lg:sticky lg:top-[104px] lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto">
							<LegalNav />
						</div>
					</aside>

					<div className="lg:flex-1 lg:min-w-0">{children}</div>
				</div>
			</div>
		</div>
	);
}
