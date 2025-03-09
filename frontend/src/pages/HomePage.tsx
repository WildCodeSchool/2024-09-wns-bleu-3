import FeaturesSection from "@/components/FeaturesSection"
import FormAddScan from "@/components/FormAddScan"
// import RadarVisualization from "@/components/RadarVisualization"
import ScansHistory from "@/components/ScansHistory"


const HomePage = () => {
    return (
        <div>
            {/* <RadarVisualization /> */}
            <FormAddScan />
            <FeaturesSection />
            <ScansHistory />
        </div>
    )
}

export default HomePage
