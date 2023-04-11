const Router = require('express')
const router = new Router()
const userRouter = require('./user.routes')
const deviceRouter = require('./device.routes')
const cardRouter = require('./card.routes')
const roomRouter = require('./room.routes')

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/card', cardRouter)
router.use('/room', roomRouter)

module.exports = router