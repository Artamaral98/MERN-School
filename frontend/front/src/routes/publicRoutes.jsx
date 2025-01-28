import Login from "../views/Login"
import Register from "../views/Register"
import NotFound from "../views/NotFound"
import { Navigate } from "react-router-dom"

const publicRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default publicRoutes