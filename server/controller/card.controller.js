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

// const db = require('../db')
const {Card} = require('../models/models')
const ApiError = require('../error/ApiError')

//TODO: доделать фильтрацию по комнате при запросе всех карт

class CardController {
    async createCard(req, res, next) {
        try {
            const {user_id, device_id, name, room_id, type, color} = req.body
            // const newCard = await db.query(`INSERT INTO card (user_id, device_id, name, room_id, type) values ($1, $2, $3, $4, $5) RETURNING *`,
            //     [user_id, device_id, name, room_id, type])
            const newCard = await Card.create({user_id, device_id, name, room_id, type, color})
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
        // const cards = await Card.findAll()
        let {room_id} = req.query
        let cards;
        if (!room_id) {
            cards = await Card.findAll()
        } else {
            cards = await Card.findAll({where: {room_id: room_id}})
        }
        res.set({
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        })
        // console.log(res.json(cards))
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
        const {user_id, device_id, name, room_id, type, color} = req.body
        // const card = await db.query(`UPDATE card set user_id = $1, device_id = $2, name = $3, room_id=$4, type=$5 where id = $6 RETURNING *`,
        //     [user_id, device_id, name, room_id, type, id]
        // )
        const card = await Card.update(
            {
                user_id: user_id,
                device_id: device_id,
                name: name,
                room_id: room_id,
                type: type,
                color: color
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
    async deleteCards(req, res) {
        const {device_id} = req.query
        // const card = await db.query(`DELETE FROM card where id = $1`, [id])
        const card = await Card.destroy({
            where: {device_id: device_id}
        })
        return res.json(card)
    }
}

module.exports = new CardController()