import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {createCard} from "../../http/cardAPI";
//import {CardStore} from "../../store/CardStore"
import {Form} from "react-bootstrap"

const CreateCard = () => {
    // async function createCard() {
    //     const response = await fetch('http://localhost:8080/api/card', {
    //         mode: "no-cors",
    //         method: "POST"
    //     });
    //     const jsonResponse = await response.json();
    //     data = jsonResponse;
    //     console.log(jsonResponse);
    // }

    const {card} = useContext(Context)
    const [userId, setUserID] = useState('')
    const [deviceID, setDeviceID] = useState('')
    const [name, setName] = useState('')
    const [RoomID, setRoomID] = useState('')
    const [type, setType] = useState('')



    const addCard = () => {
        let data = {
            user_id: 0,
            device_id: 0,
            name: '',
            room_id: 0,
            type: ''
        }
        data.user_id = userId
        data.device_id = deviceID
        data.name = name
        data.room_id = RoomID
        data.type = type

        const formData = new FormData()
        formData.append('user_id', `${userId}`)
        formData.append('device_id', `${deviceID}`)
        formData.append('name', `${name}`)
        formData.append('room_id', `${RoomID}`)
        formData.append('type', `${type}`)
        console.log(formData)

        // console.log(data)
        // let json = JSON.stringify(data)
        // // console.log(json)
        // createCard(formData).then(data => CardStore.setCard(data))
    }

    return (
        <div>
            <Form.Control
                placeholder="Номер пользователя"
                onChange={e => setUserID(Number(e.target.value))}
                value={String(userId)}
            />
            <Form.Control
                placeholder="Номер устройства"
                onChange={e => setDeviceID(Number(e.target.value))}
                value={String(deviceID)}
            />
            <Form.Control
                placeholder="Название"
                onChange={e => setName(e.target.value)}
                value={String(name)}
            />
            <Form.Control
                placeholder="Номер комнаты"
                onChange={e => setRoomID(Number(e.target.value))}
                value={String(RoomID)}
            />
            <select
                size="1"
                placeholder="Тип устройства"
                onChange={e => setType(e.target.value)}
                value={type}
            >
                <option>light</option>
                <option>water</option>
            </select>
            <button type={"submit"} onClick={addCard}>Добавить</button>
        </div>
    )
}

export default CreateCard