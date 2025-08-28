
import { useState } from "react"
import { Search, Filter, CheckCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Status code filter options
// eslint-disable-next-line react-refresh/only-export-components
export const STATUS_FILTERS = [
  { value: "200", label: "200 - Success" },
  { value: "400", label: "400 - Client Errors" },
  { value: "500", label: "500 - Server Errors" },
]

// Get color for filter badge
// eslint-disable-next-line react-refresh/only-export-components
export const getFilterColor = (filter: string) => {
  if (filter === "200") return "bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30"
  if (filter === "400") return "bg-amber-400/20 text-amber-400 hover:bg-amber-400/30"
  if (filter === "500") return "bg-rose-400/20 text-rose-400 hover:bg-rose-400/30"
  return "bg-slate-600/20 text-slate-300 hover:bg-slate-600/30"
}

interface SearchFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeFilters: string[]
  setActiveFilters: (filters: string[]) => void
}

export function SearchFilter({ searchTerm, setSearchTerm, activeFilters, setActiveFilters }: SearchFilterProps) {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)

  // Add or remove a filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  // Remove a filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-900/50 border-b border-white/10">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            className="pl-10 bg-slate-800/50 border-white/10 text-slate-300 placeholder:text-slate-400 rounded-md focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 shadow-sm font-barlow"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 border border-white/10 rounded-md shadow-sm hover:bg-slate-700/50 hover:text-white transition-colors font-barlow font-medium"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilters.length > 0 && (
              <span className="bg-blue-400/20 text-blue-400 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>

          {filterMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-white/10 rounded-md shadow-lg z-10 w-48 p-2">
              <div className="text-xs font-barlow font-medium text-slate-300 mb-2 px-2">Status Code</div>
              {STATUS_FILTERS.map((filter) => (
                <div
                  key={filter.value}
                  className={`flex items-center justify-between px-3 py-3 mb-1 rounded-md cursor-pointer transition-colors ${activeFilters.includes(filter.value)
                    ? filter.value === "200"
                      ? "bg-emerald-400/20 text-emerald-400"
                      : filter.value === "400"
                        ? "bg-amber-400/20 text-amber-400"
                        : "bg-rose-400/20 text-rose-400"
                    : "hover:bg-slate-700/50 text-slate-300"
                    }`}
                  onClick={() => toggleFilter(filter.value)}
                >
                  <span className="font-barlow">{filter.label}</span>
                  {activeFilters.includes(filter.value) && (
                    <CheckCircle
                      className={`h-4 w-4 ${filter.value === "200"
                        ? "text-emerald-400"
                        : filter.value === "400"
                          ? "text-amber-400"
                          : "text-rose-400"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((filter) => {
            const filterLabel = STATUS_FILTERS.find((f) => f.value === filter)?.label || filter
            return (
              <Badge key={filter} className={`${getFilterColor(filter)} font-barlow px-3 py-1 flex items-center gap-1`}>
                {filterLabel}
                <button onClick={() => removeFilter(filter)} className="ml-1 rounded-full hover:bg-slate-600/30 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}

          {activeFilters.length > 1 && (
            <button
              onClick={() => setActiveFilters([])}
              className="text-xs text-blue-600 hover:text-blue-800 font-barlow"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  )
}

