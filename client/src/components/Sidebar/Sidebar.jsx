import "./sidebar.scss"
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import BedIcon from '@mui/icons-material/Bed';
import {observer} from "mobx-react-lite";

const Sidebar = observer(() => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">MQTT</span>
            </div>
            <div className="center">
                <ul className="ul">
                    <li>
                        <BedIcon/>
                        <span>Мои устройства</span>
                    </li>
                    <li>
                        <GroupIcon/>
                        <span>Пользователи</span>
                    </li>
                    <li>
                        <SettingsIcon/>
                        <span>Настройки</span>
                    </li>
                </ul>
            </div>
        </div>

    )
})

export default Sidebar