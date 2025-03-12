import FeaturesSection from "@/components/FeaturesSection"
import HeroSection from "@/components/HeroSection"
import ScanHistory from "@/components/ScanHistory"


const HomePage = () => {
    return (
        <div className="w-full">
            <div className="w-full">
                <HeroSection />
            </div>
            <div className="w-full mb-16 px-6">
                <FeaturesSection />
            </div>
            <div className="w-full mb-16 px-6">
                <ScanHistory />
            </div>
        </div>
    )
}

export default HomePage