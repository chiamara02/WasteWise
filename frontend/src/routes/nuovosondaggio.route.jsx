import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { nuovoSondaggio } from "../utils/requests";
import { toast } from "react-toastify";
import PageHeading from "../components/pageHeading.component";
import InputFeedback from "../components/inputFeedback.component";
import HomePageButton from "../components/homepagebutton.component";

export default function NuovoSondaggio() {
    const formSchema = yup.object().shape({
        titolo: yup.string().required("Il titolo del sondaggio è richiesto"),
        domande: yup.array().of(
            yup.string().required("La domanda è richiesta")
        ).min(1, "Almeno una domanda è richiesta")
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "domande"
    });

    const onSubmit = async (data) => {
        let response = await nuovoSondaggio(data.titolo, data.domande);
        if (response && response["success"]) {
            reset();
            toast.success("Sondaggio creato con successo");
        } else {
            reset();
            toast.error("Errore nella creazione del sondaggio");
        }
    };

    return (
        <div className="p-5">
            <PageHeading title={"Crea un Nuovo Sondaggio"} />
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="border-b border-backgroundmuted pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <InputFeedback
                                    name="titolo"
                                    label="Titolo"
                                    register={register}
                                    error={errors.titolo}
                                />
                            </div>
                            {fields.map((item, index) => (
                                <div key={item.id} className="sm:col-span-full">
                                    <InputFeedback
                                        name={`domande[${index}]`}
                                        label={`Domanda ${index + 1}`}
                                        register={register}
                                        error={errors.domande?.[index]}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-sm font-semibold leading-6 text-red-600"
                                    >
                                        Rimuovi
                                    </button>
                                </div>
                            ))}
                            <div className="sm:col-span-full">
                                <button
                                    type="button"
                                    onClick={() => append({})}
                                    className="text-sm font-semibold leading-6 text-primary"
                                >
                                    Aggiungi Domanda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-text"
                        onClick={() => reset()}
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
    );
}
