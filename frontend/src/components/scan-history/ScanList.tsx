"use client"

import { AlertCircle } from "lucide-react"
import type { ScanItem } from "./types"
import { ScanListItem } from "./ScanListItem"

interface ScanListProps {
  scans: ScanItem[]
  selectedScanId: number | null
  onSelectScan: (id: number | null) => void
}

export function ScanList({ scans, selectedScanId, onSelectScan }: ScanListProps) {
  return (
    <div className="md:col-span-1 bg-slate-900/20 p-4 border-r border-white/10 overflow-y-auto h-full">
      {scans.length > 0 ? (
        scans.map((scan) => (
          <ScanListItem
            key={scan.id}
            scan={scan}
            isSelected={selectedScanId === scan.id}
            onClick={() => onSelectScan(scan.id)}
          />
        ))
      ) : (
        <div className="text-center py-8 text-slate-400">
          <AlertCircle className="h-12 w-12 mx-auto mb-2 text-slate-500" />
          <p className="font-barlow">No scans match your filters</p>
        </div>
      )}
    </div>
  )
}

