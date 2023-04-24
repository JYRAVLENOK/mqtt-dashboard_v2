import Home from './pages/home/Home.jsx'
import {
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    CARD_ROUTE,
    CARD_CREATE_ROUTE,
    DEVICE_CREATE_ROUTE
} from "./utils/consts";
import Login from './pages/login/Login.jsx'
import CreateCard from "./pages/createCard/CreateCard";
import InfoCard from "./pages/infoCard/InfoCard";
import Registration from "./pages/registration/registration";
import CreateDevice from "./pages/createDevice/CreateDevice";
import CreateDevice2 from "./components/modals/createDevice";

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
        path: CARD_CREATE_ROUTE,
        Component: CreateCard
    },
    // {
    //     path: DEVICE_CREATE_ROUTE,
    //     Component: CreateDevice
    // }
    {
        path: DEVICE_CREATE_ROUTE,
        Component: CreateDevice2
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