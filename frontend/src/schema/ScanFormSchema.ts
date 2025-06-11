import { z } from 'zod';

// Custom URL validation with more specific error messages
const urlValidation = z.string()
    .min(1, "URL is required")
    .refine((url) => {
        try {
            const parsedUrl = new URL(url);
            // Check for valid protocols
            return ['http:', 'https:'].includes(parsedUrl.protocol);
        } catch {
            return false;
        }
    }, "Please enter a valid HTTP or HTTPS URL")
    .refine((url) => {
        try {
            const parsedUrl = new URL(url);
            // Check for valid hostname (not just localhost or IP for production)
            return parsedUrl.hostname.length > 0;
        } catch {
            return false;
        }
    }, "URL must have a valid hostname");

// Title validation with more specific rules
const titleValidation = z.string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less")
    .refine((title) => title.trim().length > 0, "Title cannot be empty or just spaces")
    .refine((title) => !/^\s/.test(title) && !/\s$/.test(title), "Title cannot start or end with spaces");

// Tag validation
const tagIdsValidation = z.array(z.number().positive("Invalid tag ID"))
    .max(5, "You can select up to 5 tags")
    .optional();

// Frequency validation
const frequencyIdValidation = z.number()
    .positive("Please select a valid frequency")
    .optional();

// Base schema for URL validation (used by both form variants)
export const baseScanFormSchema = z.object({
    url: urlValidation,
});

// Extended schema for authenticated users (includes all fields)
export const fullScanFormSchema = baseScanFormSchema.extend({
    title: titleValidation,
    tagIds: tagIdsValidation,
    frequencyId: frequencyIdValidation,
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

// Validation helper functions with detailed error messages
export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
    if (!url || url.trim().length === 0) {
        return { isValid: false, error: "URL is required" };
    }

    try {
        const parsedUrl = new URL(url.trim());
        
        // Check for valid protocols
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            return { isValid: false, error: "URL must use HTTP or HTTPS protocol" };
        }

        // Check for valid hostname
        if (!parsedUrl.hostname || parsedUrl.hostname.length === 0) {
            return { isValid: false, error: "URL must have a valid hostname" };
        }

        // Check for common invalid patterns
        if (parsedUrl.hostname === 'localhost' && process.env.NODE_ENV === 'production') {
            return { isValid: false, error: "Localhost URLs are not allowed in production" };
        }

        return { isValid: true };
    } catch {
        return { isValid: false, error: "Please enter a valid URL" };
    }
};

export const validateTitle = (title: string): { isValid: boolean; error?: string } => {
    if (!title || title.trim().length === 0) {
        return { isValid: false, error: "Title is required" };
    }

    if (title.length > 50) {
        return { isValid: false, error: "Title must be 50 characters or less" };
    }

    if (title.trim() !== title) {
        return { isValid: false, error: "Title cannot start or end with spaces" };
    }

    return { isValid: true };
};

export const validateTags = (tagIds: number[]): { isValid: boolean; error?: string } => {
    if (!tagIds || tagIds.length === 0) {
        return { isValid: true }; // Tags are optional
    }

    if (tagIds.length > 5) {
        return { isValid: false, error: "You can select up to 5 tags" };
    }

    // Check for duplicate tags
    const uniqueTags = new Set(tagIds);
    if (uniqueTags.size !== tagIds.length) {
        return { isValid: false, error: "Duplicate tags are not allowed" };
    }

    // Check for valid tag IDs (positive numbers)
    if (tagIds.some(id => !Number.isInteger(id) || id <= 0)) {
        return { isValid: false, error: "Invalid tag selection" };
    }

    return { isValid: true };
};

export const validateFrequency = (frequencyId?: number): { isValid: boolean; error?: string } => {
    if (frequencyId === undefined || frequencyId === null) {
        return { isValid: true }; // Frequency is optional
    }

    if (!Number.isInteger(frequencyId) || frequencyId <= 0) {
        return { isValid: false, error: "Please select a valid frequency" };
    }

    return { isValid: true };
};

// Comprehensive form validation function
export const validateScanForm = (
    data: ScanFormSubmissionData,
    options: {
        requireTitle?: boolean;
        requireTags?: boolean;
        requireFrequency?: boolean;
    } = {}
): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // Validate URL (always required)
    const urlValidation = validateUrl(data.url);
    if (!urlValidation.isValid) {
        errors.url = urlValidation.error!;
    }

    // Validate title if required or provided
    if (options.requireTitle || data.title) {
        const titleValidation = validateTitle(data.title || '');
        if (!titleValidation.isValid) {
            errors.title = titleValidation.error!;
        }
    }

    // Validate tags if provided
    if (data.tagIds && data.tagIds.length > 0) {
        const tagsValidation = validateTags(data.tagIds);
        if (!tagsValidation.isValid) {
            errors.tagIds = tagsValidation.error!;
        }
    }

    // Validate frequency if provided
    if (data.frequencyId !== undefined) {
        const frequencyValidation = validateFrequency(data.frequencyId);
        if (!frequencyValidation.isValid) {
            errors.frequencyId = frequencyValidation.error!;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Default values for form fields
export const defaultFormValues = {
    url: "",
    title: "",
    tagIds: [] as number[],
    frequencyId: undefined as number | undefined,
}; 