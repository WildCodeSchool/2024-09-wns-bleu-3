import Faq from "@/components/Faq"
import FeaturesSection from "@/components/FeaturesSection"
import Help from "@/components/Help"
import HeroSection from "@/components/HeroSection"
import ScanHistory from "@/components/ScanHistory"


const HomePage = () => {
    return (
        <div className="w-full">
            <div className="w-full" id="hero-section">
                <HeroSection />
            </div>
            <div className="w-full mb-16 px-6" id="features-section">
                <FeaturesSection />
            </div>
            <div className="w-full mb-16 px-6" id="faq-section">
                <Faq />
            </div>
            <div className="w-full" id="help-section">
                <Help />
            </div>

        </div>
    )
}

export default HomePage