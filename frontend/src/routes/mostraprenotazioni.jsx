import { Link } from 'react-router-dom';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useState, useEffect } from 'react';
import { getAllPrenotazioni } from "../utils/requests";
import { toast } from "react-toastify";
import HomePageButton from "../components/homepagebutton.component";
import '../index.css';

const statuses = {
  confermata: 'text-green-700 bg-green-50 ring-green-600/20',
  inAttesa: 'text-yellow-600 bg-gray-50 ring-gray-500/10',
  rifiutata: 'text-red-700 bg-red-50 ring-red-600/10',
  completata: 'text-grey-700 bg-red-50 ring-red-600/10',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MostraPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);

  const fetchPrenotazioni = async () => {
    let s = await getAllPrenotazioni()
    console.log(s)
    if (s['success']) {
      setPrenotazioni(s['data']);
    }
  }

  useEffect(() => {
    fetchPrenotazioni()
    console.log(prenotazioni)
  }, []);

  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {prenotazioni.map((prenotazione) => (
        <li key={prenotazione.id} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className="text-sm font-medium leading-6 text-gray-900">{prenotazione.descrizione}</div>
            <Link to={`/management/modificaPrenotazione/${prenotazione.id}`} className="text-blue-500 hover:underline">
              Modifica
            </Link>
            {console.log(prenotazione.id)}
          

          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Date Utili</dt>
              <dd className="text-gray-700">
                {prenotazione.dateUtili.map((date, index) => {
                  const formattedDate = new Date(date).toLocaleDateString('it-IT');
                  return (
                    <time key={index} dateTime={date} className="block mb-2">
                      {formattedDate}
                    </time>
                  );
                })}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Data effettiva</dt>
              <dd className="flex items-start gap-x-2">
                <dd className="text-gray-700">
                  <time dateTime={prenotazione.dataEffettiva} className="block mb-2">
                    {prenotazione.dataEffettiva ? (
                      new Date(prenotazione.dataEffettiva).toLocaleDateString('it-IT')
                    ) : (
                      <i>Non ancora definita</i>
                    )}
                  </time>
                </dd>
                <div
                  className={classNames(
                    statuses[prenotazione.stato],
                    'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {prenotazione.stato}
                </div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
};

export default MostraPrenotazioni;
