import "./widget.scss";
import * as React from 'react'
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Switch from '@mui/material/Switch';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import {CARD_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

var mqtt = require("mqtt")

const Widget = ({ card }) => {
    const history = useNavigate()
    let data;
    let type = card.type
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
        case "light":
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
        case "water":
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
                <span className="link" onClick={() => history(CARD_ROUTE + '/' + card.id)}>Настройки</span>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;