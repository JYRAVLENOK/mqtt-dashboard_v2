import Home from './pages/home/Home.jsx'
import {
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    CARD_ROUTE
} from "./utils/consts";
import Login from './pages/login/Login.jsx'
import InfoCard from "./pages/infoCard/InfoCard";
import Registration from "./pages/registration/registration";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CARD_ROUTE + '/:id',
        Component: InfoCard
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
]