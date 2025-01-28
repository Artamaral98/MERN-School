import { PrivateRoutes } from "./privateRoutes"
import ProtectRoute from "./ProtectRoute";



const GetRoutes = () => {
    const routesWithProtection = PrivateRoutes.map((r) => ({
        ...r, element: <ProtectRoute route={r}>{r.element}</ProtectRoute>,
    }));


    return {
        path: '/',
        children: routesWithProtection
    }
}

export default GetRoutes
