import { useCallback, useMemo, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../ui/tabs";
import { useDashboardPage } from "@/hooks/useDashboardPage";
import { GetAllScansByUserIdQuery, Scan, useGetAllScansByUserIdQuery, useOnScanCreatedSubscription } from "@/generated/graphql-types";
import { useApolloClient } from "@apollo/client";
import { GET_DASHBOARD_USER_DATA } from "@/graphql/queries";
import { useScansContext } from "../../hooks/useScansContext";
import { useAuth } from "@/hooks/useAuth";
import useDebounce from "@/hooks/useDebounce";
import ScanList from "../ScanList";
import ScanListFilter from "../ScanListFilter";


// type ScanTabConfig = {
//     value: string;
//     label: string;
//     filter: (
//         scan: GetAllScansByUserIdQuery["getAllScansByUserId"]["scans"][number]
//     ) => boolean;
// };

export type IScan = GetAllScansByUserIdQuery["getAllScansByUserId"]["scans"][number];


const ScanListHistory = () => {
    const { refetch, loading, error, scans, loadMore, hasMore } = useScansContext();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { isLoggedIn, loading: authLoading } = useAuth()
    const [statusFilter, setStatusFilter] = useState("all");
    const { uniqueStatusCodes } = useDashboardPage(scans)

    const client = useApolloClient()

    useOnScanCreatedSubscription({
        onData: ({ data }) => {
            const newScan = data?.data?.newScan
            if (!newScan) return

            try {
                client.cache.updateQuery({ query: GET_DASHBOARD_USER_DATA }, (prev) => {
                    if (!prev?.getAllScansByUserId) return prev

                    const alreadyExists = prev.getAllScansByUserId.scans.some((scan: Scan) => scan.id === newScan.id)

                    if (alreadyExists) return prev

                    return {
                        getAllScansByUserId: {
                            ...prev.getAllScansByUserId,
                            scans: [newScan, ...prev.getAllScansByUserId.scans]
                        }
                    }
                })
            } catch (error) {
                console.warn('Failed to update cache with new scan:', error)
            }
        }
    })
    const debounceSearch = useDebounce(searchQuery, 600)


    const memoizedRefetch = useCallback(() => refetch(), [refetch]);
    const memoizedLoadMore = useCallback(() => loadMore(), [loadMore]);
    const memoizedSetSearchQuery = useCallback((value: string) => setSearchQuery(value), []);
    const memoizedSetStatusFilter = useCallback((value: string) => setStatusFilter(value), []);

    const memoizedUniqueStatusCodes = useMemo(() => uniqueStatusCodes, [uniqueStatusCodes]);
    const { data: DataSearch, loading: loadingSearch, error: errorSearch } = useGetAllScansByUserIdQuery({
        variables: { data: { limit: 100, offset: 0, search: debounceSearch } },
        fetchPolicy: 'cache-and-network',
        skip: !isLoggedIn || authLoading, // Only execute when user is authenticated
    })

    const displayedScans = useMemo(() => (searchQuery
        ? DataSearch?.getAllScansByUserId.scans ?? []
        : scans), [searchQuery, DataSearch, scans]);

    const scanTabs = useMemo(() => [
        { value: "all", label: "All Scans", filter: () => true },
        {
            value: "active",
            label: "Active",
            filter: (scan: IScan) => scan.statusCode === 200,
        },
        {
            value: "issues",
            label: "Issues",
            filter: (scan: IScan) => scan.statusCode !== 200,
        },
        {
            value: "favorites",
            label: "Favorites",
            filter: (scan) => scan.isFavorite,
        },
    ], []);


    const applyStatusFilter = useCallback((filtered: typeof scans) => {
        if (statusFilter === "all") return filtered;
        return filtered.filter(
            (scan) => scan.statusCode.toString() === statusFilter
        );
    }, [statusFilter]);

    const filteredTabs = useMemo(() => {
        return scanTabs.map((tab) => ({
            ...tab,
            filteredScans: applyStatusFilter(displayedScans.filter(tab.filter))
            // const filtered = displayedScans
            //     .filter(tab.filter)

            // const statusFiltered = applyStatusFilter(filtered);
        }))
    }, [scanTabs, displayedScans, applyStatusFilter]);




    if (error) return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
            <div className="text-center">
                <div className="text-red-400 mb-2 font-mono">◖ ERROR</div>
                <p className="text-slate-400 font-mono">{error.message}</p>
            </div>
        </div>
    );

    if (errorSearch) return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
            <div className="text-center">
                <div className="text-red-400 mb-2 font-mono">◖ ERROR</div>
                <p className="text-slate-400 font-mono">No scan detected with {searchQuery}.</p>
            </div>
        </div>
    )

    return (
        <>
            <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-white font-mono tracking-wider">YOUR SCANS</h2>
                    <ScanListFilter
                        refetch={memoizedRefetch}
                        searchQuery={searchQuery}
                        setSearchQuery={memoizedSetSearchQuery}
                        statusFilter={statusFilter}
                        setStatusFilter={memoizedSetStatusFilter}
                        uniqueStatusCodes={memoizedUniqueStatusCodes} />
                </div>

                <Tabs defaultValue="all" className="w-full">
                    {/* Tab list */}
                    <TabsList className="mb-6 bg-slate-900/50 border-slate-700">
                        {scanTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="cursor-pointer text-slate-400 data-[state=active]:text-white data-[state=active]:bg-slate-800"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {displayedScans.length > 0 ? (
                        filteredTabs.map((tab) => {
                            return (
                                <TabsContent
                                    key={tab.value}
                                    value={tab.value}
                                    className="mt-0"
                                >
                                    {(loading || loadingSearch) ? (
                                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
                                                <span className="text-slate-400 font-mono">Loading scans...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <ScanList
                                            scans={tab.filteredScans}
                                            loading={loading}
                                            hasMore={hasMore}
                                            onLoadMore={memoizedLoadMore}
                                            showLoadMore={!searchQuery}
                                        />

                                    )
                                    }
                                </TabsContent>
                            );
                        })
                    ) : (
                        <div className="border border-white/20 bg-slate-800/30 backdrop-blur-xl rounded-lg p-8">
                            <div className="text-center py-12">
                                <p className="text-slate-400 font-mono">
                                    No scans yet — Click "Create Scan" to get started.
                                </p>
                            </div>
                        </div>
                    )}
                </Tabs>
            </div>
        </>
    );
};

export default ScanListHistory;
