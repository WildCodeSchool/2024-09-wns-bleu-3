import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowLeft, Crown, Zap, Shield, TrendingUp } from 'lucide-react'
import { Link } from 'react-router'

// PricingPage component - dummy pricing page for upgrade buttons
const PricingPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="space-y-3">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                        Choose Your Plan
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Upgrade to unlock advanced monitoring features and get priority support for your infrastructure.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Plan */}
                <Card className="border bg-white/60 backdrop-blur-xl shadow-xl border-white/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/2"></div>
                    <CardHeader className="relative z-10 text-center pb-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-8 w-8 bg-slate-900/80 rounded-xl flex items-center justify-center">
                                <Shield className="h-4 w-4 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900">Free</CardTitle>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-slate-900">$0</div>
                            <p className="text-sm text-slate-600">per month</p>
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Up to 5 monitors</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">5-minute intervals</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Email notifications</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Basic dashboard</span>
                            </li>
                        </ul>
                        <Button
                            variant="outline"
                            className="w-full bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90 shadow-lg"
                            disabled
                        >
                            Current Plan
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 relative overflow-hidden scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg font-bold px-4 py-1">
                            Most Popular
                        </Badge>
                    </div>
                    <CardHeader className="relative z-10 text-center pb-4 pt-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900">Pro</CardTitle>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-slate-900">$29</div>
                            <p className="text-sm text-slate-600">per month</p>
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Unlimited monitors</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">1-minute intervals</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">SMS + Email + Slack</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Advanced analytics</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Custom alerts</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Priority support</span>
                            </li>
                        </ul>
                        <Button className="w-full btn-dashboard-primary">
                            Upgrade to Pro
                        </Button>
                    </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-pink-500/5"></div>
                    <CardHeader className="relative z-10 text-center pb-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <div className="h-8 w-8 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <Crown className="h-4 w-4 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900">Enterprise</CardTitle>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-slate-900">$99</div>
                            <p className="text-sm text-slate-600">per month</p>
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Everything in Pro</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">30-second intervals</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">White-label reports</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">API access</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">Dedicated support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Check className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm text-slate-700">SLA guarantee</span>
                            </li>
                        </ul>
                        <Button
                            variant="outline"
                            className="w-full btn-dashboard-premium"
                        >
                            Contact Sales
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Features Section */}
            <div className="max-w-4xl mx-auto">
                <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-xl border border-white/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/2"></div>
                    <CardHeader className="relative z-10 text-center">
                        <CardTitle className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-3">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                            Why Choose Sonar Pro?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Advanced Monitoring</h3>
                                <p className="text-slate-600">
                                    Get real-time insights with faster check intervals and comprehensive analytics
                                    to keep your services running smoothly.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Smart Alerts</h3>
                                <p className="text-slate-600">
                                    Receive notifications through multiple channels with intelligent alert routing
                                    and escalation policies.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Priority Support</h3>
                                <p className="text-slate-600">
                                    Get help when you need it most with dedicated support channels and faster
                                    response times.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Scalable Infrastructure</h3>
                                <p className="text-slate-600">
                                    Monitor unlimited endpoints with enterprise-grade reliability and
                                    99.9% uptime guarantee.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PricingPage 