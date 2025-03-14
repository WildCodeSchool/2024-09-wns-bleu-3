import Faq from "@/components/Faq"
import FeaturesSection from "@/components/FeaturesSection"
import Help from "@/components/Help"
import HeroSection from "@/components/HeroSection"
import ScanHistory from "@/components/ScanHistory"


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
                <ScanHistory />
            </div>
            <div className="w-full mb-16 px-6">
            <Faq />
            </div>
            <div className="w-full">
            <Help />
            </div>

        </div>
    )
}

export default HomePage