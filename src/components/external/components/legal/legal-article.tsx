import React from "react";

export interface LegalSection {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface LegalArticleProps {
	title: string;
	lastUpdated: string;
	intro?: React.ReactNode;
	sections: LegalSection[];
}

/**
 * Body of a legal document. The surrounding shell (sidebar, spacing) comes from
 * the (legal) route group layout.
 */
const LegalArticle: React.FC<LegalArticleProps> = ({
	title,
	lastUpdated,
	intro,
	sections,
}) => {
	return (
		<article className="w-full">
			<h1 className="max-w-[75ch] text-3xl md:text-4xl lg:text-5xl text-legal mb-4">
				{title}
			</h1>

			<p className="max-w-[75ch] text-md text-legal/70 mb-8">
				<span className="font-semibold text-legal">Last updated:</span>{" "}
				{lastUpdated}
			</p>

			{/*
			 * The readable measure is capped per text element rather than on the
			 * article, so figures and tables can use the full column width.
			 */}
			<div
				className="
					text-md leading-relaxed text-legal
					[&_p]:mb-4 [&_p]:max-w-[75ch]
					[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:max-w-[75ch]
					[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2 [&_ol]:max-w-[75ch]
					[&_li]:pl-1
					[&_strong]:font-semibold [&_strong]:text-legal
					[&_a]:text-legal [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-80
					[&_h3]:text-lg [&_h3]:text-legal [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:max-w-[75ch]
					[&_table]:w-full [&_table]:text-base [&_table]:mb-4
					[&_th]:text-left [&_th]:align-top [&_th]:p-3 [&_th]:bg-secondary [&_th]:text-legal
					[&_td]:align-top [&_td]:p-3 [&_td]:border-t [&_td]:border-secondary
				"
			>
				{intro && (
					<div className="max-w-[75ch] bg-secondary rounded-lg p-5 md:p-6 mb-10">
						{intro}
					</div>
				)}

				{sections.map((section) => (
					<section key={section.id} className="mb-10 last:mb-0">
						<h2
							id={section.id}
							className="max-w-[75ch] scroll-mt-28 text-xl md:text-2xl text-legal mb-4"
						>
							{section.title}
						</h2>
						{section.content}
					</section>
				))}
			</div>
		</article>
	);
};

export default LegalArticle;
