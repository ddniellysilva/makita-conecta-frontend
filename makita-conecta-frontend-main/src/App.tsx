import { BrowserRouter } from "react-router";
import { PublicRoutes } from "./routes/public-routes";
import { Routes } from "./routes/routes";
import { SessionProvider } from "./contexts/session";

export function App() {

  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes />
      </SessionProvider>
    </BrowserRouter>
  )
}