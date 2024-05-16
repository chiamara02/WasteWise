// Select component
export default function SelectTax({ name, label, options, register, onChangeTutte, onChangePagate, onChangeNonPagate }) {
    const handleChange = (event) => {
      const selectedOption = event.target.value;
      // Call the appropriate function based on the selected option
      switch (selectedOption) {
        case "Tutte":
          onChangeTutte && onChangeTutte(); // Check if the function is provided before calling it
          break;
        case "Pagate":
          onChangePagate && onChangePagate();
          break;
        case "NonPagate":
          onChangeNonPagate && onChangeNonPagate();
          break;
        default:
          break;
      }
    };
  
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
            onChange={handleChange} // Call handleChange when the select value changes
          >
            {options.map((item) => {
              return (
                <option key={item} value={item}>{item}</option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }
  