// const db = require('../db')
const {Room} = require("../models/models");

class RoomController{
    async createRoom(req,res){
        // const {name} = req.body
        // const room = await db.query('INSERT INTO room (name) values ($1) RETURNING *', [name])
        // res.json(room.rows[0])
        const {name} = req.body
        const newRoom = await Room.create({name})
        return res.json(newRoom)
    }
    async getRooms(req,res){
        // const rooms = await db.query('SELECT * FROM room')
        // res.json(rooms.rows)
        const rooms = await Room.findAll()
        return res.json(rooms)
    }
    async getOneRoom(req,res){
        // const id = req.params.id
        // const room = await db.query('SELECT * from room where id=$1', [id])
        // res.json(room.rows[0])
        const {id} = req.params
        const room = await Room.findOne(
            {
                where: {id}
            }
        )
        return res.json(room)
    }
    async updateRoom(req,res){
        // const {id, name} = req.body
        // const room = await db.query('UPDATE room set name=$1 where id=$2 RETURNING *', [name,id])
        // res.json(room.rows[0])
        const {id} = req.params
        const {name} = req.body
        const room = await Room.update(
            {
                name: name
            },
            {
                where: {id}
            }
        )
        return res.json(room)
    }
    async deleteRoom(req,res){
        // const id = req.params.id
        // const room = await db.query('DELETE FROM room where id=$1', [id])
        // res.json(room.rows[0])
        const {id} = req.params
        const room = await Room.destroy({
            where: {id}
        })
        return res.json(room)
    }
}

module.exports = new RoomController()