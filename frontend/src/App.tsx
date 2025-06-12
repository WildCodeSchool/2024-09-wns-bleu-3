import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import PrivateLayout from './components/PrivateLayout'
import { GET_ALL_SCANS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ScanPreviewPage from './pages/ScanPreviewPage';
import PrivateRoute from './components/PrivateRoute';
import OnlyGuestRoute from './components/OnlyGuestRoute';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router';

// Component to handle homepage redirect for authenticated users
const HomePageWrapper = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <HomePage />;
};

function App() {
  const { loading, error, data } = useQuery(GET_ALL_SCANS);
  console.log(data)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Routes>
        {/* Public routes with regular Layout (Header + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageWrapper />} />
          <Route path="scan/preview" element={<ScanPreviewPage />} />
          <Route element={<OnlyGuestRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="reset-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        {/* Private routes with DashboardLayout (Sidebar + no Header/Footer) */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<PrivateLayout />}>
            <Route path="settings" element={<ProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="pricing" element={<PricingPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
