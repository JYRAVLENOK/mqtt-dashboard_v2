import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {deleteOneCard} from "../../http/cardAPI";

const ConfirmDeleteCard = observer(({id, show, onHide}) => {

    const history = useNavigate()

    const deleteCard = (event) => {
        deleteOneCard(id).then(data => onHide())
        history(-1)
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
                    <Modal.Title>Удаление карточки</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить карточку?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Отмена
                    </Button>
                    <Button variant="outline-danger" onClick={deleteCard}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ConfirmDeleteCard;