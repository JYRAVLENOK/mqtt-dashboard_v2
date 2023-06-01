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
import {Button, Card} from "react-bootstrap";
import { deleteOneDevice} from "../../http/deviceAPI";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import {deleteCards} from "../../http/cardAPI";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./devicePage.scss"
import Navbar from "../../components/Navbar/Navbar";

const DevicePage = observer(() => {
    const {device} = useContext(Context)
    // var settings = ''
    const deleteDevice = (id) => {
        deleteOneDevice(id).then(data => {})
        deleteCards(id).then(data => {})
    }
    return (
        <div className="devicePage">
            <Sidebar/>
            <div className="devices">
                <Navbar/>
                {device._devices.map(deviceMap => {
                    // switch(deviceMap.type)
                    // {
                    //     case "Светильник":
                    //         settings = 'Яркость:, цвет: '
                    //         break;
                    //     case "Автополив":
                    //
                    //         break;
                    //     case "Дверь":
                    //
                    //         break;
                    //     case "Кормушка":
                    //         break;
                    //     default:
                    //         break;
                    // }

                    return <Card
                        key={deviceMap.id}
                        className="device"
                    >
                        <Card.Body>
                            <Card.Title>{deviceMap.name}</Card.Title>
                            <Card.Text>
                                тема подписки: {deviceMap.subscribe}
                            </Card.Text>
                            <Card.Text>
                                тема публикации: {deviceMap.publish}
                            </Card.Text>
                            <Button
                                // type='submit'
                                // className = "buttonAdd"
                                variant={"outline-danger"}
                                // className={"m-2"}
                                onClick={() => {deleteDevice(deviceMap.id)}}
                            >
                                Удалить
                            </Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    );
})

export default DevicePage;