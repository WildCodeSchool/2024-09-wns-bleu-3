"use client"

import { Badge } from "@/components/ui/badge"
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
        <div className="bg-white rounded-xl border shadow-sm p-6 border-gray-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Issues</h2>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                    {activeIssueCount} Total Issues
                </Badge>
            </div>
            <div className="overflow-y-auto flex-1">
                <Table>
                    <TableHeader className="sticky top-0 bg-white">
                        <TableRow className="border-gray-200">
                            <TableHead className="font-medium text-gray-500">Issue</TableHead>
                            <TableHead className="font-medium text-gray-500">Type</TableHead>
                            <TableHead className="font-medium text-gray-500">Scan</TableHead>
                            <TableHead className="font-medium text-gray-500 text-center">Resolved</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeIssueCount === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-gray-500">
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
                                    <TableRow key={issue.id} className="hover:bg-gray-50 border-gray-200">
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`flex h-5 w-5 items-center justify-center rounded-full ${issueDisplay.color}`}>
                                                    {issueDisplay.icon}
                                                </div>
                                                <span className="text-sm font-medium">{issue.issue}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                            <Badge className="bg-white text-gray-800 border border-gray-200">
                                                {issue.issueType.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-left">
                                            <Link to={`/dashboard/${issue.scanId}`} className="hover:underline text-blue-600">
                                                {scanTitle}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
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
        </div>
    )
}
