import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { Button } from "@/components/ui/button"
import { GetScanByIdQuery, useGetScanByIdQuery } from "@/generated/graphql-types"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"

export type IScanDetails = GetScanByIdQuery["getScanById"];

const ScanDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useGetScanByIdQuery({ variables: { getScanByIdId: Number(id) } })



    console.log("scanDetails ==>", data?.getScanById)


    if (loading) return <p>Loading...</p>
    if (error) return <p>There is an error: {error.message}</p>
    if (!data?.getScanById) return null;

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
                        <ScanDetailsCards scan={data.getScanById} />
                        {/*** HC-53 ***/}

                        {/*** HC-52 ***/}

                    </div>
                </main>
            </div>
        </>
    )
}

export default ScanDetailsPage



