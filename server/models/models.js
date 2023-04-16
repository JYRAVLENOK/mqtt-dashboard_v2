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
    publish: {type: DataTypes.STRING}
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
    type: {type: DataTypes.STRING}
})

User.hasMany(Card)
Card.belongsTo(User)

Device.hasMany(Card)
Card.belongsTo(Device)

Room.hasMany(Card)
Card.belongsTo(Room)

module.exports = {
    User,
    Device,
    Room,
    Card
}