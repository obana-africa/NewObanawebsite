import Image from "next/image";
import Link from "next/link";

export default function BNPL() {
  return (
    <section
      aria-label="Buy now, pay later with Salad Africa"
      className=" mx-auto my-6 w-full max-w-5xl  p-4 bg-yellow-100"
    >
      <div className="flex items-center gap-4 rounded-xl border justify-center">
        <div className="shrink-0 py-8 md:px-4 ">
          <Image
            src="/logos/salad-africa-placeholder.svg"
            alt="Salad Africa"
            width={140}
            height={44}
            priority
          />
        </div>

        <p className="text-sm md:text-base leading-relaxed">
          <strong>Buy Now, Pay Later</strong>, monthly payments up to 12 months,
          powered by trusted lenders.{" "}
          <Link href="/inventory" className="underline underline-offset-2">
            Learn more
          </Link>
        </p>
      </div>
    </section>
  );
}
