import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Widget from '../Widgets/Widget.jsx'
import Row from "react-bootstrap/Row";

const WidgetList = observer(() => {
    const {card} = useContext(Context)

    return (
        <Row className="d-flex">
            {card._cards.map(card =>
                <Widget key={card.id} card={card}/>
            )}
        </Row>
    );
});

export default WidgetList;