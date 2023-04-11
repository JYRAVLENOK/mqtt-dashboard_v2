const db = require('../db')

class DeviceController {
    async createDevice(req, res) {
        const {settings, subscribe, publish} = req.body
        const newDevice = await db.query(`INSERT INTO device (settings, subscribe, publish) values ($1, $2, $3) RETURNING *`, [settings, subscribe, publish])
        res.json(newDevice.rows[0])
    }
    async getDevice(req, res) {
        const devices = await db.query(`SELECT * FROM device`)
        res.json(devices.rows)
    }
    async getOneDevice(req, res) {
        const id = req.params.id
        const device = await db.query(`SELECT * FROM device where id = $1`, [id])
        res.json(device.rows[0])
    }
    async updateDevice(req, res) {
        const {id, settings, subscribe, publish} = req.body
        const device = await db.query(`UPDATE device set settings = $1, subscribe = $2, publish = $3 where id = $4 RETURNING *`,
            [settings, subscribe, publish, id]
        )
        res.json(device.rows[0])
    }
    async deleteDevice(req, res) {
        const id = req.params.id
        const device = await db.query(`DELETE FROM device where id = $1`, [id])
        res.json(device.rows[0])
    }
}

module.exports = new DeviceController()