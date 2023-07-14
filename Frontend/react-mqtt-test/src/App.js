
import React, { useState, Fragment } from "react";
import "./App.css";

var mqtt = require("mqtt/dist/mqtt");
var options = {
    protocol: "ws",
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};
console.log('URL: ', process.env.REACT_APP_BROKER_URL, 'PORT: ', process.env.REACT_APP_WEBSOCKET_PORT);
var client = mqtt.connect(process.env.REACT_APP_BROKER_URL + ':' + process.env.REACT_APP_WEBSOCKET_PORT + '/mqtt', options);

const tankTopicName = '/device/' + process.env.REACT_APP_DEVICE_ID;
const tempTopicName = tankTopicName + '/Temperature'

client.subscribe(tankTopicName);
client.subscribe(tempTopicName);
console.log("Client subscribed ");

function App() {
    var note;
    client.on("message", function (topic, message) {
        note = message.toString();
        // Updates React state with message
        setMsg(note);
        console.log(note);
        // client.end();
    });

    // Sets default React state
    const [msg, setMsg] = useState(
        <Fragment>
            <em>...</em>
        </Fragment>
    );

    return (
        <div className="App">
            <header className="App-header">
                <p>The message payload is: {msg}</p>
            </header>
        </div>
    );
}
export default App;