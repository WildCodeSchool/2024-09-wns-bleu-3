"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router"
import {
    Terminal,
    Plus,
    RefreshCw,
    Settings,
    Crown,
    Zap,
    User,
    Globe,
    AlertTriangle,
    XCircle,
    ShieldAlert,
} from "lucide-react"

// Simplified Add Scan Form Component
function AddScanForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        frequency: "5",
        tag: "PROD",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        // Reset form
        setFormData({
            title: "",
            url: "",
            frequency: "5",
            tag: "PROD",
        })
    }

    const frequencies = [
        { value: "1", label: "EVERY 1 MINUTE" },
        { value: "5", label: "EVERY 5 MINUTES" },
        { value: "15", label: "EVERY 15 MINUTES" },
        { value: "30", label: "EVERY 30 MINUTES" },
        { value: "60", label: "EVERY HOUR" },
    ]

    const tags = [
        { value: "PROD", label: "PRODUCTION" },
        { value: "STAGE", label: "STAGING" },
        { value: "DEV", label: "DEVELOPMENT" },
        { value: "API", label: "API" },
        { value: "TEST", label: "TESTING" },
        { value: "DEMO", label: "DEMO" },
    ]

    return (
        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-slate-100 font-bold">ADD NEW MONITOR</h2>
                <div className="bg-blue-500/20 border border-blue-400/30 text-blue-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    QUICK SETUP
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Configuration */}
                <div>
                    <div className="text-blue-400 text-sm font-medium mb-3 tracking-wider flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        MONITOR CONFIGURATION
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1">MONITOR NAME</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm focus:border-blue-400/50 focus:outline-none font-mono rounded backdrop-blur-sm"
                                placeholder="MAIN_WEBSITE"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1">TARGET URL</label>
                            <input
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm focus:border-blue-400/50 focus:outline-none font-mono rounded backdrop-blur-sm"
                                placeholder="https://example.com"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-1">CHECK FREQUENCY</label>
                                <select
                                    value={formData.frequency}
                                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm focus:border-blue-400/50 focus:outline-none rounded backdrop-blur-sm"
                                >
                                    {frequencies.map((freq) => (
                                        <option key={freq.value} value={freq.value}>
                                            {freq.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-1">ENVIRONMENT TAG</label>
                                <select
                                    value={formData.tag}
                                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm focus:border-blue-400/50 focus:outline-none rounded backdrop-blur-sm"
                                >
                                    {tags.map((tag) => (
                                        <option key={tag.value} value={tag.value}>
                                            {tag.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                title: "",
                                url: "",
                                frequency: "5",
                                tag: "PROD",
                            })
                        }
                        className="px-4 py-2 border border-slate-600/50 text-slate-300 hover:text-slate-100 hover:border-slate-500 transition-colors text-sm rounded backdrop-blur-sm"
                    >
                        RESET
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-400 transition-colors text-sm flex items-center gap-2 rounded backdrop-blur-sm"
                    >
                        <Plus className="h-4 w-4" />
                        CREATE MONITOR
                    </button>
                </div>
            </form>
        </div>
    )
}

// Active Issues Component
function ActiveIssues({ issues, scans }: { issues: any[]; scans: any[] }) {
    const [resolvedIssues, setResolvedIssues] = useState<number[]>([])

    const handleResolveIssue = (index: number) => {
        setResolvedIssues((prev) => [...prev, index])
    }

    return (
        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-slate-100 font-bold">ACTIVE ISSUES</h2>
                <div className="bg-red-500/20 border border-red-400/30 text-red-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    {issues.length} TOTAL ISSUES
                </div>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
                <div className="space-y-2">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-2 text-xs text-slate-400 font-medium tracking-wider border-b border-slate-800/50 pb-2">
                        <div className="col-span-4">ISSUE</div>
                        <div className="col-span-2">TYPE</div>
                        <div className="col-span-3">SCAN</div>
                        <div className="col-span-2">PRIORITY</div>
                        <div className="col-span-1 text-center">RESOLVED</div>
                    </div>

                    {/* Table Body */}
                    {issues.map((issue, index) => {
                        // Determine icon and color based on issue type
                        const issueDisplay =
                            issue.issueType === "STATUS_CODE"
                                ? {
                                    icon: issue.issue.includes("404") ? (
                                        <AlertTriangle className="h-3 w-3" />
                                    ) : (
                                        <XCircle className="h-3 w-3" />
                                    ),
                                    color: issue.issue.includes("404") ? "text-amber-400" : "text-red-400",
                                    bgColor: issue.issue.includes("404") ? "bg-amber-500/20" : "bg-red-500/20",
                                }
                                : {
                                    icon: <ShieldAlert className="h-3 w-3" />,
                                    color: "text-orange-400",
                                    bgColor: "bg-orange-500/20",
                                }

                        // Find scan title based on scanId
                        const scanTitle =
                            scans.find((s) => s.id === `M-${issue.scanId.toString().padStart(3, "0")}`)?.title ||
                            `Scan ${issue.scanId}`
                        const isResolved = resolvedIssues.includes(index)

                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-12 gap-2 text-sm items-center py-2 px-2 rounded hover:bg-slate-800/20 transition-colors ${isResolved ? "opacity-50" : ""
                                    }`}
                            >
                                <div className="col-span-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded ${issueDisplay.bgColor} ${issueDisplay.color}`}
                                        >
                                            {issueDisplay.icon}
                                        </div>
                                        <span className="text-slate-100 text-xs font-medium truncate">{issue.issue}</span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className="bg-slate-800/50 text-slate-300 px-2 py-1 text-xs rounded font-medium">
                                        {issue.issueType.replace("_", " ")}
                                    </span>
                                </div>
                                <div className="col-span-3 text-xs">
                                    <Link
                                        to={`/dashboard/M-${issue.scanId.toString().padStart(3, "0")}`}
                                        className="hover:underline text-blue-400"
                                    >
                                        {scanTitle}
                                    </Link>
                                </div>
                                <div className="col-span-2">
                                    <span
                                        className={`text-xs font-medium ${issue.priority === "HIGH" ? "text-red-400" : issue.priority === "MEDIUM" ? "text-amber-400" : "text-green-400"}`}
                                    >
                                        {issue.priority}
                                    </span>
                                </div>
                                <div className="col-span-1 text-center">
                                    <input
                                        type="checkbox"
                                        className="h-3 w-3 rounded border-slate-600 text-blue-400 focus:ring-blue-400 focus:ring-1 bg-slate-800/50"
                                        checked={isResolved}
                                        disabled={isResolved}
                                        onChange={() => handleResolveIssue(index)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

// Dummy user data
const userData = {
    name: "Alex Johnson",
    username: "alex_johnson",
    email: "alex@example.com",
    plan: "PRO",
    totalScans: 12,
    activeScans: 8,
    issueScans: 3,
    avatar: "/placeholder.svg?height=40&width=40",
}

// Dummy scan data
const scans = [
    {
        id: "M-001",
        title: "MAIN_WEBSITE",
        url: "https://example.com",
        status: 200,
        responseTime: 245,
        lastChecked: "2m",
        frequency: "5m",
        uptime: "99.8%",
        tag: "PROD",
    },
    {
        id: "M-002",
        title: "API_ENDPOINT",
        url: "https://api.example.com/v1/users",
        status: 404,
        responseTime: 189,
        lastChecked: "15m",
        frequency: "10m",
        uptime: "95.2%",
        tag: "API",
    },
    {
        id: "M-003",
        title: "STAGING_ENV",
        url: "https://staging.example.com",
        status: 500,
        responseTime: 532,
        lastChecked: "1h",
        frequency: "30m",
        uptime: "87.5%",
        tag: "STAGE",
    },
    {
        id: "M-004",
        title: "DOCS_SITE",
        url: "https://docs.example.com",
        status: 200,
        responseTime: 312,
        lastChecked: "5m",
        frequency: "15m",
        uptime: "99.9%",
        tag: "PROD",
    },
    {
        id: "M-005",
        title: "AUTH_SERVICE",
        url: "https://auth.example.com",
        status: 200,
        responseTime: 178,
        lastChecked: "8m",
        frequency: "5m",
        uptime: "99.7%",
        tag: "PROD",
    },
    {
        id: "M-006",
        title: "PAYMENT_GATEWAY",
        url: "https://payment.example.com",
        status: 500,
        responseTime: 600,
        lastChecked: "10m",
        frequency: "5m",
        uptime: "99.7%",
        tag: "PROD",
    },
]

// Dummy issues data
const issues = [
    {
        issue: "HTTP 404 Not Found",
        issueType: "STATUS_CODE",
        scanId: 2,
        priority: "HIGH",
    },
    {
        issue: "HTTP 500 Internal Server Error",
        issueType: "STATUS_CODE",
        scanId: 3,
        priority: "HIGH",
    },
    {
        issue: "Response time exceeded 1000ms",
        issueType: "PERFORMANCE",
        scanId: 6,
        priority: "MEDIUM",
    },
    {
        issue: "SSL Certificate expires in 7 days",
        issueType: "SECURITY",
        scanId: 1,
        priority: "MEDIUM",
    },
    {
        issue: "HTTP 500 Internal Server Error",
        issueType: "STATUS_CODE",
        scanId: 6,
        priority: "HIGH",
    },
]

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")
    const [currentTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }))

    // Filter scans based on search query and status filter
    const filteredScans = scans.filter((scan) => {
        const matchesSearch =
            scan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scan.url.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
            statusFilter === "ALL" ||
            (statusFilter === "OK" && scan.status === 200) ||
            (statusFilter === "WARN" && scan.status === 404) ||
            (statusFilter === "ERR" && scan.status === 500)

        return matchesSearch && matchesStatus
    })

    const getStatusSymbol = (status: number) => {
        if (status === 200) return "●"
        if (status === 404) return "▲"
        return "✕"
    }

    const getStatusColor = (status: number) => {
        if (status === 200) return "text-emerald-400"
        if (status === 404) return "text-amber-400"
        return "text-red-400"
    }

    const handleAddScan = (data: any) => {
        console.log("New scan data:", data)
        // Here you would typically send the data to your backend
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono overflow-x-hidden">
            {/* Header
            <div className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/30 px-4 py-3 sticky top-0 z-10">
                <div className="max-w-full flex justify-between items-center">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-7 h-7 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded backdrop-blur-sm">
                                <Terminal className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-100 font-bold">S0NAR</span>
                                <span className="text-slate-500 text-xs">v2.1.0</span>
                            </div>
                        </div>
                        <div className="text-slate-700">|</div>
                        <div className="text-slate-400 text-xs font-medium hidden sm:block">MONITORING DASHBOARD</div>
                    </div>
                    <div className="flex items-center gap-3 text-xs min-w-0">
                        <span className="text-slate-400 hidden md:inline">{userData.username}</span>
                        <div className="text-slate-700 hidden md:inline">|</div>
                        <span className="text-blue-400 font-bold">{userData.plan}</span>
                        <div className="text-slate-700 hidden lg:inline">|</div>
                        <span className="text-slate-400 hidden lg:inline">{currentTime}</span>
                    </div>
                </div> */}

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 border-r border-slate-800/50 backdrop-blur-sm bg-slate-900/20 flex-shrink-0 hidden lg:block">
                    <div className="p-4 space-y-6">
                        {/* User Profile */}
                        <div className="backdrop-blur-sm bg-slate-800/30 border border-slate-700/50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center border border-blue-400/30">
                                    <User className="h-5 w-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-slate-100 font-medium text-sm truncate">{userData.name}</div>
                                    <div className="text-slate-400 text-xs truncate">{userData.email}</div>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Crown className="h-3 w-3 text-blue-400" />
                                        <span className="text-blue-400 text-xs font-medium">{userData.plan}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="space-y-3">
                            <div className="text-slate-500 text-xs font-medium tracking-wider">NAVIGATION</div>
                            <div className="space-y-1">
                                <div className="text-slate-100 bg-blue-500/10 border border-blue-400/20 px-3 py-2 rounded font-medium text-sm backdrop-blur-sm">
                                    ► DASHBOARD
                                </div>
                                <div className="text-slate-400 px-3 py-2 hover:text-slate-100 hover:bg-slate-800/30 cursor-pointer rounded transition-all text-sm">
                                    MONITORS
                                </div>
                                <div className="text-slate-400 px-3 py-2 hover:text-slate-100 hover:bg-slate-800/30 cursor-pointer rounded transition-all text-sm">
                                    ANALYTICS
                                </div>
                                <div className="text-slate-400 px-3 py-2 hover:text-slate-100 hover:bg-slate-800/30 cursor-pointer rounded transition-all text-sm">
                                    INCIDENTS
                                </div>
                                <div className="text-slate-400 px-3 py-2 hover:text-slate-100 hover:bg-slate-800/30 cursor-pointer rounded transition-all text-sm">
                                    SETTINGS
                                </div>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="space-y-3">
                            <div className="text-slate-500 text-xs font-medium tracking-wider">SYSTEM STATUS</div>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400">TOTAL MONITORS</span>
                                    <span className="text-slate-100 font-medium">{userData.totalScans}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400">HEALTHY</span>
                                    <span className="text-emerald-400 font-medium">{userData.activeScans}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400">ISSUES</span>
                                    <span className="text-red-400 font-medium">{userData.issueScans}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400">UPTIME</span>
                                    <span className="text-slate-100 font-medium">98.7%</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-3">
                            <div className="text-slate-500 text-xs font-medium tracking-wider">QUICK ACTIONS</div>
                            <div className="space-y-1">
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 rounded transition-all text-left text-sm">
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>NEW MONITOR</span>
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 rounded transition-all text-left text-sm">
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    <span>REFRESH ALL</span>
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 rounded transition-all text-left text-sm">
                                    <Settings className="h-3.5 w-3.5" />
                                    <span>SETTINGS</span>
                                </button>
                            </div>
                        </div>

                        {/* Upgrade Section */}
                        <div className="border border-blue-400/20 bg-blue-500/5 backdrop-blur-sm rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                                <Zap className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-blue-400 font-medium text-xs tracking-wider">UPGRADE</span>
                            </div>
                            <div className="text-slate-100 text-sm font-medium">Enterprise Features</div>
                            <div className="text-slate-400 text-xs leading-relaxed">Advanced monitoring & priority support.</div>
                            <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-400 font-medium py-2 px-3 rounded text-xs transition-colors backdrop-blur-sm">
                                GET ACCESS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 min-w-0">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-slate-500 text-xs font-medium tracking-wider mb-2">TOTAL</div>
                            <div className="text-2xl text-slate-100 font-bold mb-1">{userData.totalScans}</div>
                            <div className="text-xs text-slate-400">MONITORS</div>
                        </div>
                        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-slate-500 text-xs font-medium tracking-wider mb-2">HEALTHY</div>
                            <div className="text-2xl text-emerald-400 font-bold mb-1">{userData.activeScans}</div>
                            <div className="text-xs text-slate-400">OPERATIONAL</div>
                        </div>
                        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-slate-500 text-xs font-medium tracking-wider mb-2">ISSUES</div>
                            <div className="text-2xl text-red-400 font-bold mb-1">{userData.issueScans}</div>
                            <div className="text-xs text-slate-400">ATTENTION</div>
                        </div>
                        <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm p-4 rounded-lg">
                            <div className="text-slate-500 text-xs font-medium tracking-wider mb-2">AVG RESPONSE</div>
                            <div className="text-2xl text-slate-100 font-bold mb-1">287ms</div>
                            <div className="text-xs text-slate-400">LAST 24H</div>
                        </div>
                    </div>

                    {/* Add Scan Form and Active Issues Side by Side */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                        <AddScanForm onSubmit={handleAddScan} />
                        <ActiveIssues issues={issues} scans={scans} />
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-slate-100 font-bold">MONITOR OVERVIEW</h2>
                            <span className="text-slate-500 text-sm">({filteredScans.length})</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-sm">FILTER:</span>
                                <select
                                    className="bg-slate-900/30 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm rounded backdrop-blur-sm focus:border-blue-400/50 focus:outline-none min-w-0"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="ALL">ALL STATUS</option>
                                    <option value="OK">HEALTHY</option>
                                    <option value="WARN">WARNING</option>
                                    <option value="ERR">ERROR</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-sm">SEARCH:</span>
                                <input
                                    type="text"
                                    className="bg-slate-900/30 border border-slate-700/50 text-slate-100 px-3 py-2 text-sm rounded backdrop-blur-sm focus:border-blue-400/50 focus:outline-none w-full sm:w-40"
                                    placeholder="Filter monitors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Monitor Table */}
                    <div className="border border-slate-800/50 bg-slate-900/20 backdrop-blur-sm rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="border-b border-slate-800/50 bg-slate-800/30 px-4 py-3">
                            <div className="grid grid-cols-12 gap-2 text-xs text-slate-400 font-medium tracking-wider">
                                <div className="col-span-1">ID</div>
                                <div className="col-span-3">MONITOR NAME</div>
                                <div className="col-span-3 hidden md:block">TARGET URL</div>
                                <div className="col-span-1">STATUS</div>
                                <div className="col-span-1">RESP</div>
                                <div className="col-span-1">UPTIME</div>
                                <div className="col-span-1">LAST</div>
                                <div className="col-span-1">TAG</div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="max-h-96 overflow-y-auto">
                            {filteredScans.map((scan, index) => (
                                <Link to={`/dashboard/${scan.id}`} key={scan.id}>
                                    <div className="border-b border-slate-800/30 px-4 py-3 hover:bg-slate-800/20 cursor-pointer transition-colors">
                                        <div className="grid grid-cols-12 gap-2 text-sm items-center">
                                            <div className="col-span-1 text-slate-400 font-mono text-xs">{scan.id}</div>
                                            <div className="col-span-3 text-slate-100 font-medium text-xs">{scan.title}</div>
                                            <div className="col-span-3 text-slate-400 truncate font-mono text-xs hidden md:block">
                                                {scan.url}
                                            </div>
                                            <div className={`col-span-1 flex items-center gap-1 ${getStatusColor(scan.status)}`}>
                                                <span className="text-sm">{getStatusSymbol(scan.status)}</span>
                                                <span className="font-medium text-xs">{scan.status}</span>
                                            </div>
                                            <div className="col-span-1 text-slate-100 font-mono text-xs">{scan.responseTime}ms</div>
                                            <div className="col-span-1 text-emerald-400 font-medium text-xs">{scan.uptime}</div>
                                            <div className="col-span-1 text-slate-400 text-xs">{scan.lastChecked}</div>
                                            <div className="col-span-1">
                                                <span className="bg-slate-800/50 text-slate-300 px-2 py-1 text-xs rounded font-medium">
                                                    {scan.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

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
    )
}
