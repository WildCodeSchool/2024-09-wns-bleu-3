import {z} from 'zod';

// Schéma de validation
export const scanFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(30, "Title is too long"),
    url: z.string().url("Enter a valid URL"),
    frequencyId: z.string().min(1, "Enter a valid frequency"),
    unit: z.enum(["minutes", "hours", "days"]),
    tagIds: z.array(z.number()).optional()
});

export const TagSchema = z.object({
    id: z.number(),
    name: z.string()
});

export const FrequencySchema = z.object({
    id: z.number(),
    name: z.string()
});

export type Tag = z.infer<typeof TagSchema>;
export type Frequency = z.infer<typeof FrequencySchema>;