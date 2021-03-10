
require('dotenv').config()
const express = require('express')
const { createInformacoes, getInformacoes, atualizarInformacoes, deletar, findSubDocument, findById } = require('../repositories/informacaoRepository')

const router = express.Router()



router.get('/', (req, res) => {

    try {

        const infromacoes = getInformacoes()
        res.send(infromacoes)
        console.log(infromacoes)

    } catch (error) {
        console.error(error)
    }

})

module.exports = router

