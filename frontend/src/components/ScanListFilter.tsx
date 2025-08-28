import { RefreshCw, Search } from "lucide-react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { ScanStatusProps } from "@/hooks/useDashboardPage"
import { memo } from "react"

interface ScanListFilterProps {
    refetch: () => void;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    uniqueStatusCodes: ScanStatusProps[];
}

const ScanListFilter = memo(({ refetch, searchQuery, setSearchQuery, statusFilter, setStatusFilter, uniqueStatusCodes }: ScanListFilterProps) => {
    return (
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
    )
});

export default ScanListFilter