
const DashboardItem = (id, name, status) => {
    return <tr className="bg-white dark:bg-gray-800">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {id}
        </th>
        <td className="px-6 py-4">
            {name}
        </td>
        <td className="px-6 py-4">
            <div className="flex items-center">
                <div className={"h-2.5 w-2.5 rounded-full mr-2" + status === 1 ? "bg-green-500" : "bg-red-500"}></div>
                {status === 1 ? "True" : "False"}
            </div>
        </td>
    </tr>
}

export default DashboardItem;