import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from "react-toastify";
import PageHeading from "../components/pageHeading.component";
import HomePageButton from "../components/homepagebutton.component";
import { nuovaPrenotazione } from "../utils/requests";

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toISOString().split('T')[0]); // Formato 'YYYY-MM-DD'
  }
  return dates;
};

export default function NuovaPrenotazione() {
  const [dateUtili, setDateUtili] = useState([]);
  const dates = generateDates();

  const formSchema = yup.object().shape({
    descrizione: yup.string().required("La descrizione è richiesta"),
    dateUtili: yup.array().of(yup.string().required()).min(1, "Almeno una data deve essere selezionata"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const requestData = {
      descrizione: data.descrizione,
      dateUtili: dateUtili,
    };
    let response = await nuovaPrenotazione(requestData.descrizione, requestData.dateUtili);
    if (response && response.success) {
      reset();
      setDateUtili([]);
      toast.success("Richiesta di ritiro inviata con successo");
    } else {
      toast.error("Errore nell'invio della richiesta");
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    if (date && !dateUtili.includes(date)) {
      const updatedDates = [...dateUtili, date];
      setDateUtili(updatedDates);
      setValue("dateUtili", updatedDates); // Aggiorna il valore nel form
    }
  };

  return (
    <div className="p-5">
      <PageHeading title={"Prenota un ritiro"} />
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="border-b border-backgroundmuted pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label htmlFor="dateSelect" className="block text-sm font-medium text-gray-700">
                  Seleziona fino a tre date
                </label>
                <select
                  id="dateSelect"
                  name="dateSelect"
                  onChange={handleDateChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleziona una data</option>
                  {dates.map((date, index) => (
                    <option key={index} value={date}>
                      {new Date(date).toLocaleDateString('it-IT')}
                    </option>
                  ))}
                </select>

                <select
                  id="dateSelect"
                  name="dateSelect"
                  onChange={handleDateChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleziona una data</option>
                  {dates.map((date, index) => (
                    <option key={index} value={date}>
                      {new Date(date).toLocaleDateString('it-IT')}
                    </option>
                  ))}
                </select>

                <select
                  id="dateSelect"
                  name="dateSelect"
                  onChange={handleDateChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleziona una data</option>
                  {dates.map((date, index) => (
                    <option key={index} value={date}>
                      {new Date(date).toLocaleDateString('it-IT')}
                    </option>
                  ))}
                </select>

                {errors.dateUtili && <p className="mt-2 text-sm text-red-600">{errors.dateUtili.message}</p>}
              </div>

              

              <div className="col-span-full">
                <label htmlFor="descrizione" className="block text-sm font-medium leading-6 text-text">
                  Descrizione
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("descrizione")}
                    id="descrizione"
                    name="descrizione"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-text shadow-sm ring-1 ring-inset ring-backgroundmuted placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    placeholder="Specifica indirizzo di ritiro, dimensione e peso dei rifiuti ingombranti da ritirare"
                  />
                  {errors.descrizione && <p className="mt-2 text-sm text-red-600">{errors.descrizione.message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-text" onClick={() => reset()}>
            Annulla
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Conferma e invia
          </button>
        </div>
      </form>
    </div>
  );
}
