import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function OnlyGuestRoute() {
    const { loading, isLoggedIn } = useAuth();

    if (loading) return <p>Chargement…</p>;

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}

export default OnlyGuestRoute
