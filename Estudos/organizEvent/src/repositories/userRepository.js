
const { db, firebase } = require('../app')


const criarUsuario = async (email, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user}criado com sucesso`)

            return user
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}



const logout = () => {
    firebase.auth().signOut().then(() => {
        console.log('sessão encerrada')
    }).catch((error) => {
        console.error(error)
    });
}

const enviarEmailVerificacao = () => {

    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log('email enviado com sucesso')
    }).catch((error) => {
        console.error(error)
    });

}


const resetaSenha = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            console.log('email enviado para ', email)
        })
        .catch((error) => {
            console.error(error)
        });
}

const login = (username, password) => {

    const user = firebase.auth().createUserWithEmailAndPassword(username, password).then((username) => {
        let currentUser = firebase.auth().currentUser
        console.log(currentUser)
        console.log('SUCESSO')
    }).catch(() => {
        if (!user) {
            login(username, password)
            console.log(`logando com ${username}`)
            if (user) console.log('logado com user')
        } else {
            console.log(`${username} já logado`)
            let currentUser = firebase.auth().currentUser
            console.log(currentUser.email)
        }
    })
}

module.exports = {
    
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login, 
    }


