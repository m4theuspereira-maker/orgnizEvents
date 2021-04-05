require('dotenv').config()
const express = require('express')
const { getEventos, findById, createEvento, atualizarEvento, findSubDocument } = require('../repositories/eventoRepository')

const router = express.Router()

//coloque no projeto essas funcionalidades: createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail

router.get('/', async (req, res) => {
    try {

        const eventos = await getEventos()
        console.log(eventos)
        res.json(eventos)

    } catch (error) {
        console.error(error)
    }

})

router.get('/:eventoId', async (req, res) => {

    try {
        const { eventoId } = req.params
        const evento = await findById(eventoId)
        console.log("teste", evento)
        res.json(evento)

    } catch (error) {
        console.error(error)
    }

})

router.post('/create-evento', async (req, res) => {
    try {
        const { evento } = req.body
        const result = await createEvento(evento)
        return res.json(result)
    } catch (error) {
        console.error(error)
    }
})

router.put('/update-evento/:eventoId', async (req, res) => {
    try {
        const { eventoId } = req.params
        const { descricao } = req.body
        const result = await atualizarEvento(eventoId, descricao)
        return res.json(result)
    } catch (error) {
        console.error(error)
    }

})

router.get('/find-subdocument/:subdocumentId', async (req, res) => {
    try {
        const { subdocumentId } = req.params
        const { nomeCollection } = req.body
        const result = await findSubDocument(subdocumentId, nomeCollection)
        return res.json(result)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
