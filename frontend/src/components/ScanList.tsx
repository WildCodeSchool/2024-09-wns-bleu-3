import { memo } from "react";
import HistoryScanCard from "./dashborad/HistoryScanCard"
import { IScan } from "./dashborad/ScanListHistory";
import { Button } from "./ui/button"

interface ScanListProps {
    scans: IScan[],
    hasMore: boolean,
    loading: boolean,
    onLoadMore: () => Promise<void>,
    showLoadMore: boolean
}

const ScanList = memo(({ scans, hasMore, loading, onLoadMore, showLoadMore }: ScanListProps) => {
    return (
        <div className="border border-white/20 bg-slate-800/30 backdrop-blur-xl rounded-lg p-4">
            <div className="max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-slate-500 hover:scrollbar-thumb-slate-400">
                {scans.map((scan) => (
                    <HistoryScanCard key={scan.id} scan={scan} />
                ))}
            </div>

            {showLoadMore && (
                <div className="p-4">
                    <Button
                        onClick={onLoadMore}
                        disabled={loading || !hasMore}
                        className="w-full h-24 flex items-center justify-center border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 bg-transparent cursor-pointer"
                    >
                        {loading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
});

export default ScanList