import FeaturesSection from "@/components/FeaturesSection"
import FormAddScan from "@/components/FormAddScan"
// import RadarVisualization from "@/components/RadarVisualization"
import ScansHistory from "@/components/ScansHistory"

const HomePage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* <RadarVisualization /> */}
            <div className="flex justify-center mb-16">
                <div className="w-full max-w-lg">
                    <FormAddScan />
                </div>
            </div>
            <div className="mb-16">
                <FeaturesSection />
            </div>
            <div className="mb-8">
                <ScansHistory />
            </div>
        </div>
    )
}

export default HomePage