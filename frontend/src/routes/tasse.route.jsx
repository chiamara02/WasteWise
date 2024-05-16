import PageHeading from "../components/pageHeading.component";
import Radio from "../components/radio.component";
import TableCard from "../components/tableCard.component";
import { getTasse } from "../utils/requests";
import { useState, useEffect } from "react"

const options = [
    { name: 'Tutte', inStock: true },
    { name: 'Pagate', inStock: true },
    { name: 'Non Pagate', inStock: true }
]

const lables = [
    undefined,
    "pagato",
    "nonPagato"
]

export default function Tasse() {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        let fetch = async () => {
            let data = await getTasse(lables[selected])
            let formattedData = data.data.map(item => {
                // Format the date to dd/mm/yyyy
                const date = new Date(item.scadenza);
                const formattedDate = date.toLocaleDateString('it-IT');

                // Capitalize the stato
                const formattedStato = item.stato === 'pagato' ? 'Pagato' : 'Non Pagato';

                // Convert importo to a string with the euro symbol
                const formattedImporto = `${item.importo}€`;

                return {
                    scadenza: formattedDate,
                    stato: formattedStato,
                    importo: formattedImporto
                };
            });
            setData(formattedData)
        }
        fetch()
    }, [selected])

    return (
        <div className="p-5">
            <PageHeading title={"Monitora le tue tasse"} />
            <div className="mt-5">
                <Radio label={"Seleziona un filtro"} options={options} selected={selected} setSelected={setSelected}  />
                <TableCard cols={["scadenza", "importo", "stato"]} data={data} colsTitles={["Scadenza", "Importo", "Stato"]} />
            </div>
        </div>
    )
}