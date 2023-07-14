const mqtt = require("mqtt");
require("dotenv").config();

const clientId = 'mqttjs_' + process.env.DEVICE_ID;

const client = mqtt.connect(process.env.BROKER_URL, {
    clientId: clientId,
    clean: false,
});

const tankTopicName = '/device/' + process.env.DEVICE_ID;
const tempTopicName = tankTopicName + '/Temperature'

// console.log(process.env.BROKER_URL, 'client', clientId, 'topicName: ', topicName);

client.on("connect", function (connack) {
    // console.log("client connected", connack);

    client.subscribe(tankTopicName);
    client.subscribe(tempTopicName)

    setInterval(() => {
       publishTankMessage(client);
       publishTempMessage(client);
    }, 3000)
});

const randomNumberGenerate = (max) => {
    return Math.round((new Date().getTime()*Math.PI)%1 * max);
};

const publishTankMessage = (client) => {
    const tankPayload = {
        device_id: process.env.DEVICE_ID,
        device_name: 'Tank',
        status: randomNumberGenerate(1) // RNG
    };

    client.publish(
        tankTopicName,
        JSON.stringify(tankPayload),
        { qos: 1, retain: true },
        (PacketCallback, err) => {
            if (err) {
                console.log(err, "MQTT publish packet");
            }
        }
    );
};

const publishTempMessage = (client) => {
    const tempPayload = {
        device_id: process.env.DEVICE_ID,
        sensor_name: 'Temperature',
        value: randomNumberGenerate(100), // RNG
        unit: 'C'
    };

    client.publish(
        tempTopicName,
        JSON.stringify(tempPayload),
        { qos: 1, retain: true },
        (PacketCallback, err) => {
            if (err) {
                console.log(err, "MQTT publish packet");
            }
        }
    );
};


client.on('message', function(topic, message) {
    console.log('MESSAGE: ', message.toString());
});

client.on("error", function (err) {
    console.log("Error: " + err);
    if (err.code == "ENOTFOUND") {
        console.log(
            "Network error, make sure you have an active internet connection"
        );
    }
});

client.on("close", function () {
    console.log("Connection closed by client");
});

client.on("reconnect", function () {
    console.log("Client trying a reconnection");
});

client.on("offline", function () {
    console.log("Client is currently offline");
});
