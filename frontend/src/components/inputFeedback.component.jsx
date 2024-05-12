import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

export default function InputFeedback({ name, label, type, error, register }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    {...register(name)}
                    type={type}
                    name={name}
                    id={name}
                    className={
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            .concat(error ?
                                " pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500" :
                                " ring-gray-300 placeholder:text-gray-300 focus:ring-primary"
                            )}
                    aria-invalid="true"
                    aria-describedby="email-error"
                />
                {error &&
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                }
            </div>
            {error &&
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {error.message}
                </p>
            }
        </div>
    )
}