import "./sidebar.scss"
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BedIcon from '@mui/icons-material/Bed';
import {observer} from "mobx-react-lite";
import {DEVICES_ROUTE, HOME_ROUTE, USERS_ROUTE} from "../../utils/consts";
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
                    {JSON.parse(JSON.stringify(user._user)).root && <li>
                        <GroupIcon/>
                        <span
                            onClick={() => history(USERS_ROUTE, true)}
                        >
                            Пользователи
                        </span>
                    </li>}
                    <li>
                        <SettingsIcon/>
                        <span>Настройки</span>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Sidebar