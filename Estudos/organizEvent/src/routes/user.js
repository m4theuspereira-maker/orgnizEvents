const { criarUsuario, logout, enviarEmailVerificacao, resetaSenha, login, atualizarUsuario, getUsuarios } = require('../repositories/userRepository')
const express = require('express')

const router = express.Router()

router.post('/signup', async (req, res) => {
    try {

        const { email, password, name } = req.body
        let user = await criarUsuario(email, password,name)
        enviarEmailVerificacao(email)

        return res.json(user)
    } catch (error) {
        console.error(error)
        res.json(error)
    }
})

router.post('/update', async (req, res) => {
    try {
        const { nome, telefone } = req.body

        const result = await atualizarUsuario(nome, telefone)
        res.json(result)

    } catch (error) {
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
        const { email, password } = req.body
        const result = await login(email, password)
        res.status(200).json("Logado")
    } catch (error) {
        console.error(error)
        res.json(error)
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