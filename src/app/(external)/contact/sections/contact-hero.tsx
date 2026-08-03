import React from "react";


const ContactHero = () => {
	return (
		<section className="container mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-10">
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-12">
				<h1 className="text-5xl md:text-6xl font-bold text-navy leading-none">
					Contact Us
				</h1>

				<p className="max-w-md text-md text-navy md:text-right">
					Available 24/7 to support your sourcing, logistics, and business
					inquiries ensuring you get the assistance you need whenever your
					operations demand it.
				</p>
			</div>
		</section>
	);
};

export default ContactHero;
