import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, Navigate, useLocation } from "react-router-dom"

import { nuovaSegnalazione } from "../utils/requests"
import { toast } from "react-toastify"
import { PhotoIcon } from '@heroicons/react/24/solid'



export default function NuovaSegnalazione() {

  const formSchema = yup.object().shape({
    descrizione: yup.string()
      .required("La descrizione della situazione è richiesta"),
    zona: yup.string()
      .required("La zona va specificata"),
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
    let response = await nuovaSegnalazione(data.descrizione, data.zona, data.foto)
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
    <form onSubmit={handleSubmit(onSubmit)} >
      {/* <InputFeedback name={"nome"} label={"Nome"} type={"text"} error={errors.nome} register={register} />
      <Select name={"zona"} label={"Zona"} options={useLoaderData()} register={register} />
      <InputFeedback name={"email"} label={"Email"} type={"email"} error={errors.email} register={register} />
      <InputFeedback name={"password"} label={"Password"} type={"password"} error={errors.password} register={register} />
      <InputFeedback name={"cpassword"} label={"Conferma Password"} type={"password"} error={errors.cpassword} register={register} /> */}

      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Invia una segnalazione</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Compila il form per segnalare una situazione di degrado nella tua città
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="zona" className="block text-sm font-medium leading-6 text-gray-900">
                Zona
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    type="text"
                    name="zona"
                    id="zona"
                    autoComplete="Villazzano"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Villazzano"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="descrizione" className="block text-sm font-medium leading-6 text-gray-900">
                Descrizione
              </label>
              <div className="mt-2">
                <textarea
                  id="descrizione"
                  name="descrizione"
                  rows={5}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Descrivi la situazione di degrado urbano che hai trovato
                e specifica la via esatta. </p>
            </div>


            <div className="col-span-full">
              <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                Immagini
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Carica un file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">oppure trascinalo in questa sezione</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF fino a  10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancella segnalazione
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Conferma e invia
        </button>
      </div>
    </form>
  );
}
