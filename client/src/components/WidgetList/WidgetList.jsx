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
        <div>
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
        </div>

    );
};

export default WidgetList;