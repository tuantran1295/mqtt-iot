import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import MqttConnect from "../services/MqttConnect";
import {useNavigate} from "react-router";
import {TEMP_TOPIC} from "../constant";
import Navbar from "../component/Navbar";
import Thermometer from "react-thermometer-component";

const Dashboard = () => {
    const navigate = useNavigate();
    const { payload } = useContext(DataContext);
    const [dashboardMessages, setMessages] = useState([]);
    const [currentTemp, setCurrentTemp] = useState(0)

    useEffect(() => {
        // console.log(payload);
        if (payload.topic === TEMP_TOPIC) {
            const parsedMessage = JSON.parse(payload.message)
            const newMessages = [...dashboardMessages, parsedMessage];
            setMessages(newMessages);
            setCurrentTemp(parsedMessage.value);
            console.log(parsedMessage.value);
        }
    },[payload]);

    return <div>
        <MqttConnect/>
        <Navbar/>
        <div style={{display: 'flex'}} className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="block text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Device ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Sensor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Value
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Unit
                    </th>
                </tr>
                </thead>
                <tbody>
                {dashboardMessages.map((message, index) =>
                    <tr key={index} className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {message.device_id}
                        </th>
                        <td className="px-6 py-4">
                            {message.sensor_name}
                        </td>
                        <td className="px-6 py-4">
                            {message.value}
                        </td>
                        <td className="px-6 py-4">
                            {message.unit}
                        </td>
                    </tr>)
                }
                </tbody>
            </table>

            <Thermometer
                theme="light"
                value={currentTemp}
                max="100"
                steps="1"
                format="°C"
                size="normal"
                height="180"
            />
        </div>
    </div>
}

export default Dashboard;