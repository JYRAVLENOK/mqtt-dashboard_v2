import "./widget.scss";
import * as React from 'react'
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import MeetingRoomIcon from '@mui/icons-material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import Switch from '@mui/material/Switch';
import {CARD_ROUTE} from "../../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {deleteOneCard, fetchCards} from "../../http/cardAPI";
import {fetchDevices, fetchOneDevice} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import Statistics from "../Statistics/Statistics";

var mqtt = require("mqtt")

const Widget = observer(({ card }) => {

    const [checked, setChecked] = useState(false);
    // const [statisticData, setStatisticData] = useState([])
    const [device, setDevice] = useState({})
    // const {device} = useContext(Context)

    // console.log(card.device_id)
    // useEffect(() => {
    //     fetchOneDevice(card.device_id).then(data => {
    //         // setDev(data)
    //         console.log(data)
    //         device.setSelectedDevice(data)
    //         console.log(device._selectedDevice)
    //     })
    // },[])
    useEffect(() => {
        fetchDevices().then(data => {
            // setDev(data)
            console.log(data)
            data.map(deviceMap => {
                if (deviceMap.id === card.device_id) {
                    setDevice(deviceMap)
                }
            })
            console.log(device)
        })
    },[])
    let data
    // console.log(device._selectedDevice)
    // console.log(dev)
    if (device) {
        data = {
            title: card.name,
            isOn: {checked},
            settings: device.settings,
            type: device.type,
            icon: '',
            content: '',
            typeCard: card.type
        }
    } else {
        data = {
            title: card.name,
            isOn: {checked},
            settings: '0/0/0/0/0',
            type: " ",
            icon: '',
            content: '',
            typeCard: card.type
        }
    }
    // if (device._selectedDevice) {
    //     data = {
    //         title: card.name,
    //         isOn: {checked},
    //         settings: device._selectedDevice.settings,
    //         type: device._selectedDevice.type,
    //         icon: '',
    //         content: '',
    //         typeCard: card.type
    //     }
    // } else {
    //     data = {
    //         title: card.name,
    //         isOn: {checked},
    //         settings: '0/0/0/0/0',
    //         type: " ",
    //         icon: '',
    //         content: '',
    //         typeCard: card.type
    //     }
    // }

    // console.log(data.settings)
    const readySettings = data.settings?.split('/');
    const statisticData = device.history?.split(' ');
    // console.log(statisticData)
    // console.log(JSON.parse(JSON.stringify(device._selectedDevice)).settings)
    // var widgetClient = mqtt.connect("ws://192.168.1.7:9001/mqtt", client.client);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log({checked});
        // console.log(client);
        switch (data.title) {
            case "Лампочка":
                // widgetClient.publish("/device/lamp1", checked ? 'off' : 'on')
                break;
            case "Полив":
                // widgetClient.publish("/device/water1", checked ? 'off' : 'on')
                break;
            default:
                break;
        }
    };
    // console.log(data.type)
    switch (data.type) {
        case "Светильник":
            data.content = (
                <div className="center">
                    <div className="content">
                        Яркость: {readySettings[1]} %
                    </div>
                    <div className="content">
                        Цвет: <div className="circle" style={{backgroundColor: readySettings[2]}}/>
                    </div>
                </div>
            )
            data.icon = (
                <LightbulbIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                    }}
                />
            )
            break;
        case "Автополив":
            data.content = (
                <div className="center">
                    <div className="content">
                        Влажность: {readySettings[1]} %
                    </div>
                    <div className="content">
                        Расписание: каждые {readySettings[3]} дня
                    </div>
                    <div className="content">
                        Объем: {readySettings[2]} мл.
                    </div>
                </div>
            )
            data.icon = (
                <WaterfallChartIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                    }}
                />
            )
            break;
        case "Дверь":
            data.content = (<div/>)
            data.icon = (
                <MeetingRoomIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                    }}
                />
            )
            break;
        case "Кормушка":
            data.content = (
                <div className="center">
                    {/*<div className="content">*/}
                    {/*    Порция: {readySettings[1]} г.*/}
                    {/*</div>*/}
                    {/*<div className="content">*/}
                    {/*    Расписание: через каждые {readySettings[2]} часа*/}
                    {/*</div>*/}
                    {/*<div className="content">*/}
                    {/*    Заполн.: {readySettings[3]} %*/}
                    {/*</div>*/}
                    <div className="content">
                        Порция: {readySettings[1]} г.
                    </div>
                    <div className="content">
                        Расписание: через каждые 3 часа
                    </div>
                    <div className="content">
                        Заполн.: {readySettings[3]} %
                    </div>
                </div>
            )
            data.icon = (
                <LocalDiningIcon
                    className="icon"
                    style={{
                        color: card.color,
                        backgroundColor: card.color + '33',
                    }}
                />
            )
            break;
        default:
            break;
    }
    // console.log(data)
    if (data.typeCard === 'statistic')  {
        return (
            <Statistics type={data.type} title={data.title} data={statisticData} aspect={4 / 1}/>
        )
    } else {
        return (
            <div className="widget">
                <div className="left">
                    <span className="title">{data.title}</span>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <NavLink className="link" to={CARD_ROUTE + '/' + card.id}>Настройки</NavLink>
                </div>
                <div className="right">
                    {data.content}
                    <div className="icon">
                        {data.icon}
                    </div>
                </div>
            </div>
        )
    }
});

export default Widget;