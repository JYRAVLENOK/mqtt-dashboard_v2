const Router = require('express')
const router = new Router()
const roomController = require('../controller/room.controller')

router.post('/room', roomController.createRoom)
router.get('/room', roomController.getRooms)
router.get('/room/:id', roomController.getOneRoom)
router.put('/room', roomController.updateRoom)
router.delete('/room/:id', roomController.deleteRoom)

module.exports = router