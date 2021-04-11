
const { user } = require('firebase-functions/lib/providers/auth');
const { db, firebase, auth } = require('../app')
require("firebase/auth")
//etEventosByUsuarioId, deletar, findById, enviarEmailVerificacao, resetaSenha, logout e criarUsuario

const criarUsuario = async (email, password, name) => {

    try {

        let UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await UserCredential.user.updateProfile({ displayName: name });
        return UserCredential.user;

    } catch (error) {
        throw (error)
    }

}

const getUsuarioAtual = async () => {
    try {
        const user = await firebase.auth().currentUser
        return user
    } catch (error) {
        throw (error)
    }
}

const atualizarUsuario = async (profile) => {
    try {

        const user = await firebase.auth().currentUser

        user.updateProfile(profile).then(function () {
            return user
            console.log('atualizar', user.uid)
        }).catch(function (error) {
            console.error(error)
        });

    } catch (error) {
        console.error(error)
    }
}

const logout = async () => {
    return await firebase.auth().signOut().then(() => {
       return console.log('sessão encerrada')
    }).catch((error) => {
        throw ('erro ao encerrar sessão')
    });
}

const enviarEmailVerificacao = () => {

    let user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        console.log('email enviado com sucesso')
    }).catch((error) => {
        throw (error)
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


const resetaSenha = async (email) => {
    return await firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            console.log('email enviado para ', email)
        })
        .catch((error) => {
            throw ('email inválido')
        });
}

const login = async (email, password) => {

    const result = await firebase.auth().signInWithEmailAndPassword(email, password).then((usuario) => {
        return usuario
        
    }).catch(() => {
        throw ('email ou senha inválida')
    })

    return result
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


