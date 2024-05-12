import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { Link, Navigate, useLocation, useLoaderData } from "react-router-dom"

import { createAccount, getZone } from "../utils/requests"
import { toast } from "react-toastify"
import Select from "../components/select.component"
import InputFeedback from "../components/inputFeedback.component"

export async function loader() {
    const nomeZona = await getZone();
    return nomeZona.data;
}

export default function Signup() {
    const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('jwt='))

    const [redirect, setRedirect] = useState(isLoggedIn ? '/' : false)
    const location = useLocation();

    const formSchema = yup.object().shape({
        email: yup.string()
            .required("L'email è richiesta")
            .email("L'email deve essere valida"),
        nome: yup.string()
            .required("Il nome è richiesto"),
        password: yup.string()
            .required("La password è richiesta")
            .min(8, "La password deve contenere almeno 8 caratteri")
            .matches(/(?=.*[0-9])/, "La password deve contenere almeno un numero")
            .matches(/(?=.*[a-z])/, "La password deve contenere almeno una lettera minuscola")
            .matches(/(?=.*[A-Z])/, "La password deve contenere almeno una lettera maiuscola")
            .matches(/(?=.*[!@#$%^&*])/, "La password deve contenere almeno un carattere speciale tra !@#$%^&*"),
        cpassword: yup.string()
            .required("La conferma della password è richiesta")
            .oneOf([yup.ref("password")], "La password non corrisponde"),
        zona: yup.string()
            .required("La zona di abitazione è richiesta"),
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
        console.log(data)
        let response = await createAccount(data.email, data.password, data.nome, data.zona)
        console.log(response)
        if (response && response["success"]) {
            toast.success("Registrazione avvenuta con successo")
            setRedirect('/')
        } else {
            reset()
            toast.error("Qualcosa è andato storto, riprova!")
        }
    }


    useEffect(() => {
        if (location.pathname === '/signup') {
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
                                Registrati ora!
                            </h2>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <InputFeedback name={"nome"} label={"Nome"} type={"text"} error={errors.nome} register={register} />
                                    <Select name={"zona"} label={"Zona"} options={useLoaderData()} register={register} />
                                    <InputFeedback name={"email"} label={"Email"} type={"email"} error={errors.email} register={register} />
                                    <InputFeedback name={"password"} label={"Password"} type={"password"} error={errors.password} register={register} />
                                    <InputFeedback name={"cpassword"} label={"Conferma Password"} type={"password"} error={errors.cpassword} register={register} />

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Registrati
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
