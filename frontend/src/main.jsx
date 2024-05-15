import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {
  ToastContainer
} from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './routes/homepage.route'
import Dashboard from './routes/dashboard.route'
import Login from './routes/login.route'
import Signup, {loader as signupLoader} from './routes/signup.route'
import WipPage from './routes/wip.route'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: signupLoader,
  },  
  {
    path: '/wip',
    element: <WipPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/calendario',
        element: <WipPage />,
      },
      {
        path: '/dashboard/tasse',
        element: <WipPage />,
      },
      {
        path: '/dashboard/prenotazioni',
        element: <WipPage />,
      },
      {
        path: '/dashboard/segnalazioni',
        element: <WipPage />,
      },
      {
        path: '/dashboard/sondaggi',
        element: <WipPage />,
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
    />
  </React.StrictMode>,
)
