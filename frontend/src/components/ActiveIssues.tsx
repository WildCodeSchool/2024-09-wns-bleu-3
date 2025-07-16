"use client"

import { AlertTriangle, XCircle, ShieldAlert, Link2Icon } from "lucide-react"
import { Link } from "react-router"
import { ScanIssues } from "../@types/scan"
import { Issue } from "../@types/issue"
import { Separator } from "./ui/separator"

interface ActiveIssuesProps {
    issues: Issue[]
    scans: ScanIssues[]
    setResolvedIssues: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ActiveIssues({ issues, scans, setResolvedIssues }: ActiveIssuesProps) {
    const handleResolveIssue = (id: string) => {
        setResolvedIssues((prev) => [...prev, id])
    }

    const activeIssueCount = issues.length

    return (
        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6 flex flex-col h-[450px] overflow-y-scroll custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-bold">ACTIVE ISSUES</h2>
                <div className="bg-red-500/20 border border-red-400/30 text-red-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    {activeIssueCount} TOTAL ISSUES
                </div>
            </div>
            <div className="flex-1">
                {activeIssueCount === 0 ? (
                    <div className="text-center text-slate-200 py-8">
                        <div className="text-slate-300 mb-2">◈ NO ISSUES</div>
                        <p className="text-sm">All monitors are running smoothly</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {issues.map((issue) => {
                            const issueDisplay =
                                issue.issueType === "STATUS_CODE"
                                    ? {
                                        icon: issue.issue.includes("404") ? (
                                            <AlertTriangle className="h-4 w-4" />
                                        ) : (
                                            <XCircle className="h-4 w-4" />
                                        ),
                                        color: issue.issue.includes("404") ? "text-amber-400" : "text-red-400",
                                        bgColor: issue.issue.includes("404") ? "bg-amber-500/20" : "bg-red-500/20",
                                    }
                                    : {
                                        icon: <ShieldAlert className="h-4 w-4" />,
                                        color: "text-orange-400",
                                        bgColor: "bg-orange-500/20",
                                    }

                            const scanTitle = scans.find((s) => s.id === issue.scanId)?.title || `Scan ${issue.scanId}`

                            return (
                                <div
                                    key={issue.id}
                                    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors flex-shrink-0"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Icon */}
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${issueDisplay.bgColor} ${issueDisplay.color}`}
                                        >
                                            {issueDisplay.icon}
                                        </div>
                                        {/* Issue Type Badge */}
                                        <span className="bg-white/10 text-slate-200 px-2 py-1 text-xs rounded font-medium flex-shrink-0">
                                            {issue.issueType.replace("_", " ")}
                                        </span>
                                        {/* Issue Title */}
                                        <h3 className="text-white text-sm font-light text-left truncate flex-1 min-w-0">{issue.issue}</h3>

                                        <Separator orientation="vertical" />

                                        {/* Scan Link  */}
                                        <Link
                                            to={`/dashboard/scan-${issue.scanId}`}
                                            className="hover:underline text-blue-400 text-xs flex-shrink-0 flex items-center gap-2"
                                        >
                                            {scanTitle}
                                            <Link2Icon className="h-4 w-4" />
                                        </Link>

                                        {/* Checkbox */}
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-600 text-blue-400 focus:ring-blue-400 focus:ring-1 bg-slate-800/50 cursor-pointer flex-shrink-0"
                                            onChange={() => handleResolveIssue(issue.id)}
                                        />
                                    </div>


                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
