
import { Bell, Settings, BarChart4, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllScansByUserIdQuery } from "@/generated/graphql-types";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import ActiveIssues from "../components/ActiveIssues";
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


    const healthyPercentage = totalScans > 0
        ? Math.round((activeScans / totalScans) * 100)
        : 0

    let healthColor = 'text-gray-500'
    if (healthyPercentage >= 80) healthColor = 'text-green-600'
    else if (healthyPercentage >= 50) healthColor = 'text-yellow-500'
    else healthColor = 'text-red-500'

    const allIssues = data?.getAllScansByUserId.issues ?? []
    const activeIssues = allIssues.filter(issue => !resolvedIssues.includes(issue.id))

    const activeIssueCount = activeIssues.length


    console.log("all scan =>", scans)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <div className="container p-8 w-screen mx-auto">
            {/* welcome */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 text-left">Welcome, {capitalizeFirstLetter(data?.getAllScansByUserId.username ?? '')} </h1>
                    <p className="text-gray-600">Here's an overview of your URL monitoring</p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden md:inline">Notifications</span>
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="hidden md:inline">Settings</span>
                    </Button>
                    {/* <Button variant="outline" className="gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">Profile</span>
                    </Button> */}
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Scans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <BarChart4 className="h-5 w-5 text-blue-500" />
                            <div className="text-2xl font-bold">{data?.getAllScansByUserId.totalScans}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            {/* <Badge variant="outline" className="bg-blue-50">
                                Free Plan 
                            </Badge> */}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Active Scans</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div className="text-2xl font-bold">{activeScans}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            <span className={`${healthColor}`}>
                                {data?.getAllScansByUserId.totalScans ? `${healthyPercentage}% healthy`
                                    : 'No data'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <div className="text-2xl font-bold">{activeIssueCount}</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            <span className="text-yellow-600">Needs attention</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ActiveIssues */}
            <ActiveIssues issues={activeIssues} scans={scans.map(({ id, title }) => ({ id, title }))} setResolvedIssues={setResolvedIssues} />

            {/* Scans list */}
            <ScanListHistory
                scans={scans}
            />
        </div >
    );
};

export default DashboardPage;
{/* Scans list */ }
