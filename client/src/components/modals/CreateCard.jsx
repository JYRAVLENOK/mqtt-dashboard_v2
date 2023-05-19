import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
//import "./createCard.scss"
import {createCard, fetchCards} from "../../http/cardAPI";
import {Button, Dropdown, Form} from "react-bootstrap"
import jwt_decode from "jwt-decode"
import {fetchDevices, updateOneDevice} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import { HexColorPicker } from "react-colorful";

const CreateCard = observer(({show, onHide}) => {

    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    const token = localStorage.getItem("token")

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
    }, [])

    // const [name, setName] = useState('')
    const [status, setStatus] = useState(false)
    const [color, setColor] = useState("#aabbcc")
    const [colorIcon, setColorIcon] = useState("#aabbcc")
    // const [bright, setBright] = useState('')
    // const [volume, setVolume] = useState('')
    // const [frequency, setFrequency] = useState('')

    const [createValue, setCreateValue] = useState({
        name: '',
        bright: '',
        volume: '',
        food: '',
        frequency: ''
    })
    const handleChange = e => {
        const fieldName = e.target.name;
        console.log(fieldName)
        setCreateValue(existingValue => ({
            ...existingValue,
            [fieldName]: e.target.value
        }))
        console.log(createValue)
    }

    //TODO: проверить работу без установки зависимостей
    const addCard = () => {
        let dataDevice
        let dataCard = {
            user_id: jwt_decode(token).id,
            device_id: device._selectedDevice.id,
            name: createValue.name,
            room_id: room._selectedRoom.id,
            type: status ? 'statistic' : 'turn',
            color: colorIcon
        }
        switch (device._selectedDevice.type) {
            case 'Кормушка':
                dataDevice = {
                    settings: `0/${createValue.food}/${createValue.frequency}/0`,
                    subscribe: device._selectedDevice.subscribe,
                    publish: device._selectedDevice.publish,
                    type: device._selectedDevice.type,
                    name: device._selectedDevice.name,
                    history: device._selectedDevice.history
                }
                break;
            case 'Дверь':
                dataDevice = {
                    settings: `0`,
                    subscribe: device._selectedDevice.subscribe,
                    publish: device._selectedDevice.publish,
                    type: device._selectedDevice.type,
                    name: device._selectedDevice.name,
                    history: device._selectedDevice.history
                }
                break;
            case 'Светильник':
                dataDevice = {
                    settings: `0/${createValue.bright}/${color}`,
                    subscribe: device._selectedDevice.subscribe,
                    publish: device._selectedDevice.publish,
                    type: device._selectedDevice.type,
                    name: device._selectedDevice.name,
                    history: device._selectedDevice.history
                }
                break;
            case 'Автополив':
                dataDevice = {
                    settings: `0/0/${createValue.volume}/${createValue.frequency}`,
                    subscribe: device._selectedDevice.subscribe,
                    publish: device._selectedDevice.publish,
                    type: device._selectedDevice.type,
                    name: device._selectedDevice.name,
                    history: device._selectedDevice.history
                }
                break;
            default:
                break;
        }

        let jsonDevice = JSON.stringify(dataDevice)
        let jsonCard = JSON.stringify(dataCard)
        // console.log(json)
        createCard(jsonCard).then(data => {})
        updateOneDevice(device._selectedDevice.id, jsonDevice).then(data => onHide())
        console.log(device._selectedDevice)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую карточку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Название"
                        name='name'
                        // onChange={e => setName(e.target.value)}
                        onChange={handleChange}
                        // value={String(name)}
                        value={String(createValue.name)}
                    />
                </Form>
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
                {device._selectedDevice.type === 'Автополив' && <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{card._selectedCard.type || "Выберите тип карточки"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => setStatus(true)}
                        >
                            Статистика
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setStatus(false)}
                        >
                            Контроллер
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}

                {device._selectedDevice.type === 'Светильник' && <div>
                    <span>Установите яркость:</span>
                    <Form>
                        <Form.Control
                            placeholder="Яркость"
                            onChange={handleChange}
                            name='bright'
                            value={String(createValue.bright)}
                        />
                    </Form>
                    <span>Выберите цвет подсветки:</span>
                    <HexColorPicker color={color} onChange={setColor} />;
                </div>}

                {!status && device._selectedDevice.type === 'Автополив' && <div>
                    <span>Установите объем полива (мл):</span>
                    <Form>
                        <Form.Control
                            placeholder="Объем"
                            name='volume'
                            onChange={handleChange}
                            value={String(createValue.volume)}
                        />
                    </Form>
                    <span>Выберите частоту полива (каждые... дней):</span>
                    <Form>
                        <Form.Control
                            placeholder="Частота полива"
                            name='frequency'
                            onChange={handleChange}
                            value={String(createValue.frequency)}
                        />
                    </Form>
                </div>}

                {device._selectedDevice.type === 'Кормушка' && <div>
                    <span>Установите размер порции (г):</span>
                    <Form>
                        <Form.Control
                            placeholder="Порция"
                            onChange={handleChange}
                            name='food'
                            value={String(createValue.food)}
                        />
                    </Form>
                    {/*<Button variant={"outline-success"} onClick={}>Добавить прием пищи</Button>*/}
                    {/*<Button variant={"outline-success"}>Добавить прием пищи</Button>*/}
                    <Form.Control
                        placeholder="Частота кормления"
                        name='frequency'
                        onChange={handleChange}
                        value={String(createValue.frequency)}
                    />
                </div>}

                <span>Выберите цвет иконки:</span>
                <HexColorPicker color={colorIcon} onChange={setColorIcon} />
                {/*<HexColorPicker color={colorIcon} onChange={setColorIcon} />*/}

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addCard}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateCard