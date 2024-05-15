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
import Tasse from './routes/tasse.route'
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
    path: '/tasse',
    element: <Tasse />,
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
