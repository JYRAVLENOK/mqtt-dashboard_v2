const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/user', userController.getUsers)
router.get('/auth', authMiddleware, userController.check)

router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router