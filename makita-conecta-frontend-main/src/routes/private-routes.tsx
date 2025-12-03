import Home from "@/pages/home-page";
import { Navigate, Route, Routes } from "react-router";

export function PrivateRoutes(){
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />    
            <Route path="/" element={<Home />} />
        </Routes>
    )
}