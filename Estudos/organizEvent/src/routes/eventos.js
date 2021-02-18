const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>{
    res.json('Bem-vindo ao mundo da aids')
})


module.exports = router
