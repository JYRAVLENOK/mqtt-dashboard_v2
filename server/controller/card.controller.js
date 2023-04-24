// const db = require('../db')
const {Card} = require('../models/models')
const ApiError = require('../error/ApiError')

//TODO: доделать фильтрацию по комнате при запросе всех карт

class CardController {
    async createCard(req, res, next) {
        try {
            const {user_id, device_id, name, room_id, type} = req.body
            // const newCard = await db.query(`INSERT INTO card (user_id, device_id, name, room_id, type) values ($1, $2, $3, $4, $5) RETURNING *`,
            //     [user_id, device_id, name, room_id, type])
            const newCard = await Card.create({user_id, device_id, name, room_id, type})
            res.set({
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                "Content-type": "application/json"
            })
            // console.log(res.body)
            return res.json(newCard)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getCards(req, res) {
        // const cards = await db.query(`SELECT * FROM card`)
        const cards = await Card.findAll()
        res.set({
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        })
        return res.json(cards)
    }
    async getOneCard(req, res) {
        const {id} = req.params
        // const card = await db.query(`SELECT * FROM card where id = $1`, [id])
        const card = await Card.findOne(
            {
                where: {id}
            })
        return res.json(card)
    }
    async updateCard(req, res) {
        const {id} = req.params
        const {user_id, device_id, name, room_id, type} = req.body
        // const card = await db.query(`UPDATE card set user_id = $1, device_id = $2, name = $3, room_id=$4, type=$5 where id = $6 RETURNING *`,
        //     [user_id, device_id, name, room_id, type, id]
        // )
        const card = await Card.update(
            {
                user_id: user_id,
                device_id: device_id,
                name: name,
                room_id: room_id,
                type: type
            },
            {
                where: {id}
            })
        return res.json(card)
    }
    async deleteCard(req, res) {
        const {id} = req.params
        // const card = await db.query(`DELETE FROM card where id = $1`, [id])
        const card = await Card.destroy({
            where: {id}
        })
        return res.json(card)
    }
}

module.exports = new CardController()