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
            "settings": '',
            "subscribe": device._selectedType.path,
            "publish": device._selectedType.path,
            "type": device._selectedType.name,
            "name": name
        }
        let json = JSON.stringify(data)
        console.log(json)
        createDevice(json).then(data => onHide())
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