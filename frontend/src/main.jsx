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
import Login from './routes/login.route'
import NuovaSegnalazione from './routes/nuovasegnalazione.route'
import MostraSegnalazioni from './routes/mostrasegnalazioni.route'

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
    path: '/nuovaSegnalazione',
    element: <NuovaSegnalazione />
  },
  {
    path: '/mostraSegnalazioni',
    element: <MostraSegnalazioni />
  }
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
