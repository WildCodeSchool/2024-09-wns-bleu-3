import { Activity, AlertTriangle, CheckCircle, Clock, Plus, RefreshCw, Search, XCircle } from "lucide-react"
import { Input } from "./ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Link } from "react-router"

const ScanListHistory = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")


    // test
    const scans = [
        {
            id: "scan-1",
            title: "Main Website",
            url: "https://example.com",
            status: 200,
            responseTime: 245,
            lastChecked: "2 mins ago",
            frequency: "Every 5 minutes",
            uptime: "99.8%",
            tag: "Production",
        },
        {
            id: "scan-2",
            title: "API Endpoint",
            url: "https://api.example.com/v1/users",
            status: 404,
            responseTime: 189,
            lastChecked: "15 mins ago",
            frequency: "Every 10 minutes",
            uptime: "95.2%",
            tag: "API",
        },
        {
            id: "scan-3",
            title: "Staging Environment",
            url: "https://staging.example.com",
            status: 500,
            responseTime: 532,
            lastChecked: "1 hour ago",
            frequency: "Every 30 minutes",
            uptime: "87.5%",
            tag: "Staging",
        },
        {
            id: "scan-4",
            title: "Documentation Site",
            url: "https://docs.example.com",
            status: 200,
            responseTime: 312,
            lastChecked: "5 mins ago",
            frequency: "Every 15 minutes",
            uptime: "99.9%",
            tag: "Production",
        },
        {
            id: "scan-5",
            title: "Authentication Service",
            url: "https://auth.example.com",
            status: 200,
            responseTime: 178,
            lastChecked: "8 mins ago",
            frequency: "Every 5 minutes",
            uptime: "99.7%",
            tag: "Production",
        },
    ]
    // Filter scans based on search query and status filter
    const filteredScans = scans.filter((scan) => {
        const matchesSearch =
            scan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scan.url.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "200" && scan.status === 200) ||
            (statusFilter === "404" && scan.status === 404) ||
            (statusFilter === "500" && scan.status === 500)

        return matchesSearch && matchesStatus
    })

    // test

    return (
        <>
            <div className="bg-white rounded-xl border shadow-sm p-6 border-gray-200">

                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold">Your Scans</h2>
                    <div className="flex gap-2 flex-1 md:max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search scans..."
                                className="pl-9 bg-gray-50 border-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status Codes</SelectItem>
                                <SelectItem value="200">200 - OK</SelectItem>
                                <SelectItem value="404">404 - Not Found</SelectItem>
                                <SelectItem value="500">500 - Server Error</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span className="hidden md:inline">Refresh</span>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">All Scans</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="issues">Issues</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    </TabsList>
                    {/* content All Scans */}
                    <TabsContent value="all" className="space-y-4">
                        {filteredScans.length > 0 ? (
                            filteredScans.map((scan) => (
                                <Link to={`/dashboard/${scan.id}`} key={scan.id}>
                                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                                           
                                            <div className="flex items-center gap-4">
                                                 {/* bg via status */}
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full 
                              ${scan.status === 200
                                                            ? "bg-green-100 text-green-600"
                                                            : scan.status === 404
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {scan.status === 200 ? (
                                                        <CheckCircle className="h-5 w-5" />
                                                    ) : scan.status === 404 ? (
                                                        <AlertTriangle className="h-5 w-5" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5" />
                                                    )}
                                                </div>
                                                 {/* title - url */}
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{scan.title}</h3>
                                                    <p className="text-sm text-gray-600">{scan.url}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 ml-14 md:ml-0">
                                                 {/* response time */}
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.responseTime}ms</span>
                                                </div>
                                                 {/* pourcentage */}
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.uptime}</span>
                                                </div>
                                                {/* status code */}
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                              ${scan.status === 200 ? "status-200" : scan.status === 404 ? "status-404" : "status-500"}`}
                                                >
                                                    {scan.status}
                                                </span>
                                                {/* last checked */}
                                                <span className="text-sm text-gray-600">{scan.lastChecked}</span>
                                                {/* tags */}
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                                    {scan.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No scans found matching your criteria.</p>
                                <Button variant="outline" className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" /> Add New Scan
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                    {/* content Active */}
                    <TabsContent value="active" className="space-y-4">
                        {filteredScans
                            .filter((scan) => scan.status === 200)
                            .map((scan) => (
                                <Link to={`/dashboard/${scan.id}`} key={scan.id}>
                                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <CheckCircle className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{scan.title}</h3>
                                                    <p className="text-sm text-gray-600">{scan.url}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 ml-14 md:ml-0">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.responseTime}ms</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.uptime}</span>
                                                </div>
                                                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium status-200">
                                                    {scan.status}
                                                </span>
                                                <span className="text-sm text-gray-600">{scan.lastChecked}</span>
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                                    {scan.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </TabsContent>
                    {/* content Issues */}
                    <TabsContent value="issues" className="space-y-4">
                        {filteredScans
                            .filter((scan) => scan.status !== 200)
                            .map((scan) => (
                                <Link to={`/dashboard/${scan.id}`} key={scan.id}>
                                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full 
                              ${scan.status === 404 ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}
                                                >
                                                    {scan.status === 404 ? (
                                                        <AlertTriangle className="h-5 w-5" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{scan.title}</h3>
                                                    <p className="text-sm text-gray-600">{scan.url}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 ml-14 md:ml-0">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.responseTime}ms</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">{scan.uptime}</span>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
                              ${scan.status === 404 ? "status-404" : "status-500"}`}
                                                >
                                                    {scan.status}
                                                </span>
                                                <span className="text-sm text-gray-600">{scan.lastChecked}</span>
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                                    {scan.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </TabsContent>
                    {/* content Favorites */}
                    <TabsContent value="favorites">
                        <div className="text-center py-12">
                            <p className="text-gray-500">You haven't marked any scans as favorites yet.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default ScanListHistory