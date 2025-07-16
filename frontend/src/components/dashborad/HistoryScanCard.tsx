import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";
import { useGetScanHistoryQuery } from "@/generated/graphql-types";
import { getLastScannedAt } from "@/utils/dates";
import { getUptime } from "@/utils/scans";
import { IScan } from "./ScanListHistory";

type ScanCardProps = {
  scan: IScan
};

const getStatusColor = (code: number) => {
  if (code >= 200 && code < 300) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  if (code >= 400 && code < 500) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  if (code >= 500) return "bg-red-500/20 text-red-400 border-red-500/30";
  return "bg-slate-500/20 text-slate-400 border-slate-500/30";
};

const getStatusIcon = (code: number) => {
  if (code >= 200 && code < 300) return CheckCircle;
  if (code >= 400 && code < 500) return AlertTriangle;
  if (code >= 500) return XCircle;
  return AlertTriangle;
};

const HistoryScanCard = ({ scan }: ScanCardProps) => {
  const {
    id,
    title,
    url,
    statusCode,
    responseTime,
    tags,
    lastScannedAt,
  } = scan;

  const statusColor = getStatusColor(statusCode);
  const StatusIcon = getStatusIcon(statusCode);

  {/* 
   * Calculate uptime: percentage of scans with status 200 (OK) 
   * across all scan history entries.
   * TODO: review the limit
   */}
  const result = useGetScanHistoryQuery({ variables: { scanId: id } })
  const history = result.data?.getScanHistory ?? []
  {/* Calculate uptime: positive scans with StatusCode == 200 */ }
  const uptime = getUptime(history)

  console.log(id)

  return (
    <Link to={`/dashboard/${id}`} className="block">
      <div className="border border-white/10 bg-slate-900/30 backdrop-blur-xl rounded-lg hover:bg-slate-800/40 transition-all duration-200 hover:border-white/20 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${statusColor}`}>
              <StatusIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-white font-mono">{title}</h3>
              <p className="text-sm text-slate-400 font-mono">{url}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 ml-14 md:ml-0">
            {/* Response time: ms */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300 font-mono">{responseTime}ms</span>
            </div>
            {/* Uptime: % */}
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300 font-mono">{uptime}</span>
            </div>
            {/* Status code */}
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium font-mono border ${statusColor}`}>
              {statusCode}
            </span>
            {/* Last scanned at */}
            <span className="text-sm text-slate-400 font-mono">
              {getLastScannedAt(lastScannedAt)}
            </span>
            {/* Tags */}
            {tags?.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 text-xs font-medium text-blue-400 font-mono"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HistoryScanCard;
