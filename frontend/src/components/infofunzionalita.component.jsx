import React from 'react';

const values = [
    {
        name: 'Sondaggi per il Miglioramento della tua città',
        description:
            "Partecipa attivamente alla gestione dei rifiuti a Trento con i sondaggi di WasteWise. Condividi le tue opinioni, esprimi le tue preferenze e contribuisci a plasmare il futuro ambientale della tua città.",
    },
    {
        name: 'Calendario di Raccolta Personalizzato',
        description:
            "WasteWise offre un calendario di raccolta personalizzato basato sulla zona di residenza dell'utente, garantendo che sia sempre informato sugli orari e sui tipi di rifiuti da smaltire.",
    },
    {
        name: 'Monitoraggio delle Tasse sui Rifiuti',
        description:
            "Con WasteWise, è possibile monitorare facilmente le spese relative ai rifiuti, consentendo agli utenti di avere un controllo completo sulle loro finanze in materia di rifiuti."
    },
    {
        name: 'Tracking dei Veicoli di Raccolta Rifiuti',
        description:
           "Grazie alla funzione di tracking dei veicoli di raccolta rifiuti, gli utenti possono seguire in tempo reale il percorso dei mezzi e avere una stima più precisa dell'orario di raccolta dei propri rifiuti.",
    },
    {
        name: 'Gestione Prenotazioni per il Ritiro dei Rifiuti Ingombranti',
        description:
            "WasteWise semplifica il processo di prenotazione per il ritiro dei rifiuti ingombranti, consentendo agli utenti di pianificare comodamente la rimozione di oggetti voluminosi.",
    },
    {
        name: 'Segnalazioni di Situazioni di Degrado a Trento',
        description:
            "Gli utenti possono facilmente segnalare situazioni di degrado o problemi relativi ai rifiuti direttamente all'ente competente tramite WasteWise, contribuendo così a mantenere pulita e ordinata la città di Trento.",
    },
]

export default function InfoFunzionalita() {
    return (
        <div>
            {/* Image section */}
            <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                <img
                    src="lago.jpg"
                    alt=""
                    className="aspect-[5/2.2] w-full object-cover xl:rounded-3xl"
                />
            </div>

            {/* Info section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Le Nostre funzionalità</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    Scopri come WasteWise rende la gestione dei rifiuti a Trento più semplice, efficiente e responsabile con le seguenti funzionalità chiave:
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {values.map((value) => (
                        <div key={value.name}>
                            <dt className="font-semibold text-primary">{value.name}</dt>
                            <dd className="mt-1 text-gray-600">{value.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};
