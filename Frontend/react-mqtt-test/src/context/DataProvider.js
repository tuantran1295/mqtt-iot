import { createContext, useState } from "react";
import {CONNECT_STATUS} from "../constant";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [client, setClient] = useState(null);
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState(CONNECT_STATUS.DISCONNECTED)

    return (
        <DataContext.Provider
            value={{
                client,
                setClient,
                payload,
                setPayload,
                connectStatus,
                setConnectStatus
            }}
        >
            {children}
        </DataContext.Provider>
    )
}