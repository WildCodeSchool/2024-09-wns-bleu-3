import { ScanItem } from "@/components/scan-history/types";
import { useGetAllScansByUserIdQuery } from "@/generated/graphql-types";
import { ReactNode, useState } from "react";
import { ScansContext } from "./ScansContext";
import { ScansContextType } from "../@types/scanContext";
import { useAuth } from "@/hooks/useAuth";

const ScansProvider = ({ children }: { children: ReactNode }) => {
    // TODO: ajouter fetchMore et aussi fetch policy (cache)
    const [resolvedIssues, setResolvedIssues] = useState<string[]>([])
    const { isLoggedIn, loading: authLoading } = useAuth();

    const { data, loading, error, refetch, fetchMore } = useGetAllScansByUserIdQuery({
        variables: { data: { limit: 5, offset: 0 } },
        fetchPolicy: 'cache-and-network',
        skip: !isLoggedIn || authLoading, // Only execute when user is authenticated
    })

    const scans: ScanItem[] = (data?.getAllScansByUserId.scans ?? []).map(scan => ({
        ...scan,
        id: scan.id,
        responseTime: scan.responseTime, // Keep as number for calculations
        createdAt: scan.createdAt.toString(),
        updatedAt: scan.updatedAt.toString(),
        lastScannedAt: scan.lastScannedAt?.toString() ?? '',
    }));
    const totalScans = data?.getAllScansByUserId.total || 0

    const hasMore = data?.getAllScansByUserId.hasMore || false
    const page = data?.getAllScansByUserId.page || 1
    const limit = data?.getAllScansByUserId.limit || 10

    const allIssues = data?.getAllScansByUserId.issues ?? []
    const activeIssues = allIssues.filter(issue => !resolvedIssues.includes(issue.id))

    const activeIssueCount = activeIssues.length
    const activeScans = data?.getAllScansByUserId.activeScans || 0


    const loadMore = async () => {
        if (!hasMore) return;

        try {
            await fetchMore({
                variables: {
                    data: {
                        limit,
                        offset: scans.length,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    const mergedScans = [
                        ...prev.getAllScansByUserId.scans,
                        ...fetchMoreResult.getAllScansByUserId.scans,
                    ];

                    return {
                        getAllScansByUserId: {
                            ...fetchMoreResult.getAllScansByUserId,
                            scans: mergedScans,
                            hasMore: fetchMoreResult.getAllScansByUserId.hasMore,
                            issues: [...prev.getAllScansByUserId.issues, ...fetchMoreResult.getAllScansByUserId.issues],
                        },
                    };
                }
            });

        } catch (error) {
            console.error("Error loading more scans:", error);
        }
    };


    const contextValue: ScansContextType = {
        scans,
        totalScans,
        loading: loading || authLoading, // Include auth loading state
        error,
        refetch,
        hasMore,
        page,
        limit,
        activeIssues,
        activeIssueCount,
        resolvedIssues,
        setResolvedIssues,
        activeScans,
        loadMore,
    };

    return (
        <ScansContext.Provider value={contextValue}>
            {children}
        </ScansContext.Provider >
    )
}

export default ScansProvider;