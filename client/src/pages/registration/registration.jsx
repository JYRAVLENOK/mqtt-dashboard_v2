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
        // <div className="container" >
        //     <h2>Регистрация</h2>
        //     <form>
        //         <input
        //             type="text"
        //             value={username}
        //             placeholder={"Введите имя пользователя..."}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //         <input
        //             type="text"
        //             placeholder={"Введите пароль..."}
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <input
        //             type="text"
        //             placeholder={"Подтвердите пароль..."}
        //             value={repeat}
        //             onChange={(e) => setRepeat(e.target.value)}
        //         />
        //         <Button
        //             // type="submit"
        //             variant={"outline-success"}
        //             onClick={signUp}
        //         >
        //             Зарегистрироваться
        //         </Button>
        //         <h5 className="text_bot">
        //             Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink>
        //         </h5>
        //     </form>
        // </div>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: "auto"}}
        >
            <Card style={{width: 600}} className="p-4">
                <h2 className="m-auto">Регистрация</h2>
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
                        <div className={"text-center mb-2"}>
                            Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink>
                        </div>
                        <Button
                            variant={"outline-success"}
                            onClick={signUp}
                        >
                            Зарегистрироваться
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Registration