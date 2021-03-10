const { criarUsuario, logout, evniarEmailVerificacao, resetaSenha, login } = require('../app')
const express = require('express')

const router = express.Router()

router.post('/signup', (req, res) => {

    try {

        const { email, password } = req.body
        const usuario = criarUsuario(email, password)
        res.json(usuario)

    } catch (error) {
        console.error(error)
    }
})

router.post('/signout', (req, res) => {
    try {
        res.send(logout())
    } catch (error) {
        console.error(error)
    }
})


router.post('/verifcation', (req, res) => {
    try {
        const result = evniarEmailVerificacao()
        res.send(result)
    } catch (error) {
        console.error(error)
    }
})

router.post('/resetpassword', (req, res) => {
    try {
        const { email } = req.body
        const result = resetaSenha(email)
        res.send(result)
    } catch (error) {
        console.error(error)
    }
})

router.post('/login', (req, res) => {
    try {
        const { emial } = req.body
        const { password } = req.body
        const result = login(emial, password)
        res.send(result)
    } catch (error) {
        console.error(error)
    }
})


module.exports = router