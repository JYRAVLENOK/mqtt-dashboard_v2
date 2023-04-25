import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Widget from '../Widgets/Widget.jsx'
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";

const WidgetList = observer(({cards}) => {
    // const {card} = useContext(Context)
    const token = localStorage.getItem("token")

    return (
        <Row className="d-flex p-3">
            <>
                {cards.map(card => {
                    if (card.user_id === jwt_decode(token).id) {
                        return <Widget key={card.id} card={card}/>
                    }
                }
                )}
            </>
        </Row>
    );
});

export default WidgetList;