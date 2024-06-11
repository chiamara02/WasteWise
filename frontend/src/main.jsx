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

import NuovaSegnalazione from './routes/nuovasegnalazione.route'
import MostraSegnalazioni from './routes/mostrasegnalazioni.route'

import TasseRoute from './routes/tasse.route'
import Tracking from './routes/mostratracking.route'

import ManagementD from './routes/management.route'
import Percorsi, {loader, loader as percorsiLoader } from './routes/percorsi.route'

import Signup, {loader as signupLoader} from './routes/signup.route'
import WipPage from './routes/wip.route'
import OperatoreD from './routes/operatore.route'
import MostraPrenotazioni from './routes/mostraprenotazioni'
import MostraPrenotazioniUtente from './routes/mostraprenotazioniutente.route'
import NuovaPrenotazione from './routes/nuovaprenotazione.route'
import ModificaPrenotazione from './routes/modificaprenotazione.route'

import MostraQuestionari from './routes/mostraquestionari.route'
import MostraSondaggi from './routes/mostrasondaggi.route'
import NuovoSondaggio from './routes/nuovosondaggio.route'
import CompilaSondaggio from './routes/compilasondaggi.route'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: signupLoader,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/wip',
    element: <WipPage />,
  },
  {
    path: '/nuovosondaggio',
    element: <NuovoSondaggio />,
  },
  {
    path: '/compilasondaggio/:id',
    element: <CompilaSondaggio />,
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
        element: <TasseRoute />,
      },
      {
        path: '/dashboard/prenotazioni',
        element: <MostraPrenotazioniUtente />,
      },
      {
        path: '/dashboard/nuovaPrenotazione',
        element: <NuovaPrenotazione />
      },
      {
        path: '/dashboard/tracking',
        element: <Tracking />,
      },
      {
        path: '/dashboard/segnalazioni',
        element: <NuovaSegnalazione />,
      },
      {
        path: '/dashboard/sondaggi',
        element: <MostraSondaggi />,
      },
    ]  
  },
  {
    path: '/management',
    element: <ManagementD />,
    children: [
      {
        path:'/management/segnalazioni',
        element: <MostraSegnalazioni />,
      },
      {
        path:'/management/sondaggi',
        element: <MostraQuestionari />,
      },
      {
        path:'/management/prenotazioni',
        element: <MostraPrenotazioni />,
      },
      {
        path:'/management/modificaPrenotazione/:id',
        element: <ModificaPrenotazione />,
      }
    ]
    
  },
  {
    path: '/operatore',
    element: <OperatoreD />,
    children: [
      {
        path:'/operatore/percorsi',
        element: <Percorsi />,
        loader: percorsiLoader
      }
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
