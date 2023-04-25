import "./home.scss"
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Statistics from "../../components/Statistics/Statistics";
import React, {useState, useContext, useMemo} from "react";
import { Navigate } from "react-router-dom";
import {useEffect} from "react";
import WidgetList from "../../components/WidgetList/WidgetList.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchCards} from "../../http/cardAPI";
import {fetchDevices} from "../../http/deviceAPI";
import {fetchRooms} from "../../http/roomAPI";
import {Button, Col, Container, Form} from "react-bootstrap";
import CreateDevice from "../../components/modals/CreateDevice.jsx";
import CreateCard from "../../components/modals/CreateCard";
import Row from "react-bootstrap/Row";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Home = observer(() => {
    const {card} = useContext(Context)
    const {device} = useContext(Context)
    const {room} = useContext(Context)

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
        fetchDevices().then(data => device.setDevice(data))
        fetchRooms().then(data => room.setRooms(data))
    }, [])
    // зависимости?

    const [cardVisible, setCardVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const searchedCards = useMemo(() => {
        return Object.values(card._cards).filter(post => post.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery])

    // console.log(searchedCards)
    // console.log(Object.values(card))
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="searchBar">
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <SearchOutlinedIcon />
                    </div>
                    <Button
                        // type='submit'
                        className = "buttonAdd"
                        variant={"outline-success"}
                        // className={"mr-4"}
                        onClick={() => {setCardVisible(true)}}
                    >
                        Добавить карточку
                    </Button>
                    <Button
                        // type='submit'
                        className = "buttonAdd"
                        variant={"outline-success"}
                        // className={"m-2"}
                        onClick={() => {setDeviceVisible(true)}}
                    >
                        Добавить устройство
                    </Button>
                    <CreateCard show={cardVisible} onHide={() => {
                        setCardVisible(false)
                    }}/>
                    <CreateDevice show={deviceVisible} onHide={() => {
                        setDeviceVisible(false)
                    }}/>
                </div>
                <div className="addBar">
                    {/*<Button*/}
                    {/*    // type='submit'*/}
                    {/*    className = "buttonAdd"*/}
                    {/*    variant={"outline-success"}*/}
                    {/*    // className={"mr-4"}*/}
                    {/*    onClick={() => {setCardVisible(true)}}*/}
                    {/*>*/}
                    {/*    Добавить карточку*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*    // type='submit'*/}
                    {/*    className = "buttonAdd"*/}
                    {/*    variant={"outline-success"}*/}
                    {/*    // className={"m-2"}*/}
                    {/*    onClick={() => {setDeviceVisible(true)}}*/}
                    {/*>*/}
                    {/*    Добавить устройство*/}
                    {/*</Button>*/}
                    {/*<CreateCard show={cardVisible} onHide={() => {*/}
                    {/*    setCardVisible(false)*/}
                    {/*}}/>*/}
                    {/*<CreateDevice show={deviceVisible} onHide={() => {*/}
                    {/*    setDeviceVisible(false)*/}
                    {/*}}/>*/}
                </div>
                <WidgetList
                    cards={searchedCards}
                />
                <div className="charts">
                    <Statistics title="Last 24 Hours" aspect={3 / 1}/>
                </div>
            </div>
        </div>
        // <Container>
        //     <Row className="mt-2">
        //         <Col md={3}>
        //             <Sidebar/>
        //         </Col>
        //         <Col md={9}>
        //             <Navbar/>
        //             <Button
        //                 type='submit'
        //                 className = "buttonAdd"
        //                 onClick={() => {setCardVisible(true)}}
        //             >
        //                 Добавить карточку
        //             </Button>
        //             <Button
        //                 type='submit'
        //                 className = "buttonAdd"
        //                 onClick={() => {setDeviceVisible(true)}}
        //             >
        //                 Добавить устройство
        //             </Button>
        //             <WidgetList/>
        //         </Col>
        //     </Row>
        // </Container>
    )
})

export default Home