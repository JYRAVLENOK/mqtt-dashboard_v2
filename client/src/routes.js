import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import {HOME_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, CARD_ROUTE, CARD_CREATE_ROUTE} from "./utils/consts";
import CreateCard from "./pages/createCard/CreateCard";
import InfoCard from "./pages/infoCard/InfoCard";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: CARD_ROUTE + '/:id',
        Component: InfoCard
    },
    {
        path: CARD_CREATE_ROUTE,
        Component: CreateCard
    },
]

export const publicRoutes = [

]