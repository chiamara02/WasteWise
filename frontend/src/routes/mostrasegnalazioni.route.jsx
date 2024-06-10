import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, Navigate, useLocation } from "react-router-dom"

import { mostraSegnalazioni } from "../utils/requests"
import { toast } from "react-toastify"
import { PhotoIcon } from '@heroicons/react/24/solid'

import React, { useState, useEffect } from 'react';
import '../index.css';
import HomePageButton from "../components/homepagebutton.component"

const MostraSegnalazioni = () => {
  const [segnalazioni, setSegnalazioni] = useState([]);

  const fetchSegnalazioni = async () => {
    let s = await mostraSegnalazioni()
    console.log(s)
    if (s['success']) {
        setSegnalazioni(s['data']);
    }
}

  useEffect(() => {
    fetchSegnalazioni()
    console.log(segnalazioni)
  }, []);

  return (

        <div className="max-w-3xl mx-auto p-5">
          <h1 className="text-center mb-5 font-bold text-primary">Lista Segnalazioni</h1>
          {segnalazioni.map((segnalazione) => (
            <div key={segnalazione.id} className="bg-gray-100 rounded-xl p-5 mb-4 shadow-lg transform transition-transform duration-200 hover:scale-102">
              <h2 className="font-bold mb-2 text-green-800">{segnalazione.indirizzo}</h2>
              <p className="text-gray-700">{segnalazione.descrizione}</p>
            </div>
          ))}
        </div>
        
  );
};

export default MostraSegnalazioni;
