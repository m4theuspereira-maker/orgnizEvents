require('dotenv').config()
const express = require('express')
const {getEventos} = require('../app')

const router = express.Router()



router.get('/', (req, res) =>{
    res.send(getEventos())
})




module.exports = router
