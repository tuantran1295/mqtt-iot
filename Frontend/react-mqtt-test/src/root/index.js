import Device from "../pages/Device";
import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";

export const Root = () => {
    return (
        <Routes>
            <Route element={<Dashboard/>} path='/'/>
            <Route element={<Device/>} path='/device'/>
        </Routes>
    );
};