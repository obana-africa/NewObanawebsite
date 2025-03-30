import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqSections } from "../data/question-answer";
import Image from "next/image";
import question from "@/app/assets/images/faqs/question.png";

const FAQComponent: React.FC = () => {
	const [activeSection, setActiveSection] = useState(faqSections[0].title);
	const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

	const toggleQuestion = (question: string) => {
		if (expandedQuestion === question) {
			setExpandedQuestion(null);
		} else {
			setExpandedQuestion(question);
		}
	};

	const renderAnswer = (answer: string | React.ReactNode) => {
		if (typeof answer === "string") {
			return <p className="text-gray-600">{answer}</p>;
		}
		return answer;
	};

	return (
		<section className="container mx-auto px-4 md:px-6 py-8 md:py-16 mt-10 hidden sm:block">
			<div className="flex flex-col md:flex-row gap-0 md:gap-6 relative">
				<div className="w-full md:w-1/4 mb-6 md:mb-0">
					<nav className="space-y-3">
						{faqSections.map((section) => (
							<div
								key={section.title}
								className={`
                  py-4 px-6 cursor-pointer transition-all duration-300 ease-in-out
                  border-b-4 border-primary rounded-md shadow-md
                  ${
										activeSection === section.title
											? "bg-primary text-white border-primary"
											: "bg-white text-gray-700 hover:bg-gray-50"
									}
                `}
								onClick={() => {
									setActiveSection(section.title);
									setExpandedQuestion(null);
								}}
							>
								{section.title}
							</div>
						))}
					</nav>
				</div>
				<div
					className="absolute -top-[140px] -right-40   bg-white/10 rounded-lg "
					data-aos="zoom-in"
				>
					<Image
						src={question}
						alt="Decorative square"
						width={400}
						height={300}
					/>
				</div>
				<div
					className="w-full md:w-3/4 bg-secondary p-6 md:p-8 rounded-lg shadow-sm"
					data-aos="fade-left"
				>
					<h1 className="text-2xl font-bold mb-6 text-gray-800">
						{activeSection}
					</h1>

					<div className="space-y-4">
						{faqSections
							.find((section) => section.title === activeSection)
							?.items.map((item, index) => (
								<div
									key={index}
									className="rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out"
									data-aos="fade-up"
								>
									<div
										className={`
                      flex justify-between items-center p-4 cursor-pointer transition-colors duration-300
                      ${
												expandedQuestion === item.question
													? "bg-primary text-white"
													: "bg-white"
											}
                      hover:bg-gray-50
                    `}
										onClick={() => toggleQuestion(item.question)}
									>
										<h6
											className={`font-medium ${
												expandedQuestion === item.question
													? "text-white"
													: "text-gray-800"
											}`}
										>
											{item.question}
										</h6>
										{expandedQuestion === item.question ? (
											<ChevronUp
												className={
													expandedQuestion === item.question
														? "text-white"
														: "text-gray-500"
												}
											/>
										) : (
											<ChevronDown
												className={
													expandedQuestion === item.question
														? "text-white"
														: "text-gray-500"
												}
											/>
										)}
									</div>

									<div
										className={`transition-all duration-300 ease-in-out overflow-hidden ${
											expandedQuestion === item.question
												? "max-h-96 opacity-100"
												: "max-h-0 opacity-0"
										}`}
									>
										{expandedQuestion === item.question && (
											<div className="p-4 bg-transparent border-t border-gray-200">
												{renderAnswer(item.answer)}
											</div>
										)}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQComponent;
