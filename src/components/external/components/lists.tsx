"use client";
import { ListItemProps, NormalListProps } from "@/types";
import React from "react";

const ListItem: React.FC<ListItemProps> = ({
	children,
	icon,
	className = "",
	iconClassName = "",
	contentClassName = "",
	aosDelay,
	customIcon,
	nestedList,
}) => {
	return (
		<li
			className={`flex flex-col items-start gap-2 mb-2 ${className}`}
			data-aos-delay={aosDelay}
		>
			<div className="flex items-start w-full gap-2">
				{customIcon ? (
					<span className={`flex-shrink-0 ${iconClassName}`}>{customIcon}</span>
				) : icon ? (
					<span className={`flex-shrink-0 ${iconClassName}`}>{icon}</span>
				) : null}
				<span className={`flex-1 ${contentClassName}`}>{children}</span>
			</div>
			{nestedList && (
				<div className="w-full pl-4">
					<NormalList
						{...nestedList}
						listClassName={`ml-4 ${nestedList.listClassName || ""}`}
					/>
				</div>
			)}
		</li>
	);
};

const NormalList: React.FC<NormalListProps> = ({
	items,
	listType = "ul",
	listClassName = "",
	itemClassName = "",
	iconClassName = "",
	contentClassName = "",
	bulletColor = "#3B82F6",
	bulletSize = "6px",
	bulletStyle = "circle",
	customIcon,
	aosDelay = "0",
	aosDelayIncrement = 100,
	hideBullets = false,
}) => {
	const getBulletStyle = () => {
		if (hideBullets || bulletStyle === "custom" || customIcon) {
			return { listStyle: "none" };
		}

		if (bulletStyle === "none") {
			return { listStyle: "none" };
		}

		return {
			listStyle: "none",
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const renderCustomBullet = (index: number) => {
		if (customIcon) {
			return customIcon;
		}

		if (hideBullets) {
			return null;
		}

		if (bulletStyle === "circle") {
			return (
				<div
					style={{
						width: bulletSize,
						height: bulletSize,
						backgroundColor: bulletColor,
						borderRadius: "50%",
						marginTop: "8px",
					}}
				/>
			);
		}

		if (bulletStyle === "disc") {
			return (
				<div
					style={{
						width: bulletSize,
						height: bulletSize,
						backgroundColor: bulletColor,
						borderRadius: "50%",
						border: `1px solid ${bulletColor}`,
						marginTop: "8px",
					}}
				/>
			);
		}

		if (bulletStyle === "square") {
			return (
				<div
					style={{
						width: bulletSize,
						height: bulletSize,
						backgroundColor: bulletColor,
						marginTop: "8px",
					}}
				/>
			);
		}

		return null;
	};

	const getDelay = (index: number) => {
		if (typeof aosDelay === "function") {
			return aosDelay(index);
		}

		if (aosDelayIncrement) {
			return (parseInt(aosDelay) + index * aosDelayIncrement).toString();
		}

		return aosDelay;
	};

	const ListTag = listType === "ol" ? "ol" : "ul";

	return (
		<ListTag
			className={`${listClassName}`}
			style={getBulletStyle()}
		>
			{items.map((item, index) => {
				// Handle string items
				if (typeof item === "string") {
					return (
						<ListItem
							key={index}
							className={itemClassName}
							customIcon={renderCustomBullet(index)}
							iconClassName={iconClassName}
							contentClassName={contentClassName}
							aosDelay={getDelay(index)}
						>
							{item}
						</ListItem>
					);
				}

				// Handle complex item objects
				return (
					<ListItem
						key={index}
						className={`${itemClassName} ${item.className || ""}`}
						customIcon={item.customIcon || renderCustomBullet(index)}
						iconClassName={`${iconClassName} ${item.iconClassName || ""}`}
						contentClassName={`${contentClassName} ${
							item.contentClassName || ""
						}`}
						aosDelay={item.aosDelay || getDelay(index)}
						nestedList={item.children}
					>
						{typeof item === "object" ? item.text : item}
					</ListItem>
				);
			})}
		</ListTag>
	);
};

export default NormalList;
