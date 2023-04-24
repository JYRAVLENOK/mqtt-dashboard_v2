import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import "./createCard.scss"
import {createCard, fetchCards} from "../../http/cardAPI";
//import {CardStore} from "../../store/CardStore"
import {Dropdown, Form} from "react-bootstrap"
import jwt_decode from "jwt-decode"
import {fetchDevices} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import {observer} from "mobx-react-lite";
import {Navigate, useNavigate} from "react-router-dom";

const CreateCard = observer(() => {
    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    const history = useNavigate()
    const token = localStorage.getItem("token")

    const [userId, setUserID] = useState(0)
    const [deviceID, setDeviceID] = useState(0)
    const [name, setName] = useState('')
    const [RoomID, setRoomID] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
    }, [])

    const addCard = () => {
        let data = {
            user_id: jwt_decode(token).id,
            device_id: device._selectedDevice.id,
            name: name,
            room_id: room._selectedRoom.id,
            type: 'turn'
        }
        console.log(data)
        let json = JSON.stringify(data)
        console.log(json)
        createCard(json).then(data => {
            history(-1)
        })
    }

    return (
        <div>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{device._selectedDevice.name || "Выберите устройство"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <>
                        {device._devices.map(deviceMap =>
                            <Dropdown.Item
                                onClick={() => device.setSelectedDevice(deviceMap)}
                                key={deviceMap.id}
                            >
                                    {deviceMap.name}
                            </Dropdown.Item>
                        )}
                    </>
                </Dropdown.Menu>
            </Dropdown>

            <Form.Control
                placeholder="Название"
                onChange={e => setName(e.target.value)}
                value={String(name)}
            />
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{room._selectedRoom.name || "Выберите комнату"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <>
                        {room._rooms.map(roomMap =>
                                <Dropdown.Item
                                    onClick={() => room.setSelectedRoom(roomMap)}
                                    key={roomMap.id}
                                >
                                        {roomMap.name}
                                </Dropdown.Item>
                        )}
                    </>
                </Dropdown.Menu>
            </Dropdown>
            <button type={"submit"} onClick={addCard}>Добавить</button>
        </div>
    )
})

export default CreateCard