import { Outlet } from 'react-router';
import { Button } from './ui/button';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="container mx-auto px-4 py-4">
                <Button>Test</Button>
            </header>

            <main className="flex-grow container mx-auto px-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;