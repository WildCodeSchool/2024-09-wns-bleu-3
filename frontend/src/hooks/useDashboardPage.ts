import { useMemo } from "react"

/**
 * Récupère les statuts uniques des scans (code + message) sans doublons.
 * Utilise useMemo pour optimiser les performances.
 * Utile pour alimenter les filtres par statut dans le dashboard.
 */


export type ScanStatusProps = {
  statusCode: number
  statusMessage: string

}

export const useDashboardPage = (scans: ScanStatusProps[]) => {
  const uniqueStatusCodes = useMemo(() => {
    return Array.from(new Set(scans.map(scan => scan.statusCode)))
      .map(statusCode => {
        const found = scans.find(scan => scan.statusCode === statusCode)
        return {
          statusCode: found?.statusCode ?? 0,
          statusMessage: found?.statusMessage ?? '',
        }
      })
  }, [scans])

  return {
    uniqueStatusCodes,
  }
}
