import React from "react";
import { Mail, Send, ChevronRight, Menu } from "lucide-react";
import Button from "@/components/ui/button";

const ButtonExamples = () => {
	return (
		<div className="space-y-6 p-8">
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Primary Buttons (with Ripple)</h2>
				<Button
					variant="primary"
					animation="ripple"
					className="bg-white !text-black"
				>
					Click Me
				</Button>
				<div className="flex flex-wrap gap-4">
					<Button variant="primary" animation="ripple">
						Primary Button
					</Button>
					<Button variant="primary" animation="ripple" icon={<Mail />}>
						With Left Icon
					</Button>
					<Button
						variant="primary"
						animation="ripple"
						icon={<ChevronRight />}
						iconPosition="right"
					>
						With Right Icon
					</Button>
					<Button variant="primary" animation="ripple" isLoading>
						Loading
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Secondary Buttons</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="secondary">Secondary Button</Button>
					<Button variant="secondary" icon={<Mail />}>
						With Icon
					</Button>
					<Button variant="secondary" isLoading>
						Loading
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Outline Buttons</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="outline">Outline Button</Button>
					<Button variant="outline" icon={<Send />}>
						With Icon
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Text Buttons</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="text">Text Button</Button>
					<Button variant="text" icon={<ChevronRight />} iconPosition="right">
						With Icon
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Icon Only Buttons</h2>
				<div className="flex flex-wrap gap-4">
					<Button variant="icon" icon={<Menu />} aria-label="Menu" />
					<Button variant="icon" icon={<Mail />} aria-label="Mail" />
					<Button variant="primary" icon={<Send />} aria-label="Send" />
					<Button
						variant="secondary"
						icon={<ChevronRight />}
						aria-label="Next"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Size Variations</h2>
				<div className="flex items-center flex-wrap gap-4">
					<Button variant="primary" size="xs">
						Extra Small
					</Button>
					<Button variant="primary" size="sm" className="hover:bg-white">
						Small
					</Button>
					<Button variant="primary" size="md">
						Medium
					</Button>
					<Button variant="primary" size="lg">
						Large
					</Button>
					<Button variant="primary" size="xl">
						Extra Large
					</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">Full Width Button</h2>
				<Button variant="primary" fullWidth>
					Full Width Button
				</Button>
			</div>
		</div>
	);
};

export default ButtonExamples;
