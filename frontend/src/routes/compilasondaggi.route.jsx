import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getSondaggi, compilaSondaggio } from '../utils/requests';
import { toast } from 'react-toastify';
import PageHeading from '../components/pageHeading.component';
import InputFeedback from '../components/inputFeedback.component';

export default function CompilaSondaggio() {
    const { id } = useParams();
    const history = useNavigate();
    const [sondaggio, setSondaggio] = useState(null);

    const formSchema = yup.object().shape({
        risposte: yup.array().of(
            yup.string().required('La risposta è richiesta')
        ).min(1, 'Almeno una risposta è richiesta')
    });

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    const { fields } = useFieldArray({
        control,
        name: 'risposte'
    });

    useEffect(() => {
        async function fetchData() {
            const response = await getSondaggi();
            if (response && response.success) {
                setSondaggio(response.data);
            } else {
                toast.error('Errore nel caricamento del sondaggio');
                history.push('/mostrasondaggi');
            }
        }
        fetchData();
    }, [id, history]);

    const onSubmit = async (data) => {
        const response = await compilaSondaggio(id, data.risposte);
        if (response && response.success) {
            reset();
            toast.success('Risposte inviate con successo');
            history.push('/mostrasondaggi');
        } else {
            toast.error('Errore nell\'invio delle risposte');
        }
    };

    if (!sondaggio) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className="p-5">
            <PageHeading title={sondaggio.titolo} />
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="border-b border-backgroundmuted pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {sondaggio.domande?.map((domanda, index) => (
                                <div key={index} className="sm:col-span-full">
                                    <InputFeedback
                                        name={`risposte[${index}]`}
                                        label={domanda}
                                        register={register}
                                        error={errors.risposte?.[index]}
                                    />
                                </div>
                            ))}
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
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background shadow-sm hover:bg-primaryhover"
                    >
                        Invia Risposte
                    </button>
                </div>
            </form>
        </div>
    );
}
