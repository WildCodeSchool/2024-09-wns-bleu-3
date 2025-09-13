import { ChartBarIcon, HomeIcon, MonitorIcon, SettingsIcon, Terminal } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Link, useLocation } from 'react-router'
import NavUser from './NavUser'
import HealthWidget from './HealthWidget'



function AppSidebar() {

    const { pathname } = useLocation()


    const items = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: <HomeIcon />,
        },
        {
            title: 'Settings',
            url: '/profile',
            icon: <SettingsIcon />,
        },
        {
            title: 'Monitors',
            url: '/monitors',
            icon: <MonitorIcon />,
        },
        {
            title: 'Analytics',
            url: '/analytics',
            icon: <ChartBarIcon />,
        },
    ]



    return (
        <Sidebar className='dark' collapsible='icon'>
            <SidebarHeader>
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center justify-center w-7 h-7 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded backdrop-blur-sm">
                        <Terminal className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                        <span className="text-dark-blue-100 font-bold">SONAR</span>
                        <span className="text-dark-blue-500 text-xs">v0.0.1</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* Sidebar Menu Group */}
                <SidebarGroup>
                    <SidebarGroupLabel className='text-dark-blue-200 text-xs font-light uppercase'>
                        Menu
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map(({ title, url, icon }) => (
                            <SidebarMenuItem key={title}>
                                <SidebarMenuButton asChild tooltip={title} className='text-dark-blue-200  px-3 py-4 font-light text-xs backdrop-blur-sm data-[active=true]:bg-main-400/10 data-[active=true]:border-main-200/20 data-[active=true]:border data-[active=true]:text-white hover:text-white ' isActive={pathname.startsWith(url)}>
                                    <Link to={url}>
                                        {icon}
                                        <span className='uppercase'>{title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* Health Widget */}
                <HealthWidget
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar