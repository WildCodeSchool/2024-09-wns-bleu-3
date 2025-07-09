import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import {
    BaseScanFormProps,
    ScanFormSubmissionData,
    baseScanFormSchema,
    fullScanFormSchema,
    getDefaultFormValues,
    validateScanForm
} from "@/schema/ScanFormSchema";

/**
 * BaseScanForm - Reusable form component for scan creation
 * 
 * This component provides the foundation for both public (URL-only) and 
 * authenticated (full form) scan creation variants. It handles:
 * - Form validation using Zod schemas
 * - Conditional field rendering based on props
 * - Theme support (light/dark variants)
 * - Loading states and error handling
 * - Inline tag creation functionality
 * 
 * @param props - BaseScanFormProps interface
 */
function BaseScanForm({
    onSubmit,
    isLoading,
    submitButtonText,
    loadingText = "Loading...",
    showTitle = false,
    showTags = false,
    showFrequency = false,
    availableTags = [],
    availableFrequencies = [],
    defaultFrequencyId,
    className,
    variant = 'dark',
    fullContainer = false
}: BaseScanFormProps) {

    // Choose validation schema based on which fields are shown
    const validationSchema = showTitle || showTags || showFrequency
        ? fullScanFormSchema
        : baseScanFormSchema;

    // Initialize form with react-hook-form and Zod validation
    const form = useForm<ScanFormSubmissionData>({
        resolver: zodResolver(validationSchema),
        defaultValues: getDefaultFormValues(defaultFrequencyId)
    });

    // Handle form submission with enhanced validation
    const handleSubmit = async (data: ScanFormSubmissionData) => {
        try {
            // Clean up data - only include fields that are actually shown
            const cleanedData: ScanFormSubmissionData = {
                url: data.url.trim(), // Trim whitespace from URL
                ...(showTitle && data.title && { title: data.title.trim() }),
                ...(showTags && data.tagIds && data.tagIds.length > 0 && { tagIds: data.tagIds }),
                ...(showFrequency && data.frequencyId && { frequencyId: data.frequencyId })
            };

            // Additional client-side validation before submission
            const validationResult = validateScanForm(cleanedData, {
                requireTitle: showTitle,
                requireTags: false, // Tags are always optional
                requireFrequency: false // Frequency is always optional
            });

            if (!validationResult.isValid) {
                // Set form errors for any validation failures
                Object.entries(validationResult.errors).forEach(([field, message]) => {
                    form.setError(field as keyof ScanFormSubmissionData, {
                        type: 'manual',
                        message: message as string
                    });
                });
                return;
            }

            await onSubmit(cleanedData);

            // Reset form after successful submission
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);

            // Handle specific error types
            if (error instanceof Error) {
                // Check for network errors
                if (error.message.includes('fetch') || error.message.includes('network')) {
                    form.setError('url', {
                        type: 'manual',
                        message: 'Network error. Please check your connection and try again.'
                    });
                } else if (error.message.includes('timeout')) {
                    form.setError('url', {
                        type: 'manual',
                        message: 'Request timed out. The URL might be slow to respond.'
                    });
                } else {
                    // Generic error handling
                    form.setError('root', {
                        type: 'manual',
                        message: error.message || 'An unexpected error occurred. Please try again.'
                    });
                }
            }
        }
    };

    // Theme-based styling
    const isDark = variant === 'dark';
    const containerClasses = cn(
        fullContainer
            ? "w-full h-full flex flex-col"
            : "max-w-md mx-auto rounded-xl shadow-lg border p-6",
        !fullContainer && isDark
            ? "bg-[#0a2540] border-[#0c2d4d]"
            : !fullContainer
                ? "bg-white border-gray-200"
                : "",
        className
    );

    const inputClasses = cn(
        "mt-1",
        isDark
            ? "bg-[#0c2d4d] border-[#0e3359] text-white"
            : "bg-white border-gray-300 text-gray-900"
    );

    const labelClasses = cn(
        "text-sm font-medium",
        isDark ? "text-gray-300" : "text-gray-700"
    );

    const titleClasses = cn(
        "text-xl font-semibold mb-4",
        isDark ? "text-white" : "text-gray-900"
    );

    return (
        <div className={containerClasses} data-testid="base-scan-form">
            <h2 className={titleClasses}>
                {showTitle ? "Create New Scan" : "Quick URL Check"}
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-4", fullContainer && "flex-1 flex flex-col", className)} role="form">

                    {/* Display root form errors */}
                    {form.formState.errors.root && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200">
                            <p className="text-sm text-red-600">
                                {form.formState.errors.root.message}
                            </p>
                        </div>
                    )}

                    {/* Title field - only shown for authenticated users */}
                    {showTitle && (
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="My Website Monitor"
                                            className={inputClasses}
                                            aria-label="Title"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* URL field - always present */}
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClasses}>URL to scan</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="https://example.com"
                                        className={inputClasses}
                                        aria-label="URL to scan"
                                        type="url"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Frequency selector - only shown for authenticated users */}
                    {showFrequency && (
                        <FormField
                            control={form.control}
                            name="frequencyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}>Frequency</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString() || ""}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger
                                            className={inputClasses}
                                            aria-label="Select frequency"
                                        >
                                            <SelectValue placeholder="Select scan frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableFrequencies.map((frequency) => (
                                                <SelectItem
                                                    key={frequency.id}
                                                    value={frequency.id.toString()}
                                                >
                                                    {frequency.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Tags selector with inline creation - only shown for authenticated users */}
                    {showTags && (
                        <FormField
                            control={form.control}
                            name="tagIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={labelClasses}>Tags</FormLabel>

                                    <Select
                                        onValueChange={(value) => field.onChange([parseInt(value)])}
                                        value={field.value?.length ? field.value[0].toString() : ""}
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger
                                            className={inputClasses}
                                            aria-label="Select tags"
                                        >
                                            <SelectValue placeholder="Select a tag" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableTags.map((tag) => (
                                                <SelectItem
                                                    key={tag.id}
                                                    value={tag.id.toString()}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: tag.color }}
                                                        />
                                                        {tag.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {/* Submit button with loading state */}
                    <div className={fullContainer ? "mt-auto pt-4" : ""}>
                        <Button
                            type="submit"
                            variant={isDark ? "lightBlue" : "blue"}
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    {loadingText}
                                </>
                            ) : (
                                submitButtonText
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default BaseScanForm;