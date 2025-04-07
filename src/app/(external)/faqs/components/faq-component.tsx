import React, { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { faqSections } from "../data/question-answer";
import Image from "next/image";
import Slider from "react-slick";
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

	const faqSlickSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		swipeToSlide: true,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<style jsx global>{`
				.faq-section-slider .custom-slick-arrow {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					z-index: 10;
					cursor: pointer;
					display: flex !important;
					align-items: center;
					justify-content: center;
					width: 30px;
					height: 30px;
					border-radius: 20%;
					background-color: white;
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
					transition: all 0.2s ease;
				}

				.faq-section-slider .custom-slick-arrow:hover {
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
					background-color: #f8f8f8;
				}

				.faq-section-slider .custom-slick-prev {
					left: -12px;
				}

				.faq-section-slider .custom-slick-next {
					right: -12px;
				}

				/* Hide default slick arrow styling */
				.faq-section-slider .slick-prev:before,
				.faq-section-slider .slick-next:before {
					display: none;
				}

				/* Adjust spacing for the carousel */
				.faq-section-slider .slick-list {
					margin: 0 15px;
				}
			`}</style>
			<section className="container mx-auto px-4 md:px-6 py-8 md:py-16 mt-10">
				<div className="flex flex-col md:flex-row gap-0 md:gap-6 relative">
					<div className="w-full md:w-1/4 mb-6 md:mb-0 hidden sm:block">
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

					<div className="w-full block sm:hidden mb-6 z-10">
						<Slider {...faqSlickSettings} className="faq-section-slider">
							{faqSections.map((section) => (
								<div key={section.title} className="px-2">
									<div
										className={`
                    py-3 px-4 cursor-pointer transition-all duration-300 ease-in-out
                    border-b-4 border-primary rounded-md shadow-md text-center
                    ${
											activeSection === section.title
												? "bg-primary text-white border-primary"
												: "bg-white text-gray-700"
										}
                  `}
										onClick={() => {
											setActiveSection(section.title);
											setExpandedQuestion(null);
										}}
									>
										{section.title}
									</div>
								</div>
							))}
						</Slider>
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
		</>
	);
};

export default FAQComponent;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrevArrow = (props: any) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} custom-slick-arrow custom-slick-prev`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<ChevronLeft size={24} className="text-primary hover:text-primary-dark" />
		</div>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextArrow = (props: any) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} custom-slick-arrow custom-slick-next`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<ChevronRight
				size={24}
				className="text-primary hover:text-primary-dark"
			/>
		</div>
	);
};
