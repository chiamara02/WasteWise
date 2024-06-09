import { CheckIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { getTracking, nextStop } from '../utils/requests'
import { RefreshCw } from 'lucide-react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TrackingProgress({ percorso, zona, hasControls }) {
    const [feed, setFeed] = useState({})
    const [stops, setStops] = useState([])
    const [refresh, setRefresh] = useState(false)

    function transformStops(input) {
        const { isInProgress, stops, lastStop, nextStop, lastStopAt } = input;
        const result = [];

        // Flags to manage the status
        let foundLastStop = false;

        stops.forEach(stop => {
            let status = 'upcoming';

            if (!isInProgress) {
                if (nextStop === null) {
                    status = 'complete'
                }
                // If not in progress, all stops are upcoming
                else if (stop._id === nextStop._id) {
                    status = 'upcoming';
                }
            } else {
                // If in progress
                if (stop._id === lastStop?._id) {
                    status = 'current';
                    foundLastStop = true;
                } else if (foundLastStop) {
                    status = 'upcoming';
                } else {
                    status = 'complete';
                }
            }

            // Add the stop to the result array
            result.push({
                name: stop.nome,
                description: lastStopAt && status === "current" ? lastStopAt : "", // Replace with actual description if available
                href: '#',
                status: status
            });
        });

        return result;
    }

    useEffect(() => {
        let fetch = async () => {
            const res = await getTracking(percorso)
            if (res.success) {
                setFeed(res.data)
                let stops = transformStops(res.data)
                setStops(stops)
                return stops;
            }
        }
        fetch()
        setRefresh(false)
    }, [percorso, refresh])

    console.log(feed)


    return (
        <div className="mt-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
                {(hasControls && feed.canOperate && feed.nextStop !== null) ?
                    <button
                        onClick={async () => {
                            let res = await nextStop(percorso)
                            if (res.success) {
                                setFeed(res.data)
                                let stops = transformStops(res.data)
                                setStops(stops)
                            }
                        }}
                        type="button"
                        className="rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-background shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        {!feed.isInProgress ? "Inizia corsa" : "Prossima fermata"}
                    </button>
                    :
                    <p>Corsa Terminata</p>
                }
                <button
                    onClick={()=>setRefresh(true)}
                    type="button"
                    className="ml-5 rounded-full bg-backgroundmuted p-2 text-text shadow-sm hover:bg-primaryhover hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                    <RefreshCw className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <div className="px-4 py-5 sm:p-6">
                <nav aria-label="Progress">
                    <h1 className='mb-3 text-primary font-bold'>Tracking: {zona}</h1>
                    <ol role="list" className="overflow-hidden">
                        {stops.map((step, stepIdx) => (
                            <li key={step.name} className={classNames(stepIdx !== stops.length - 1 ? 'pb-10' : '', 'relative')}>
                                {step.status === 'complete' ? (
                                    <>
                                        {stepIdx !== stops.length - 1 ? (
                                            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary" aria-hidden="true" />
                                        ) : null}
                                        <a className="group relative flex items-start">
                                            <span className="flex h-9 items-center">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary group-hover:bg-primaryhover">
                                                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                ) : step.status === 'current' ? (
                                    <>
                                        {stepIdx !== stops.length - 1 ? (
                                            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                        ) : null}
                                        <a className="group relative flex items-start" aria-current="step">
                                            <span className="flex h-9 items-center" aria-hidden="true">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium text-primary">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        {stepIdx !== stops.length - 1 ? (
                                            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                                        ) : null}
                                        <a className="group relative flex items-start">
                                            <span className="flex h-9 items-center" aria-hidden="true">
                                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                                </span>
                                            </span>
                                            <span className="ml-4 flex min-w-0 flex-col">
                                                <span className="text-sm font-medium text-gray-500">{step.name}</span>
                                                <span className="text-sm text-gray-500">{step.description}</span>
                                            </span>
                                        </a>
                                    </>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    )
}
