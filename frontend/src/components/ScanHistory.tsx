"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { ScanItem } from "./scan-history/types"
import { SearchFilter } from "./scan-history/SearchFilter"
import { ScanDetails } from "./scan-history/ScanDetails"
import { ScanList } from "./scan-history/ScanList"
import { useScansContext } from "../hooks/useScansContext"
import { useGetScanByIdQuery } from "@/generated/graphql-types"
// import { Scan, useScanCreatedSubscription } from "@/generated/graphql-types"

export default function ScanHistory() {

  const { scans: allScansData, loading: allScansLoading, error: allScansError } = useScansContext()

  const [selectedScanId, setSelectedScanId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // const client = useApolloClient()

  //  Function subscribption to new scans with SSE 

  // useScanCreatedSubscription({
  //   onData: ({ data }) => {
  //     const newScan = data?.data?.newScan
  //     if (!newScan) return

  //     client.cache.updateQuery({ query: GET_ALL_SCANS }, (prev) => {
  //       if (!prev?.getAllScans) return prev

  //       const alreadyExists = prev.getAllScans.some((scan: Scan) => scan.id === newScan.id)

  //       if (alreadyExists) return prev

  //       return {
  //         getAllScans: [newScan, ...prev.getAllScans]
  //       }

  //     })
  //   }
  // })

  console.log("selectedScanId", selectedScanId);

  // Expanded sample data with hourly history and longer URLs
  const allScans: ScanItem[] = allScansData || [];

  // Filter scans based on search term and active filters
  const filteredScans = allScans.filter((scan) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      scan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.statusCode.toString().includes(searchTerm)

    // Filter by status codes (if any filters are active)
    const matchesStatus =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => {
        if (filter === "200") return scan.statusCode >= 200 && scan.statusCode < 300
        if (filter === "400") return scan.statusCode >= 400 && scan.statusCode < 500
        if (filter === "500") return scan.statusCode >= 500
        return false
      })

    return matchesSearch && matchesStatus
  })


  // Select a scan by default or when filters change
  useEffect(() => {
    if (filteredScans.length > 0 && (!selectedScanId || !filteredScans.some((scan) => scan.id === selectedScanId))) {
      setSelectedScanId(filteredScans[0].id);
    }
  }, [filteredScans, selectedScanId])

  const { loading: scanByIdLoading, error: scanByIdError, data: scanByIdData } = useGetScanByIdQuery({
    variables: { getScanByIdId: Number(selectedScanId) },
    skip: !selectedScanId,
  });

  const selectedScan = scanByIdData?.getScanById || null;

  if (allScansLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
        <span className="text-slate-400">Loading scan history...</span>
      </div>
    </div>
  )

  if (allScansError) return (
    <div className="text-center py-8">
      <div className="text-red-400 mb-2">ERROR</div>
      <p className="text-slate-400">{allScansError.message}</p>
    </div>
  )

  return (
    <div className="w-full mb-16 px-6" id="scan-history">
      <h2 className="text-2xl text-white text-center font-bold">Scan History</h2>
      <Card className="w-full max-w-5xl mx-auto border border-white/10 bg-main-400/5 backdrop-blur-xl shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col">
            {/* Search and filter section */}
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />

            {/* Main content area */}
            <div className="grid grid-cols-1 md:grid-cols-3 h-[550px]">
              {/* Scan list */}
              <ScanList scans={filteredScans} selectedScanId={selectedScanId} onSelectScan={setSelectedScanId} />

              {/* Scan details */}
              <div className="md:col-span-2 p-4 bg-slate-900/30 h-full overflow-y-auto">
                {scanByIdLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-700 border-t-blue-400 rounded-full animate-spin"></div>
                      <span className="text-slate-400">Loading scan details...</span>
                    </div>
                  </div>
                ) : scanByIdError ? (
                  <div className="text-center py-8">
                    <div className="text-red-400 mb-2">ERROR</div>
                    <p className="text-slate-400">Error loading scan details: {scanByIdError.message}</p>
                  </div>
                )
                  : (
                    <ScanDetails scan={selectedScan} />
                  )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

