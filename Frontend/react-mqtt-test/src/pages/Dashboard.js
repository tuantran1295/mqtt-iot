import {useContext, useEffect, useState} from 'react';
import { DataContext } from '../context/DataProvider';
import MqttConnect from "../services/MqttConnect";
import { useNavigate } from "react-router";
import {TANK_TOPIC} from "../constant";

const Dashboard = () => {
    const navigate = useNavigate();
    const { payload } = useContext(DataContext);
    const [dashboardMessages, setMessages] = useState([]);

    useEffect(() => {
        console.log(payload);
        if (payload.topic === TANK_TOPIC) {
            const newMessages = [...dashboardMessages, payload.message];
            setMessages(newMessages);
        }
    },[payload]);

    return <div>
        <MqttConnect/>
        <h1>DASHBOARD</h1>
        <div>
            <ul>
                {dashboardMessages.map((message) => <li>{JSON.stringify(message)}</li>)}
            </ul>
        </div>
        <button onClick={() => navigate("/device")}>
            Go to Device Page
        </button>
    </div>
}

export default Dashboard;
