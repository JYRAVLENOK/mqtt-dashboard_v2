import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {deleteOneCard, fetchOneCard} from "../../http/cardAPI";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import ConfirmDeleteCard from "../../components/modals/ConfirmDeleteCard";
import {fetchOneRoom, fetchRooms} from "../../http/roomAPI";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import {fetchDevices, fetchOneDevice} from "../../http/deviceAPI";

const InfoCard = observer(() => {

    const {id} = useParams()
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [card, setCard] = useState({})
    const [room, setRoom] = useState({})
    let icon
    const {device} = useContext(Context)

    useEffect(() => {
        fetchOneCard(id).then(data => {
            setCard(data)
            return fetchOneRoom(data.room_id)
            // return (fetchOneRoom(data.room_id), fetchOneDevice(data.device_id))
        })
            .then((data) => {
                setRoom(data)
            })
        fetchDevices().then(data => device.setDevice(data))
    }, [])
    let type1 = "Светильник"
    // const type = device._devices.find(dev => dev.id === card.device_id)
    // console.log(type.type)
    switch(type1) {
        case "Светильник":
            icon = (<LightbulbIcon
                className="icon"
                style={{
                    backgroundColor: "rgba(218, 165, 32, 0.2)",
                    color: "goldenrod",
                    minWidth: 300,
                    minHeight: 300
                }}
            />)
            break;
        case "Автополив":
            icon = (
                <WaterfallChartIcon
                    className="icon"
                    style={{
                        color: "darkblue",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        minWidth: 300,
                        minHeight: 300
                    }}
                />
            )
            break;
        default:
            break;
    }
    return (
        <div style={{textAlign: "center"}}>
            <div>{icon}</div>
            <h1>{card.name}</h1>
            <h2>{room.name}</h2>
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
    )
})

export default InfoCard