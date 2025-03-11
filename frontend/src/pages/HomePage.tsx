import FeaturesSection from "@/components/FeaturesSection"
import HeroSection from "@/components/HeroSection"
import ScansHistory from "@/components/ScansHistory"

const HomePage = () => {
    return (
        <div className="w-full">
            <div className="">
                <HeroSection />
            </div>
            <div className="w-full mb-16 px-6">
                <FeaturesSection />
            </div>
            <div className="w-full mb-16 px-6">
                <ScansHistory />
            </div>
        </div>
    )
}

export default HomePage