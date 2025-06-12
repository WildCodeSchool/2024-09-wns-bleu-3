import React from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/Sidebar'
import { SidebarTrigger } from '@/components/SidebarTrigger'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface DashboardLayoutProps {
    children: React.ReactNode
}

// DashboardLayout component - wrapper providing sidebar + gradient background
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user } = useAuth()

    // Capitalize username helper
    const capitalizeUsername = (name: string) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    }

    return (
        <div className="h-screen w-full bg-gradient-to-br from-rose-50 via-blue-50 to-violet-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-violet-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/6 w-72 h-72 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
            </div>

            <SidebarProvider>
                <div className="flex h-screen w-full relative z-10">
                    {/* Sidebar container with proper z-index and height */}
                    <div className="relative z-50 h-screen">
                        <Sidebar />
                    </div>

                    {/* Main content area */}
                    <SidebarInset className="flex-1 w-full overflow-auto relative z-10">
                        <div className="w-full max-w-none p-8 ml-6 mr-6 relative z-10">
                            {/* Header area with greeting and action buttons */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                <div className="flex items-center gap-4">
                                    {/* Mobile sidebar trigger */}
                                    <SidebarTrigger className="md:hidden" />

                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                                                Good morning, {user?.username ? capitalizeUsername(user.username) : 'User'} ✨
                                            </h1>
                                        </div>
                                        <p className="text-slate-600 font-medium">
                                            Your infrastructure is running smoothly. Here's your overview.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 bg-white/60 backdrop-blur-sm border-white/50 hover:bg-white/80 shadow-lg transition-all duration-300 hover:shadow-xl"
                                    >
                                        <Bell className="h-4 w-4" />
                                        <span className="hidden md:inline">Notifications</span>
                                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 ml-1">3</Badge>
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Monitor
                                    </Button>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="animate-fade-in w-full">
                                {children}
                            </div>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
} 