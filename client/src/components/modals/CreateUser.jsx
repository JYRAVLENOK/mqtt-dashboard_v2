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