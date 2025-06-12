import { GetScanHistoryQuery } from "@/generated/graphql-types"

export const getUptime = (
  history: GetScanHistoryQuery["getScanHistory"]
): string => {
  if (!history || history.length === 0) return "0%"

  const successCount = history.filter(scan => scan.statusCode === 200).length
  const percent = (successCount / history.length) * 100
  return `${Math.round(percent)}%`
}
