import { z } from "zod";

export const subcategorySchema = z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(50),
});