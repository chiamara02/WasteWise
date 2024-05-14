import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function WipPage() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/wip') {
            document.body.classList.add('h-full');
            document.documentElement.classList.add('h-full');
        } else {
            document.body.classList.remove('h-full');
            document.documentElement.classList.remove('h-full');
        }

        return () => {
            document.body.classList.remove('h-full');
            document.documentElement.classList.remove('h-full');
        };
    }, [location.pathname]);

    return (
        <main className="relative h-screen">
            <img
                src="wip.jpg"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover object-top grayscale-[90%] opacity-70"
            />
            <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">In the Making!</h1>

                <p className="text-base font-bold text-black">
                    Rimani sintonizzato, il meglio deve ancora arrivare!
                </p>
                <div className="mt-10 flex justify-center ">
                    <Link to={"/"} className="text-sm font-semibold leading-7 text-black">
                        <span aria-hidden="true">&larr;</span> Ritorna alla Home
                    </Link>
                </div>
            </div>
        </main>
    )
}