const express = require('express')

const http = require('http')
require('dotenv').config()
const app = express()



app.use(express.json())

const eventosRouter = require('./routes/eventos')
const userRouter = require('./routes/user')
const informacaoRouter = require('./routes/informacao')


app.use('/eventos', eventosRouter)
app.use('/user', userRouter)
app.use('/informacao', informacaoRouter)



app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

