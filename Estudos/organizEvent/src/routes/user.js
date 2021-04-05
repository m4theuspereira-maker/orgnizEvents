const { criarUsuario, logout, enviarEmailVerificacao, resetaSenha, login, addEnderecoUsuario, getUsuarios } = require('../repositories/userRepository')
const express = require('express')

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {

        const { email, password } = req.body
        const usuario = await criarUsuario(email, password)
        res.json(usuario)
        enviarEmailVerificacao(email)
    } catch (error) {
        console.error(error)
        res.json(error)
    }
})

router.post('/signout', (req, res) => {
    try {
        const result = logout()
        res.send(result)
    } catch (error) {
        console.error(error)
    }
})


router.post('/verifcation', (req, res) => {
    try {
        const { email } = req.body
        const result = enviarEmailVerificacao(email)
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

router.post('/login', async (req, res) => {
    try {
       
        const {email, password} = req.body
        const result = await login(email, password)
        res.send(result)
    } catch (error) {
        console.error(error)
    }
})


router.get('/get-users', (req, res) => {
    try {
        const users = getUsuarios()
        return res.json(users)
    } catch (error) {
        console.error(error)
    }
})


module.exports = router