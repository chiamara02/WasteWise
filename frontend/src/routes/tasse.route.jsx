import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getTasse } from "../utils/requests";
import HomePageButton from "../components/homepagebutton.component";

import SelectTax from "../components/selectTax.component";
import HomePage from "./homepage.route";

const MostraTasse = () => {
  const [tasse, setTasse] = useState([]);
  const { register } = useForm();

  const fetchTasse = async (input) => {
    let s = await getTasse(input);
    console.log(s);
    if (s["success"]) {
      setTasse(s["data"]);
    }
  };

  useEffect(() => {
    fetchTasse("all");
    console.log(tasse);
  }, []);

  const StatoToString = (input) => {
    if ((input == "pagato")) {
      return input;
    }
    return "non pagato";
  };

  const handleSelectChange = async (input) => {
    fetchTasse(input);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <SelectTax
          name="tax"
          label="Seleziona tipo di tasse da visualizzare"
          options={["Tutte", "Pagate", "NonPagate"]}
          onChangeTutte={() => handleSelectChange("all")}
          onChangePagate={() => handleSelectChange("pagate")}
          onChangeNonPagate={() => handleSelectChange("non pagate")}
          register={register}
        />
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Tasse
          </h1>
          <p className="mt-2 text-sm text-gray-700">Lista delle tasse</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Importo
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Scadenza
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stato
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasse.map((tax) => (
                  <tr key={tax._Id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {tax._id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {tax.importo} €
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {tax.scadenza}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {StatoToString(tax.statoPagamento)}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <HomePageButton />
      </div>
    </div>
  );
};

export default MostraTasse;