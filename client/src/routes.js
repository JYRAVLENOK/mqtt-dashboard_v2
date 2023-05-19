import Home from './pages/home/Home.jsx'
import {
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    CARD_ROUTE, DEVICES_ROUTE, USERS_ROUTE
} from "./utils/consts";
import Login from './pages/login/Login.jsx'
import InfoCard from "./pages/infoCard/InfoCard";
import Registration from "./pages/registration/registration";
import devicePage from "./pages/device/devicePage";
import UsersPage from "./pages/users/usersPage";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CARD_ROUTE + '/:id',
        Component: InfoCard
    },
    {
        path: DEVICES_ROUTE,
        Component: devicePage
    },
    {
        path: USERS_ROUTE,
        Component: UsersPage
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