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

    // Show loading if data is still being fetched
    if (tagsLoading || frequenciesLoading) {
        return (
            <div className="max-w-md mx-auto rounded-xl shadow-lg border p-6 bg-white border-gray-200" data-testid="base-scan-form">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Create New Scan</h2>
                <div className="space-y-4">
                    <div>Loading tags...</div>
                    <div>Loading frequencies...</div>
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
        />
    );
};

export default AuthScanForm; 