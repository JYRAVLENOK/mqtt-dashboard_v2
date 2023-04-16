const Router = require('express')
const router = new Router()
const deviceController = require('../controller/device.controller')
const checkRoot = require('../middleware/checkRoleMiddleware')

router.post('/device', checkRoot(true), deviceController.createDevice)
router.get('/device', deviceController.getDevice)
router.get('/device/:id', deviceController.getOneDevice)
router.put('/device/:id', deviceController.updateDevice)
router.delete('/device/:id', deviceController.deleteDevice)

module.exports = router