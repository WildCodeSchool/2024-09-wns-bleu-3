import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { ScanDetailsChart } from "@/components/scan-details/ScanDetailsChart"
import { Button } from "@/components/ui/button"
import { useGetScanByIdQuery } from "@/generated/graphql-types"
import { useGetScanHistoryQuery } from "@/generated/graphql-types"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"



const ScanDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useGetScanByIdQuery({ variables: { getScanByIdId: Number(id) } })
    const { data: historyData, loading: historyLoading } = useGetScanHistoryQuery({
        variables: { scanId: Number(id) },
    });



    console.log("scanDetails ==>", data)


    if (loading) return <p>Loading...</p>
    if (error) return <p>There is an error: {error.message}</p>


    const scanHistory = historyData?.getScanHistory || [];


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



