import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/Register/Register.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';


const router = createBrowserRouter([

  {
    // pour afficher la page qui vient dès qu'on lance le site
    path: "/",
    element: <App />,
  },
  //--------------------------------------------
  {
    // la route qui redirige vers la page de login
    path: "/dashboard",
    element: <Dashboard />,
    // fallback: <Redirect to="/" /> // if login failed, redirect to home page
  },
  //--------------------------------------------
  {
    // la route qui redirige vers la page de création de compte de l'utilisateur
    path: "/register",
    element: <Register />,
    // fallback: <Redirect to="/" /> // if login failed, redirect to home page
  },
  //--------------------------------------------

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
