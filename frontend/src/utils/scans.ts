import { GetScanHistoryQuery } from "@/generated/graphql-types"
import { IScanDetails } from "@/pages/ScanDetailsPage"
import { getLastScannedAt } from "./dates"
import { statusMap, StatusVisual, TITLE } from "@/components/scan-details/scanTitle"


/**
 * Calcule l’uptime d’un scan : pourcentage de réponses avec status 200.
 * Basé sur l’historique complet des scans (succès / total).
 * Retourne une string formatée comme "0% - 92%".
 */


export const getUptime = (
  history: GetScanHistoryQuery["getScanHistory"]
): string => {
  if (!history || history.length === 0) return "0%"

  const successCount = history.filter(scan => scan.statusCode === 200).length
  const percent = (successCount / history.length) * 100
  return `${Math.round(percent)}%`
}


/** récupère le statut message du codeStatus d'un scan */
export const getStatusMessage = (code: number): string => {
  let status;
  switch (true) {
    case code >= 200 && code < 300:
      status = TITLE.Operational
      break;

    case code >= 400 && code < 500:
      status = TITLE["Not Found"]
      break;

    case code >= 500:
      status = TITLE.Error
      break;

    default:
      status = TITLE["Unknown status"]
      break;
  }

  return status
}


/** icon et couleur */
export const getIconStatusInfos = (statusName: string): StatusVisual => {
  return statusMap[statusName] ?? statusMap["Unknown status"];
};


/**description */
export const getStatusDescription = (scan: IScanDetails, title: string): string => {
  const checkDescription: Record<string, string> = {
    "Status": `Last checked ${getLastScannedAt(scan.lastScannedAt)}`,

    "Response Time": `Checked ${(scan.frequency.name).toLocaleLowerCase()}`,

    "Uptime": "Last 30 days" //TODO a dynamiser
  }

  return checkDescription[title]
}
