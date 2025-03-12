"use client"

import { AlertCircle } from "lucide-react"
import type { ScanItem } from "./types"
import { ScanListItem } from "./ScanListItem"

interface ScanListProps {
  scans: ScanItem[]
  selectedScanId: string | null
  onSelectScan: (id: string | null) => void
}

export function ScanList({ scans, selectedScanId, onSelectScan }: ScanListProps) {
  return (
    <div className="md:col-span-1 bg-white p-4 border-r border-gray-200 overflow-y-auto h-full">
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
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p className="font-barlow">No scans match your filters</p>
        </div>
      )}
    </div>
  )
}

