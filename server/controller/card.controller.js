const db = require('../db')

class CardController {
    async createCard(req, res) {
        const {user_id, device_id, name, room_id, type} = req.body
        const newCard = await db.query(`INSERT INTO card (user_id, device_id, name, room_id, type) values ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, device_id, name, room_id, type])
        res.json(newCard.rows[0])
    }
    async getCards(req, res) {
        const cards = await db.query(`SELECT * FROM card`)
        res.set({
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        })
        res.json(cards.rows)
        console.log(cards.rows)
    }
    async getOneCard(req, res) {
        const id = req.params.id
        const card = await db.query(`SELECT * FROM card where id = $1`, [id])
        res.json(card.rows[0])
    }
    async updateCard(req, res) {
        const {id, user_id, device_id, name, room_id, type} = req.body
        const card = await db.query(`UPDATE card set user_id = $1, device_id = $2, name = $3, room_id=$4, type=$5 where id = $6 RETURNING *`,
            [user_id, device_id, name, room_id, type, id]
        )
        res.json(card.rows[0])
    }
    async deleteCard(req, res) {
        const id = req.params.id
        const card = await db.query(`DELETE FROM card where id = $1`, [id])
        res.json(card.rows[0])
    }
}

module.exports = new CardController()