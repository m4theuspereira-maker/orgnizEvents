require('dotenv').config()
const express = require('express')
const { getEventosByUsuarioId, getEventos, findById, createEvento, atualizarEvento, findSubDocument, deletar, editarParticipantes } = require('../repositories/eventoRepository')
const { v4: uuid } = require('uuid')
const router = express.Router()
const { firebase } = require("../app.js")

//coloque no projeto essas funcionalidades: createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail

router.get('/', async (req, res) => {
    try {

        const eventos = await getEventosByUsuarioId()
        
        res.status(200).json(eventos)

    } catch (error) {
        res.status(500).json(error)
    }

})

router.post('/participantes', async (req, res) => {
    try {
        const { participantes, id} = req.body
        const result = await editarParticipantes(id, participantes)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.get('/:eventoId', async (req, res) => {

    try {
        const { eventoId } = req.params
        const evento = await findById(eventoId)
        res.status(200).json(evento)

    } catch (error) {
        res.status(500).json(error)
    }

})

router.post('/create-evento', async (req, res) => {
    try {
        const { dataInicial,
            dataFinal,
            horaInicial,
            horaFinal,
            descricao,
            informacao,
            inscricao,
            local,
            status,
            tipo,
            titulo,
            visibilidade,
            participantes
        } = req.body

        const user = firebase.auth().currentUser

        if (user === null) {
            throw ('usuário não encontrado')
        }

        const evento = {
            _id: uuid(),
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            horaInicial: horaInicial,
            horaFinal: horaFinal,
            descricao: descricao,
            usuarioId: user.uid,
            informacao: informacao,
            inscricao: inscricao,
            local: local,
            status: status,
            tipo: tipo,
            titulo: titulo,
            visibilidade: visibilidade,
            participantes: participantes
        }

        const result = await createEvento(evento)
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }

})

router.delete('/:eventoId', async (req, res) => {

    try {
        console.log("Entrou")
        const { eventoId } = req.params
        const evento = await deletar(eventoId)
        res.status(200).json(evento)

    } catch (error) {
        res.status(500).json(error)
    }

})

router.put('/update-evento/:eventoId', async (req, res) => {
    try {
        const { eventoId } = req.params
        const { descricao } = req.body
        const result = await atualizarEvento(eventoId, descricao)
        res.json(result)
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
