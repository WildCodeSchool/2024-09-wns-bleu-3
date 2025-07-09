import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute() {
    const { loading, isLoggedIn } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}

export default PrivateRoute