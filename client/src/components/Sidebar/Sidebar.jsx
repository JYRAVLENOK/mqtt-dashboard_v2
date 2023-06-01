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

import "./sidebar.scss"
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BedIcon from '@mui/icons-material/Bed';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {observer} from "mobx-react-lite";
import {DEVICES_ROUTE, HOME_ROUTE, SCENARIO_ROUTE, SETTINGS_ROUTE, USERS_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../index";

const Sidebar = () => {
    const history = useNavigate()
    const {user} = useContext(Context)
    // console.log(JSON.parse(JSON.stringify(user._user)))
    return (
        <div className="sidebar">
            <div className="top">
                <span
                    className="logo"
                    onClick={() => history(HOME_ROUTE, true)}
                >
                    MQTT
                </span>
            </div>
            <div className="center">
                <ul className="ul">
                    <li>
                        <BedIcon/>
                        <span
                            onClick={() => history(DEVICES_ROUTE, true)}
                        >
                            Мои устройства
                        </span>
                    </li>
                    <li>
                        <EditNoteIcon/>
                        <span
                            onClick={() => history(SCENARIO_ROUTE, true)}
                        >
                            Мои сценарии
                        </span>
                    </li>
                    {JSON.parse(JSON.stringify(user._user)).root && <li>
                        <GroupIcon/>
                        <span
                            onClick={() => history(USERS_ROUTE, true)}
                        >
                            Пользователи
                        </span>
                    </li>}
                    {JSON.parse(JSON.stringify(user._user)).root && <li>
                        <SettingsIcon/>
                        <span
                            onClick={() => history(SETTINGS_ROUTE, true)}
                        >
                            Настройки
                        </span>
                    </li>}
                </ul>
            </div>
        </div>

    )
}

export default Sidebar