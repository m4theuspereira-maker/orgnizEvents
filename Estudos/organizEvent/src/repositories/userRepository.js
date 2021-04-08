
const { user } = require('firebase-functions/lib/providers/auth');
const { db, firebase, auth } = require('../app')
require("firebase/auth")


const criarUsuario = async (email, password, name, telephoneNumber) => {

    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user.email} criado com sucesso`)

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

const getUsuarioAtual = async () =>{
    try {
        const user = await firebase.auth().currentUser
        return user
    } catch (error) {
        console.error(error)
    }
}

const atualizarUsuario = async (nome, telefone) => {
    try {

        let user = await firebase.auth().currentUser
        user.updateProfile(user => {
            user.displayName = nome

            return user
        }).then(function () {
            console.log('atualizado com sucesso')
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

const addNovoUsuario = async (uid, nome, email, telefone, accessToken, refreshToken) => {
    const usuario = {
        uid: uid,
        nome: nome,
        email: email,
        telefone: telefone,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
    const result = await db.collection('usuarios').add(usuario).then(() => {
        console.log('usuário salvo')
    }).catch(() => {
        console.log('usuário não salvo')
    })

    return result
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
        console.log(usuario)
    }).catch((error) => {
        console.error(error)
    })

}

module.exports = {
    getUsuarioAtual,
    addNovoUsuario,
    atualizarUsuario,
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login,
}


