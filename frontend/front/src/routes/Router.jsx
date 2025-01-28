import { useRoutes } from "react-router-dom"
import GetRoutes from "./GetRoutes"
import publicRoutes from "../routes/publicRoutes"

const Router = () => {

    const protectedRoutes = GetRoutes()

    const allRoutes = [
      protectedRoutes,
      ...publicRoutes,
    ]
  
    const routes = useRoutes(allRoutes)
    return routes
}

export default Router