

export default function Select({ name, label, options, register }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(name)}
          id={name}
          name={name}
          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        >
          {options.map((item) => {
            return (
              <option key={item}>{item}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}