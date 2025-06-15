import { GetScanHistoryQuery } from "@/generated/graphql-types"


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
