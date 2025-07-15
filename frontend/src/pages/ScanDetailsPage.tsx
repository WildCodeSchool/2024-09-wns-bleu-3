import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { ScanDetailsChart } from "@/components/scan-details/ScanDetailsChart"
import { Button } from "@/components/ui/button"
import { GET_SCAN_BY_ID, GET_SCAN_HISTORY } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"



const ScanDetailsPage = () => {

    const { id } = useParams();

    const { loading: scanByIdLoading, error: scanByIdError, data: scanByIdData } = useQuery(GET_SCAN_BY_ID, {
        variables: { getScanByIdId: id ? Number(id) : 0 },
    });

    const { data: historyData, loading: historyLoading } = useQuery(GET_SCAN_HISTORY, {
        variables: { scanId: id ? Number(id) : 0 },
    });

    const scanHistory = historyData?.getScanHistory || [];

    if (scanByIdLoading || !scanByIdData) return <p>Loading...</p>

    if (scanByIdError) return <p>Error: {scanByIdError.message}</p>

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 bg-gray-50">
                    <div className=" py-8 px-6">
                        {/* back to dashboard */}
                        <div className="flex items-center mb-6">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/dashboard">
                                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Scans
                                </Link>
                            </Button>
                        </div>

                        {/*** HC-51 ***/}

                        {/*** HC-50 ***/}
                        <ScanDetailsCards />
                        {/*** HC-53 ***/}
                        <h2 className=" mb-6 text-2xl text-black text-left font-bold">Scan History</h2>
                        {historyLoading ? <p>Loading...</p> :
                            <ScanDetailsChart history={scanHistory} />}
                        {/*** HC-52 ***/}

                    </div>
                </main>
            </div>
        </>
    )
}

export default ScanDetailsPage



