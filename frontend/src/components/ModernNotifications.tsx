"use client"

import { useState } from "react"
import { Link } from "react-router"
import {
    Bell,
    Clock,
    Server,
    Gauge,
    Shield,
    Wifi,
    WifiOff,
    Database,
    ExternalLink,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

// Notifications data
const notifications = [
    {
        id: 1,
        type: "critical",
        title: "Monitor Down",
        message: "PAYMENT_GATEWAY is returning HTTP 500 errors",
        time: "2 minutes ago",
        read: false,
        scanId: "M-006",
        scanName: "Payment Gateway",
        icon: Server,
        details:
            "Multiple consecutive failures detected. Last successful check was 15 minutes ago. This affects payment processing for all customers.",
        actions: ["View Monitor", "Check Logs", "Create Incident"],
    },
    {
        id: 2,
        type: "warning",
        title: "High Response Time",
        message: "API_ENDPOINT response time exceeded threshold",
        time: "8 minutes ago",
        read: false,
        scanId: "M-002",
        scanName: "API Endpoint",
        icon: Gauge,
        details:
            "Average response time: 1,247ms (threshold: 1000ms). Consider investigating server performance or scaling resources.",
        actions: ["View Monitor", "Check Performance", "Scale Resources"],
    },
    {
        id: 3,
        type: "critical",
        title: "SSL Certificate Expiring",
        message: "MAIN_WEBSITE SSL certificate expires in 3 days",
        time: "1 hour ago",
        read: false,
        scanId: "M-001",
        scanName: "Main Website",
        icon: Shield,
        details:
            "Certificate expires on July 14, 2025. Renewal required to avoid service disruption and security warnings.",
        actions: ["Renew Certificate", "View Details", "Set Reminder"],
    },
    {
        id: 4,
        type: "error",
        title: "Monitor Offline",
        message: "STAGING_ENV returning HTTP 404 errors",
        time: "2 hours ago",
        read: true,
        scanId: "M-003",
        scanName: "Staging Environment",
        icon: WifiOff,
        details: "Service appears to be completely offline. Last successful response was 3 hours ago.",
        actions: ["Restart Service", "Check Deployment", "View Logs"],
    },
    {
        id: 5,
        type: "info",
        title: "Monitor Recovered",
        message: "AUTH_SERVICE is back online and responding normally",
        time: "3 hours ago",
        read: true,
        scanId: "M-005",
        scanName: "Auth Service",
        icon: Wifi,
        details: "Service recovered after 45 minutes of downtime. All authentication systems are now operational.",
        actions: ["View Report", "Check Metrics"],
    },
    {
        id: 6,
        type: "warning",
        title: "Database Connection Issues",
        message: "DOCS_SITE experiencing intermittent timeouts",
        time: "4 hours ago",
        read: true,
        scanId: "M-004",
        scanName: "Documentation Site",
        icon: Database,
        details: "Sporadic connection timeouts detected. Monitor for potential database performance issues.",
        actions: ["Check Database", "View Metrics", "Optimize Queries"],
    },
]

export default function ModernNotifications() {
    const [selectedNotification, setSelectedNotification] = useState<(typeof notifications)[0] | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const unreadCount = notifications.filter((n) => !n.read).length

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "critical":
                return { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950" }
            case "error":
                return { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950" }
            case "warning":
                return { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950" }
            case "info":
                return { icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" }
            default:
                return { icon: Info, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-950" }
        }
    }

    const handleNotificationClick = (notification: (typeof notifications)[0]) => {
        setSelectedNotification(notification)
        setIsSheetOpen(true)
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="relative text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="ml-2 text-sm">Notifications</span>
                        {unreadCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white border-0 shadow-lg">
                                {unreadCount}
                            </Badge>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-96 p-0 bg-dark-blue-900/95 border-white/10 backdrop-blur-xl"
                    align="end"
                    sideOffset={8}
                >
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-main-400" />
                            <h3 className="font-bold text-white">NOTIFICATIONS</h3>
                            {unreadCount > 0 && (
                                <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm">
                                    {unreadCount} NEW
                                </Badge>
                            )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white hover:bg-white/10">
                            Mark all read
                        </Button>
                    </div>

                    <ScrollArea className="h-[400px]">
                        <div className="p-2 space-y-2">
                            {notifications.map((notification) => {
                                const iconConfig = getNotificationIcon(notification.type)
                                const IconComponent = notification.icon

                                return (
                                    <div key={notification.id}>
                                        <div
                                            className={`p-2.5 cursor-pointer transition-all hover:bg-white/10 rounded-lg border border-white/10 ${!notification.read ? "bg-white/5" : "bg-transparent"
                                                }`}
                                            onClick={() => handleNotificationClick(notification)}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className={`h-6 w-6 rounded-md flex items-center justify-center ${iconConfig.color} bg-current/20 border border-current/30 flex-shrink-0`}>
                                                    <IconComponent className="h-3 w-3" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4
                                                            className={`font-medium text-xs truncate ${!notification.read ? "text-white" : "text-slate-300"
                                                                }`}
                                                        >
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.read && <div className="w-1.5 h-1.5 bg-main-400 rounded-full flex-shrink-0" />}
                                                        <Badge className={`text-[10px] px-1.5 py-0.5 ${iconConfig.color} bg-current/20 border border-current/30 ml-auto`}>
                                                            {notification.type.toUpperCase()}
                                                        </Badge>
                                                    </div>

                                                    <p className="text-xs text-slate-400 mb-1 line-clamp-1">{notification.message}</p>

                                                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                        <Clock className="h-2.5 w-2.5" />
                                                        {notification.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollArea>

                    <div className="p-3 border-t border-white/10">
                        <Button variant="ghost" className="w-full text-sm text-slate-400 hover:text-white hover:bg-white/10">
                            View all notifications
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Detailed Notification Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-[400px] sm:w-[540px] bg-dark-blue-900/95 border-white/10 backdrop-blur-xl">
                    {selectedNotification && (
                        <>
                            <SheetHeader className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className={`h-10 w-10 ${getNotificationIcon(selectedNotification.type).bg}`}>
                                        <AvatarFallback
                                            className={`${getNotificationIcon(selectedNotification.type).bg} ${getNotificationIcon(selectedNotification.type).color}`}
                                        >
                                            <selectedNotification.icon className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <SheetTitle className="text-white font-bold">{selectedNotification.title}</SheetTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                className={`text-xs ${getNotificationIcon(selectedNotification.type).color} bg-current/20 border border-current/30`}
                                            >
                                                {selectedNotification.type.toUpperCase()}
                                            </Badge>
                                            <span className="text-xs text-slate-400">{selectedNotification.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="space-y-6 mt-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2">MESSAGE</h4>
                                    <p className="text-slate-300">{selectedNotification.message}</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">DETAILS</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{selectedNotification.details}</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">MONITOR</h4>
                                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-white">{selectedNotification.scanName}</p>
                                                    <p className="text-sm text-slate-400">{selectedNotification.scanId}</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white bg-transparent"
                                                >
                                                    <Link to={`/dashboard/${selectedNotification.scanId}`}>
                                                        <ExternalLink className="h-3 w-3 mr-1" />
                                                        View
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-3">QUICK ACTIONS</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedNotification.actions.map((action, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white bg-transparent"
                                            >
                                                {action}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {selectedNotification.type === "critical" && (
                                    <div className="p-4 bg-red-950/30 border border-red-800/30 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="h-4 w-4 text-red-400" />
                                            <span className="font-medium text-red-400">Critical Alert</span>
                                        </div>
                                        <p className="text-sm text-red-300">
                                            This issue requires immediate attention and may impact service availability.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
