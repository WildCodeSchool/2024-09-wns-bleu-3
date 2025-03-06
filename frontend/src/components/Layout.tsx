import { Outlet } from 'react-router';
// import { Button } from './ui/button';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
              <Header />
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;