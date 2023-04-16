const db = require('../db')
const ApiError = require('../error/ApiError')
const {User, Room, Card, Device} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, username, root) => {
    return jwt.sign({id, username, root},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration(req, res, next) {
        // const {username, password} = req.body
        // const newPerson = await db.query(`INSERT INTO person (username, password, root) values ($1, $2, $3) RETURNING *`, [username, password, 0])
        // res.json(newPerson.rows[0])
        const {username, password, root} = req.body
        if (!username || !password) {
            return next(ApiError.badRequest('Некорректное имя пользователя или пароль!'))
        }
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashPassword, root})
        // const token = jwt.sign({id: user.id, username, root},
        //     process.env.SECRET_KEY,
        //     {expiresIn: '24h'}
        // )
        const token = generateJWT(user.id, user.username, user.root)
        return res.json({token})
    }
    async login(req, res, next) {
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJWT(user.id, user.username, user.root)
        return res.json({token})
    }
    async getUsers(req, res, next) {
        // const users = await db.query(`SELECT * FROM person`)
        // res.json(users.rows)
        // const {id} = req.query
        // if (!id) {
        //     return next(ApiError.badRequest('Не задан ID'))
        // }
        // res.json(id)
        const users = await User.findAll()
        return res.json(users)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM person where id = $1`, [id])
        res.json(user.rows[0])
    }
    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.username, req.user.root)
        return res.json({token})
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