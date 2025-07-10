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


    // Récupère les scans de l'utilisateur depuis le dashboard + permet de les rafraîchir avec `refetch`

    const { loading, error, data, refetch } = useQuery(GET_DASHBOARD_USER_DATA);
    const allScans = data.getAllScansByUserId.scans;

    if (loading) return <p>Loading...</p>
    if (error) return `Error fetching user's scans ${error}`;
    return (
        <>
            <div className="bg-white rounded-xl border shadow-sm p-6 border-gray-200 mt-8">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold">Your Scans</h2>
                    <div className="flex gap-2 flex-1 md:max-w-md">
                        {/* barre de recherche */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search scans..."
                                className="pl-9 bg-gray-50 border-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* filtres status */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] cursor-pointer" >
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="all">All Status Codes</SelectItem>
                                {uniqueStatusCodes.map((scan) => (
                                    <SelectItem
                                        key={scan.statusCode}
                                        value={scan.statusCode.toString()}
                                    >
                                        {scan.statusCode} - {scan.statusMessage}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* refresh */}
                        <Button variant="outline" className="gap-2 border-gray-200 hover:bg-gray-200 cursor-pointer" onClick={() => refetch()}>
                            <RefreshCw className="h-4 w-4" />
                            <span className="hidden md:inline">Refresh</span>

                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    {/* liste d'onglets */}
                    <TabsList className="mb-4">
                        {scanTabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value} className="cursor-pointer">
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
                                    className="space-y-4"
                                >
                                    {statusFiltered.map((scan) => (
                                        <HistoryScanCard key={scan.id} scan={scan} />
                                    ))}
                                </TabsContent>
                            );
                        })
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">
                                No scans yet — Click “Create Scan” to get started.
                            </p>

                        </div>
                    )}
                </Tabs>
            </div>
        </>
    );
};

export default ScanListHistory;
