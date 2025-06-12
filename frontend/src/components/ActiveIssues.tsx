"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, XCircle, ShieldAlert } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router"
import { ScanIssues } from "../@types/scan"
import { Issue } from "../@types/issue"

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
        <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 relative overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-slate-900/2"></div>
            <CardHeader className="pb-6 relative z-10 p-8">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="h-10 w-10 bg-red-600/80 rounded-xl flex items-center justify-center shadow-lg">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        Active Issues
                    </CardTitle>
                    <Badge className="bg-red-500 text-white border-0 shadow-lg font-bold px-4 py-2 text-sm">
                        {activeIssueCount} Total Issues
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="relative z-10 flex-1 overflow-hidden px-8 pb-8">
                <div className="overflow-y-auto h-full">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white/90 backdrop-blur-sm">
                            <TableRow className="border-white/50">
                                <TableHead className="font-bold text-slate-800 py-4">Issue</TableHead>
                                <TableHead className="font-bold text-slate-800 py-4">Type</TableHead>
                                <TableHead className="font-bold text-slate-800 py-4">Scan</TableHead>
                                <TableHead className="font-bold text-slate-800 text-center py-4">Resolved</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeIssueCount === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-slate-500 py-12 text-base">
                                        No active issues found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                issues.map((issue) => {
                                    const issueDisplay =
                                        issue.issueType === "STATUS_CODE"
                                            ? {
                                                icon: issue.issue.includes("404") ? (
                                                    <AlertTriangle className="h-4 w-4" />
                                                ) : (
                                                    <XCircle className="h-4 w-4" />
                                                ),
                                                color: issue.issue.includes("404")
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-red-100 text-red-600",
                                            }
                                            : {
                                                icon: <ShieldAlert className="h-4 w-4" />,
                                                color: "bg-orange-100 text-orange-600",
                                            }

                                    const scanTitle = scans.find((s) => s.id === issue.scanId)?.title || `Scan ${issue.scanId}`

                                    return (
                                        <TableRow key={issue.id} className="hover:bg-white/50 border-white/40 transition-all duration-200 py-3">
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${issueDisplay.color} shadow-sm`}>
                                                        {issueDisplay.icon}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-800">{issue.issue}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-left py-4">
                                                <Badge className="bg-slate-200/80 text-slate-700 border border-slate-300/50 shadow-sm font-semibold px-3 py-1">
                                                    {issue.issueType.replace("_", " ")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-left py-4">
                                                <Link to={`/dashboard/scan-${issue.scanId}`} className="hover:underline text-blue-600 font-semibold transition-colors hover:text-blue-700">
                                                    {scanTitle}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-center py-4">
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer transition-all duration-200 hover:scale-110"
                                                        onChange={() => handleResolveIssue(issue.id)}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-900/5 rounded-full blur-3xl"></div>
        </Card>
    )
}
