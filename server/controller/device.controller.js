const {Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async createDevice(req, res, next) {
        try {
            const {settings, subscribe, publish, type, name, history} = req.body
            const newDevice = await Device.create({settings, subscribe, publish, type, name, history})
            return res.json(newDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getDevice(req, res) {
        const devices = await Device.findAll()
        return res.json(devices)
    }
    async updateDeviceBySub(req, res) {
        const {subscribe} = req.params
        const {settings} = req.body
        const device = await Device.update(
            {
                settings: settings
            },
            {
                where: {subscribe}
            }
        )
        return res.json(device)
    }
    async getOneDevice(req, res) {
        // const id = req.params.id
        // const device = await db.query(`SELECT * FROM device where id = $1`, [id])
        // res.json(device.rows[0])
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id}
            }
        )
        return res.json(device)
    }
    async updateDevice(req, res) {
        const {id} = req.params
        console.log(req.body)
        const {settings, subscribe, publish, type, name, history} = req.body
        // const device = await db.query(`UPDATE device set settings = $1, subscribe = $2, publish = $3 where id = $4 RETURNING *`,
        //     [settings, subscribe, publish, id]
        // )
        const device = await Device.update(
            {
                settings: settings,
                subscribe: subscribe,
                publish: publish,
                type: type,
                name: name,
                history: history
            },
            {
                where: {id}
            }
        )
        return res.json(device)
    }
    async deleteDevice(req, res) {
        const {id} = req.params
        // const device = await db.query(`DELETE FROM device where id = $1`, [id])
        const device = await Device.destroy({
            where: {id}
        })
        return res.json(device)
    }
}

module.exports = new DeviceController()