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
        console.log("---------------))))))))")
        const {settings, subscribe, publish, type, name, history} = req.body
        console.log(settings)
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