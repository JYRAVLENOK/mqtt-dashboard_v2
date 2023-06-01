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