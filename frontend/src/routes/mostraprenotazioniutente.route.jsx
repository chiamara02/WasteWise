import { Fragment } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, Navigate, useLocation } from "react-router-dom";

import { getPrenotazioni } from "../utils/requests";
import { toast } from "react-toastify";
import { PhotoIcon } from '@heroicons/react/24/solid';

import React, { useState, useEffect } from 'react';
import '../index.css';
import HomePageButton from "../components/homepagebutton.component";
import NuovaPrenotazioneButton from "../components/nuovaprenotazionebutton.component"; // Assicurati di avere il percorso corretto

const statuses = {
  confermata: 'text-green-700 bg-green-50 ring-green-600/20',
  inAttesa: 'text-yellow-600 bg-gray-50 ring-gray-500/10',
  rifiutata: 'text-red-700 bg-red-50 ring-red-600/10',
  completata: 'text-grey-700 bg-red-50 ring-red-600/10',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MostraPrenotazioniUtente = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);

  const fetchPrenotazioni = async () => {
    let s = await getPrenotazioni();
    console.log(s);
    if (s['success']) {
      setPrenotazioni(s['data']);
    }
  };

  useEffect(() => {
    fetchPrenotazioni();
    console.log(prenotazioni);
  }, []);

  return (
    <div className="relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6 mt-6 ml-6 text-primary">Richieste di ritiro per rifiuti ingombranti</h1>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {prenotazioni.map((prenotazione) => (
          <li key={prenotazione.id} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="text-sm font-medium leading-6 text-gray-900">{prenotazione.descrizione}</div>
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
      <div className="absolute bottom-10 right-8">
        <NuovaPrenotazioneButton className="text-xl p-12" />
      </div>
    </div>
  );
};

export default MostraPrenotazioniUtente;
