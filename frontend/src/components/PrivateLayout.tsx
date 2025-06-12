import { Outlet } from 'react-router'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Toaster } from 'sonner'

// PrivateLayout component - wraps authenticated routes with DashboardLayout
const PrivateLayout = () => {
    return (
        <div className="min-h-screen">
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
            <Toaster />
        </div>
    )
}

export default PrivateLayout 