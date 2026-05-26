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
    { title: "Custom Sourcing",      href: "/custom-sourcing" },
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
    { title: "Your Tasks",href: "/task" },

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
              © {new Date().getFullYear()} Obana.Africa (An ICON Tech & Ecom Services Ltd Trademark).
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