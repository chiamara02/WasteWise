import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, Navigate, useLocation } from "react-router-dom"

import { mostraSegnalazioni } from "../utils/requests"
import { toast } from "react-toastify"
import { PhotoIcon } from '@heroicons/react/24/solid'

import React, { useState, useEffect } from 'react';

const MostraSegnalazioni = () => {
  const [segnalazioni, setSegnalazioni] = useState([]);

  const fetchSegnalazioni = async () => {
    let s = await mostraSegnalazioni()
    if (s['status']) {
        setSegnalazioni(s['data']);
    }
}

  useEffect(() => {
    fetchSegnalazioni()
    console.log(segnalazioni)
  }, []);

  return (
    <div>
      <h1>Lista Segnalazioni</h1>
      {segnalazioni.map(segnalazione => (
        <div key={segnalazione.id} className="segnalazione-box">
          <h2>{segnalazione.zona}</h2>
          <p>Descrizione: {segnalazione.descrizione}</p>
          <div className="segnalazione-foto">
            {segnalazione.foto.map((picture, index) => (
              <img key={index} src={picture} alt={`Picture ${index}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostraSegnalazioni;
