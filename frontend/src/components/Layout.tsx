
import { Outlet } from 'react-router'
import { Button } from './ui/button'

const Layout = () => {
    return (
        <main>
            <Button>Test</Button>
            <Outlet />
        </main>
    )
}

export default Layout
