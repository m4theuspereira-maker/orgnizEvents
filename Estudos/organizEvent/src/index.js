const express = require('express')
const { firebaseInit, login, criarUsuario } = require('./app')
const http = require('http')
require('dotenv').config()
const app = express()




//login('matheusmonaco123@gmail.com', '@jeanvaljean')
criarUsuario('crebinhogostoso@delicia.com', '123456')


app.use(express.json())

const eventosRouter = require('./routes/eventos')

app.use('/eventos', eventosRouter)


app.listen(process.env.PORT, (req, res, socket) => {
    console.log(`Listening on port ${process.env.PORT}`)
})