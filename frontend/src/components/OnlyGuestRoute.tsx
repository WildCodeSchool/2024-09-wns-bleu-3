import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function OnlyGuestRoute() {
    const { loading, isLoggedIn } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />
}

export default OnlyGuestRoute
