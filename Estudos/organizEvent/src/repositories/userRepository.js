
const { user } = require('firebase-functions/lib/providers/auth');
const { db, firebase, auth } = require('../app')
require("firebase/auth")


const criarUsuario = async (email, password, name, telephoneNumber) => {

    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user.email}criado com sucesso`)

            return user

        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    // console.log(result.user.displayName)
    return result


}

const atualizarUsuario = async (nome, telefone) => {
    try {

        let user = await firebase.auth().currentUser
        console.log(user)
        user.updateProfile({
            displayName: nome,
            phoneNumber: telefone
        }).then(function () {
            console.log(user.displayName,
                user.phoneNumber)
        }).catch(function (error) {
            console.error(error)
        });

        
        return user

    } catch (error) {
        console.error(error)
    }
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

const login = async (email, password) => {

    const result = await firebase.auth().signInWithEmailAndPassword(email, password).then((usuario) => {

        if (!usuario.sendEmailVerified) {
            firebase.auth().languageCode = 'pt'

            if (confirm("Seu email não está verificado, clique em OK e será enviado um email de verificação")) {
                enviarEmailVerificacao()
            }
        }
    }).catch((error) => {
        console.error(error)
    })

}

module.exports = {
    atualizarUsuario,
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login,
}


