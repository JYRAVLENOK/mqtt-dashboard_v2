import "./login.scss"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import React, {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import {HOME_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {login} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const [islog, setIsLog] = useState(false)

    const {user} = useContext(Context)
    const history = useNavigate()
    const signIn = async () => {
        try {
            let data;
            data = await login(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            history(HOME_ROUTE, {replace: true})
            // setIsLog(true)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    // console.log(user.isAuth)
    // console.log(`islog = ${islog}`)
    return (
        <div className="container" >
            <h2>Авторизация</h2>
            <form>
                <input
                    type="text"
                    value={username}
                    placeholder={"Введите имя пользователя..."}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={"Введите пароль..."}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    // type="submit"
                    variant={"outline-success"}
                    onClick={signIn}
                >
                    Войти
                </Button>
                <h5 className="text_bot">
                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                </h5>
            </form>
        </div>
    )
}

export default Login