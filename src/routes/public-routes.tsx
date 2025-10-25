import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { Route, Routes } from "react-router";

export function PublicRoutes(){
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Routes>
    )
}