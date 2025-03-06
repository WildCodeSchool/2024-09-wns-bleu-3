import { CheckCircle, Clock, ExternalLink } from "lucide-react"


const FeaturesSection = () => {
    return (
        <div>
            <section className="container py-12 md:py-16 bg-white">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Discover how to effortlessly scan any URL in just a few steps
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Enter your URL</h3>
                        <p className="text-gray-600">
                            Simply paste the URL you want to monitor and set how often you want to check it.
                        </p>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                            <ExternalLink className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Get instant results</h3>
                        <p className="text-gray-600">
                            Our system will immediately check your URL and provide status data and response time.
                        </p>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-all">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Continuous monitoring</h3>
                        <p className="text-gray-600">
                            We'll keep checking your URL at your specified intervals and alert you of any issues.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default FeaturesSection
