import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom'

import {
    Bars3Icon,
    XMarkIcon,
    ArrowLeftStartOnRectangleIcon,
    BellAlertIcon
} from '@heroicons/react/24/outline'
import {
    Recycle,
    Truck
} from 'lucide-react'
import { logout } from '../utils/requests'
import { toast } from "react-toastify"
import { AuroraBackground } from '../components/aurora.component'

const nav = [
    { name: 'Percorso di raccolta', href: '/operatore/percorsi', icon: Truck, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function OperatoreD() {
    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))
    const userType = document.cookie.split(';').some((item) => item.trim().startsWith('userType=')) ? document.cookie.split('; ').find(row => row.startsWith('userType=')).split('=')[1] : null
    const isOperatore = userType === "operatore"    
    const [redirect, setRedirect] = useState(isLoggedIn && isOperatore? false : '/login')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [navigation, setNavigation] = useState(nav)
    const location = useLocation()

    console.log(location.pathname)


    useEffect(() => {
        setNavigation(prevNavigation => {
            return prevNavigation.map(item => {
                if (location.pathname === '/') {
                    return { ...item, current: false }
                } else if (item.href === location.pathname) {
                    return { ...item, current: true }
                } else {
                    return { ...item, current: false }
                }
            })
        })
    }, [location.pathname])


    if (!isLoggedIn || !isOperatore) {
        return (
            <>
                {redirect && <Navigate to={redirect} />}
            </>
        )
    }

    return (
        <>
            {redirect && <Navigate to={redirect} />}
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-background" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Link to={"/operatore"}>
                                                <Recycle
                                                    className="h-10 w-auto text-background"
                                                />
                                            </Link>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    to={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-primaryhover text-background'
                                                                            : 'text-backgroundmuted hover:text-background hover:bg-primaryhover',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-background' : 'text-backgroundmuted group-hover:text-background',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <Link to={"/operatore"}>
                                <Recycle
                                    className="h-10 w-auto text-background"
                                />
                            </Link>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-primaryhover text-background'
                                                            : 'text-backgroundmuted hover:text-background hover:bg-primaryhover',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-background' : 'text-backgroundmuted group-hover:text-background',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto">
                                    <div
                                        onClick={async () => {
                                            let response = await logout();
                                            if (response && response["success"]) {
                                                toast.success("Logout effettuato con successo")
                                                setRedirect("/")
                                            } else {
                                                toast.error("Qualcosa è andato storto")
                                            }
                                        }}
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-background hover:bg-primaryhover"
                                    >
                                        <ArrowLeftStartOnRectangleIcon className='h-6 w-6' />
                                        <span className="sr-only">Logout</span>
                                        <span aria-hidden="true">Logout</span>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-indigo-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-background">Dashboard</div>
                    <div
                        onClick={async () => {
                            let response = await logout();
                            if (response && response["success"]) {
                                toast.success("Logout effettuato con successo")
                                setRedirect("/")
                            } else {
                                toast.error("Qualcosa è andato storto")
                            }
                        }}
                    >
                        <span className="sr-only">Logout</span>
                        <ArrowLeftStartOnRectangleIcon className='h-6 w-6 text-background' />
                    </div>
                </div>

                <main className="lg:pl-72">
                    {location.pathname === '/operatore' || location.pathname === '/operatore/' ?
                        <AuroraBackground>
                            <h1 className="text-5xl md:text-6xl 2xl:text-9xl font-semibold px-6 text-primary">Benvenuto sul tuo portale!</h1>
                        </AuroraBackground> :
                        <Outlet />
                    }
                </main>
            </div>
        </>
    )
}
