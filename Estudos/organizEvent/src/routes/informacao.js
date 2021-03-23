
require('dotenv').config()
const express = require('express')
const { createInformacoes, getInformacoes, atualizarInformacoes, deletar, findSubDocument, findById } = require('../repositories/informacaoRepository')

const router = express.Router()

router.get('/', (req, res) => {
    try {
        
        const informacoes = getInformacoes()
        res.json(informacoes)
        console.log(informacoes)
        
    } catch (error) {
        console.error(error)
    }
    
})

router.get('/:id', (req, res) => {
    try {
        const {id} = req.params
        const result = findById(id)
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})

router.post('/cadastrar-informacoes', (req, res) => {
    try {
        const { informacoes } = req.body
        const result = createInformacoes(informacoes)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

router.put('/atualizar-informacoes/:id', (req, res) => {
    try {
        const { id } = req.params
        const { informacoes } = req.body
        const result = atualizarInformacoes(id, informacoes)
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})

router.get('/find-subdocument/:subdocumentId', (req, res) => {
    try {
        const {subdocumentId} = req.params
        const {nomeCollection} = req.body
        const result = findSubDocument(subdocumentId, nomeCollection)
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})


router.delete('/deletar-informacoes/:id', (req, res) => {
    try {
        const {id} = req.params
        const result = deletar(id)
        res.json(result)
    } catch (error) {
        console.error(error)
    }
})



module.exports = router

