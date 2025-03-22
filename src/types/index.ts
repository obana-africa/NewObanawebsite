import { emailSchema } from "@/schemas";
import { ReactNode } from "react";
import { z } from "zod";

export type EmailFormData = z.infer<typeof emailSchema>;


export interface ListItemProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  contentClassName?: string;
  aosAnimation?: string;
  aosDuration?: string;
  aosDelay?: string;
  customIcon?: ReactNode;
}

export interface NormalListProps {
  items: (string | ListItemProps)[];
  listType?: "ul" | "ol";
  listClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  bulletColor?: string;
  bulletSize?: string;
  bulletStyle?: "circle" | "disc" | "square" | "none" | "custom";
  customIcon?: ReactNode;
  aosAnimation?: string;
  aosDuration?: string;
  aosDelay?: string | ((index: number) => string);
  aosDelayIncrement?: number;
}