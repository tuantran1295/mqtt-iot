

import {useContext, useEffect, useState} from 'react';
import { DataContext } from '../context/DataProvider';
import MqttConnect from "../services/MqttConnect";
import { useNavigate } from "react-router";
import {TANK_TOPIC} from "../constant";
import Navbar from "../component/Navbar";

const Device = () => {
    const navigate = useNavigate();
    const { payload } = useContext(DataContext);
    const [deviceMessages, setMessages] = useState([]);

    useEffect(() => {
        console.log(payload);
        if (payload.topic === TANK_TOPIC) {
            const parsedMessage = JSON.parse(payload.message)
            const newMessages = [...deviceMessages, parsedMessage];
            setMessages(newMessages);
        }
        // console.log(deviceMessages);
    },[payload]);

    return <div>
        <MqttConnect/>
        <Navbar/>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Device ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Device Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                </tr>
                </thead>
                <tbody className="overflow-y-scroll" style={{maxHeight: "50vh"}}>
                {deviceMessages.map((message, index) =>
                    <tr key={index} className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {message.device_id}
                        </th>
                        <td className="px-6 py-4">
                            {message.device_name}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${message.status === 1 ? "bg-green-500" : "bg-red-500" } ` }></div>
                                {message.status === 1 ? "True" : "False"}
                            </div>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </div>
    </div>
}

export default Device;
