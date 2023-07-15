import React, {useState, useContext, useEffect} from "react";
import {DataContext} from "../context/DataProvider";
import mqtt from "mqtt/dist/mqtt";
import {CONNECT_STATUS, TANK_TOPIC, TEMP_TOPIC} from "../constant";

function MqttConnect() {

    const { client, setClient, setPayload, connectStatus, setConnectStatus } = useContext(DataContext);

    const connectToBroker = () => {
        const options = {
            protocol: "ws",
            clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
        };
        console.log('URL: ', process.env.REACT_APP_BROKER_URL, 'PORT: ', process.env.REACT_APP_WEBSOCKET_PORT);
        const client = mqtt.connect(process.env.REACT_APP_BROKER_URL + ':' + process.env.REACT_APP_WEBSOCKET_PORT + '/mqtt', options);
        setClient(client);
    }

    useEffect(() => {
        if (connectStatus !== CONNECT_STATUS.CONNECT) {
            connectToBroker();
        }
    }, [])

    useEffect(() => {
        if (client) {
            client.on("connect", () => {
                client.subscribe(TANK_TOPIC);
                client.subscribe(TEMP_TOPIC);
                console.log("Client subscribed ");
            });

            client.on("error", (err) => {
                console.error("Connection error: ", err);
                client.end();
            });

            client.on("reconnect", () => {
                console.log("Reconnecting...");
            });

            client.on("message", (topic, message) => {
                const payload = { topic, message: message.toString() };
                setPayload(payload);
                console.log(
                    `received message: ${message} from topic: ${topic}`
                );
            });
        }
    }, [client]);

    const mqttDisconnect = () => {
        if (client) {
            try {
                client.end(false, () => {
                    setConnectStatus(CONNECT_STATUS.DISCONNECTED);
                    console.log("disconnected successfully");
                });
            } catch (error) {
                console.log("disconnect error:", error);
            }
        }
    };
}
export default MqttConnect;