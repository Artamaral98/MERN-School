import { authenticatedRoutes } from "./authenticatedRoutes"

export const PrivateRoutes = [
    ...authenticatedRoutes
]
export default PrivateRoutes