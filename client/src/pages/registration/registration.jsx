import "./registration.scss"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import React, {useContext, useState} from "react";
// import {Navbar} from "react-bootstrap";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Button, Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

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
                history(HOME_ROUTE, {replace: true})
            }
        } catch (e) {
            alert(e.response.data.message)

        }
    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: "auto"}}
        >
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-4 mb-4 p-2"}
                        value={username}
                        placeholder={"Введите имя пользователя..."}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"m-0 p-2 mb-4"}
                        type="password"
                        placeholder={"Введите пароль..."}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control
                        className={"m-0 p-2"}
                        type="password"
                        placeholder={"Подтвердите пароль..."}
                        value={repeat}
                        onChange={(e) => setRepeat(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={signUp}
                        >
                            Зарегистрироваться
                        </Button>
                    </Row>
                </Form>
        </Container>
    )
})

export default Registration