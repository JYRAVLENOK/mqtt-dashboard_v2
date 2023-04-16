const Router = require('express')
const router = new Router()
const cardController = require('../controller/card.controller')

router.post('/card', cardController.createCard)
router.get('/card', cardController.getCards)
// router.get('/card', (req, res) => {
//     res.json({message: 'working'})
// })
router.get('/card/:id', cardController.getOneCard)
router.put('/card', cardController.updateCard)
router.delete('/card/:id', cardController.deleteCard)

module.exports = router