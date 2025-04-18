
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import { GET_ALL_SCANS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

// import SettingsPage from './pages/ProfilePage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="reset-password" element={<ForgotPasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
