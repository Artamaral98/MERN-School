import Login from "../views/Login"
import Register from "../views/Register"
import NotFound from "../views/NotFound"

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
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default publicRoutes