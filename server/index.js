// Copyright 2023 Alexandr Vasilev
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const PORT = process.env.PORT || 8080

const cardController = require('./controller/card.controller')
const mqtt = require("mqtt");

let jsonDevices
let deviceToSub

var options = {
    protocol: "ws",
    username: "alex",
    password: "123456",
    keepalive: 10,
    // clientId uniquely identifies client
    // choose any string you wish
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

//обработка ошибок, последний middleware
app.use(errorHandler)

var client = mqtt.connect("ws://192.168.1.13:9001/mqtt", options);
// client.subscribe("/sensors/temp");
// client.subscribe("/sensors/lamp1");
console.log(options);

const updateDeviceSet = async () => {
    console.log(JSON.stringify(deviceToSub))
    let deviceToPost = await fetch(`http://localhost:8080/api/device/device/${deviceToSub.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deviceToSub)
    })
    let result = await deviceToPost
    // console.log(result)
}
var note;
const getMessage = () => {
    client.on("message", function (topic, message) {
        note = message.toString();
        deviceToSub = jsonDevices.find(device => device.publish === topic)
        let messageObj = JSON.parse(message)
        console.log(messageObj.turn)
        console.log(deviceToSub)
        // let arr = topic.split('/')
        // let newTopic = arr[2]
        // console.log(newTopic)
        switch (topic) {
            case "/feeder":
                deviceToSub.settings = `${messageObj.turn}/${messageObj.bright}/${messageObj.color}`
                break;
            case "/door":
                deviceToSub.settings = `${messageObj.turn}/${messageObj.bright}/${messageObj.color}`
                break;
            case "/water":
                deviceToSub.settings = `${messageObj.turn}/${messageObj.bright}/${messageObj.color}`
                break;
            case "/lamp":
                deviceToSub.settings = `${messageObj.turn}/${messageObj.bright}/${messageObj.color}`
                break;
            default:
                break;
        }
        console.log(deviceToSub)
        updateDeviceSet(deviceToSub).then(data => {})
        //client.end();
    });
}
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
        // app.get('/api/card/card/', ())
        //app.get('/api/card/card', cardController.getCards)
        // await cardController.getCards
    } catch (e) {
        console.log(e)
    }
    // fetch('http://localhost:8080/api/card/card/')
    //     .then (
    //         res => console.log(res.json())
    //     )
    // let cardsMQTT = await fetch('http://localhost:8080/api/card/card/')
    let devicesMQTT = await fetch('http://localhost:8080/api/device/device/')
    // let jsonCards = await cardsMQTT.json()
    jsonDevices = await devicesMQTT.json()
    let subDevices = new Set(jsonDevices.map(device => device.publish))
    let arrSubDevices = Array.from(subDevices)
    // const com = new Set(jsonDevices)
    console.log(arrSubDevices)
    arrSubDevices.map(device => {
        client.subscribe(device)
        // console.log(device.publish)
        console.log(`Client subscribed on ${device}`);
    })
    client.subscribe("/publish/lamp/3")
}

start()
getMessage()




