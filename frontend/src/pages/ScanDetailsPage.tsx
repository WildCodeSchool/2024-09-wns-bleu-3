import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"



const ScanDetailsPage = () => {

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 bg-gray-50">
                    <div className="container py-8 px-6">
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

                        {/*** HC-52 ***/}

                    </div>
                </main>
            </div>
        </>
    )
}

export default ScanDetailsPage



