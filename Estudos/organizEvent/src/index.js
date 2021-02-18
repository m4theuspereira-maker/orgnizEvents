const express = require('express')
const app = express()






app.use(express.json())

const eventosRouter  = require('./routes/eventos')

app.use('/eventos', eventosRouter)

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})