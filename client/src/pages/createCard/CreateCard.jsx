// import React, {useContext, useEffect, useState} from "react";
// import {Context} from "../../index";
// //import "./createCard.scss"
// import {createCard, fetchCards} from "../../http/cardAPI";
// import {Button, Dropdown, Form} from "react-bootstrap"
// import jwt_decode from "jwt-decode"
// import {fetchDevices} from "../../http/deviceAPI";
// import {fetchRooms} from "../../http/roomAPI";
// import {observer} from "mobx-react-lite";
// import Modal from "react-bootstrap/Modal";
//
// const CreateCard = observer(({show, onHide}) => {
//
//     const {card} = useContext(Context)
//     const {device} = useContext(Context)
//     const {room} = useContext(Context)
//
//     const token = localStorage.getItem("token")
//
//     const [name, setName] = useState('')
//
//     useEffect(() => {
//         fetchCards().then(data => card.setCard(data))
//         fetchDevices().then(data => device.setDevice(data))
//         fetchRooms().then(data => room.setRooms(data))
//     }, [])
//
//     const addCard = () => {
//         let data = {
//             user_id: jwt_decode(token).id,
//             device_id: device._selectedDevice.id,
//             name: name,
//             room_id: room._selectedRoom.id,
//             type: 'turn'
//         }
//         let json = JSON.stringify(data)
//         console.log(json)
//         createCard(json).then(data => onHide())
//     }
//
//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             size="lg"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Добавить новое устройство
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Control
//                         placeholder="Название"
//                         onChange={e => setName(e.target.value)}
//                         value={String(name)}
//                     />
//                 </Form>
//                 <Dropdown className="mt-2 mb-2">
//                     <Dropdown.Toggle>{device._selectedDevice.name || "Выберите устройство"}</Dropdown.Toggle>
//                     <Dropdown.Menu>
//                         <>
//                             {device._devices.map(deviceMap =>
//                                 <Dropdown.Item
//                                     onClick={() => device.setSelectedDevice(deviceMap)}
//                                     key={deviceMap.id}
//                                 >
//                                     {deviceMap.name}
//                                 </Dropdown.Item>
//                             )}
//                         </>
//                     </Dropdown.Menu>
//                 </Dropdown>
//                 <Dropdown className="mt-2 mb-2">
//                     <Dropdown.Toggle>{room._selectedRoom.name || "Выберите комнату"}</Dropdown.Toggle>
//                     <Dropdown.Menu>
//                         <>
//                             {room._rooms.map(roomMap =>
//                                 <Dropdown.Item
//                                     onClick={() => room.setSelectedRoom(roomMap)}
//                                     key={roomMap.id}
//                                 >
//                                     {roomMap.name}
//                                 </Dropdown.Item>
//                             )}
//                         </>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant={"outline-success"} onClick={addCard}>Добавить</Button>
//                 <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
//             </Modal.Footer>
//         </Modal>
//     )
// })
//
// export default CreateCard