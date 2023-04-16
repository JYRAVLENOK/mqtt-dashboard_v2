const db = require('../db')

class UserController {
    async registration(req, res) {
        const {username, password} = req.body
        const newPerson = await db.query(`INSERT INTO person (username, password, root) values ($1, $2, $3) RETURNING *`, [username, password, 0])
        res.json(newPerson.rows[0])
    }
    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM person`)
        res.json(users.rows)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM person where id = $1`, [id])
        res.json(user.rows[0])
    }
    async updateUser(req, res) {
        const {id, username, password, root} = req.body
        const user = await db.query(`UPDATE person set username = $1, password = $2, root = $3 where id = $4 RETURNING *`,
        [username, password, root, id]
        )
        res.json(user.rows[0])
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM person where id = $1`, [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()