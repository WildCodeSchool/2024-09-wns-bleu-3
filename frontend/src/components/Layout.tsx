import { Outlet } from 'react-router';
// import { Button } from './ui/button';
import Footer from './Footer';
import Header from './Header';
import { Toaster } from 'sonner';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </div>
    );
};

export default Layout;