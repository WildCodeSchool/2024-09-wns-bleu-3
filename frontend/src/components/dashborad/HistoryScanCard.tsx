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
  if (code >= 200 && code < 300) return "bg-green-100 text-green-600";
  if (code >= 400 && code < 500) return "bg-yellow-100 text-yellow-600";
  if (code >= 500) return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
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

  /**
   * Calcul de l'uptime : pourcentage de scans avec un statut 
   * 200 (OK) sur l'ensemble des historiques de scan.
   * //TODO revoir la limite
   */


  //récupérartion de l'historique du scanId
  const result = useGetScanHistoryQuery({ variables: { scanId: id } })
  const history = result.data?.getScanHistory ?? []
  console.log(`HistoryScan n° ==> ${id} : `, history)
  //calcul de l'uptime : scan positif StatusCode == 200
  const uptime = getUptime(history)


  return (
    <Link to={`/dashboard/${id}`}>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${statusColor}`}
            >
              <StatusIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600">{url}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 ml-14 md:ml-0">
            {/* response time : ms*/}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{responseTime}ms</span>
            </div>
            {/* uptime : % */}
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{uptime}</span>
            </div>
            {/* status code */}
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}
            >
              {statusCode}
            </span>
            {/* last scanned at */}
            <span className="text-sm text-gray-600">
              {getLastScannedAt(lastScannedAt)}
            </span>
            {/* tags */}
            {tags?.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800"
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
