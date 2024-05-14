import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import {Link, Navigate, useLocation } from "react-router-dom"

import { login } from "../utils/requests"
import { toast } from "react-toastify"
import InputFeedback from "../components/inputFeedback.component"


export default function Login() {
  const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))
  const [redirect, setRedirect] = useState(isLoggedIn ? '/' : false)
  const location = useLocation();

  const formSchema = yup.object().shape({
    email: yup.string()
      .required("L'email è richiesta")
      .email("L'email deve essere valida"),
    password: yup.string()
      .required("La password è richiesta"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (data) => {
    let response = await login(data.email, data.password)
    console.log(response)
    if (response && response["success"]) {
      toast.success("Login effettuato con successo")
      setRedirect('/')
    } else {
      reset()
      toast.error("Credenziali errate")
    }
  }


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

  if (isLoggedIn) {
    return (
      <>
        {redirect && <Navigate to={redirect} />}
      </>
    )
  }

  return (
    <>
      {redirect && <Navigate to={redirect} />}
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
                <a className="font-semibold text-primary hover:text-primaryhover" onClick={(e) => setRedirect("/signup")}>
                  Registrati
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputFeedback name={"email"} label={"Indirizzo Email"} type={"email"} error={errors.email} register={register} />
                  <InputFeedback name={"password"} label={"Password"} type={"password"} error={errors.password} register={register} />

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
