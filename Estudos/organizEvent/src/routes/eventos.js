require('dotenv').config()
const express = require('express')
const { getEventosByUsuarioId ,getEventos, findById, createEvento, atualizarEvento, findSubDocument } = require('../repositories/eventoRepository')
const {v4: uuid} = require('uuid')
const router = express.Router()

//coloque no projeto essas funcionalidades: createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail

router.get('/', async (req, res) => {
    try {

        const eventos = await getEventosByUsuarioId()
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
        const { data_inicial, data_final, descricao, informacao, inscricao, local, status, tipo, titulo, visibilidade, horaInicial, horaFinal } = req.body

        const user = firebase.auth().currentUser
        const evento = {
            _id: uuid(), 
            dataInicial: data_inicial, 
            dataFinal: data_final,
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
