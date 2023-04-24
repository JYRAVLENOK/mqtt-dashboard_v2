import "./widget.scss";
import * as React from 'react'
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Switch from '@mui/material/Switch';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import {CARD_ROUTE} from "../../utils/consts";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

var mqtt = require("mqtt")

const Widget = observer(({ card }) => {
    const history = useNavigate()
    const {device} = useContext(Context)

    let data;
    // let type = device._devices[card.device_id]
    let type = device._devices.find(dev => dev.id === card.device_id).type
    // console.log(type)
    // console.log(card.device_id)
    // console.log(device._devices.find(dev => dev.id === card.device_id).type)
    const [checked, setChecked] = React.useState(false);
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

    switch (type) {
        case "Светильник":
            data = {
                title: card.name,
                isOn: {checked},
                link: "Настройки",
                icon: (
                    <LightbulbIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "Автополив":
            data = {
                title: card.name,
                isOn: {checked},
                link: "Настройки",
                icon: (
                    <WaterfallChartIcon
                        className="icon"
                        style={{
                            color: "darkblue",
                            backgroundColor: "rgba(0, 0, 255, 0.2)",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                {/*<span className="link" onClick={() => history(CARD_ROUTE + '/' + card.id)}>Настройки</span>*/}
                <NavLink className="link" to={CARD_ROUTE + '/' + card.id}>Настройки</NavLink>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
});

export default Widget;