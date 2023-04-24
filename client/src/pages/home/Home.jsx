import "./home.scss"
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Statistics from "../../components/Statistics/Statistics";
import React, {useState, createContext, useContext} from "react";
import { Navigate } from "react-router-dom";
import {useEffect} from "react";
import WidgetList from "../../components/WidgetList/WidgetList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {CARD_CREATE_ROUTE, DEVICE_CREATE_ROUTE} from "../../utils/consts";
import {fetchCards} from "../../http/cardAPI";
import {fetchDevices} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import {Button} from "react-bootstrap";
import CreateDevice2 from "../../components/modals/createDevice";

const Home = observer(() => {
    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
    }, [])

    const [cardVisible, setCardVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    // if (addCard) {
    //     return <Navigate to={CARD_CREATE_ROUTE}/>;
    // }
    // if (addDevice) {
    //     return <Navigate to={DEVICE_CREATE_ROUTE}/>;
    // }

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="addBar">
                    <Button type='submit' className = "buttonAdd">Добавить карточку</Button>
                    <Button type='submit' className = "buttonAdd" onClick={() => {setDeviceVisible(true)}}>Добавить устройство</Button>
                    <CreateDevice2 show={deviceVisible} onHide={() => {
                        setDeviceVisible(false)
                    }}/>
                </div>
                <WidgetList/>
                <div className="charts">
                    <Statistics title="Last 24 Hours" aspect={3 / 1}/>
                </div>
            </div>
        </div>
    )
})

export default Home