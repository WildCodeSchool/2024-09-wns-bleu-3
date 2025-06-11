import { useState } from 'react';
import { useNavigate } from 'react-router';
import BaseScanForm from './BaseScanForm';
import { ScanFormSubmissionData } from '../schema/ScanFormSchema';

/**
 * Public scan form component for unauthenticated users.
 * Shows only URL field and navigates to preview page on submission.
 * Uses dark theme styling for homepage integration.
 */
const PublicScanForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission by navigating to preview page
    const handleSubmit = async (data: ScanFormSubmissionData): Promise<void> => {
        try {
            setIsLoading(true);

            // Navigate to preview page with URL as query parameter
            const encodedUrl = encodeURIComponent(data.url);
            navigate(`/scan/preview?url=${encodedUrl}`);

            // Reset loading state after navigation
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // Re-throw error to be handled by BaseScanForm
            throw error;
        }
    };

    return (
        <BaseScanForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            showTitle={false}
            showTags={false}
            showFrequency={false}
            variant="dark"
            submitButtonText="Scan Your Website"
            loadingText="Checking..."
        />
    );
};

export default PublicScanForm; 