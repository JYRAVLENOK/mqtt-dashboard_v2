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
import Modal from 'react-bootstrap/Modal'
import {observer} from "mobx-react-lite";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice} from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {

    const {device} = useContext(Context)
    const [name, setName] = useState('')

    const addDevice = () => {
        let data = {
            settings: '0/0/0/0/0',
            subscribe: device._selectedType.path,
            publish: device._selectedType.path,
            type: device._selectedType.name,
            name: name
        }
        let json = JSON.stringify(data)
        // console.log(json)
        createDevice(json).then(data => {
            setName('')
            device.setSelectedType({})
            onHide()
        })
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
                    Добавить новое устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Название"
                        onChange={e => setName(e.target.value)}
                        value={String(name)}
                    />
                </Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{device._selectedType.name || "Выберите тип устройства"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <>
                            {device._types.map(typeMap =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(typeMap)}
                                    key={typeMap.id}
                                >
                                    {typeMap.name}
                                </Dropdown.Item>
                            )}
                        </>
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;