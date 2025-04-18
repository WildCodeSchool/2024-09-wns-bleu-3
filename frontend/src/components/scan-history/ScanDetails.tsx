
import { Clock, Globe, AlertCircle } from "lucide-react"
import type { ScanItem } from "./types"
import { getStatusStyle } from "./utils"
import { StatusIndicator } from "./StatusIndicator"
import { GET_SCAN_HISTORY } from "@/graphql/queries";
import { ScanChart } from "./ScanChart"
import { useQuery } from "@apollo/client";

// Format date for display
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface ScanDetailsProps {
  scan: ScanItem | null
}

export function ScanDetails({ scan }: ScanDetailsProps) {

  const { data: historyData, loading: historyLoading } = useQuery(GET_SCAN_HISTORY, {
    variables: { scanId: scan?.id },
    skip: !scan?.id,
  });

  const scanHistory = historyData?.getScanHistory || [];

  if (!scan) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p className="font-barlow">No scan selected</p>
        </div>
      </div>
    )
  }

  console.log(scan)

  return (
    <div className="space-y-4">
      <div>
        {/* Title and status */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-barlow font-bold text-gray-900">{scan.title}</h3>
            {/* Last scan information */}
            <div className="flex items-center text-xs text-gray-500 font-barlow mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Last scan: {formatDate(scan.lastScannedAt)}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-barlow font-medium ${getStatusStyle(scan.statusCode)}`}>
            {scan.statusCode} - {scan.title}
          </div>
        </div>

        {/* URL */}
        <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-md border border-gray-200 mt-3">
          <Globe className="h-5 w-5 text-gray-700" />
          <div className="overflow-hidden">
            <div className="text-sm text-gray-700 font-barlow font-medium">URL</div>
            <div className="text-gray-900 font-barlow font-medium text-sm break-all">{scan.url}</div>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <StatusIndicator scan={scan} />

      {/* Chart */}
      {/* Graph */}
      {historyLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ScanChart history={scanHistory} />
      )}
    </div>
  )
}

