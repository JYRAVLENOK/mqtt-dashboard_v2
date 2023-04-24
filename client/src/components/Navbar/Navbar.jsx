import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../index";
import {LOGIN_ROUTE} from "../../utils/consts";

const Navbar = () => {
    const history = useNavigate()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history(LOGIN_ROUTE)
    }
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Поиск..." />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div>
                        <button onClick={logOut}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;