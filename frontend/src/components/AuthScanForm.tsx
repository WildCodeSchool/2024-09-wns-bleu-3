import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import BaseScanForm from './BaseScanForm';
import { ScanFormSubmissionData } from '../schema/ScanFormSchema';
import {
    useCreateNewScanMutation,
    useGetAllTagsQuery,
    useGetAllFrequencesQuery
} from '../generated/graphql-types';

/**
 * Authenticated scan form component for logged-in users.
 * Shows all fields: title, URL, tags, and frequency selection.
 * Uses light theme styling for dashboard integration.
 * Submits data to GraphQL API and navigates to dashboard on success.
 */
const AuthScanForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // GraphQL hooks for data fetching
    const { data: tagsData, loading: tagsLoading } = useGetAllTagsQuery();
    const { data: frequenciesData, loading: frequenciesLoading } = useGetAllFrequencesQuery();
    const [createNewScan, { loading: mutationLoading }] = useCreateNewScanMutation();

    // Handle form submission by creating a new scan via GraphQL
    const handleSubmit = async (data: ScanFormSubmissionData): Promise<void> => {
        try {
            setIsLoading(true);

            // Prepare the mutation variables
            const variables = {
                data: {
                    title: data.title!,
                    url: data.url,
                    ...(data.tagIds && data.tagIds.length > 0 && { tagIds: data.tagIds }),
                    ...(data.frequencyId && { frequencyId: data.frequencyId }),
                }
            };

            // Execute the GraphQL mutation
            const result = await createNewScan({ variables });

            if (result.data?.createNewScan) {
                // Show success message
                toast.success(`Scan "${result.data.createNewScan.title}" created successfully!`);

                // Navigate to dashboard
                navigate('/dashboard');
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating scan:', error);

            // Show error message
            const errorMessage = error instanceof Error ? error.message : 'Failed to create scan';
            toast.error(errorMessage);

            // Re-throw error to be handled by BaseScanForm
            throw error;
        }
    };

    // Determine loading state (either local state or mutation loading)
    const isFormLoading = isLoading || mutationLoading;

    // Extract data from GraphQL queries
    const availableTags = tagsData?.getAllTags || [];
    const availableFrequencies = frequenciesData?.getAllFrequences || [];

    // Find default frequency (60 minutes) for preselection
    const defaultFrequency = availableFrequencies.find(freq => freq.intervalMinutes === 60);

    // Show loading if data is still being fetched
    if (tagsLoading || frequenciesLoading) {
        return (
            <div className="w-full h-full flex flex-col" data-testid="base-scan-form">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Create New Scan</h2>
                <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="text-gray-600">
                            {tagsLoading && frequenciesLoading
                                ? "Loading form data..."
                                : tagsLoading
                                    ? "Loading tags..."
                                    : "Loading frequencies..."
                            }
                        </span>
                    </div>
                    {/* Show skeleton form fields */}
                    <div className="space-y-3 flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="mt-auto pt-4">
                        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <BaseScanForm
            onSubmit={handleSubmit}
            isLoading={isFormLoading}
            showTitle={true}
            showTags={true}
            showFrequency={true}
            variant="light"
            submitButtonText="Create Scan"
            loadingText="Creating..."
            availableTags={availableTags}
            availableFrequencies={availableFrequencies}
            defaultFrequencyId={defaultFrequency?.id}
            fullContainer={true}
        />
    );
};

export default AuthScanForm; 