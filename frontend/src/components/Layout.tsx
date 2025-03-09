import { Outlet } from 'react-router';
// import { Button } from './ui/button';
import Footer from './Footer';
import Help from './Help';
import Faq from './Faq';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Faq />
            <Help />
            <Footer />
        </div>
    );
};

export default Layout;