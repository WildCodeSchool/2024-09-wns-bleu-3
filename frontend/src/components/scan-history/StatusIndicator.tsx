import { Clock, Shield, CheckCircle, AlertCircle } from "lucide-react"
import type { ScanItem } from "./types"
import { getStatusStyle } from "./utils"

// Get status icon based on status code
const getStatusIcon = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) return <CheckCircle className="h-4 w-4" />
  if (statusCode >= 400) return <AlertCircle className="h-4 w-4" />
  return <AlertCircle className="h-4 w-4" />
}

interface StatusIndicatorProps {
  scan: ScanItem
}

export function StatusIndicator({ scan }: StatusIndicatorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-md border border-gray-200">
        <div className={`p-2 rounded-full ${getStatusStyle(scan.statusCode)}`}>{getStatusIcon(scan.statusCode)}</div>
        <div>
          <div className="text-sm text-gray-700 font-barlow font-medium">Status</div>
          <div className="text-gray-900 font-barlow font-medium">
            {scan.statusCode} - {scan.statusMessage}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-md border border-gray-200">
        <div className="p-2 rounded-full bg-sky-500 text-white">
          <Clock className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm text-sky-700 font-barlow font-medium">Response Time</div>
          <div className="text-gray-900 font-barlow font-medium">{scan.responseTime}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-md border border-gray-200">
        <div className="p-2 rounded-full bg-violet-500 text-white">
          <Shield className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm text-violet-700 font-barlow font-medium">Certificate</div>
          <div className="text-gray-900 font-barlow font-medium">{scan.sslCertificate}</div>
        </div>
      </div>
    </div>
  )
}

