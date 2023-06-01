// Copyright 2023 Alexandr Vasilev
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import Home from './pages/home/Home.jsx'
import {
    HOME_ROUTE,
    REGISTRATION_ROUTE,
    LOGIN_ROUTE,
    CARD_ROUTE, DEVICES_ROUTE, USERS_ROUTE, SCENARIO_ROUTE, SETTINGS_ROUTE
} from "./utils/consts";
import Login from './pages/login/Login.jsx'
import InfoCard from "./pages/infoCard/InfoCard";
import Registration from "./pages/registration/registration";
import devicePage from "./pages/device/devicePage";
import UsersPage from "./pages/users/usersPage";
import Scenario from "./pages/scenario/Scenario";
import SettingsPage from "./pages/settings/SettingsPage";

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
    },
    {
        path: SCENARIO_ROUTE,
        Component: Scenario
    },
    {
        path: SETTINGS_ROUTE,
        Component: SettingsPage
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