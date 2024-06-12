import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { modificaPrenotazione } from "../utils/requests";
import { toast } from "react-toastify";

const ModificaPrenotazione = () => {
  const { id } = useParams();
  const [stato, setStato] = useState('');
  const [dataEffettiva, setDataEffettiva] = useState('');
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    // Genera le date dei 7 giorni successivi e imposta come opzioni per la data effettiva
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i + 1); // Aggiunge i + 1 per ottenere i 7 giorni successivi
      return nextDate.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    });
    setDateOptions(next7Days);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Effettua una chiamata all'API per modificare lo stato e la data effettiva della prenotazione
    try {
      const response = await modificaPrenotazione(id, stato, dataEffettiva);
      if (response && response.success) {
        toast.success("Prenotazione modificata con successo.");
      } else {
        toast.error("Impossibile modificare la prenotazione.");
      }
    } catch (error) {
      console.error("Errore durante la modifica della prenotazione:", error);
      toast.error("Si è verificato un errore durante la modifica della prenotazione.");
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-900/5 p-6 flex items-center">
        <h2 className="text-lg font-medium text-gray-900">Modifica Prenotazione</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="stato" className="block text-sm font-medium text-gray-700">Stato:</label>
          <select id="stato" value={stato} onChange={(e) => setStato(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
            <option value="">Seleziona uno stato</option>
            <option value="confermata">Confermata</option>
            <option value="inAttesa">In Attesa</option>
            <option value="rifiutata">Rifiutata</option>
            <option value="completata">Completata</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dataEffettiva" className="block text-sm font-medium text-gray-700">Data Effettiva:</label>
          <select id="dataEffettiva" value={dataEffettiva} onChange={(e) => setDataEffettiva(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm">
            {dateOptions.map((date, index) => (
              <option key={index} value={date}>{new Date(date).toLocaleDateString('it-IT')}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md shadow-sm hover:bg-primaryhover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50">Salva Modifiche</button>
      </form>
    </div>
  );
};

export default ModificaPrenotazione;
