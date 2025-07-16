import { Activity, AlertTriangle, ArrowRight, BarChart4, CheckCircle, ExternalLink } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router'

const CallToAction = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#051525] via-[#0a2540] to-[#051525] text-white relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
                }}
            ></div>
            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-10">
                    <div className="space-y-6 text-left ">
                        <div className="inline-flex items-center rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 mb-6">
                            <Activity className="mr-2 h-4 w-4" />
                            Unlock Your Personal Dashboard
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Get Your Own
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                Monitoring Dashboard
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Sign up today and get instant access to your personalized dashboard where you can monitor all your
                            URLs, track performance metrics, set up custom alerts, and manage your entire monitoring
                            infrastructure from one place.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                                <span className="text-gray-300">Real-time monitoring dashboard</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                                <span className="text-gray-300">Advanced analytics and performance charts</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                                <span className="text-gray-300">Custom alerts and notifications</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                </div>
                                <span className="text-gray-300">Detailed scan history and reports</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25"
                                asChild
                            >
                                <Link to="/signup">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                        </div>

                        <p className="text-sm text-gray-400 mt-4">
                            ✨ No credit card required • Free 14-day trial • Cancel anytime
                        </p>
                    </div>

                    <div className="relative">
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-sm text-gray-400">s0nar Dashboard</div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Main Website</div>
                                            <div className="text-xs text-gray-400">https://example.com</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-green-400">99.8%</div>
                                        <div className="text-xs text-gray-400">245ms</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">API Endpoint</div>
                                            <div className="text-xs text-gray-400">https://api.example.com</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-yellow-400">95.2%</div>
                                        <div className="text-xs text-gray-400">189ms</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Documentation</div>
                                            <div className="text-xs text-gray-400">https://docs.example.com</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-green-400">99.9%</div>
                                        <div className="text-xs text-gray-400">312ms</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart4 className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-medium text-blue-300">Performance Overview</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-lg font-bold text-white">12</div>
                                        <div className="text-xs text-gray-400">Total Scans</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-green-400">8</div>
                                        <div className="text-xs text-gray-400">Active</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-yellow-400">3</div>
                                        <div className="text-xs text-gray-400">Issues</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements for visual appeal */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction
