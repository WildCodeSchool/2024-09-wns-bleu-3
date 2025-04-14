"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { ScanItem } from "./scan-history/types"
import { SearchFilter } from "./scan-history/SearchFilter"
import { ScanDetails } from "./scan-history/ScanDetails"
import { useApolloClient, useQuery } from "@apollo/client"
import { GET_ALL_SCANS, GET_SCAN_BY_ID } from "@/graphql/queries"
import { ScanList } from "./scan-history/ScanList"
import { Scan, useScanCreatedSubscription } from "@/generated/graphql-types"

export default function ScanHistory() {
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const client = useApolloClient()

  useScanCreatedSubscription({
    onData: ({ data }) => {
      const newScan = data?.data?.newScan
      if (!newScan) return

      client.cache.updateQuery({ query: GET_ALL_SCANS }, (prev) => {
        if (!prev?.getAllScans) return prev

        const alreadyExists = prev.getAllScans.some((scan: Scan) => scan.id === newScan.id)

        if (alreadyExists) return prev

        return {
          getAllScans: [newScan, ...prev.getAllScans]
        }

      })
    }
  })

  console.log("selectedScanId", selectedScanId);

  // fetch all Scans
  const { loading: allScansLoading, error: allScansError, data: allScansData } = useQuery(GET_ALL_SCANS);

  // Expanded sample data with hourly history and longer URLs
  const allScans: ScanItem[] = allScansData?.getAllScans || [];

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

  const { loading: scanByIdLoading, error: scanByIdError, data: scanByIdData } = useQuery(GET_SCAN_BY_ID, {
    variables: { getScanByIdId: selectedScanId ? Number(selectedScanId) : 0 },
    skip: !selectedScanId,
  });

  const selectedScan = scanByIdData?.getScanById || null;

  if (allScansLoading) return <p>Loading...</p>

  if (allScansError) return <p>Error: {allScansError.message}</p>

  return (
    <div className="w-full mb-16 px-6">
      <h2 className=" text-2xl text-black text-center font-bold">Scan History</h2>
      <Card className="w-full max-w-5xl mx-auto border-none shadow-xl rounded-xl overflow-hidden bg-white">
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
              <div className="md:col-span-2 p-4 bg-white h-full overflow-y-auto">
                {scanByIdLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : scanByIdError ? (
                  <div className="text-red-500">Error loading scan details: {scanByIdError.message}</div>
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

