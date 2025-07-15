import { RefreshCw, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../ui/tabs";
import { useDashboardPage } from "@/hooks/useDashboardPage";
import { GetAllScansByUserIdQuery } from "@/generated/graphql-types";
import HistoryScanCard from "./HistoryScanCard";
import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_USER_DATA } from "@/graphql/queries";

export type ScanListHistoryProps = {
    scans: GetAllScansByUserIdQuery["getAllScansByUserId"]["scans"];
};

type ScanTabConfig = {
    value: string;
    label: string;
    filter: (
        scan: GetAllScansByUserIdQuery["getAllScansByUserId"]["scans"][number]
    ) => boolean;
};

export type IScan = GetAllScansByUserIdQuery["getAllScansByUserId"]["scans"][number];


const ScanListHistory = ({ scans }: ScanListHistoryProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { uniqueStatusCodes } = useDashboardPage(scans)


    const scanTabs: ScanTabConfig[] = [
        { value: "all", label: "All Scans", filter: () => true },
        {
            value: "active",
            label: "Active",
            filter: (scan) => scan.statusCode === 200,
        },
        {
            value: "issues",
            label: "Issues",
            filter: (scan) => scan.statusCode !== 200,
        },
        {
            value: "favorites",
            label: "Favorites",
            filter: () => false, //TODO
        },
    ];

    const applyStatusFilter = (filtered: typeof scans) => {
        if (statusFilter === "all") return filtered;
        return filtered.filter(
            (scan) => scan.statusCode.toString() === statusFilter
        );
    };

    {/* Fetch user scans data with refresh capability */ }
    const { loading, error, data, refetch } = useQuery(GET_DASHBOARD_USER_DATA);
    const allScans = data?.getAllScansByUserId?.scans || [];

    if (loading) return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
                <span className="text-slate-400 font-mono">Loading scans...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
            <div className="text-center">
                <div className="text-red-400 mb-2 font-mono">◖ ERROR</div>
                <p className="text-slate-400 font-mono">{error.message}</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-white font-mono tracking-wider">YOUR SCANS</h2>
                    <div className="flex gap-2 flex-1 md:max-w-md">
                        {/* Search bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search scans..."
                                className="pl-9 bg-slate-900/50 border-slate-700 text-slate-300 placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Status filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] cursor-pointer bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800/50">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700">
                                <SelectItem value="all" className="text-slate-300 hover:bg-slate-800">All Status Codes</SelectItem>
                                {uniqueStatusCodes.map((scan) => (
                                    <SelectItem
                                        key={scan.statusCode}
                                        value={scan.statusCode.toString()}
                                        className="text-slate-300 hover:bg-slate-800"
                                    >
                                        {scan.statusCode} - {scan.statusMessage}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Refresh button */}
                        <Button
                            variant="outline"
                            className="gap-2 border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800/50 hover:text-white cursor-pointer"
                            onClick={() => refetch()}
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span className="hidden md:inline">Refresh</span>
                        </Button>
                    </div>
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

                    {allScans.length > 0 ? (
                        scanTabs.map((tab) => {
                            const filtered = allScans
                                .filter(tab.filter)
                                .filter((scan: IScan) => {
                                    const q = searchQuery.toLowerCase();
                                    return (
                                        scan.title.toLowerCase().includes(q) ||
                                        scan.url.toLowerCase().includes(q)
                                    );
                                });

                            const statusFiltered = applyStatusFilter(filtered);

                            return (
                                <TabsContent
                                    key={tab.value}
                                    value={tab.value}
                                    className="mt-0"
                                >
                                    {/* Container card for all scan cards */}
                                    <div className="border border-white/20 bg-slate-800/30 backdrop-blur-xl rounded-lg p-4">
                                        <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500 hover:scrollbar-thumb-slate-400">
                                            {statusFiltered.map((scan) => (
                                                <HistoryScanCard key={scan.id} scan={scan} />
                                            ))}
                                        </div>
                                    </div>
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
