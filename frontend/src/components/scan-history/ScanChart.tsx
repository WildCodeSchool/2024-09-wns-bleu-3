
// import { useMemo } from "react"
// import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, type TooltipProps } from "recharts"
// import type { ScanItem } from "./types"
// import { CheckCircle, AlertCircle } from "lucide-react"

// interface FormattedDataPoint {
//   time: string
//   hour: string
//   responseTime: number
//   statusCode: number
//   formattedTime: string
//   date: string
//   isError: boolean
// }

// // Format chart data
// const formatChartData = (history: ScanItem["history"]): FormattedDataPoint[] => {
//   return history.map((point) => {
//     const date = new Date(point.timestamp)
//     const hour = date.getHours().toString().padStart(2, "0")
//     const minute = date.getMinutes().toString().padStart(2, "0")

//     return {
//       time: `${hour}:${minute}`,
//       hour: `${hour}h`,
//       responseTime: point.responseTime,
//       statusCode: point.statusCode,
//       formattedTime: `${hour}:${minute}`,
//       date: date.toLocaleDateString(undefined, {
//         month: "short",
//         day: "numeric",
//       }),
//       isError: point.statusCode >= 400,
//     }
//   })
// }

// // Custom tooltip component
// const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
//   if (active && payload && payload.length && payload[0].payload) {
//     const data = payload[0].payload as FormattedDataPoint

//     return (
//       <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
//         <div className="flex items-center gap-2 mb-1">
//           {data.isError ? (
//             <AlertCircle className="h-4 w-4 text-rose-600" />
//           ) : (
//             <CheckCircle className="h-4 w-4 text-emerald-600" />
//           )}
//           <p className="font-barlow font-medium text-sm">
//             {data.date} at {data.formattedTime}
//           </p>
//         </div>

//         <div className="flex flex-col gap-1 mt-1">
//           <div className="flex justify-between items-center">
//             <span className="text-xs text-gray-600">Response Time:</span>
//             <span className="font-medium text-sm">{data.responseTime}ms</span>
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-xs text-gray-600">Status:</span>
//             <span className={`font-medium text-sm ${data.isError ? "text-rose-600" : "text-emerald-600"}`}>
//               {data.statusCode} {data.isError ? "Error" : "OK"}
//             </span>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return null
// }

// // Custom dot component for the line chart
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const renderDot = (props: any) => {
//   // Safely extract properties with fallbacks
//   const cx = props.cx || 0
//   const cy = props.cy || 0
//   const payload = props.payload || {}
//   const statusCode = payload.statusCode || 200

//   const isError = statusCode >= 400

//   return (
//     <circle
//       cx={cx}
//       cy={cy}
//       r={isError ? 4 : 3}
//       fill={isError ? "#e11d48" : "#fff"}
//       stroke={isError ? "#e11d48" : "#3b82f6"}
//       strokeWidth={2}
//     />
//   )
// }

// interface ScanChartProps {
//   history: ScanItem["history"]
// }

// export function ScanChart({ history }: ScanChartProps) {
//   const chartData = useMemo(() => formatChartData(history), [history])

//   // Calculate statistics
//   const avgResponseTime = useMemo(
//     () => Math.round(history.reduce((sum, point) => sum + point.responseTime, 0) / history.length),
//     [history],
//   )

//   const errorCount = useMemo(() => history.filter((point) => point.statusCode >= 400).length, [history])

//   // Calculate domain for Y axis
//   const minResponse = Math.max(0, Math.min(...history.map((h) => h.responseTime)) - 10)
//   const maxResponse = Math.max(...history.map((h) => h.responseTime)) + 20

//   return (
//     <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
//       <div className="flex justify-between items-center mb-3">
//         <h4 className="font-barlow font-medium text-gray-900">Performance Over Time</h4>
//         <div className="text-xs font-barlow text-gray-500">Last 24 Hours</div>
//       </div>

//       <div className="w-full h-[180px] bg-gradient-to-b from-gray-50 to-white rounded-md">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData} margin={{ top: 15, right: 15, left: 15, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />

//             <XAxis
//               dataKey="hour"
//               tick={{ fontSize: 10, fill: "#6b7280" }}
//               tickMargin={10}
//               axisLine={false}
//               tickLine={false}
//               interval={3}
//             />

//             <YAxis
//               domain={[minResponse, maxResponse]}
//               tick={{ fontSize: 10, fill: "#6b7280" }}
//               tickFormatter={(value) => `${value}ms`}
//               tickMargin={10}
//               axisLine={false}
//               tickLine={false}
//               width={50}
//             />

//             <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }} />

//             <Line
//               type="monotone"
//               dataKey="responseTime"
//               stroke="#3b82f6"
//               strokeWidth={2}
//               dot={renderDot}
//               activeDot={{
//                 r: 6,
//                 stroke: "#3b82f6",
//                 strokeWidth: 2,
//                 fill: "white",
//               }}
//               isAnimationActive={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></div>
//             <span className="text-xs text-gray-700 font-barlow">Success</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-rose-600"></div>
//             <span className="text-xs text-gray-700 font-barlow">Error</span>
//           </div>
//         </div>

//         <div className="flex gap-4 text-xs text-gray-700 font-barlow">
//           <div>
//             <span className="font-medium">Avg:</span> {avgResponseTime}ms
//           </div>
//           {errorCount > 0 && (
//             <div>
//               <span className="font-medium">Errors:</span> {errorCount}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

