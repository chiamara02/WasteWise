import React from 'react';
import { useNavigate } from 'react-router-dom';

const NuovaPrenotazioneButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/nuovaPrenotazione');
  };

  return (
    <button className ="flex justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={handleClick}>
      Inserisci una richiesta di ritiro
    </button>
  );
};

export default NuovaPrenotazioneButton;