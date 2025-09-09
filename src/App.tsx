import './App.css'
import Layout from './layout/layout'
// import TopBar from './layout/topBar'
import { createBrowserRouter, RouterProvider } from 'react-router'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
