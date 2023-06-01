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

import React, {useContext, useEffect, useMemo, useState} from "react";
import {Context} from "../../index";
import {deleteOneCard, fetchOneCard} from "../../http/cardAPI";
import {Button, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import ConfirmDeleteCard from "../../components/modals/ConfirmDeleteCard";
import {fetchOneRoom, fetchRooms} from "../../http/roomAPI";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import {fetchDevices, fetchOneDevice, updateOneDevice} from "../../http/deviceAPI";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./InfoCard.scss"
import {HexColorPicker} from "react-colorful";

const InfoCard = observer(() => {

    const {id} = useParams()
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [card, setCard] = useState([])
    const [room, setRoom] = useState([])
    const [device, setDevice] = useState({settings: '0/0/0/0'})
    let icon, values
    // let readySettings = Object.values(device.settings?.split('/'))

    useEffect(() => {
        fetchOneCard(id).then(data => {
            setCard(data)
            return data
        }).then(data => {
            fetchOneDevice(data.device_id).then(data => {
                setDevice(data)
                // console.log(device)
                // console.log(device.settings?.split('/'))
                // readySettings = Object.values(device.settings?.split('/'))
                // console.log(readySettings)
            })
            fetchOneRoom(data.room_id).then(data => setRoom(data))
        })
    }, [])
    const readySettings = useMemo(() => {
        return Object.values(device.settings?.split('/'))
    }, [device])

    console.log(typeof(readySettings))
    console.log(readySettings)
    const [color, setColor] = useState(readySettings[2])
    const [createValue, setCreateValue] = useState({
        // color: readySettings[2],
        bright: readySettings[1],
        volume: readySettings[2],
        food: readySettings[2],
        frequency: readySettings[3]
    })
    console.log(createValue)
    const handleChange = e => {
        const fieldName = e.target.name;
        // console.log(fieldName)
        setCreateValue(existingValue => ({
            ...existingValue,
            [fieldName]: e.target.value
        }))
        // console.log(createValue)
    }

    const saveChanges = () => {
        // console.log(createValue)
        const field = "settings"
        let valuer
        switch (device.type) {
            case 'Кормушка':
                valuer = `${readySettings[0]}/${readySettings[1]}/${createValue.volume}/0`
                break;
            case 'Дверь':
                valuer = `${readySettings[0]}`
                break;
            case 'Светильник':
                valuer = `${readySettings[0]}/${createValue.bright}/${color}`
                break;
            case 'Автополив':
                valuer = `${readySettings[0]}/${readySettings[1]}/${createValue.volume}/${createValue.frequency}`
                break;
            default:
                break;
        }
        // console.log(valuer)
        setDevice(prevValue => ({
            ...prevValue,
            [field]: valuer
        }))
            // {settings: `${readySettings[0]}/${readySettings[1]}/${readySettings[2]}/${readySettings[3]}`})
        // console.log(device)
        updateOneDevice(device).then(data => {})

    }
    // const type = device._devices.find(dev => dev.id === card.device_id)
    // console.log(type.type)

    switch(device.type) {
        case "Светильник":
            icon = (
                <LightbulbIcon
                className="icon"
                style={{
                    color: card.color,
                    backgroundColor: card.color + '33',
                    minWidth: 300,
                    minHeight: 300,
                    borderRadius: "10px"
                }}
            />)
            values = (
                <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <span>Яркость:</span>
                    <Form>
                        <Form.Control
                            placeholder="Яркость"
                            // placeholder={createValue.bright}
                            onChange={handleChange}
                            name='bright'
                            value={String(createValue.bright)}
                        />
                    </Form>
                    <span>Цвет подсветки:</span>
                    <HexColorPicker color={color} onChange={setColor} />;
                </div>
            )
            break;
        case "Автополив":
            icon = (
                <WaterfallChartIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                        minWidth: 300,
                        minHeight: 300,
                        borderRadius: "10px"
                    }}
                />
            )
            values = (
                <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <span>Объем полива (мл):</span>
                    <Form>
                        <Form.Control
                            placeholder="Объем"
                            name='volume'
                            onChange={handleChange}
                            value={String(createValue.volume)}
                        />
                    </Form>
                    <span>Частота полива (каждые... дней):</span>
                    <Form>
                        <Form.Control
                            placeholder="Частота полива"
                            name='frequency'
                            onChange={handleChange}
                            value={String(createValue.frequency)}
                        />
                    </Form>
                </div>
            )
            break;
        case "Дверь":
            icon = (
                <MeetingRoomIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                        minWidth: 300,
                        minHeight: 300,
                        borderRadius: "10px"
                    }}
                />
            )
            break;
        case "Кормушка":
            icon = (
                <LocalDiningIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                        minWidth: 300,
                        minHeight: 300,
                        borderRadius: "10px"
                    }}
                />
            )
            values = (
                <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <span>Размер порции (г):</span>
                    <Form>
                        <Form.Control
                            placeholder="Порция"
                            onChange={handleChange}
                            name='food'
                            value={String(createValue.food)}
                        />
                    </Form>
                    {/*<Button variant={"outline-success"} onClick={}>Добавить прием пищи</Button>*/}
                    <Button variant={"outline-success"}>Добавить прием пищи</Button>

                </div>
            )
            break;
        default:
            break;
    }
    //TODO: доделать кнопку редактировать
    return (
        <div className="infoCard">
            <Sidebar/>
            <div className="info">
                <Navbar/>
                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <div>{icon}</div>
                    <h1>{card.name}</h1>
                    <h2>{room.name}</h2>
                    <h3>{device.name}</h3>
                    <div>{values}</div>
                    <div>
                        <Button
                            // type='submit'
                            className = "buttonAdd"
                            variant={"outline-success"}
                            // className={"m-2"}
                            onClick={saveChanges}
                        >
                            Сохранить
                        </Button>
                        <Button
                            // type='submit'
                            className = "buttonAdd"
                            variant={"outline-danger"}
                            // className={"m-2"}
                            onClick={() => {setDeleteVisible(true)}}
                        >
                            Удалить
                        </Button>
                        <ConfirmDeleteCard
                            id={id}
                            show={deleteVisible}
                            onHide={() => {
                                setDeleteVisible(false)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default InfoCard