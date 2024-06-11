import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuestionari } from '../utils/requests';
import PageHeading from "../components/pageHeading.component";

export default function MostraQuestionari() {
    const [questionari, setQuestionari] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await getQuestionari();
            console.log(response);
            setQuestionari(response.data);
            
        }
        fetchData();
    }, []);

    return (
        <div className="p-5">
            <PageHeading title={"Elenco dei Questionari Compilati"} />
            <div className="mt-2 mb-5">
                <Link to="/nuovosondaggio">
                    <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background shadow-sm hover:bg-primaryhover">
                        Nuovo Sondaggio
                    </button>
                </Link>
            </div>
            <div className="mt-5">
                {questionari.length > 0 ? (
                    <ul className="space-y-4">
                        {questionari.map((questionario) => (
                            <li key={questionario._id} className="p-4 bg-background rounded-md shadow-sm">
                                <h3 className="text-lg font-semibold">{questionario.sondaggio.titolo}</h3>
                                <ul className="mt-2 space-y-2">
                                    {questionario.risposte.map((risposta, index) => (
                                        <li key={index} className="p-2 bg-backgroundmuted rounded-md">
                                            <strong>Domanda:</strong> {questionario.sondaggio.domande[index]}<br />
                                            <strong>Risposta:</strong> {risposta}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun questionario compilato disponibile</p>
                )}
            </div>
        </div>
    );
}
