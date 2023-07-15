export const CONNECT_STATUS = {
    DISCONNECTED: "Disconnected",
    CONNECT: "Connect",
    RECONNECT: "reconnect",
    ERROR: "error"
}

export const TANK_TOPIC = '/device/' + process.env.REACT_APP_DEVICE_ID;
export const TEMP_TOPIC = TANK_TOPIC + '/Temperature'