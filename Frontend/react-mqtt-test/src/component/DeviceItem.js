const DeviceItem = (id, sensorName, value, unit) => {
    return <tr className="bg-white dark:bg-gray-800">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {id}
        </th>
        <td className="px-6 py-4">
            {sensorName}
        </td>
        <td className="px-6 py-4">
            {value}
        </td>
        <td className="px-6 py-4">
            {unit}
        </td>
    </tr>
}

export default DeviceItem;