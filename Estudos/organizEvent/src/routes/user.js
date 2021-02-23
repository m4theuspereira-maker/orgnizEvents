const { criarUsuario, logout, evniarEmailVerificacao } = require('../app')

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

router.post('/signout', (req, res) =>{
    try {
        res.send(logout())
    } catch (error) {
        console.error(error)
    }
})


router.post('/sendemail', (req, res) =>{
    try {
       const result =  evniarEmailVerificacao()
       res.send(result)
    } catch (error) {
        console.error(error)
    }
})


module.exports= router