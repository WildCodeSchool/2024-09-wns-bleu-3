import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

// const scans = [
//     {
//         id: "scan-1",
//         title: "Main Website",
//         url: "https://example.com",
//         status: 200,
//         responseTime: 245,
//         lastChecked: "2 mins ago",
//         frequency: "Every 5 minutes",
//         uptime: "99.8%",
//         tag: "Production",
//         history: [
//             { timestamp: "2023-06-15T10:00:00Z", status: 200, responseTime: 245 },
//             { timestamp: "2023-06-15T09:55:00Z", status: 200, responseTime: 238 },
//             { timestamp: "2023-06-15T09:50:00Z", status: 200, responseTime: 252 },
//             { timestamp: "2023-06-15T09:45:00Z", status: 200, responseTime: 241 },
//             { timestamp: "2023-06-15T09:40:00Z", status: 200, responseTime: 249 },
//             { timestamp: "2023-06-15T09:35:00Z", status: 200, responseTime: 243 },
//             { timestamp: "2023-06-15T09:30:00Z", status: 200, responseTime: 247 },
//             { timestamp: "2023-06-15T09:25:00Z", status: 200, responseTime: 250 },
//             { timestamp: "2023-06-15T09:20:00Z", status: 200, responseTime: 244 },
//             { timestamp: "2023-06-15T09:15:00Z", status: 200, responseTime: 242 },
//         ],
//         headers: {
//             "Content-Type": "text/html; charset=UTF-8",
//             Server: "nginx/1.18.0",
//             Date: "Thu, 15 Jun 2023 10:00:00 GMT",
//             "Content-Length": "1256",
//             Connection: "keep-alive",
//             "Cache-Control": "max-age=3600",
//         },
//         notifications: [
//             { type: "email", target: "admin@example.com", enabled: true },
//             { type: "slack", target: "#monitoring", enabled: true },
//             { type: "webhook", target: "https://hooks.example.com/monitor", enabled: false },
//         ],
//     },
//
// ]


const ScanDetailsCards = () => {

    // const getStatusDisplay = (status: number) => {
    //     if (status === 200)
    //         return { icon: <CheckCircle className="h-5 w-5" />, text: "Operational", color: "bg-green-100 text-green-600" }
    //     if (status === 404)
    //         return { icon: <AlertTriangle className="h-5 w-5" />, text: "Not Found", color: "bg-yellow-100 text-yellow-600" }
    //     return { icon: <XCircle className="h-5 w-5" />, text: "Error", color: "bg-red-100 text-red-600" }
    // }

    // const statusDisplay = getStatusDisplay(scan.status)
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600`}>
                                <CheckCircle className="h-5 w-5" />
                            </div>
                            <div className="text-2xl font-bold">Operational</div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 w-full text-left">Last checked 2 mins ago</div>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default ScanDetailsCards