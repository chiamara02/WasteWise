import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Login() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') {
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
      <>        
        <div className="flex min-h-screen flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-32 xl:px-72">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <img
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-text">
                  Accedi a WasteWise
                </h2>
                <p className="mt-2 text-sm leading-6 text-text">
                  Non hai un account?{' '}
                  <a href="#" className="font-semibold text-primary hover:text-primaryhover">
                    Registrati
                  </a>
                </p>
              </div>
  
              <div className="mt-10">
                <div>
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Indirizzo Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
  
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
  
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div> 
                
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="login.jpg"
              alt=""
            />
          </div>
        </div>
      </>
    )
  }
  