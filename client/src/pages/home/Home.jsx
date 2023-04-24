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

const Home = observer(() => {
    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
    }, [])

    const [addCard, setAddCard] = useState(false)
    const [addDevice, setAddDevice] = useState(false)

    if (addCard) {
        return <Navigate to={CARD_CREATE_ROUTE}/>;
    }
    if (addDevice) {
        return <Navigate to={DEVICE_CREATE_ROUTE}/>;
    }

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="addBar">
                    <button type='submit' className = "buttonAdd" onClick={() => setAddCard(true)}>Добавить карточку</button>
                    <button type='submit' className = "buttonAdd" onClick={() => setAddDevice(true)}>Добавить устройство</button>
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