import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Widget from '../Widgets/Widget.jsx'
import Row from "react-bootstrap/Row";
import {useNavigate} from "react-router-dom";
import {CARD_ROUTE} from "../../utils/consts";

const WidgetList = observer(() => {
    const {card} = useContext(Context)
    // const history = useNavigate()
    // console.log(history)

    return (
        <Row className="d-flex">
            {/*<Row className="d-flex" onClick={() => history(CARD_ROUTE + '/' + card.id)}>*/}
            <>
                {card._cards.map(card =>
                    <Widget key={card.id} card={card}/>
                )}
            </>
        </Row>
    );
});

export default WidgetList;