
const { db, firebase } = require('../app')


const criarUsuario = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user} criado com sucesso`)
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
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
        console.log('SUCESSO')
    }).catch(() => {
        if (!user) {
            login('matheusmonaco123@gmail.com', '@jeanvaljean')
            console.log(`logando com ${username}`)
            if (user) console.log('logado com user')
        } else {
            console.log(`${username} já logado`)
        }
    })
}

module.exports = {
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login
}


