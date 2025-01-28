import Home from "../views/auth/Home";
import StudentCreate from "../views/auth/StudentCreate";

export const authenticatedRoutes = [
    {   
        path: '/home',
        element : <Home/>,
    },
    {   
        path: '/novo-aluno',
        element : <StudentCreate/>,
    },
]

export default authenticatedRoutes