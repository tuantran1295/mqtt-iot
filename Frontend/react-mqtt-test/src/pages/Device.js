import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import MqttConnect from "../services/MqttConnect";
import {useNavigate} from "react-router";
import {TEMP_TOPIC} from "../constant";

const Device = () => {
    const navigate = useNavigate();
    const { payload } = useContext(DataContext);
    const [deviceMessages, setMessages] = useState([]);

    useEffect(() => {
        console.log(payload);
        if (payload.topic === TEMP_TOPIC) {
            const newMessages = [...deviceMessages, payload.message];
            setMessages(newMessages);
        }
    },[payload]);

    return <div>
        <MqttConnect/>
        <h1>Device</h1>
        <ul className="messageList">
            {deviceMessages.map((message) => <li>{JSON.stringify(message)}</li>)}
        </ul>
        <button onClick={() => navigate("/")}>
            Go to Dashboard Page
        </button>
    </div>
}

export default Device;
