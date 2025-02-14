
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import { GET_ALL_SCANS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import HomePage from './pages/HomePage';

function App() {


  const { loading, error, data } = useQuery(GET_ALL_SCANS);
  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />

      </Routes>
    </>
  )
}

export default App
