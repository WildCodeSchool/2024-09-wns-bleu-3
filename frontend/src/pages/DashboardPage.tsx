import { BarChart4, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllScansByUserIdQuery } from "@/generated/graphql-types";
import ActiveIssues from "../components/ActiveIssues";
import AuthScanForm from "../components/AuthScanForm";
import { useState } from "react";

const DashboardPage = () => {

    const [resolvedIssues, setResolvedIssues] = useState<string[]>([])

    // ID variable not necessary, ID check by context
    const { data, loading, error } = useGetAllScansByUserIdQuery({})

    const scans = data?.getAllScansByUserId.scans ?? []
    const totalScans = data?.getAllScansByUserId.totalScans ?? 0

    const activeScans = scans.filter(
        (scan) => scan.statusCode >= 200 && scan.statusCode < 300
    ).length


    const healthyPercentage = totalScans > 0
        ? Math.round((activeScans / totalScans) * 100)
        : 0



    const allIssues = data?.getAllScansByUserId.issues ?? []
    const activeIssues = allIssues.filter(issue => !resolvedIssues.includes(issue.id))

    const activeIssueCount = activeIssues.length



    if (loading) return <p>Loading...</p>
    if (error) return <p>There is an error: {error.message}</p>

    return (
        <div className="space-y-8">
            {/* Note: Header section is now handled by DashboardLayout */}

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Monitors Card */}
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-slate-900/2"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-sm font-semibold text-slate-600 mb-2 text-left">Total Monitors</p>
                                <p className="text-3xl font-bold text-slate-900 mb-3 text-left">{data?.getAllScansByUserId.totalScans}</p>
                                <p className="text-sm font-bold text-slate-600 text-left">Free Plan</p>
                            </div>
                            <div className="h-16 w-16 bg-slate-900/80 rounded-3xl flex items-center justify-center shadow-xl backdrop-blur-sm">
                                <BarChart4 className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-900/5 rounded-full blur-2xl"></div>
                </Card>

                {/* Healthy Card */}
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-emerald-900/2"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-sm font-semibold text-slate-600 mb-2 text-left">Healthy</p>
                                <p className="text-3xl font-bold text-slate-900 mb-3 text-left">{activeScans}</p>
                                <p className="text-sm font-bold text-emerald-600 text-left">
                                    {data?.getAllScansByUserId.totalScans ? `${healthyPercentage}% uptime` : 'No data'}
                                </p>
                            </div>
                            <div className="h-16 w-16 bg-emerald-600/80 rounded-3xl flex items-center justify-center shadow-xl backdrop-blur-sm">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900/5 rounded-full blur-2xl"></div>
                </Card>

                {/* Issues Card */}
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="absolute inset-0 bg-red-900/2"></div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-sm font-semibold text-slate-600 mb-2 text-left">Issues</p>
                                <p className="text-3xl font-bold text-slate-900 mb-3 text-left">{activeIssueCount}</p>
                                <p className="text-sm font-bold text-red-600 text-left">Need attention</p>
                            </div>
                            <div className="h-16 w-16 bg-red-600/80 rounded-3xl flex items-center justify-center shadow-xl backdrop-blur-sm">
                                <AlertTriangle className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/5 rounded-full blur-2xl"></div>
                </Card>
            </div>

            {/* Bottom Grid Row: Create New Scan + Active Issues */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Create New Scan Section */}
                <div className="lg:col-span-2">
                    <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border-white/50 relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                        <CardContent className="p-6 relative z-10 h-full flex flex-col">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3 mb-6">
                                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Plus className="h-4 w-4 text-white" />
                                </div>
                                Create New Scan
                            </h2>
                            <div className="flex-1">
                                <AuthScanForm />
                            </div>
                        </CardContent>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
                    </Card>
                </div>

                {/* Active Issues Section */}
                <div className="lg:col-span-3">
                    <ActiveIssues issues={activeIssues} scans={scans.map(({ id, title }) => ({ id, title }))} setResolvedIssues={setResolvedIssues} />
                </div>
            </div>
        </div >
    );
};

export default DashboardPage;
