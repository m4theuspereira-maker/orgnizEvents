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
        res.json(evento)

    } catch (error) {
        console.error(error)
    }

})

router.post('/create-evento', async (req, res) => {
    try {
        const { chave, data_inicial, data_final, descricao, informacao, inscricao, local, status, tipo, titulo, visibilidade } = req.body

        const evento = {
            chave: chave, 
            data_inicial: data_inicial, 
            data_final: data_final, 
            descricao: descricao, 
            informacao: informacao, 
            inscricao: inscricao, 
            local: local, 
            status: status, 
            tipo: tipo, 
            titulo: titulo, 
            visibilidade: visibilidade 
        }

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
