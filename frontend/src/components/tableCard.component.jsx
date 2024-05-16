export default function TableCard({ cols, data, colsTitles }) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-backgroundmuted ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-backgroundmuted">
                            <thead className="bg-secondary">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-text sm:pl-6">
                                        {colsTitles[0]}
                                    </th>
                                    {colsTitles.map((title, index) => {
                                        if (index !== 0) {
                                            return (
                                                <th key={title} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-text">
                                                    {title}
                                                </th>
                                            )
                                        }
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-backgroundmuted bg-background">
                                {data.map((row, rowIndex) => {
                                    let content = [];

                                    for (let index = 0; index < cols.length; index++) {
                                        if (index === 0) {
                                            content.push(
                                                <td
                                                    key={index}
                                                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-text sm:pl-6"
                                                >
                                                    {row[cols[index]]}
                                                </td>
                                            );
                                        } else {
                                            content.push(
                                                <td
                                                    key={index}
                                                    className="whitespace-nowrap px-3 py-4 text-sm text-text"
                                                >
                                                    {row[cols[index]]}
                                                </td>
                                            );
                                        }
                                    }

                                    return <tr key={rowIndex}>{content}</tr>;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
