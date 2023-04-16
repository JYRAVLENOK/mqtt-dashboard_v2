require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

//обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

