import React from 'react';
import { useState } from 'react';
const stats = [
    { label: 'Aumento riciclaggio in Italia dal 2018', value: '54%' },
    { label: 'Riduzione rifiuti destinati alla discarica', value: '20%' },
    { label: 'Tasso di ricilaggio in Europa', value: 'Secondo posto' },
]
export default function Mission() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">La nostra missione</h2>
                <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                    <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                        <p className="text-xl leading-8 text-gray-600">
                            In WasteWise, ci impegniamo a trasformare Trento in una comunità più sostenibile e consapevole.
                            La nostra missione è quella di fornire strumenti e risorse per ottimizzare la gestione dei rifiuti,
                            promuovendo pratiche eco-sostenibili e responsabili. Vogliamo educare e ispirare i cittadini di Trento a ridurre,
                            riciclare e riutilizzare, con l'obiettivo di preservare le risorse naturali e proteggere l'ambiente per le generazioni
                            future. Siamo convinti che insieme possiamo fare la differenza, e ci impegniamo a guidare il cambiamento verso una città
                            più pulita, verde e sostenibile.
                        </p>
                        
                    </div>
                    <div className="lg:flex lg:flex-auto lg:justify-center">
                        <dl className="w-64 space-y-8 xl:w-80">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                                    <dd className="text-5xl font-semibold tracking-tight text-primaryhover">{stat.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

