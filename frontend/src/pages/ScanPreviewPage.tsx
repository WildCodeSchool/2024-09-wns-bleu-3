import React from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Globe,
    Clock,
    Shield,
    Activity,
    AlertCircle,
    CheckCircle,
    XCircle,
    ArrowLeft,
    RefreshCw,
    LogIn
} from 'lucide-react';
import { usePreviewScanQuery } from '../generated/graphql-types';
import { toast } from 'sonner';

/**
 * Scan Preview Page component for displaying scan results from URL parameters.
 * Shows scan data without requiring authentication, with option to login to save.
 * Handles URL parameter extraction, loading states, and error recovery.
 */
const ScanPreviewPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Extract and decode URL from search parameters
    const urlParam = searchParams.get('url');
    const decodedUrl = urlParam ? decodeURIComponent(urlParam) : '';

    // GraphQL query to fetch scan preview data
    const { data, loading, error, refetch } = usePreviewScanQuery({
        variables: { url: decodedUrl },
        skip: !decodedUrl, // Skip query if no URL provided
        errorPolicy: 'all', // Show partial data even with errors
        onError: (error) => {
            toast.error('Failed to scan URL', {
                description: error.message
            });
        }
    });

    // Handle missing or empty URL parameter
    if (!urlParam || !decodedUrl) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-5 w-5" />
                            No URL Provided
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">
                            Please provide a URL to scan in the query parameters.
                        </p>
                        <Button
                            onClick={() => navigate('/')}
                            className="w-full"
                            aria-label="Go back to homepage"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Homepage
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Handle loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 animate-spin" />
                            Scanning URL...
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Analyzing: <span className="font-mono text-sm">{decodedUrl}</span>
                            </p>
                            <div
                                className="w-full bg-gray-200 rounded-full h-2"
                                role="progressbar"
                                aria-label="Scanning progress"
                            >
                                <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Handle error state
    if (error && !data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-5 w-5" />
                            Error Scanning URL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {error.message}
                            </AlertDescription>
                        </Alert>
                        <p className="text-gray-600">
                            Failed to scan: <span className="font-mono text-sm">{decodedUrl}</span>
                        </p>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => refetch()}
                                variant="outline"
                                aria-label="Retry scanning the URL"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Button
                                onClick={() => navigate('/')}
                                variant="outline"
                                aria-label="Go back to homepage"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Homepage
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Handle successful scan results
    const scanData = data?.previewScan;
    if (!scanData) {
        return null;
    }

    // Determine status color and icon based on scan results
    const isOnline = scanData.isOnline;
    const statusColor = isOnline ? 'text-green-600' : 'text-red-600';
    const StatusIcon = isOnline ? CheckCircle : XCircle;

    // Handle login navigation with return URL
    const handleLoginClick = () => {
        const currentUrl = `/scan/preview?url=${encodeURIComponent(decodedUrl)}`;
        const loginUrl = `/login?returnUrl=${encodeURIComponent(currentUrl)}`;
        navigate(loginUrl);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        size="sm"
                        aria-label="Go back to homepage"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">Scan Preview</h1>
                </div>

                {/* Scan Results Card */}
                <Card
                    role="article"
                    aria-label="Scan preview results"
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Scan Results
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* URL Display */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">URL</h3>
                            <p className="font-mono text-sm bg-gray-100 p-2 rounded border break-all">
                                {scanData.url}
                            </p>
                        </div>

                        {/* Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Online Status */}
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                </div>
                                <div className={`flex items-center gap-2 ${statusColor}`}>
                                    <StatusIcon className="h-5 w-5" />
                                    <span className="font-semibold">
                                        {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>

                            {/* Status Code */}
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-500">Status Code</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-gray-900">{scanData.statusCode}</p>
                                    <p className="text-sm text-gray-600">{scanData.statusMessage}</p>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-500">Response Time</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{scanData.responseTime}ms</p>
                            </div>

                            {/* SSL Certificate */}
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-500">SSL Certificate</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{scanData.sslCertificate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Login Prompt Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Login to Save This Scan
                                </h3>
                                <p className="text-gray-600">
                                    Create an account or log in to save this scan, set up monitoring,
                                    and receive alerts when your website status changes.
                                </p>
                            </div>
                            <Button
                                onClick={handleLoginClick}
                                className="ml-4"
                                aria-describedby="login-description"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login
                            </Button>
                        </div>
                        <p
                            id="login-description"
                            className="sr-only"
                        >
                            Click to login and save this scan for monitoring
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ScanPreviewPage; 