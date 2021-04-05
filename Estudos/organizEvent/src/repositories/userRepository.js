
const { db, firebase, auth } = require('../app')
require("firebase/auth")


const criarUsuario = async (email, password) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log(`usuario ${user} criado com sucesso`)
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

const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
                                         

    const result = await firebase.auth().
        signInWithPopup(provider)
        .then((result) =>{
            let credential = result.credential
            let token = credential.accessToken
            let user  = result. user

            db.collection('usuarios').add({
                credential: credential,
                token: token,
                user: user
            }).catch((error) =>{
                let errorCode = error.code;
                let errorMessage = error.message;                
                let email = error.email;                
                let credential = error.credential;
                console.error(errorCode, errorMessage, email, credential )
            
            })
        })
    return result
}

module.exports = {
    
    criarUsuario,
    resetaSenha,
    logout,
    enviarEmailVerificacao,
    login, 
    }


