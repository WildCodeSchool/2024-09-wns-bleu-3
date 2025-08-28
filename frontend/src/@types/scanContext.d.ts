export interface ScansContextType {
    scans: ScanItem[]
    totalScans: number
    loading: boolean
    error?: Error
    refetch: () => void
    hasMore: boolean
    page: number
    limit: number
    activeIssues: Issue[]
    activeIssueCount: number
    resolvedIssues: string[]
    setResolvedIssues: React.Dispatch<React.SetStateAction<string[]>>
    activeScans: number,
    loadMore: () => Promise<void>,
}
