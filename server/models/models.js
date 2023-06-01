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
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('person', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    root: {type: DataTypes.BOOLEAN}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    settings: {type: DataTypes.STRING},
    subscribe: {type: DataTypes.STRING},
    publish: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, unique: true},
    history: {type: DataTypes.STRING}
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Card = sequelize.define('card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    device_id: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING, unique: true},
    room_id: {type: DataTypes.INTEGER},
    type: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING}
})

// const Broker = sequelize.define('broker', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     address: {type: DataTypes.STRING},
//     keepAlive: {type: DataTypes.INTEGER},
//     protocolId: {type: DataTypes.STRING},
//     protocolVersion: {type: DataTypes.STRING},
//     reconnectPeriod: {type: DataTypes.INTEGER},
//     connectTimeout: {type: DataTypes.INTEGER}
// })

const Scenario = sequelize.define('scenario', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time: {type: DataTypes.TIME},
    device_id: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING, unique: true}
})

User.hasMany(Card)
Card.belongsTo(User)

Device.hasOne(Scenario)
Scenario.belongsTo(Device)

Device.hasMany(Card)
Card.belongsTo(Device)

Room.hasMany(Card)
Card.belongsTo(Room)

module.exports = {
    User,
    Device,
    Room,
    Card,
    Scenario
}