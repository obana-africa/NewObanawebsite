// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logoImage from "@/app/assets/images/logos/obana-footer-logo.png";
// import {
// 	Facebook,
// 	Instagram,
// 	Twitter,
// 	Linkedin,
// 	Youtube,
// 	SendHorizonal,
// } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { emailSchema } from "@/schemas";
// import { EmailFormData } from "@/types";
// import useNewsletter from "@/hooks/use-newsletter";

// const Footer = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		reset,
// 	} = useForm<EmailFormData>({
// 		resolver: zodResolver(emailSchema),
// 	});

// 	const { subscribe } = useNewsletter();

// 	const onSubmit = (data: EmailFormData) => {
// 		subscribe(data.email);
// 		reset();
// 	};

// 	const serviceLinks = [
// 		{ title: "About Us", href: "/about" },
// 		{ title: "Blog", href: "https://blog.obana.africa" },
// 		{ title: "FAQs", href: "/faqs" },
// 		// { title: "Logistics Support", href: "/logistics" },
// 		// { title: "Inventory Financing", href: "/inventory" },
// 		// { title: "Logistics Support", href: "/logistics" },
// 		// { title: "Request for a quote", href: "/rfq" },
// 		// { title: "Sign up as a Vendor", href: "https://vendor.obana.africa/" },
// 		// { title: "Join our Sales Team", href: "https://salesforce.obana.africa/" },
// 	];
// 	const sourcingLinks = [
// 		{
// 			title: "Circular Sourcing ",
// 			href: "https://shop.obana.africa/categories/Men",
// 		},
// 		{
// 			title: "African Inspired Sourcing",
// 			href: "https://shop.obana.africa/categories/Kids",
// 		},
// 		{ title: "Request for Sourcing", href: "/rfq" },
// 	];

// 	const companyLinks = [
// 		{ title: "Request Shipment", href: "/logistics" },
// 		{
// 			title: "Order Now & Pay Small Small (ONPSS)",
// 			href: "https://shop.obana.africa/obana-pss",
// 		},
// 		{ title: "Partner With Us", href: "https://salesforce.obana.africa/" },
// 	];
// 	const tradeLinks = [
// 		{ title: "Sell on Obana", href: "https://vendor.obana.africa/" },
// 		{ title: "Buy in Bulk", href: "https://shop.obana.africa/" },
// 		{
// 			title: "Earn as a Sales Partner",
// 			href: "https://salesforce.obana.africa/",
// 		},
// 	];

// 	const socialLinks = [
// 		{
// 			icon: <Facebook size={20} />,
// 			href: "https://web.facebook.com/obanaafrica",
// 		},
// 		{
// 			icon: <Instagram size={20} />,
// 			href: "https://www.instagram.com/obana.africa/",
// 		},
// 		{ icon: <Twitter size={20} />, href: "https://x.com/obana_africa" },
// 		{
// 			icon: <Linkedin size={20} />,
// 			href: "https://www.linkedin.com/company/obana-africa",
// 		},
// 		{
// 			icon: <Youtube size={20} />,
// 			href: "https://www.youtube.com/@Obana.africa",
// 		},
// 	];

// 	const policyLinks = [
// 		{ title: "Terms & Conditions", href: "" },
// 		{ title: "Privacy Policy", href: "" },
// 	];

// 	return (
// 		<footer className="bg-primary text-white pt-4 pb-4 md:pt- md:pb- relative overflow-hidden">
// 			<div
// 				className="absolute top-[151px] left-[804px] w-[182px] h-[56px] opacity-28 blur-[50px] bg-white rounded-full hidden md:block"
// 				style={{
// 					transform: "translate(-50%, -50%)",
// 				}}
// 			></div>

// 			<div className="container mx-auto px-4 md:px-6">
// 				<div className="px-4 py-10 max-w-7xl mx-auto">
// 					<div className="md:grid md:grid-cols-5 md:gap-8">
// 						<div className="flex flex-col items-center md:items-start">
// 							<div className=" p-2 mb-2 ">
// 								<Image
// 									src={logoImage}
// 									alt="Obana Logo"
// 									width={100}
// 									height={40}
// 								/>
// 							</div>
// 							<div className="flex gap-4">
// 								{socialLinks.map((social, index) => (
// 									<Link
// 										key={index}
// 										href={social.href}
// 										className="text-white hover:text-gray-300"
// 									>
// 										{social.icon}
// 									</Link>
// 								))}
// 							</div>
// 						</div>

// 						<div className="grid grid-cols-2 gap-4 mt-8 md:hidden">
// 							<div>
// 								<h3 className="text-lg font-medium mb-4">About Obana</h3>
// 								<ul className="space-y-2 ">
// 									{serviceLinks.map((link, index) => (
// 										<li key={index}>
// 											<Link href={link.href} className="hover:underline">
// 												{link.title}
// 											</Link>
// 										</li>
// 									))}
// 								</ul>
// 							</div>

// 							<div>
// 								<h3 className="text-lg font-medium mb-4">
// 									Partnership & Growth
// 								</h3>
// 								<ul className="space-y-2">
// 									{companyLinks.map((link, index) => (
// 										<li key={index}>
// 											<Link href={link.href} className=" hover:underline">
// 												{link.title}
// 											</Link>
// 										</li>
// 									))}
// 								</ul>
// 							</div>
// 						</div>

// 						<div className="hidden md:block">
// 							<h3 className="text-lg font-medium mb-4">About Obana</h3>
// 							<ul className="space-y-2">
// 								{serviceLinks.map((link, index) => (
// 									<li key={index}>
// 										<Link href={link.href} className=" hover:underline">
// 											{link.title}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 						<div className="hidden md:block">
// 							<h3 className="text-lg font-medium mb-4">Sourcing Solutions</h3>
// 							<ul className="space-y-2">
// 								{sourcingLinks.map((link, index) => (
// 									<li key={index}>
// 										<Link href={link.href} className=" hover:underline">
// 											{link.title}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>

// 						<div className="hidden md:block">
// 							<h3 className="text-lg font-medium mb-4">Partnership & Growth</h3>
// 							<ul className="space-y-2">
// 								{companyLinks.map((link, index) => (
// 									<li key={index}>
// 										<Link href={link.href} className=" hover:underline">
// 											{link.title}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 						<div className="hidden md:block">
// 							<h3 className="text-lg font-medium mb-4">Start Trading</h3>
// 							<ul className="space-y-2">
// 								{tradeLinks.map((link, index) => (
// 									<li key={index}>
// 										<Link href={link.href} className=" hover:underline">
// 											{link.title}
// 										</Link>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 					</div>

// 					<div className="border-t border-gray-600 my-8"></div>

// 					<div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
// 						<div className="w-full md:w-[40%]">
// 							<p className=" mb-4 md:mb-0">
// 								Copyright © 2025 Icon Tech & Ecommerce Service Limited trading as Obana.Africa. All Rights Reserved.
// 							</p>
// 							<div className="flex gap-4 ">
// 								{policyLinks.map((link, index) => (
// 									<Link
// 										key={index}
// 										href={link.href}
// 										className="hover:underline"
// 									>
// 										{link.title}
// 									</Link>
// 								))}
// 							</div>
// 						</div>
// 						<div className=" md:mt-0 md:w-[30%]">
// 							<h3 className="text-lg font-medium mb-4">Stay Connected</h3>
// 							<p className="mb-4 ">
// 								Subscribe for updates on sourcing opportunities, vendor
// 								programs, and African market trends.
// 							</p>
// 							<form onSubmit={handleSubmit(onSubmit)}>
// 								<div className="flex bg-white rounded-lg py-1">
// 									<input
// 										type="email"
// 										placeholder="Enter your mail here..."
// 										className={`px-4 py-2 w-full rounded-2xl text-primary-dark focus:outline-none ${
// 											errors.email ? "border border-error" : ""
// 										}`}
// 										{...register("email")}
// 									/>
// 									<button
// 										type="submit"
// 										className="bg-primary cursor-pointer text-white px-2 py-2 mr-1 rounded-md border border-white flex items-center justify-center"
// 									>
// 										<SendHorizonal className="h-5 w-5 transform -rotate-45" />
// 									</button>
// 								</div>
// 								{errors.email && (
// 									<p className="text-error text-sm mt-1">
// 										{errors.email.message}
// 									</p>
// 								)}
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</footer>
// 	);
// };

// export default Footer;

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/app/assets/images/logos/obana-footer-logo.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  SendHorizonal,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/schemas";
import { EmailFormData } from "@/types";
import useNewsletter from "@/hooks/use-newsletter";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const { subscribe } = useNewsletter();

  const onSubmit = (data: EmailFormData) => {
    subscribe(data.email);
    reset();
  };

  /* ── Nav columns — matching Figma exactly ── */
  const aboutLinks = [
    { title: "About Us",  href: "/about" },
    { title: "Blog",      href: "https://blog.obana.africa" },
    { title: "FAQs",      href: "/faqs" },
  ];

  const productsLinks = [
    { title: "Visit Obana Shop",      href: "https://shop.obana.africa/" },
    { title: "Use Obana Logistics",   href: "/logistics" },
    { title: "Start Selling with Taja", href: "https://salesforce.obana.africa/" },
  ];

  const learnLinks = [
    { title: "Overview",    href: "/about" },
    { title: "Ecosystem",   href: "/ecosystem" },
    { title: "How It Works",href: "/how-it-works" },
  ];

  const partnerLinks = [
    { title: "Join US",      href: "https://salesforce.obana.africa/" },
    { title: "Collaborate",  href: "/contact" },
    { title: "Apply",        href: "https://vendor.obana.africa/" },
  ];

  const socialLinks = [
    { icon: <Facebook  size={18} />, href: "https://web.facebook.com/obanaafrica",              label: "Facebook"  },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/obana.africa/",            label: "Instagram" },
    { icon: <Twitter   size={18} />, href: "https://x.com/obana_africa",                        label: "Twitter"   },
    { icon: <Linkedin  size={18} />, href: "https://www.linkedin.com/company/obana-africa",      label: "LinkedIn"  },
  ];

  const policyLinks = [
    { title: "Terms & Conditions", href: "" },
    { title: "Privacy Policy",     href: "" },
  ];

  /* ── Reusable link column ── */
  const NavColumn = ({ title, links }: { title: string; links: { title: string; href: string }[] }) => (
    <div>
      <h3
        className="text-base font-semibold text-white mb-4 tracking-wide leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="text-white/75 text-[15px] hover:text-white transition-colors duration-200 block"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: "2" }}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-primary text-white relative overflow-hidden" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* Decorative blur */}
      <div
        className="absolute w-[180px] h-[56px] opacity-20 blur-[50px] bg-white rounded-full pointer-events-none hidden md:block"
        style={{ top: "151px", left: "804px", transform: "translate(-50%, -50%)" }}
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* ── TOP SECTION ── */}
        <div className="pt-10 pb-8 md:pt-12 md:pb-10">

          {/* Desktop: logo left, nav columns spread across remaining space */}
          <div className="hidden md:flex items-start gap-8">

            {/* Col 1 — Logo + socials */}
            <div className="flex flex-col gap-4 flex-shrink-0 w-[180px]">
              <Image
                src={logoImage}
                alt="Obana Logo"
                width={110}
                height={40}
                style={{ height: "auto" }}
              />
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <Link key={i} href={s.href} aria-label={s.label}
                    className="text-white/70 hover:text-white transition-colors duration-200">
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Nav columns — right-aligned to sit above Stay Connected */}
            <div className="flex flex-1 justify-evenly gap-16 xl:gap-16">
              <NavColumn title="About Obana"        links={aboutLinks}    />
              <NavColumn title="Our Products"        links={productsLinks} />
              <NavColumn title="Learn How It Works"  links={learnLinks}    />
              <NavColumn title="Become a Partner"    links={partnerLinks}  />
            </div>
          </div>

          {/* Mobile: logo + socials + 2-column nav grid */}
          <div className="md:hidden flex flex-col gap-8">

            {/* Logo + socials */}
            <div className="flex flex-col gap-4">
              <Image
                src={logoImage}
                alt="Obana Logo"
                width={100}
                height={36}
                style={{ height: "auto" }}
              />
              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <Link key={i} href={s.href} aria-label={s.label}
                    className="text-white/70 hover:text-white transition-colors duration-200">
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2-column nav grid */}
            <div className="grid grid-cols-2 gap-6">
              <NavColumn title="About Obana"       links={aboutLinks}    />
              <NavColumn title="Our Products"       links={productsLinks} />
              <NavColumn title="Learn How It Works" links={learnLinks}    />
              <NavColumn title="Become a Partner"   links={partnerLinks}  />
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="border-t border-white/15" />

        {/* ── BOTTOM SECTION ── */}
        <div className="py-6 flex flex-col-reverse md:flex-row justify-between items-start gap-8 md:gap-8">

          {/* Left — copyright + policy */}
          <div className="flex flex-col gap-1.5 mt-8">
            <p className="text-white/70 text-[15px] leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              © 2025 Obana.Africa (An ICON Tech & Ecom Services Ltd Trademark).
            </p>
            <p className="text-white/70 text-[15px] leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 mt-1">
              {policyLinks.map((link, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-white/40 text-[15px]">|</span>}
                  <Link
                    href={link.href}
                    className="text-white/70 text-[15px] leading-none hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {link.title}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right — Stay Connected */}
          <div className="w-full md:w-[360px] flex-shrink-0">
            <h3 className="text-base font-semibold text-white mb-6 leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Stay Connected</h3>
            <p className="text-white/70 text-[15px] mb-4 leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Subscribe for updates on sourcing opportunities, vendor programs, and African market trends.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex bg-white rounded-lg py-1 overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className={`px-4 py-2 w-full text-sm text-primary focus:outline-none bg-transparent ${
                    errors.email ? "border border-error" : ""
                  }`}
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  {...register("email")}
                />
                <button
                  type="submit"
                  className="bg-primary cursor-pointer text-white px-3 py-2 mr-1 rounded-md border border-white flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-colors"
                  aria-label="Subscribe"
                >
                  <SendHorizonal className="h-4 w-4 transform -rotate-45" />
                </button>
              </div>
              {errors.email && (
                <p className="text-error text-xs mt-1">{errors.email.message}</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;