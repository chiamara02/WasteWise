import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, Navigate, useLocation } from "react-router-dom"

import InputFeedback from "../components/inputFeedback.component"
import HomePageButton from "../components/homepagebutton.component"

import { nuovaSegnalazione } from "../utils/requests"
import { toast } from "react-toastify"
import { PhotoIcon } from '@heroicons/react/24/solid'

export default function NuovaSegnalazione() {

  const formSchema = yup.object().shape({
    descrizione: yup.string()
      .required("La descrizione della situazione è richiesta"),
    indirizzo: yup.string()
      .required("L'indirizzo va specificato"),
    foto: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (data) => {
    console.log("submitted")
    let response = await nuovaSegnalazione(data.descrizione, data.indirizzo, data.foto)
    console.log(response)
    if (response && response["success"]) {
      toast.success("Segnalazione inviata con successo")
      //setRedirect('/')
    } else {
      reset()
      toast.error("Errore nell'invio della segnalazione")
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(../public/citta.jpg)' }}>
    <div className="min-h-screen flex items-center justify-center bg-gray-200 bg-opacity-0">
    <form onSubmit={handleSubmit(onSubmit)} className=" justify-center bg-background rounded-xl p-5 mb-4 shadow-lg transform transition-transform duration-200 max-w-md">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-primary">Invia una segnalazione</h2>
          <p className="mt-1 text-sm leading-6 text-text">
            Compila il form per segnalare una situazione di degrado nella tua città
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputFeedback 
                name="indirizzo" 
                label="Indirizzo" 
                type="text" 
                error={errors.indirizzo} 
                register={register} 
              />
            </div>
            <div className="hidden sm:block sm:col-span-4"></div>

            <div className="col-span-3">
              <label htmlFor="descrizione" className="block text-sm font-medium leading-6 text-gray-900">
                Descrizione
              </label>
              <div className="mt-2">
                <textarea
                  {...register("descrizione")}
                  id="descrizione"
                  name="descrizione"
                  rows={7}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Descrivi la situazione di degrado urbano che hai trovato e specifica la via esatta."
                />
              </div>
            </div>

            <div className="col-span-3">
              <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                Immagini
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="foto"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-primaryhover"
                    >
                      <span>Carica un file</span>
                      <input {...register("foto")} id="foto" name="foto" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">oppure trascinalo in questa sezione</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF fino a 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
      <HomePageButton />
        <button
          type="submit"
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Conferma e invia
        </button>
      </div>
    </form>
      </div>
      </div>



  );
}
