import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSondaggi } from '../utils/requests';
import PageHeading from "../components/pageHeading.component";
import HomePageButton from "../components/homepagebutton.component";

export default function MostraSondaggi() {
    const [sondaggi, setSondaggi] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log("fetchData - MostraSondaggi.jsx");
            const response = await getSondaggi();
            console.log(response);
            if (response && response.success) {
                setSondaggi(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-5">
            <PageHeading title={"Elenco dei Sondaggi"} />
            <div className="mt-5">
                {sondaggi.length > 0 ? (
                    <ul className="space-y-4">
                        {sondaggi.map((sondaggio) => (
                            <li key={sondaggio._id} className="flex justify-between items-center p-4 bg-background rounded-md shadow-sm">
                                <span>{sondaggio.titolo}</span>
                                <Link to={`/compila-sondaggio/${sondaggio._id}`}>
                                    <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-background shadow-sm hover:bg-primaryhover">
                                        Compila
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nessun sondaggio disponibile</p>
                )}
            </div>
        </div>
    );
}
