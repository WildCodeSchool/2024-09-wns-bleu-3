"use client"

import { BarChart2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ScanItem } from "./types"
import { getStatusStyle } from "./utils"

// Function to truncate URL
// eslint-disable-next-line react-refresh/only-export-components
export const truncateUrl = (url: string, maxLength = 25) => {
  if (url.length <= maxLength) return url

  // Find the first slash after the domain
  const domainEnd = url.indexOf("/", 8) // 8 to skip https://

  if (domainEnd === -1 || domainEnd > maxLength - 3) {
    // If no slash or domain itself is too long
    return url.substring(0, maxLength - 3) + "..."
  }

  // Keep the domain and add ellipsis
  return url.substring(0, domainEnd) + "/..."
}

const getIconBgColor = (_statusCode: number, isSelected = false) => {
  if (isSelected) return "bg-white text-blue-900"
  return "bg-gray-100 text-gray-700"
}

interface ScanListItemProps {
  scan: ScanItem
  isSelected: boolean
  onClick: () => void
}

export function ScanListItem({ scan, isSelected, onClick }: ScanListItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center justify-between p-3 mb-3 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg ${
              isSelected ? "bg-blue-900 shadow-lg" : "bg-white hover:border-gray-300"
            }`}
            onClick={onClick}
          >
            <div className="flex items-center gap-3 max-w-[70%]">
              <div className={`rounded-md p-2 ${getIconBgColor(scan.statusCode, isSelected)}`}>
                <BarChart2 className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <span className={`font-barlow font-medium block ${isSelected ? "text-white" : "text-gray-900"}`}>
                  {scan.title}
                </span>
                <span
                  className={`text-xs font-barlow truncate block max-w-full ${isSelected ? "text-gray-300" : "text-gray-500"}`}
                  title={scan.url}
                >
                  {truncateUrl(scan.url)}
                </span>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-barlow font-medium ${getStatusStyle(
                scan.statusCode,
                isSelected,
              )}`}
            >
              {scan.statusCode}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-barlow">Click to view detailed scan information</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

