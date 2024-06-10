import PageHeading from '../components/pageHeading.component'
import TrackingProgress from '../components/trackingProgress.component'
import { getPercorsi } from '../utils/requests'
import { Link, Navigate, useLocation, useLoaderData } from "react-router-dom"
import { useState, useEffect } from 'react'

export async function loader() {
  const percorsi = await getPercorsi();
  return percorsi.data
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Percorsi() {
  const [percorso, setPercorso] = useState(null)
  const [zona, setZona] = useState("")

  return (
    <div className="p-5">
      <PageHeading title={"Percorso di raccolta"} />
      <div className="mt-5">
        <nav className="flex flex-1 flex-col" aria-label="Sidebar">
          <ul role="list" className="-mx-2 space-y-1">
            {useLoaderData().map((item) => (
              <li key={item.zonaAssociata.nome}>
                <a
                  onClick={() => {
                    setPercorso(item.zonaAssociata._id)
                    setZona(item.zonaAssociata.nome)
                  }}
                  className={classNames(
                    item.current ? 'bg-primaryhover text-background' : 'text-text hover:bg-primaryhover hover:text-background',
                    'group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6'
                  )}
                >
                  {item.zonaAssociata.nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* <hr className='mt-2'></hr> */}
      {percorso &&
        <TrackingProgress percorso={percorso} zona={zona} hasControls={true} />
      }
    </div>
  )
}
