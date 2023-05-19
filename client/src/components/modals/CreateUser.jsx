import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {NavLink, useNavigate} from "react-router-dom";
import {registration} from "../../http/userAPI";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Button, Container, Dropdown, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";

const CreateUser = observer(({show, onHide}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [root, setRoot] = useState(false);

    const {user} = useContext(Context)
    const history = useNavigate()

    const handleClick = () => setRoot(!root)
    const signUp = () => {
        registration(username, password, root).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-4 mb-4 p-2"}
                        value={username}
                        placeholder={"Введите имя пользователя..."}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className={"m-0 p-2 mb-4"}
                        placeholder={"Введите пароль..."}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="rootField"
                            onClick={handleClick}
                            name="root"
                            value={root}
                        />
                        <label class="form-check-label" htmlFor="rootField">Права администратора</label>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={signUp}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateUser;