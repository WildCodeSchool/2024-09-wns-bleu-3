import { Link } from "react-router";
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 bg-[#051525] text-white flex items-center justify-center">
                <div className="container max-w-2xl text-center py-16">
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold text-blue-400 mb-4">404</h1>
                        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                        <p className="text-gray-300 text-lg mb-8">
                            Sorry, we couldn't find the page you're looking for. The URL might be incorrect or the page may have been
                            moved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Link to="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>

                        <Button variant="outline" asChild className="border-white text-white hover:bg-white/10 bg-transparent">
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                View Dashboard
                            </Link>
                        </Button>

                        <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-[#0a2540]">
                            <Link to="javascript:history.back()" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Go Back
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 p-6 bg-[#0a2540] rounded-xl border border-[#0c2d4d]">
                        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            If you believe this is an error, please contact our support team.
                        </p>
                        <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10 bg-transparent">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
