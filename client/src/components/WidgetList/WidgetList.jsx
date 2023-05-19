import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Widget from '../Widgets/Widget.jsx'
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";
import Statistics from "../Statistics/Statistics";

const WidgetList = ({cards, devices}) => {
    const token = localStorage.getItem("token")
    return (
        <Row className="d-flex p-3">
            <>
                {cards.map(card => {
                    if (card.user_id === jwt_decode(token).id) {
                        return <Widget
                            key={card.id}
                            card={card}
                            // device={(JSON.parse(JSON.stringify(devices))).find(dev => dev.id === card.device_id)}
                        />
                    }
                }
                )}
            </>
        </Row>
    );
};

export default WidgetList;