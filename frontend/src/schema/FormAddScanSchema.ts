import {z} from 'zod';

// Schéma de validation
export const scanFormSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    url: z.string().url("Veuillez entrer une URL valide"),
    frequencyId: z.string().min(1, "Veuillez entrer une fréquence"),
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