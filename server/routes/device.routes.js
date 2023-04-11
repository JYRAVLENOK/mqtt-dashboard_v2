const Router = require('express')
const router = new Router()
const deviceController = require('../controller/device.controller')

router.post('/device', deviceController.createDevice)
router.get('/device', deviceController.getDevice)
router.get('/device/:id', deviceController.getOneDevice)
router.put('/device', deviceController.updateDevice)
router.delete('/device/:id', deviceController.deleteDevice)

module.exports = router