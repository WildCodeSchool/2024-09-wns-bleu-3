
import { Clock, Globe, AlertCircle } from "lucide-react"
import type { ScanItem } from "./types"
import { getStatusStyle } from "./utils"
import { StatusIndicator } from "./StatusIndicator"
// import { ScanChart } from "./ScanChart"

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
              <span>Last scan: {formatDate(scan.createdAt)}</span>
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
      {/* <ScanChart history={scan.history} /> */}
    </div>
  )
}

