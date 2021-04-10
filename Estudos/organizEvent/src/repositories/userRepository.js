
const { user } = require('firebase-functions/lib/providers/auth');
const { db, firebase, auth } = require('../app')
require("firebase/auth")


const criarUsuario = async (email, password, name, telephoneNumber) => {

    try {

        let UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await UserCredential.user.updateProfile({ displayName: name });
        await UserCredential.user.updatePhoneNumber(telephoneNumber)
        return UserCredential.user;

    } catch (error) {
        console.error(error)
    }

}

const getUsuarioAtual = async () => {
    try {
        const user = await firebase.auth().currentUser
        return user
    } catch (error) {
        console.error(error)
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

        if (!usuario.sendEmailVerified) {
            firebase.auth().languageCode = 'pt'

            if (confirm("Seu email não está verificado, clique em OK e será enviado um email de verificação")) {
                enviarEmailVerificacao()
            }
        }
    }).catch((error) => {
        //console.error(error)
        throw error
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


