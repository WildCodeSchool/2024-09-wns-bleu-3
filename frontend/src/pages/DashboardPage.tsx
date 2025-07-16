
import { useGetAllScansByUserIdQuery } from "@/generated/graphql-types";
import ActiveIssues from "../components/ActiveIssues";
import AuthScanForm from "../components/AuthScanForm";
import { useState } from "react";
import ScanListHistory from "@/components/dashborad/ScanListHistory";

const DashboardPage = () => {
    const [resolvedIssues, setResolvedIssues] = useState<string[]>([])
    // ID variable not necessary, ID check by context
    const { data, loading, error } = useGetAllScansByUserIdQuery({})

    const scans = data?.getAllScansByUserId.scans ?? []
    const totalScans = data?.getAllScansByUserId.totalScans ?? 0

    const activeScans = scans.filter(
        (scan) => scan.statusCode >= 200 && scan.statusCode < 300
    ).length

    // Calculate average response time from all scans
    const averageResponseTime = scans.length > 0
        ? Math.round(scans.reduce((sum, scan) => sum + scan.responseTime, 0) / scans.length)
        : 0

    const allIssues = data?.getAllScansByUserId.issues ?? []
    const activeIssues = allIssues.filter(issue => !resolvedIssues.includes(issue.id))

    const activeIssueCount = activeIssues.length

    if (loading) return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono flex items-center justify-center">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
                <span className="text-slate-400">Loading dashboard...</span>
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono flex items-center justify-center">
            <div className="text-center">
                <div className="text-red-400 mb-2">◖ ERROR</div>
                <p className="text-slate-400">{error.message}</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen  text-slate-300 font-mono">
            <div className="flex min-h-screen">
                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 min-w-0">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-4 rounded-lg">
                            <div className="text-slate-300 text-xs font-medium tracking-wider mb-2">TOTAL</div>
                            <div className="text-2xl text-white font-bold mb-1">{totalScans}</div>
                            <div className="text-xs text-slate-200">SCANS</div>
                        </div>
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-4 rounded-lg">
                            <div className="text-slate-300 text-xs font-medium tracking-wider mb-2">HEALTHY</div>
                            <div className="text-2xl text-emerald-400 font-bold mb-1">{activeScans}</div>
                            <div className="text-xs text-slate-200">OPERATIONAL</div>
                        </div>
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-4 rounded-lg">
                            <div className="text-slate-300 text-xs font-medium tracking-wider mb-2">ISSUES</div>
                            <div className="text-2xl text-red-400 font-bold mb-1">{activeIssueCount}</div>
                            <div className="text-xs text-slate-200">ATTENTION</div>
                        </div>
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl p-4 rounded-lg">
                            <div className="text-slate-300 text-xs font-medium tracking-wider mb-2">AVG RESPONSE</div>
                            <div className="text-2xl text-white font-bold mb-1">{averageResponseTime}ms</div>
                            <div className="text-xs text-slate-200">AVERAGE</div>
                        </div>
                    </div>

                    {/* Add Scan Form and Active Issues Side by Side */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                        <AuthScanForm />
                        <ActiveIssues
                            issues={activeIssues}
                            scans={scans.map(({ id, title }) => ({ id, title }))}
                            setResolvedIssues={setResolvedIssues}
                        />
                    </div>

                    {/* Scans list */}
                    <ScanListHistory
                        scans={scans}
                    />

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-800/30">
                        <div className="flex flex-col sm:flex-row justify-between text-xs text-slate-500 gap-2">
                            <div>LAST REFRESH: {new Date().toLocaleString()}</div>
                            <div>NEXT SCAN CYCLE: 2m 15s</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DashboardPage;

