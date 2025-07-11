
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
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
import ScanDetailsPage from './pages/ScanDetailsPage';
import NotFound from './not-found';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_SCANS);
  console.log(data)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Public routes accessible to all users */}
          <Route path="scan/preview" element={<ScanPreviewPage />} />
          <Route path="*" element={<NotFound />} />
          {/* Private routes accessible to all users already authenticated */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          {/* Only not authenticated users can access those, so the authenticated ones can't get to signup page for example*/}
          <Route element={<OnlyGuestRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="reset-password" element={<ForgotPasswordPage />} />
            <Route path="scan-details" element={<ScanDetailsPage />} />
          </Route>
        </Route >
      </Routes >
    </>
  )
}

export default App
