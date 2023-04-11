const db = require('../db')

class RoomController{
    async createRoom(req,res){
        const {name} = req.body
        const room = await db.query('INSERT INTO room (name) values ($1) RETURNING *', [name])
        res.json(room.rows[0])
    }
    async getRooms(req,res){
        const rooms = await db.query('SELECT * FROM room')
        res.json(rooms.rows)
    }
    async getOneRoom(req,res){
        const id = req.params.id
        const room = await db.query('SELECT * from room where id=$1', [id])
        res.json(room.rows[0])
    }
    async updateRoom(req,res){
        const {id, name} = req.body
        const room = await db.query('UPDATE room set name=$1 where id=$2 RETURNING *', [name,id])
        res.json(room.rows[0])
    }
    async deleteRoom(req,res){
        const id = req.params.id
        const room = await db.query('DELETE FROM room where id=$1', [id])
        res.json(room.rows[0])
    }
}

module.exports = new RoomController()