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
 * Uses dark cyberpunk theme styling for dashboard integration.
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
            <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white font-bold">ADD NEW SCAN</h2>
                    <div className="bg-blue-500/20 border border-blue-400/30 text-blue-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                        LOADING
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center py-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
                        <span className="text-slate-200 text-sm">
                            {tagsLoading && frequenciesLoading
                                ? "Loading form data..."
                                : tagsLoading
                                    ? "Loading tags..."
                                    : "Loading frequencies..."
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold">ADD NEW SCAN</h2>
                <div className="bg-blue-500/20 border border-blue-400/30 text-blue-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    QUICK SETUP
                </div>
            </div>

            <div className="flex-1">
                <BaseScanForm
                    onSubmit={handleSubmit}
                    isLoading={isFormLoading}
                    showTitle={true}
                    showTags={true}
                    showFrequency={true}
                    variant="dark"
                    submitButtonText="Create Scan"
                    loadingText="Creating..."
                    availableTags={availableTags}
                    availableFrequencies={availableFrequencies}
                    defaultFrequencyId={defaultFrequency?.id}
                    fullContainer={true}
                    className=""
                />
            </div>
        </div>
    );
};

export default AuthScanForm; 