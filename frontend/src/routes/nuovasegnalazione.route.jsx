import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { nuovaSegnalazione } from "../utils/requests"
import { toast } from "react-toastify"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import PageHeading from "../components/pageHeading.component";
import InputFeedback from "../components/inputFeedback.component"
import HomePageButton from "../components/homepagebutton.component"

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
        let response = await nuovaSegnalazione(data.descrizione, data.indirizzo, data.foto)
        if (response && response["success"]) {
            reset()
            toast.success("Segnalazione inviata con successo")
        } else {
            reset()
            toast.error("Errore nell'invio della segnalazione")
        }
    }

    return (
        <div className="p-5">
            <PageHeading title={"Invia una Segnalazione"} />
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="border-b border-backgroundmuted pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <InputFeedback
                                    name="indirizzo"
                                    label="Indirizzo"
                                    type="text"
                                    error={errors.indirizzo}
                                    register={register}
                                />
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
                                        placeholder="Descrivi la situazione di degrado urbano che hai trovato e specifica la via esatta."
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="foto" className="block text-sm font-medium leading-6 text-text">
                                    Immagini
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-backgroundmuted px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-primary">
                                            <label
                                                htmlFor="foto"
                                                className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primaryhover"
                                            >
                                                <span>Carica un file</span>
                                                <input {...register("foto")} id="foto" name="foto" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">oppure trascinalo in questa sezione</p>
                                        </div>
                                        <p className="text-xs leading-5 text-accent">PNG, JPG, GIF fino a 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-text"
                    onClick={()=>{reset()}}
                    >
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
    )
}