const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()


route.get('/', (req, res) => res.render("index"))
route.get('/create-pass', (req, res) => res.render("create-pass"))

route.get('/room/:room', RoomController.open)
route.post('/create-room', RoomController.create)

// Formato que o formulario de dentro da modal tem que passar a informação

route.post('/question/create/:room', QuestionController.create )
route.post('/question/:room/:question/:action', QuestionController.index)



module.exports = route