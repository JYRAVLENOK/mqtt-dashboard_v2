//import "./login.scss"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import React, {useContext, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card"

import {HOME_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {login} from "../../http/userAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";

const Login = observer(() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {user} = useContext(Context)
    const history = useNavigate()

    const signIn = async () => {
        try {
            let data;
            data = await login(username, password)
            user.setUser(data)
            user.setIsAuth(true)
            history(HOME_ROUTE, {replace: true})
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        //     <div className="container" >
        //         <h2>Авторизация</h2>
        //         <form>
        //             <input
        //                 type="text"
        //                 value={username}
        //                 placeholder={"Введите имя пользователя..."}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //             <input
        //                 type="password"
        //                 placeholder={"Введите пароль..."}
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <Button
        //                 // type="submit"
        //                 variant={"outline-success"}
        //                 onClick={signIn}
        //             >
        //                 Войти
        //             </Button>
        //             <h5 className="text_bot">
        //                 Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
        //             </h5>
        //         </form>
        //     </div>
        // )
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: "auto"}}
        >
            <Card style={{width: 600}} className="p-4">
                <h2 className="m-auto">Авторизация</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-4 mb-4 p-2"}
                        value={username}
                        placeholder={"Введите имя пользователя..."}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"m-0 p-2"}
                        type="password"
                        placeholder={"Введите пароль..."}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div className={"text-center mb-2"}>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                        </div>
                        <Button
                            variant={"outline-success"}
                            onClick={signIn}
                        >
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>

    )
})

export default Login