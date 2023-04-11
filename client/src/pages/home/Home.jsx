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
import {fetchCards} from "../../http/cardAPI";

const Home = observer(() => {
    const {card} = useContext(Context)

    useEffect(() => {
        fetchCards().then(data => card.setCard(data))
    }, [])

    const [modalActive, setModalActive] = useState("")

    // async function getAllCards() {
    //     const response = await fetch('http://localhost:8080/api/card', {
    //         mode: "no-cors",
    //         method: "GET"
    //     })
    //         .then
    //     var jsonResponse = response;
    //     data = jsonResponse;
    //     console.log(jsonResponse);
    // }

    if (modalActive) {
        return <Navigate to="/create"/>;
    }


    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="addBar">
                    <button type='submit' onClick={() => setModalActive(true)}>Добавить устройство</button>
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