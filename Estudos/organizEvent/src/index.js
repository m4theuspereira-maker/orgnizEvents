const express = require('express')
const { firebaseInit, login, criarUsuario } = require('./app')
const http = require('http')
require('dotenv').config()
const app = express()




login('matheusmonaco123@gmail.com', '@jeanvaljean')
//criarUsuario('crebinhogostoso@delicia.com', '123456')


app.use(express.json())

const eventosRouter = require('./routes/eventos')
const userRouter = require('./routes/user')

app.use('/eventos', eventosRouter)
app.use('/user', userRouter)


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})