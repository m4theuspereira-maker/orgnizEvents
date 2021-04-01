require('dotenv').config()
const express = require('express')
const { getEventos, findById, createEvento, atualizarEvento, findSubDocument } = require('../repositories/eventoRepository')

const router = express.Router()

//coloque no projeto essas funcionalidades: createUserWithEmailAndPassword, sendEmailVerification, signOut, sendPasswordResetEmail

router.get('/', (req, res) => {
    try {

        const eventos = getEventos()
        res.send(eventos)
        console.log(eventos)
    } catch (error) {
        console.error(error)
    }

})

router.get('/:eventoId', async (req, res) => {

    try {
        console.log("entrou")
        const { eventoId } = req.params
        const evento = await findById(eventoId)
        console.log("teste", evento)
        res.json(evento)

    } catch (error) {
        console.error(error)
    }

})

router.post('/create-evento', (req, res)=>{
    try {
        const {evento} = req.body
        const result = createEvento(evento)
        res.json(result)        
    } catch (error) {
        console.error(error)
    }
})

router.put('/update-evento/:eventoId', (req, res)=>{
    try {
        const {eventoId} = req.params
        const {descricao} = req.body
        const result = atualizarEvento(eventoId, descricao)
        res.json(result)
    } catch (error) {
        console.error(error)
    }
    
})

module.exports = router
