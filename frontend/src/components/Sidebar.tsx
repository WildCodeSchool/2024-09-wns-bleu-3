import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import {
    Home,
    Shield,
    History,
    Settings,
    HelpCircle,
    Sparkles,
    LogOut,
    Zap
} from 'lucide-react'
import Avatar from 'boring-avatars'

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { useLogoutMutation } from '@/generated/graphql-types'

// Navigation items for the sidebar
const navigationItems = [
    {
        title: 'Dashboard',
        icon: Home,
        href: '/dashboard',
    },
    {
        title: 'Security Scans',
        icon: Shield,
        href: '/scans',
    },
    {
        title: 'Scan History',
        icon: History,
        href: '/history',
    },
    {
        title: 'Settings',
        icon: Settings,
        href: '/settings',
    },
    {
        title: 'Help & Support',
        icon: HelpCircle,
        href: '/help',
    },
]

// Custom Sidebar component using shadcn sidebar system
export const Sidebar: React.FC = () => {
    const location = useLocation()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    // Handle logout by clearing localStorage and redirecting
    const handleLogout = async () => {
        try {
            await logout()
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    // Capitalize username helper
    const capitalizeUsername = (name: string) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    }

    return (
        <ShadcnSidebar
            variant="sidebar"
            collapsible="offcanvas"
            className="w-80 bg-white/15 backdrop-blur-xl border-r border-white/30 shadow-2xl relative z-50 h-screen flex flex-col"
        >
            {/* Sidebar Header with Logo */}
            <SidebarHeader className="p-6 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/80 to-purple-600/80 backdrop-blur-sm shadow-lg shadow-blue-500/25">
                            <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-left">
                            Sonar
                        </h2>
                        <p className="text-xs text-slate-600 font-medium text-left">Monitor & Protect</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent className="p-4 flex-1 flex flex-col overflow-y-auto">
                <SidebarMenu className="space-y-1 flex-shrink-0">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.href
                        const Icon = item.icon

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    className={`w-full justify-start gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${isActive
                                        ? "bg-white/95 backdrop-blur-sm text-slate-900 shadow-lg shadow-slate-900/10 border border-white/60"
                                        : "text-slate-600 hover:text-slate-800 hover:bg-white/50 hover:backdrop-blur-sm"
                                        }`}
                                >
                                    <Link to={item.href}>
                                        <Icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>

                {/* Spacer to push upgrade card towards bottom */}
                <div className="flex-1 min-h-4"></div>

                {/* Upgrade Card */}
                <div className="mt-6 p-4 rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/30 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-pink-500/10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-6 w-6 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-xs font-bold text-violet-700 tracking-wider">PREMIUM</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 mb-1">Unlock Pro Features</h3>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            Advanced monitoring, custom alerts & priority support
                        </p>
                        <Button
                            asChild
                            size="sm"
                            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white border-0 shadow-lg font-medium py-2"
                        >
                            <Link to="/pricing">
                                Upgrade Now
                            </Link>
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full blur-xl"></div>
                </div>
            </SidebarContent>

            {/* Sidebar Footer with User Profile */}
            <SidebarFooter className="p-4 border-t border-white/10 flex-shrink-0">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/40">
                    <Avatar
                        size={36}
                        name={user?.email || 'User'}
                        variant="marble"
                        colors={['#1F5CFF', '#924FFF', '#EC4899', '#F59E0B', '#10B981']}
                    />
                    <div className="flex-1 min-w-0 flex flex-col items-start">
                        <p className="text-sm font-bold text-slate-800 truncate text-left w-full">
                            {user?.username ? capitalizeUsername(user.username) : user?.email || 'User'}
                        </p>
                        <p className="text-xs text-slate-600 truncate text-left w-full">
                            Free Plan
                            <Badge variant="secondary" className="ml-1 text-xs">
                                Beta
                            </Badge>
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="h-8 w-8 p-2 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded-xl cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Logout</span>
                    </Button>
                </div>
            </SidebarFooter>
        </ShadcnSidebar>
    )
} 