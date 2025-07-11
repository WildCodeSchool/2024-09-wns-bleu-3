import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import AppSidebar from './AppSidebar';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';
import ModernNotifications from './ModernNotifications';

const DashboardLayout = () => {
    return (
        <SidebarProvider >
            <AppSidebar />
            <main className='bg-dark-blue-900 pt-2 flex-1'>
                <header className='flex flex-row md:flex-row justify-between md:items-center mb-8 gap-2 px-5 pt-3'>
                    <SidebarTrigger className=' text-white hover:bg-main-300/10 text-center p-2 -ml-1 border border-main-400/20 cursor-pointer' />
                    <div className="flex gap-4">
                        <ModernNotifications />
                        <Button variant="outline" className="gap-2 border-slate-700/50 text-slate-400 hover:text-slate-100 hover:bg-slate-800/30">
                            <Settings className="h-4 w-4" />
                            <span className="hidden md:inline">Settings</span>
                        </Button>
                    </div>
                </header>
                {/* Children in documentation (next), use Outlet with react-router */}
                <Outlet />
            </main>
            <Toaster />
        </SidebarProvider>
    );
};

export default DashboardLayout;