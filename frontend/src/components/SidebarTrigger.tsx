import React from 'react'
import { Menu } from 'lucide-react'
import { SidebarTrigger as ShadcnSidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

interface SidebarTriggerProps {
    className?: string
}

// Custom SidebarTrigger component for mobile view
export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({
    className
}) => {
    return (
        <ShadcnSidebarTrigger
            className={cn(
                "h-9 w-9 p-0 md:hidden transition-dashboard hover-lift-subtle",
                "hover:bg-white/20 hover:backdrop-blur-sm",
                "border border-white/20 bg-white/10 backdrop-blur-sm",
                "inline-flex items-center justify-center rounded-md",
                className
            )}
        >
            <Menu className="h-4 w-4 text-gray-700" />
            <span className="sr-only">Toggle Sidebar</span>
        </ShadcnSidebarTrigger>
    )
} 