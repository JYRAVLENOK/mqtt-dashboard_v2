import "./registration.scss"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import React, {useContext, useState} from "react";
// import {Navbar} from "react-bootstrap";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button} from "react-bootstrap";

const Registration = observer(() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] =useState("")

    const {user} = useContext(Context)
    const history = useNavigate()
    const signUp = async () => {
        try {
            let data;
            if (password !== repeat) {
                alert("Пароли не совпадают!")
            } else {
                data = await registration(username, password)
                user.setUser(data)
                user.setIsAuth(true)
                history(HOME_ROUTE)
            }
        } catch (e) {
            alert(e.response.data.message)

        }
    }


    return (
        <div className="container" >
            <h2>Регистрация</h2>
            <form>
                <input
                    type="text"
                    value={username}
                    placeholder={"Введите имя пользователя..."}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={"Введите пароль..."}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder={"Подтвердите пароль..."}
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                />
                <Button
                    // type="submit"
                    variant={"outline-success"}
                    onClick={signUp}
                >
                    Зарегистрироваться
                </Button>
                <h5 className="text_bot">
                    Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink>
                </h5>
            </form>
        </div>
    )
})

export default Registration