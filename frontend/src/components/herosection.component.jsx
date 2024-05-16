import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <main className="isolate">
            {/* Hero section */}
            <div className="relative isolate -z-10">
                
                {/* Hero content */}
                <div className="overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
                                    Inizia Subito a  Migliorare l'Ambiente con WasteWise
                                </h1>
                                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                    WasteWise ti accompagna verso una città più pulita e sostenibile!
                                    Con Wastewise, potrai ottimizzare la tua gestione
                                    dei rifiuti, contribuendo così a migliorare la città di Trento. Scopri come possiamo aiutarti a semplificare la tua routine
                                    quotidiana e a fare la differenza per un futuro più pulito e verde. Entra a far parte del cambiamento: puliamo la
                                    città e proteggiamo l'ambiente con una gestione più intelligente dei rifiuti!
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <Link
                                        to="/signup"
                                        className="rounded-md bg-primary px-3.5 py-2.5 text-lm font-semibold text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Registrati ora!
                                    </Link>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                {/* Image 1 */}
                                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                    <div className="relative">
                                        <img
                                            src="citta.jpg"
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                                {/* Image 2 */}
                                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                    <div className="relative">
                                        <img
                                            src="ecof.jpg"
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    {/* Image 3 */}
                                    <div className="relative">
                                        <img
                                            src="eco5.jpg"
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                                {/* Image 4 */}
                                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                    <div className="relative">
                                        <img
                                            src="eco2.jpg"
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    {/* Image 5 */}
                                    <div className="relative">
                                        <img
                                            src="eco4.jpg"
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Rest of the content */}
        </main>

    )

}
