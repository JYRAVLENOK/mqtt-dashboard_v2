import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createRoom} from "../../http/roomAPI";

const CreateRoom = observer(({show, onHide}) => {

    const {room} = useContext(Context)
    const [name, setName] = useState('')

    const addRoom = () => {
        let data = {
            "name": name
        }
        let json = JSON.stringify(data)
        // console.log(json)
        createRoom(json).then(data => onHide())
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
                    Добавить новую комнату
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addRoom}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateRoom;