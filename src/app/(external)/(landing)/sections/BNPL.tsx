import Image from "next/image";
import Link from "next/link";

export default function BNPL() {
  return (
		<section
			aria-label="Buy now, pay later with Salad Africa"
			className="mx-auto my-3 md:my-6 w-full max-w-5xl bg-yellow-100"
		>
			<div className="flex flex-col md:flex-row items-center gap-4 rounded-xl justify-center px-4 py-3 md:py-4">
				<div className="shrink-0 md:px-4">
					<div className="w-32 h-10 relative md:hidden">
						<Image
							src="/logos/salad-africa-placeholder.svg"
							alt="Salad Africa"
							width={200}
							height={40}
							style={{ objectFit: "contain" }}
							priority
							sizes="208px"
						/>
					</div>
					<div className="hidden md:block w-[150px] h-[90px] relative">
						<Image
							src="/logos/salad-africa-placeholder.svg"
							alt="Salad Africa"
							width={160}
							height={20}
							style={{ objectFit: "contain" }}
							priority
							sizes="500px"
						/>
					</div>
				</div>
				<p className="text-md md:text-lg leading-relaxed text-center md:text-left z-10 pt-4">
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
