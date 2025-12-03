import { SessionContext } from "@/contexts/session"
import { useContext } from "react"
import { PrivateRoutes } from "./private-routes"
import { PublicRoutes } from "./public-routes"

export function Routes(){
    const {userLogged} = useContext(SessionContext)

    return (
        userLogged ? <PrivateRoutes /> : <PublicRoutes />
    )
}