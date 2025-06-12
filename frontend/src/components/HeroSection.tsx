import PublicScanForm from "./PublicScanForm";

const HeroSection = () => {
    return (
        <div className="h-screen">
            <section className="w-full h-full py-12 md:py-24 bg-[#051525] text-white relative radar-background">
                <div className="radar-glow"></div>
                <div className=" radar-content relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">
                            Scan URLs Quickly and Easily
                        </h1>
                        <p className="text-gray-300 md:text-xl mt-4 max-w-2xl mx-auto">
                            Monitor your websites and APIs with our powerful URL scanning tool. Get instant alerts when your sites
                            go down or experience issues.
                        </p>
                    </div>
                </div>
                <div className="z-10 relative">
                    <PublicScanForm />
                </div>
            </section>
        </div>
    );
};

export default HeroSection;

