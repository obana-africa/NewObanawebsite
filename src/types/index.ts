import { emailSchema } from "@/schemas";
import { z } from "zod";

export type EmailFormData = z.infer<typeof emailSchema>;
