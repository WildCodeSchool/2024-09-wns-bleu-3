import { z } from 'zod';

// Base schema for URL validation (used by both form variants)
export const baseScanFormSchema = z.object({
    url: z.string().url("Enter a valid URL"),
});

// Extended schema for authenticated users (includes all fields)
export const fullScanFormSchema = baseScanFormSchema.extend({
    title: z.string().min(1, "Title is required").max(50, "Title must be 50 characters or less"),
    tagIds: z.array(z.number()).optional(),
    frequencyId: z.number().optional(),
});

// Schema for public form (URL only)
export const publicScanFormSchema = baseScanFormSchema;

// Schema for authenticated form (all fields)
export const authScanFormSchema = fullScanFormSchema;

// Type definitions for form data
export type BaseScanFormData = z.infer<typeof baseScanFormSchema>;
export type PublicScanFormData = z.infer<typeof publicScanFormSchema>;
export type AuthScanFormData = z.infer<typeof authScanFormSchema>;
export type FullScanFormData = z.infer<typeof fullScanFormSchema>;

// Type definitions for tags and frequencies (reused from existing schema)
export const TagSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
});

export const FrequencySchema = z.object({
    id: z.number(),
    name: z.string(),
    intervalMinutes: z.number(),
});

export type Tag = z.infer<typeof TagSchema>;
export type Frequency = z.infer<typeof FrequencySchema>;

// Form submission data interface for BaseScanForm component
export interface ScanFormSubmissionData {
    url: string;
    title?: string;
    tagIds?: number[];
    frequencyId?: number;
}

// Props interface for form components
export interface BaseScanFormProps {
    onSubmit: (data: ScanFormSubmissionData) => void | Promise<void>;
    isLoading: boolean;
    submitButtonText: string;
    loadingText?: string;
    showTitle?: boolean;
    showTags?: boolean;
    showFrequency?: boolean;
    availableTags?: Tag[];
    availableFrequencies?: Frequency[];
    className?: string;
    variant?: 'light' | 'dark'; // For theme support (homepage vs dashboard)
}

// Validation helper functions
export const validateUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validateTitle = (title: string): boolean => {
    return title.length > 0 && title.length <= 50;
};

// Default values for form fields
export const defaultFormValues = {
    url: "",
    title: "",
    tagIds: [] as number[],
    frequencyId: undefined as number | undefined,
}; 