import { CheckCircle, AlertTriangle, XCircle, HelpCircle, Clock, Activity, LucideIcon, Calendar } from "lucide-react";

export const TITLE = {
    Status: "Status",
    "Response Time": "Response Time",
    Uptime: "Uptime",
    Created: "Created",

    Operational: "Operational",
    "Not Found": "Not Found",
    Error: "Error",
    "Unknown status": "Unknown status",
};


export type StatusVisual = {
    icon: LucideIcon;
    color: string;// tailwind classes
    description?: string

}

export const statusMap: Record<string, StatusVisual> = {
    Operational: {
        icon: CheckCircle,
        color: "bg-green-100 text-green-600",
    },
    "Not Found": {
        icon: AlertTriangle,
        color: "bg-yellow-100 text-yellow-600",
    },
    Error: {
        icon: XCircle,
        color: "bg-red-100 text-red-600",
    },
    "Unknown status": {
        icon: HelpCircle,
        color: "bg-gray-100 text-gray-500",
    },

    "Response Time": {
        icon: Clock,
        color: "bg-gray-100 text-blue-500",
    },

    "Uptime": {
        icon: Activity,
        color: "bg-gray-100 text-green-500",
    },

     "Created": {
        icon: Calendar,
        color: "bg-gray-100 text-gray-500",
    }

};