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

import "./home.scss"
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Statistics from "../../components/Statistics/Statistics";
import React, {useState, useContext, useMemo} from "react";
import { Navigate } from "react-router-dom";
import {useEffect} from "react";
import WidgetList from "../../components/WidgetList/WidgetList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchCards} from "../../http/cardAPI";
import {fetchDevices} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import CreateDevice from "../../components/modals/CreateDevice.jsx";
import CreateCard from "../../components/modals/CreateCard";
import Row from "react-bootstrap/Row";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import jwt_decode from "jwt-decode";
import Widget from "../../components/Widgets/Widget";
import CreateRoom from "../../components/modals/CreateRoom";

const Home = observer(() => {
    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    useEffect(() => {
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
        fetchCards().then(data => card.setCard(data))
    }, [])

    useEffect(() => {
        fetchCards(room.selectedRoom.id).then(data => card.setCard(data))
    }, [room._selectedRoom])
    // useMemo(() => {
    //     fetchDevices().then(data => device.setDevice(data))
    //     fetchCards().then(data => card.setCard(data))
    //     fetchRooms().then(data => room.setRooms(data))
    // },[card._cards, device._devices, room._rooms])
    //
    // зависимости?
    // console.log(card._cards)
    // console.log(device._devices)
    // console.log(room._rooms)

    const [cardVisible, setCardVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [roomVisible, setRoomVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const [key, setKey] = useState('Все усутройства');

    const searchedCards = useMemo(() => {
        return Object.values(card._cards).filter(post => post.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, card._cards])
    // console.log(searchedCards)
    // var now = new Date();
    // console.log(now.getMinutes())
    // const searchedDevices = useMemo(() => {
    //     return Object.values(device._devices).filter(post => post.name.toLowerCase().includes(searchQuery.toLowerCase()))
    // }, [searchQuery, card._cards])
    //
    // const type = (JSON.parse(JSON.stringify(device._devices))).find(dev => dev.id === card.device_id).type || "Светильник"
    // console.log(searchedCards)
    // console.log(Object.values(card))
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="searchBar">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <SearchOutlinedIcon />
                    </div>
                    <Button
                        // type='submit'
                        className = "buttonAdd"
                        variant={"outline-success"}
                        // className={"mr-4"}
                        onClick={() => {setCardVisible(true)}}
                    >
                        Добавить карточку
                    </Button>
                    <Button
                        // type='submit'
                        className = "buttonAdd"
                        variant={"outline-success"}
                        // className={"m-2"}
                        onClick={() => {setDeviceVisible(true)}}
                    >
                        Добавить устройство
                    </Button>
                    <CreateCard show={cardVisible} onHide={() => {
                        setCardVisible(false)
                    }}/>
                    <CreateDevice show={deviceVisible} onHide={() => {
                        setDeviceVisible(false)
                    }}/>
                    <CreateRoom show={roomVisible} onHide={() => {
                        setRoomVisible(false)
                    }}/>

                </div>
                <div className="roomBar">
                    {/*<Tabs*/}
                    {/*    // id="controlled-tab-example"*/}
                    {/*    activeKey={key}*/}
                    {/*    onSelect={(k) => setKey(k)}*/}
                    {/*    className="mb-3"*/}
                    {/*>*/}
                    {/*    <>*/}
                    {/*        {room._rooms.map(room => {*/}
                    {/*                if (room.id === .id) {*/}
                    {/*                    return <Widget*/}
                    {/*                        key={card.id}*/}
                    {/*                        card={card}*/}
                    {/*                        device={(JSON.parse(JSON.stringify(devices))).find(dev => dev.id === card.device_id)}*/}
                    {/*                    />*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        )}*/}
                    {/*    </>*/}
                    {/*    <Tab eventKey="Все устройства" title="Home">*/}
                    {/*        <WidgetList*/}
                    {/*            cards={searchedCards}*/}
                    {/*            devices={device._devices}*/}
                    {/*        />*/}
                    {/*    </Tab>*/}
                    {/*</Tabs>*/}
                    {/*<Card*/}
                    {/*    style={{cursor:'pointer'}}*/}
                    {/*    className="roomButton"*/}
                    {/*    onClick={() => room.setSelectedRoom('')}*/}
                    {/*    border= {'light'}*/}
                    {/*>*/}
                    {/*    Все карточки*/}
                    {/*</Card>*/}
                    <Button
                        // type='submit'
                        className = "roomButton"
                        variant={"outline-secondary"}
                        // className={"m-2"}
                        onClick={() => room.setSelectedRoom('')}
                    >
                        Все карточки
                    </Button>

                    {room._rooms.map(roomMap =>
                        // <Card
                        //     style={{cursor:'pointer', marginLeft: '5px'}}
                        //     key={roomMap.id}
                        //     className="roomButton"
                        //     onClick={() => room.setSelectedRoom(roomMap)}
                        //     border= {'light'}
                        // >
                        //     {roomMap.name}
                        // </Card>
                        <Button
                            // type='submit'
                            className="roomButton"
                            variant={"outline-secondary"}
                            key={roomMap.id}
                            // className={"m-2"}
                            onClick={() => room.setSelectedRoom(roomMap)}
                        >
                            {roomMap.name}
                        </Button>
                    )}

                    <Button
                        // type='submit'
                        className = "roomButton"
                        variant={"outline-secondary"}
                        // className={"m-2"}
                        onClick={() => setRoomVisible(true)}
                    >
                        +
                    </Button>
                </div>
                <WidgetList
                    cards={searchedCards}
                    devices={device._devices}
                />
                {/*<div className="charts">*/}
                {/*    <Statistics title="Last 24 Hours" aspect={4 / 1}/>*/}
                {/*</div>*/}
            </div>
        </div>
        // <Container>
        //     <Row className="mt-2">
        //         <Col md={3}>
        //             <Sidebar/>
        //         </Col>
        //         <Col md={9}>
        //             <Navbar/>
        //             <Button
        //                 type='submit'
        //                 className = "buttonAdd"
        //                 onClick={() => {setCardVisible(true)}}
        //             >
        //                 Добавить карточку
        //             </Button>
        //             <Button
        //                 type='submit'
        //                 className = "buttonAdd"
        //                 onClick={() => {setDeviceVisible(true)}}
        //             >
        //                 Добавить устройство
        //             </Button>
        //             <WidgetList/>
        //         </Col>
        //     </Row>
        // </Container>
    )
})

export default Home