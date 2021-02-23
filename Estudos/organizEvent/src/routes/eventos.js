require('dotenv').config()
const express = require('express')
const { getEventos, findById } = require('../app')

const router = express.Router()

//coloque no projeto essas funcionalidades: createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail

router.get('/', (req, res) => {
    try {

        const eventos = getEventos()
        res.send(eventos)

    } catch (error) {
        console.error(error)
    }

})

router.get('/:eventoId', (req, res) => {

    try {

        const { eventoId } = req.params
        const evento = findById(eventoId)
        res.json(evento)

    } catch (error) {
        console.error(error)
    }

})





module.exports = router
