import { BrowserRouter } from "react-router";
import { PublicRoutes } from "./routes/public-routes";

export function App() {

  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  )
}