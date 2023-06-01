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
const Router = require('express')
const router = new Router()
const deviceController = require('../controller/device.controller')
const checkRoot = require('../middleware/checkRoleMiddleware')

// router.post('/device', checkRoot(true), deviceController.createDevice)
router.post('/device', deviceController.createDevice)
router.get('/device', deviceController.getDevice)
router.get('/device/:id', deviceController.getOneDevice)
router.put('/device/:id', deviceController.updateDevice)
router.delete('/device/:id', deviceController.deleteDevice)

module.exports = router