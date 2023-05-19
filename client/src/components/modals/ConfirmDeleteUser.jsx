import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteOneCard} from "../../http/cardAPI";
import {deleteOneUser, deleteUser} from "../../http/userAPI";

const ConfirmDeleteUser = observer(({id, show, onHide}) => {

    const history = useNavigate()

    const deleteUser = (event) => {
        deleteOneUser(id).then(data => onHide())
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Удаление пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить пользователя?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Отмена
                    </Button>
                    <Button variant="outline-danger" onClick={deleteUser}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ConfirmDeleteUser;