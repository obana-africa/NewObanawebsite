/* eslint-disable @typescript-eslint/no-unused-expressions */ 
"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, X, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import type { SourcingCategory, SelectedCategoryItem } from "@/types";
import { useSourcingCategories } from "@/hooks/use-sourcing";
import { uploadToCloudinary } from "@/utils/upload";

interface Props {
	selected: SelectedCategoryItem[];
	onChange: (items: SelectedCategoryItem[]) => void;
}

const CategoryChecklist: React.FC<Props> = ({ selected, onChange }) => {
	const { data } = useSourcingCategories();
	const grouped = data?.grouped || [];
	const [expanded, setExpanded] = useState<Set<string>>(new Set());

	const toggleSection = (section: string) => {
		const next = new Set(expanded);
		next.has(section) ? next.delete(section) : next.add(section);
		setExpanded(next);
	};

	const isSelected = (id: number) => selected.some((c) => c.id === id);

	const toggleCategory = (cat: SourcingCategory) => {
		if (isSelected(cat.id)) {
			onChange(selected.filter((c) => c.id !== cat.id));
		} else {
			onChange([
				...selected,
				{
					id: cat.id,
					name: cat.name,
					slug: cat.slug,
					section: cat.section,
					min_budget: Number(cat.min_budget) || 0,
					max_budget: Number(cat.max_budget) || 0,
					budget_amount: 0,
					images: [],
				},
			]);
		}
	};

	const handleImageUpload = async (
		catId: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = e.target.files;
		if (!files) return;

		const validFiles = Array.from(files).filter((f) => {
			if (f.size > 2 * 1024 * 1024) {
				toast.error(`${f.name} exceeds 2MB`);
				return false;
			}
			if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type)) {
				toast.error(`${f.name} must be JPEG/JPG/PNG`);
				return false;
			}
			return true;
		});

		if (validFiles.length === 0) return;

		toast.loading("Uploading...", { id: `upload-${catId}` });
		try {
			const urls = await Promise.all(
				validFiles.map((f) => uploadToCloudinary(f))
			);
			onChange(
				selected.map((c) =>
					c.id === catId ? { ...c, images: [...c.images, ...urls] } : c
				)
			);
			toast.success("Uploaded", { id: `upload-${catId}` });
		} catch {
			toast.error("Upload failed", { id: `upload-${catId}` });
		}
		// reset input so same file can be re-picked
		e.target.value = "";
	};

	const removeImage = (catId: number, idx: number) => {
		onChange(
			selected.map((c) =>
				c.id === catId
					? { ...c, images: c.images.filter((_, i) => i !== idx) }
					: c
			)
		);
	};

	return (
		<div
			className="rounded-lg overflow-hidden"
			style={{ background: "#FFF8E7", border: "1px solid #FFDE76" }}
		>
			<div className="px-3 py-2 text-[11px] text-gray-500 border-b border-[#FFDE76]/60">
				Select more categories
			</div>

			{grouped.map((sec) => {
				const isOpen = expanded.has(sec.section);
				const sectionSelected = selected.filter(
					(c) => c.section === sec.section
				);

				return (
					<div
						key={sec.section}
						className="border-b border-[#FFDE76]/60 last:border-b-0"
					>
						<button
							type="button"
							onClick={() => toggleSection(sec.section)}
							className="w-full px-3 py-[7px] flex items-center justify-between hover:bg-white/40 transition-colors"
						>
							<div className="flex items-center gap-2">
								<span className="text-[11px] font-semibold text-[#1B3B5F]">
									{sec.section}
								</span>
								{sectionSelected.length > 0 && (
									<span className="text-[10px] text-[#1B3B5F]/90">
										({sectionSelected.length} selected)
									</span>
								)}
							</div>
							{isOpen ? (
								<ChevronDown className="h-3 w-3 text-[#1B3B5F]" />
							) : (
								<ChevronRight className="h-3 w-3 text-[#1B3B5F]" />
							)}
						</button>

						{isOpen && (
							<div className="px-3 pb-3 pt-1 space-y-2 bg-white/30">
								{sec.items.map((cat) => {
									const sel = selected.find((s) => s.id === cat.id);
									const checked = !!sel;
									return (
										<div key={cat.id}>
											<label className="flex items-center gap-2 cursor-pointer py-1">
												<input
													type="checkbox"
													checked={checked}
													onChange={() => toggleCategory(cat)}
													className="w-3.5 h-3.5 rounded border-[#1B3B5F]/40 text-[#1B3B5F] focus:ring-[#1B3B5F]"
												/>
												<span className="text-[12px] text-[#1B3B5F]">
													{cat.name}
												</span>
											</label>

											{checked && sel && (
												<div className="ml-6 mt-1 mb-2">
													{sel.images.length > 0 && (
														<div className="flex flex-wrap gap-1.5 mb-1.5">
															{sel.images.map((url, i) => (
																<div
																	key={i}
																	className="relative w-12 h-12 rounded-md overflow-hidden border border-[#1B3B5F]/15 bg-white group"
																>
																	{/* eslint-disable-next-line @next/next/no-img-element */}
																	<img
																		src={url}
																		alt=""
																		className="w-full h-full object-cover"
																	/>
																	<button
																		type="button"
																		onClick={() => removeImage(cat.id, i)}
																		className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-md p-0.5 opacity-0 group-hover:opacity-100"
																	>
																		<X className="h-2.5 w-2.5" />
																	</button>
																</div>
															))}
														</div>
													)}
													<label className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1B3B5F] cursor-pointer hover:underline">
														<ImagePlus className="h-3 w-3" />
														Click to upload reference images
														<input
															type="file"
															multiple
															accept="image/jpeg,image/jpg,image/png"
															className="hidden"
															onChange={(e) => handleImageUpload(cat.id, e)}
														/>
													</label>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default CategoryChecklist;
