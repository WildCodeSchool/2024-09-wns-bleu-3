import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react"
import { Link } from "react-router"
import {
    Bell,
    Clock,
    Gauge,
    Shield,
    ExternalLink,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Info,
    LucideProps,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useGetAllScanHistoryQuery, useScanHistoryCreatedSubscription } from "@/generated/graphql-types"

interface NotificationItem {
    id: string
    type: string
    title: string
    message: string
    time: string
    read: boolean
    scanId: number
    scanName: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    details: string
    actions: string[]
}

interface scanHistorySimplified {
    id: number
    createdAt: string | Date
    url: string
    isOnline: boolean
    responseTime: number
    sslCertificate: string
    statusCode: number
    statusMessage: string
    scan: {
        id: number
        url: string
        title: string
    }
}

export default function ModernNotifications() {
    const [selectedNotification, setSelectedNotification] = useState<(typeof notifications)[0] | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [readNotificationIds, setReadNotificationIds] = useState<string[]>([])
    const [notifications, setNotifications] = useState<NotificationItem[]>([])


    useScanHistoryCreatedSubscription({
        onData: ({ data }) => {
            const newScan = data?.data?.scanHistoryAdded
            if (!newScan) return

            // On transforme le scan en NotificationItem(s)
            const newNotifications = generateNotificationsFromHistory([newScan])

            if (newNotifications.length > 0) {
                setNotifications(prev => [...newNotifications, ...prev])
            }
        },
    })

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

    const handleNotificationClick = (notification: NotificationItem) => {
        setSelectedNotification(notification)
        setIsSheetOpen(true)
        if (!readNotificationIds.includes(notification.id)) {
            setReadNotificationIds(prevIds => [...prevIds, notification.id]);
        }
        setNotifications(prev =>
            prev.filter(n => n.id !== notification.id)
        )
    }

    const { data: historyData } = useGetAllScanHistoryQuery()

    const allHistory = historyData?.getAllScanHistory

    const formatTimeAgo = (date: Date | string) => {
        const now = new Date()
        const scanDate = new Date(date)
        const diff = now.getTime() - scanDate.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
        return 'Just now'
    }

    const isSSLExpired = (sslCertificate: string) => {
        // Simple vérification si le certificat contient des mots-clés d'expiration
        const lowerCert = sslCertificate.toLowerCase()
        return lowerCert.includes('expired') || lowerCert.includes('invalid') || lowerCert.includes('error')
    }

    const generateNotificationsFromHistory = (history: scanHistorySimplified[]): NotificationItem[] => {
        const notifications: NotificationItem[] = []

        history.forEach(scan => {
            // Notification pour temps de réponse élevé
            if (scan.responseTime > 350) {
                notifications.push({
                    id: `response-${scan.id}`,
                    type: "warning",
                    title: "High Response Time",
                    message: `${scan.url} response time: ${scan.responseTime}ms`,
                    time: formatTimeAgo(scan.createdAt),
                    read: false,
                    scanId: scan.scan.id,
                    scanName: scan.scan.title,
                    icon: Gauge,
                    details: `Response time ${scan.responseTime}ms exceeded threshold of 350ms`,
                    actions: ["View Monitor", "Check Performance"]
                })
            }

            // Notification pour erreur de status code
            if (scan.statusCode >= 400) {
                notifications.push({
                    id: `status-${scan.id}`,
                    type: "error",
                    title: "Status Code Error",
                    message: `${scan.url} returned ${scan.statusCode}`,
                    time: formatTimeAgo(scan.createdAt),
                    read: false,
                    scanId: scan.scan.id,
                    scanName: scan.scan.title,
                    icon: XCircle,
                    details: `HTTP ${scan.statusCode}: ${scan.statusMessage}`,
                    actions: ["View Monitor", "Check Logs"]
                })
            }

            // Notification pour certificat SSL expiré
            if (scan.sslCertificate && isSSLExpired(scan.sslCertificate)) {
                notifications.push({
                    id: `ssl-${scan.id}`,
                    type: "critical",
                    title: "SSL Certificate Issue",
                    message: `${scan.url} SSL certificate expired`,
                    time: formatTimeAgo(scan.createdAt),
                    read: false,
                    scanId: scan.scan.id,
                    scanName: scan.scan.title,
                    icon: Shield,
                    details: `SSL certificate needs renewal`,
                    actions: ["Renew Certificate", "View Details"]
                })
            }
        })

        return notifications
    }

    useEffect(() => {
        if (allHistory) {
            setNotifications(generateNotificationsFromHistory(allHistory))
        }
    }, [allHistory])

    // const realNotifications = allHistory ? generateNotificationsFromHistory(allHistory) : []

    const unreadCount = notifications.filter(n => !readNotificationIds.includes(n.id)).length

    console.log(notifications)

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
